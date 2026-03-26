'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SaveItemButton } from '@/components/SaveItemButton';
import { ItemList } from '@/components/ItemList';
import { SearchBar } from '@/components/SearchBar';
import { GraphView } from '@/components/GraphView';
import { ResurfacePanel } from '@/components/ResurfacePanel';

export default function Home() {
  const [view, setView] = useState<'list' | 'graph'>('list');
  const [filters, setFilters] = useState({ tags: [], topics: [] });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            
            <div className="flex gap-4 items-center">
              <SearchBar />
              <SaveItemButton />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded ${
                    view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setView('graph')}
                  className={`px-4 py-2 rounded ${
                    view === 'graph' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Graph
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            {view === 'list' ? (
              <ItemList filters={filters} />
            ) : (
              <GraphView />
            )}
          </div>

          <div className="col-span-1">
            <ResurfacePanel />
          </div>
        </div>
      </div>
    </div>
  );
}