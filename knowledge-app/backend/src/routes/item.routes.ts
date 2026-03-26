import express, { Request, Response } from 'express';
import { Item } from '../models/Item';
import { processItemLocally } from '../services/itemProcessor';
import { extractContent } from '../services/contentExtractor';

export const router = express.Router();

// Save new item
router.post('/', async (req: Request, res: Response) => {
  try {
    const { url, userId, type, highlights } = req.body;

    // Extract content
    const extracted = await extractContent(url, type);

    const item = new Item({
      userId,
      url,
      type,
      title: extracted.title,
      content: extracted.content,
      metadata: extracted.metadata,
      highlights: highlights || []
    });

    await item.save();

    // Process item synchronously (since Redis/Docker is not available)
    await processItemLocally(item._id.toString());

    res.status(201).json(item);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// Get all items
router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId, tags, topics, type, limit = 50, skip = 0 } = req.query;

    const query: any = { userId };
    
    if (tags) query.tags = { $in: Array.isArray(tags) ? tags : [tags] };
    if (topics) query.topics = { $in: Array.isArray(topics) ? topics : [topics] };
    if (type) query.type = type;

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await Item.countDocuments(query);

    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Get single item
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('relatedItems', 'title url type metadata.thumbnail');
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// Update item
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { tags, highlights } = req.body;
    
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          ...(tags && { tags }),
          ...(highlights && { highlights })
        }
      },
      { new: true }
    );

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Get items for resurfacing
router.get('/resurface/suggestions', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
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
    .sort({ surfaceCount: 1 })
    .limit(5);

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resurface suggestions' });
  }
});