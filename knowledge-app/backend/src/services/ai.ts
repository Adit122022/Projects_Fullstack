import OpenAI from 'openai';
import { Item } from '../models/Item';

let _openai: OpenAI | null = null;

function getOpenAI() {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables');
    }
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return _openai;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.substring(0, 8000) // Token limit
  });

  return response.data[0].embedding;
}

export async function generateTags(title: string, content: string): Promise<string[]> {
  const prompt = `Generate 3-5 relevant tags for this content:

Title: ${title}
Content: ${content.substring(0, 1000)}

Return only the tags as a comma-separated list.`;

  const openai = getOpenAI();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    max_tokens: 50
  });

  const tags = response.choices[0].message.content
    ?.split(',')
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0) || [];

  return tags;
}

export async function findRelatedItems(
  embedding: number[], 
  userId: string, 
  excludeId: string
): Promise<string[]> {
  // Cosine similarity search
  const items = await Item.find({
    userId,
    _id: { $ne: excludeId },
    embedding: { $exists: true }
  }).limit(100);

  const similarities = items.map(item => ({
    id: item._id.toString(),
    similarity: cosineSimilarity(embedding, item.embedding!)
  }));

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .map(s => s.id);
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