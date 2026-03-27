import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Item } from '@/lib/models/Item';
import { generateEmbedding } from '@/lib/services/ai';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const userId = searchParams.get('userId') || 'demo';

    if (!query) {
      return NextResponse.json({ items: [] });
    }

    // Semantic search using embeddings
    const queryEmbedding = await generateEmbedding(query);

    const allItems = await Item.find({ 
      userId,
      embedding: { $exists: true }
    }).limit(100);

    // Calculate similarities
    const results = allItems.map(item => ({
      item,
      score: cosineSimilarity(queryEmbedding, item.embedding!)
    }))
    .filter(r => r.score > 0.6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(r => r.item);

    return NextResponse.json({ items: results });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
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