'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function ResurfacePanel() {
  const { data } = useQuery({
    queryKey: ['resurface'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/items/resurface/suggestions`, {
        params: { userId: 'demo-user' }
      });
      return response.data;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h2 className="font-semibold">Remember These?</h2>
      </div>

      <div className="space-y-3">
        {data?.map((item: any) => (
          <div 
            key={item._id}
            className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <h4 className="font-medium text-sm mb-1">{item.title}</h4>
            <p className="text-xs text-gray-500">
              Saved {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}