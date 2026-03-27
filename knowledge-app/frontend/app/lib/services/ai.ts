import OpenAI from "openai";
import { Item } from "../models/Item";
import { connectDB } from "../db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.substring(0, 8000),
  });

  return response.data[0].embedding;
}

export async function generateTags(
  title: string,
  content: string,
): Promise<string[]> {
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
    console.error("Tag generation error:", error);
    return [];
  }
}

export async function findRelatedItems(
  embedding: number[],
  userId: string,
  excludeId: string,
): Promise<string[]> {
  try {
    await connectDB();

    // Try MongoDB Atlas $vectorSearch first
    const results = await Item.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: embedding,
          numCandidates: 50,
          limit: 10,
          filter: {
            userId: userId,
          },
        },
      },
      {
        $match: {
          _id: { $ne: excludeId },
        },
      },
      {
        $project: {
          _id: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
      { $limit: 5 },
    ]);

    if (results.length > 0) {
      return results
        .filter((r: any) => r.score > 0.7)
        .map((r: any) => r._id.toString());
    }
  } catch (error: any) {
    // $vectorSearch not available — fallback to in-memory cosine similarity
    console.warn("⚠️ Atlas Vector Search not available, using in-memory fallback:", error.message);
  }

  // Fallback: in-memory cosine similarity
  const items = await Item.find({
    userId,
    _id: { $ne: excludeId },
    embedding: { $exists: true, $ne: null },
  }).limit(100);

  const similarities = items
    .map((item) => ({
      id: item._id.toString(),
      similarity: cosineSimilarity(embedding, item.embedding!),
    }))
    .filter((s) => s.similarity > 0.7);

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .map((s) => s.id);
}

function cosineSimilarity(a: number[], b: number[]): number {
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
