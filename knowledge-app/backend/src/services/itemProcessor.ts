import { Item } from '../models/Item';
import { generateEmbedding, generateTags, findRelatedItems } from './ai';

export async function processItemLocally(itemId: string): Promise<void> {
  const item = await Item.findById(itemId);
  if (!item) return;

  try {
    console.log(`⏳ Starting local processing for item: ${itemId}`);
    
    // Generate embedding
    const embedding = await generateEmbedding(item.content);
    
    // Generate tags
    const suggestedTags = await generateTags(item.title, item.content);
    
    // Find related items
    const relatedItems = await findRelatedItems(embedding, item.userId, itemId);

    // Update item
    await Item.findByIdAndUpdate(itemId, {
      embedding,
      suggestedTags,
      relatedItems
    });

    console.log(`✅ Locally processed item: ${itemId}`);
  } catch (error) {
    console.error(`❌ Error locally processing item ${itemId}:`, error);
    throw error;
  }
}
