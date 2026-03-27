'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const API_URL = '/api';

export function ResurfacePanel() {
  const { data } = useQuery({
    queryKey: ['resurface'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/resurface`, {
        params: { userId: 'demo-user' }
      });
      return response.data;
    }
  });

  return (
    <div className="bg-black/10 text-neon-green font-mono">
      <div className="flex items-center gap-3 mb-6 border-b border-neon-green/10 pb-3">
        <div className="relative">
          <Clock className="w-5 h-5 text-neon-green animate-[pulse_2s_infinite]" />
          <div className="absolute inset-0 bg-neon-green/20 blur-sm rounded-full" />
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Resurface_Buffer</h2>
          <p className="text-[8px] opacity-40 uppercase">Awaiting_Memory_Recall...</p>
        </div>
      </div>

      <div className="space-y-4">
        {data?.length === 0 && (
          <div className="p-4 border border-dashed border-neon-green/10 text-[9px] text-center opacity-30 italic">
            [ NO_SUGGESTIONS_DUE_TO_CACHE_EMPTY ]
          </div>
        )}

        {data?.map((item: any) => (
          <div
            key={item._id}
            className="group p-3 border border-neon-green/10 bg-black/40 hover:bg-neon-green/5 hover:border-neon-green/40 cursor-pointer transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] text-neon-green/40 font-bold">[!]</span>
            </div>

            <h4 className="font-bold text-[11px] mb-1 group-hover:text-shadow-[0_0_5px_#39ff14] truncate uppercase">
              {item.title}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-[8px] text-neon-green/40 font-bold tracking-widest uppercase" suppressHydrationWarning>
                TS: {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).toUpperCase()}
              </span>
              <span className="text-[8px] px-1.5 border border-neon-green/20 text-neon-green/60">
                LNK
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-neon-green/10">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-neon-red animate-ping rounded-full" />
          <span className="text-[8px] text-neon-red/60 uppercase font-bold tracking-tighter">System_Alert: Memory_Gap_Detected</span>
        </div>
      </div>
    </div>
  );
}
