import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Item } from '@/lib/models/Item';
import { extractContent } from '@/lib/services/contentExtractor';
import { processItemQueue } from '@/lib/queue/processItem';

// GET - Fetch items
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo';
    const tags = searchParams.get('tags')?.split(',');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    const query: any = { userId };
    if (tags?.length) query.tags = { $in: tags };
    if (type) query.type = type;

    const itemCollection = searchParams.get('itemCollection');
    if (itemCollection) query.itemCollection = itemCollection;

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-embedding'); // embedding bhejne ki zarurat nahi

    const total = await Item.countDocuments(query);

    return NextResponse.json({ items, total });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Save new item
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { url, userId, type, highlights } = body;

    // Content extract karo
    console.log(`📥 Extracting content from: ${url}`);
    const extracted = await extractContent(url, type);

    // Item save karo
    const item = new Item({
      userId: userId || 'demo',
      url,
      type,
      title: extracted.title,
      content: extracted.content,
      metadata: extracted.metadata,
      highlights: highlights || [],
      tags: [],
      suggestedTags: []
    });

    await item.save();
    console.log(`💾 Saved item: ${item.title}`);

    // Background processing queue mein add karo
    await processItemQueue.add('process-item', {
      itemId: item._id.toString()
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.error('Save error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}