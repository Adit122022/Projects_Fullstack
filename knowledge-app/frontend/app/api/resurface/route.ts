import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Item } from '@/lib/models/Item';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo';

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const items = await Item.find({
      userId,
      createdAt: { $lt: thirtyDaysAgo },
      $or: [
        { lastSurfaced: { $exists: false } },
        { lastSurfaced: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
      ]
    })
    .sort({ surfaceCount: 1, createdAt: 1 })
    .limit(5)
    .select('title url type metadata.thumbnail createdAt');

    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// Mark as surfaced
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { itemId } = await req.json();

    await Item.findByIdAndUpdate(itemId, {
      $set: { lastSurfaced: new Date() },
      $inc: { surfaceCount: 1 }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}