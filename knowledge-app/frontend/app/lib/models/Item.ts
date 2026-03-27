import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IItem extends Document {
  userId: string;
  url: string;
  title: string;
  content: string;
  type: 'article' | 'tweet' | 'image' | 'video' | 'pdf' | 'link';
  tags: string[];
  suggestedTags: string[];
  topics: string[];
  highlights: Array<{
    text: string;
    note?: string;
    createdAt: Date;
  }>;
  metadata: {
    domain?: string;
    author?: string;
    publishedDate?: Date;
    thumbnail?: string;
    duration?: number;
    wordCount?: number;
  };
  embedding?: number[];
  itemCollection?: string;
  relatedItems: mongoose.Types.ObjectId[];
  lastSurfaced?: Date;
  surfaceCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<IItem>({
  userId: { type: String, required: true, index: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  type: { 
    type: String, 
    enum: ['article', 'tweet', 'image', 'video', 'pdf', 'link'],
    required: true 
  },
  tags: [{ type: String }],
  suggestedTags: [{ type: String }],
  topics: [{ type: String }],
  highlights: [{
    text: String,
    note: String,
    createdAt: { type: Date, default: Date.now }
  }],
  metadata: {
    domain: String,
    author: String,
    publishedDate: Date,
    thumbnail: String,
    duration: Number,
    wordCount: Number
  },
  embedding: [{ type: Number }],
  itemCollection: { type: String, default: '' },
  relatedItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  lastSurfaced: Date,
  surfaceCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

ItemSchema.index({ userId: 1, createdAt: -1 });
ItemSchema.index({ tags: 1 });
ItemSchema.index({ topics: 1 });
ItemSchema.index({ itemCollection: 1 });

export const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);