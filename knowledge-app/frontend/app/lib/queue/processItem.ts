import { Queue, Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { Item } from '../models/Item';
import { generateEmbedding, generateTags, findRelatedItems } from '../services/ai';
import { connectDB } from '../db';

const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});

export const processItemQueue = new Queue('process-item', { connection });

// Worker - yeh alag file mein bhi ho sakta hai
if (process.env.START_WORKER === 'true') {
  const worker = new Worker('process-item', async (job) => {
    await connectDB();
    const { itemId } = job.data;
    
    const item = await Item.findById(itemId);
    if (!item) return;

    try {
      console.log(`🔄 Processing item: ${item.title}`);

      // 1. Generate embedding
      const textToEmbed = `${item.title}\n${item.content.substring(0, 2000)}`;
      const embedding = await generateEmbedding(textToEmbed);
      
      // 2. Generate tags
      const suggestedTags = await generateTags(item.title, item.content);
      
      // 3. Find related items
      const relatedItems = await findRelatedItems(embedding, item.userId, itemId);

      // 4. Update item
      await Item.findByIdAndUpdate(itemId, {
        embedding,
        suggestedTags,
        relatedItems
      });

      console.log(`✅ Processed item: ${item.title}`);
    } catch (error) {
      console.error(`❌ Error processing item ${itemId}:`, error);
      throw error;
    }
  }, { 
    connection,
    concurrency: 2
  });

  worker.on('completed', (job) => {
    console.log(`✅ Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.log(`❌ Job ${job?.id} failed:`, err.message);
  });
}