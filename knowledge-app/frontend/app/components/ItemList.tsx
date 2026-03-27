'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Video, Image, Link, FileType } from 'lucide-react';

const API_URL = '/api';

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
      const response = await axios.get(`${API_URL}/item`, {
        params: { userId: 'demo-user', ...filters }
      });
      return response.data;
    }
  });

  // Fetch collections for the filter — MUST be before any early returns
  const { data: collectionsData } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/collections`, {
        params: { userId: 'demo-user' }
      });
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-12 h-1 bg-neon-green/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-neon-green animate-[terminal-loader_1.5s_infinite]" />
        </div>
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">
          Initializing_Data_Stream...
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'pdf': return <FileType className="w-4 h-4" />;
      default: return <Link className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neon-green/10 pb-2 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
          Mount_Point: /records/all
        </span>
        <div className="flex items-center gap-3">
          {collectionsData?.collections?.length > 0 && (
            <select
              value={filters.itemCollection || ''}
              onChange={(e) => {
                const val = e.target.value;
                // Pass to parent via URL params or local state
                window.dispatchEvent(new CustomEvent('filter-collection', { detail: val }));
              }}
              className="bg-black border border-neon-green/30 text-neon-green px-2 py-1 text-[9px] font-bold uppercase focus:outline-none focus:border-neon-green"
            >
              <option value="">ALL_COLLECTIONS</option>
              {collectionsData.collections.map((c: any) => (
                <option key={c.name} value={c.name}>
                  {c.name.toUpperCase()} ({c.count})
                </option>
              ))}
            </select>
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
            Showing: {data?.items.length || 0} items
          </span>
        </div>
      </div>

      {data?.items.map((item: Item) => (
        <div 
          key={item._id}
          className="group relative bg-black/40 border border-neon-green/20 p-6 transition-all hover:border-neon-green/60 hover:shadow-[0_0_20px_rgba(57,255,20,0.05)]"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20px] right-[-20px] w-10 h-10 bg-neon-green/5 rotate-45 border-l border-neon-green/20" />
          </div>

          <div className="flex gap-6">
            {item.metadata?.thumbnail && (
              <div className="w-32 h-32 flex-shrink-0 bg-black border border-neon-green/10 relative overflow-hidden group-hover:border-neon-green/30 transition-colors">
                <img 
                  src={item.metadata.thumbnail} 
                  alt=""
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 transition-all"
                />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-green/20" />
              </div>
            )}
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-neon-green/60">
                      {getIcon(item.type)}
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                        Type: {item.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-neon-green group-hover:text-shadow-[0_0_8px_#39ff14] transition-all">
                      {item.title}
                    </h3>
                  </div>
                  
                  <span className="text-[10px] text-neon-green/30 font-bold" suppressHydrationWarning>
                    [{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).toUpperCase()}]
                  </span>inis
                </div>

                <div className="mt-2">
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-neon-cyan hover:text-white transition-colors lowercase"
                  >
                    <span className="opacity-40">@</span>
                    {item.metadata?.domain || item.url}
                    <Link className="w-2.5 h-2.5 ml-1" />
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 bg-neon-green/10 text-neon-green border border-neon-green/30 text-[9px] font-bold tracking-widest uppercase"
                  >
                    #{tag}
                  </span>
                ))}
                
                {item.suggestedTags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 border border-dashed border-neon-green/20 text-neon-green/40 text-[9px] font-bold tracking-widest uppercase italic"
                  >
                    +{tag}?
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Status Line */}
          <div className="absolute bottom-1 right-2 text-[8px] text-neon-green/10 font-bold group-hover:text-neon-green/30 transition-colors">
            ITEM_HASH: {item._id.substring(0, 16).toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}
