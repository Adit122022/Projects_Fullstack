import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Item } from '@/lib/models/Item';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo';

    const items = await Item.find({ userId })
      .populate('relatedItems')
      .limit(100);

    // D3 graph format
    const nodes = items.map(item => ({
      id: item._id.toString(),
      title: item.title,
      type: item.type,
      tags: item.tags
    }));

    const links: any[] = [];
    items.forEach(item => {
      item.relatedItems.forEach((relatedId: any) => {
        links.push({
          source: item._id.toString(),
          target: relatedId.toString()
        });
      });
    });

    return NextResponse.json({ nodes, links });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}