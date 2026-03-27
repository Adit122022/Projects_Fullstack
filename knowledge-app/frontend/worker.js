require("dotenv").config({ path: ".env.local" });

const { Worker } = require("bullmq");
const { Redis } = require("ioredis");
const mongoose = require("mongoose");

console.log("🔧 Starting Background Worker...\n");

// Redis connection
const redis = new Redis(process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("connect", () => console.log("✅ Worker: Redis Connected"));
redis.on("error", (err) =>
  console.error("❌ Worker: Redis Error:", err.message),
);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Worker: MongoDB Connected"))
  .catch((err) => console.error("❌ Worker: MongoDB Error:", err.message));

// Item Schema (simplified for worker)
const ItemSchema = new mongoose.Schema(
  {
    userId: String,
    url: String,
    title: String,
    content: String,
    type: String,
    tags: [String],
    suggestedTags: [String],
    embedding: [Number],
    relatedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    metadata: Object,
  },
  { timestamps: true },
);

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

// AI Functions
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.substring(0, 8000),
  });
  return response.data[0].embedding;
}

async function generateTags(title, content) {
  try {
    const prompt = `Extract 3-5 relevant tags from this content. Return only comma-separated tags.

Title: ${title}
Content: ${content.substring(0, 500)}

Tags:`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 50,
    });

    const tags =
      response.choices[0].message.content
        ?.split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0 && tag.length < 20) || [];

    return tags.slice(0, 5);
  } catch (error) {
    console.error("Tag generation error:", error.message);
    return [];
  }
}

function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function findRelatedItems(embedding, userId, excludeId) {
  const items = await Item.find({
    userId,
    _id: { $ne: excludeId },
    embedding: { $exists: true, $ne: null },
  }).limit(100);

  const similarities = items
    .map((item) => ({
      id: item._id.toString(),
      similarity: cosineSimilarity(embedding, item.embedding),
    }))
    .filter((s) => s.similarity > 0.7);

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .map((s) => s.id);
}

// Worker
const worker = new Worker(
  "process-item",
  async (job) => {
    const { itemId } = job.data;

    console.log(`\n🔄 Processing job ${job.id}: ${itemId}`);

    try {
      const item = await Item.findById(itemId);

      if (!item) {
        console.log(`❌ Item not found: ${itemId}`);
        return;
      }

      console.log(`📄 Item: ${item.title}`);

      // 1. Generate embedding
      console.log(`   🧠 Generating embedding...`);
      const textToEmbed = `${item.title}\n${item.content.substring(0, 2000)}`;
      const embedding = await generateEmbedding(textToEmbed);

      // 2. Generate tags
      console.log(`   🏷️  Generating tags...`);
      const suggestedTags = await generateTags(item.title, item.content);

      // 3. Find related items
      console.log(`   🔗 Finding related items...`);
      const relatedItems = await findRelatedItems(
        embedding,
        item.userId,
        itemId,
      );

      // 4. Update item
      await Item.findByIdAndUpdate(itemId, {
        embedding,
        suggestedTags,
        relatedItems,
      });

      console.log(`   ✅ Complete!`);
      console.log(`   📊 Tags: ${suggestedTags.join(", ")}`);
      console.log(`   🔗 Related: ${relatedItems.length} items\n`);
    } catch (error) {
      console.error(`❌ Error processing ${itemId}:`, error.message);
      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 2,
  },
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});

console.log("🚀 Worker is ready and waiting for jobs...\n");
