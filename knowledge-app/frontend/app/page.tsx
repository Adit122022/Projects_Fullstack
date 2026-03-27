'use client';

import { useState } from 'react';
import { SaveItemButton } from '@/components/SaveItemButton';
import { ItemList } from '@/components/ItemList';
import { SearchBar } from '@/components/SearchBar';
import { GraphView } from '@/components/GraphView';
import { ResurfacePanel } from '@/components/ResurfacePanel';

export default function Home() {
  const [view, setView] = useState<'list' | 'graph'>('list');
  const [filters, setFilters] = useState({ tags: [], topics: [] });

  return (
    <div className="min-h-screen bg-black text-neon-green selection:bg-neon-red selection:text-black">
      <header className="border-b border-neon-green/30 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-neon-green animate-pulse rounded-full shadow-[0_0_8px_#39ff14]" />
              <h1 className="text-xl font-bold tracking-tighter uppercase">
                Terminal://Knowledge_Base
              </h1>
            </div>
            
            <div className="flex gap-4 items-center">
              <SearchBar />
              <SaveItemButton />
              
              <div className="flex gap-1 bg-terminal-dark/50 p-1 border border-neon-green/20 rounded-md">
                <button
                  onClick={() => setView('list')}
                  className={`px-3 py-1.5 text-xs font-bold transition-all ${
                    view === 'list' 
                      ? 'bg-neon-green text-black' 
                      : 'text-neon-green hover:bg-neon-green/10'
                  }`}
                >
                  [ LIST ]
                </button>
                <button
                  onClick={() => setView('graph')}
                  className={`px-3 py-1.5 text-xs font-bold transition-all ${
                    view === 'graph' 
                      ? 'bg-neon-green text-black' 
                      : 'text-neon-green hover:bg-neon-green/10'
                  }`}
                >
                  [ GRAPH ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3 border border-neon-green/20 bg-black/40 p-1">
            <div className="h-full border border-neon-green/10 p-6 relative">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-green/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-green/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-green/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-green/40" />
              
              {view === 'list' ? (
                <ItemList filters={filters} />
              ) : (
                <GraphView />
              )}
            </div>
          </div>

          <div className="col-span-1 border border-neon-green/20 bg-black/40 p-4 relative">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green/60" />
             <ResurfacePanel />
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-2 text-[10px] text-neon-green/40 flex justify-between uppercase tracking-widest pointer-events-none">
        <span>sys_status: encrypted</span>
        <span>node_active: true</span>
        <span>log_level: debug</span>
      </footer>
    </div>
  );
}