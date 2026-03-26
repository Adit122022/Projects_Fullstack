'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Video, Image, Link, FileType } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Item {
  _id: string;
  title: string;
  url: string;
  type: string;
  tags: string[];
  suggestedTags: string[];
  metadata: any;
  createdAt: string;
}

export function ItemList({ filters }: { filters: any }) {
  const { data, isLoading } = useQuery({
    queryKey: ['items', filters],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/items`, {
        params: { userId: 'demo-user', ...filters }
      });
      return response.data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'pdf': return <FileType className="w-5 h-5" />;
      default: return <Link className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {data?.items.map((item: Item) => (
        <div 
          key={item._id}
          className="bg-white rounded-lg p-6 shadow hover:shadow-md transition"
        >
          <div className="flex gap-4">
            {item.metadata?.thumbnail && (
              <img 
                src={item.metadata.thumbnail} 
                alt=""
                className="w-32 h-32 object-cover rounded"
              />
            )}
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getIcon(item.type)}
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {item.metadata?.domain || item.url}
                  </a>
                </div>

                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
                
                {item.suggestedTags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm border border-dashed"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}