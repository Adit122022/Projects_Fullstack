import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Item } from '@/lib/models/Item';

// GET — list all collections with item counts
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo';

    const collections = await Item.aggregate([
      { $match: { userId, itemCollection: { $exists: true, $ne: '' } } },
      {
        $group: {
          _id: '$itemCollection',
          count: { $sum: 1 },
          latestItem: { $max: '$createdAt' },
        },
      },
      { $sort: { latestItem: -1 } },
      {
        $project: {
          name: '$_id',
          count: 1,
          latestItem: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json({ collections });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST — assign items to a collection
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { itemIds, collection, userId } = await req.json();

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      );
    }

    await Item.updateMany(
      { _id: { $in: itemIds }, userId: userId || 'demo' },
      { $set: { itemCollection: collection } }
    );

    return NextResponse.json({ success: true, collection });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
