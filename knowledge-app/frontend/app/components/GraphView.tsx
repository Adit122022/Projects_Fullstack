'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

const API_URL = '/api';

export function GraphView() {
  const { data } = useQuery({
    queryKey: ['graph'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/graph`, {
        params: { userId: 'demo-user' }
      });
      return response.data;
    }
  });

  if (!data) return (
    <div className="flex items-center justify-center h-[600px] border border-neon-green/10">
       <div className="text-[10px] font-bold tracking-widest animate-pulse">MAP_LOADING...</div>
    </div>
  );

  return (
    <div className="bg-black border border-neon-green/20 relative" style={{ height: '600px' }}>
      <div className="absolute top-2 left-2 z-10 text-[8px] text-neon-green/40 font-bold uppercase pointer-events-none">
        GRID_COORDINATES: READY
      </div>
      <ForceGraph2D
        graphData={data}
        nodeLabel="title"
        nodeColor={() => '#39ff14'}
        linkColor={() => 'rgba(57, 255, 20, 0.2)'}
        backgroundColor="#000000"
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const label = node.title;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#39ff14';
          ctx.fillText(label, node.x, node.y);
          
          // Draw point
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#ff3131';
          ctx.fill();
        }}
        linkDirectionalParticles={4}
        linkDirectionalParticleSpeed={0.01}
        linkDirectionalParticleColor={() => '#39ff14'}
        linkDirectionalParticleWidth={2}
      />
    </div>
  );
}