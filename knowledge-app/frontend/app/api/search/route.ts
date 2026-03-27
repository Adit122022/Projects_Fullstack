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
    const type = searchParams.get('type');

    if (!query) {
      return NextResponse.json({ items: [] });
    }

    let results: any[] = [];

    // Strategy 1: Try Atlas $vectorSearch
    try {
      const queryEmbedding = await generateEmbedding(query);

      const filter: any = { userId };
      if (type) filter.type = type;

      results = await Item.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryEmbedding,
            numCandidates: 100,
            limit: 20,
            filter,
          },
        },
        {
          $project: {
            title: 1,
            url: 1,
            type: 1,
            tags: 1,
            metadata: 1,
            createdAt: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
      ]);

      if (results.length > 0) {
        return NextResponse.json({ items: results });
      }
    } catch (vectorError: any) {
      console.warn("⚠️ Atlas Vector Search unavailable, using fallback:", vectorError.message);
    }

    // Strategy 2: In-memory cosine similarity on embeddings
    try {
      const queryEmbedding = await generateEmbedding(query);

      const allItems = await Item.find({
        userId,
        embedding: { $exists: true },
        ...(type ? { type } : {}),
      }).limit(100);

      results = allItems
        .map(item => ({
          ...item.toObject(),
          score: cosineSimilarity(queryEmbedding, item.embedding!),
        }))
        .filter(r => r.score > 0.5)
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);

      if (results.length > 0) {
        return NextResponse.json({ items: results });
      }
    } catch (embeddingError: any) {
      console.warn("⚠️ Embedding search failed, using text fallback:", embeddingError.message);
    }

    // Strategy 3: Text fallback (regex on title and content)
    const textQuery: any = {
      userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    };
    if (type) textQuery.type = type;

    results = await Item.find(textQuery)
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-embedding');

    return NextResponse.json({ items: results });
  } catch (error: any) {
    console.error("Search error:", error);
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