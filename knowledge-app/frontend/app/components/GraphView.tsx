'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useCallback, useRef } from 'react';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

const API_URL = '/api';

export function GraphView() {
  const graphRef = useRef<any>(null);

  const { data } = useQuery({
    queryKey: ['graph'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/graph`, {
        params: { userId: 'demo-user' }
      });
      return response.data;
    }
  });

  const handleNodeClick = useCallback((node: any) => {
    if (node.url) {
      window.open(node.url, '_blank');
    }
  }, []);

  const handleNodeHover = useCallback((node: any) => {
    document.body.style.cursor = node ? 'pointer' : 'default';
  }, []);

  if (!data) return (
    <div className="flex items-center justify-center h-[600px] border border-neon-green/10">
       <div className="text-[10px] font-bold tracking-widest animate-pulse">MAP_LOADING...</div>
    </div>
  );

  return (
    <div className="bg-black border border-neon-green/20 relative" style={{ height: '600px' }}>
      <div className="absolute top-2 left-2 z-10 text-[8px] text-neon-green/40 font-bold uppercase pointer-events-none">
        GRID_COORDINATES: READY | NODES: {data?.nodes?.length || 0} | LINKS: {data?.links?.length || 0}
      </div>
      <div className="absolute top-2 right-2 z-10 text-[8px] text-neon-green/30 font-bold uppercase pointer-events-none">
        [ CLICK_NODE_TO_OPEN ]
      </div>
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeLabel={(node: any) => `${node.title}\n[${(node.type || 'link').toUpperCase()}]${node.tags?.length ? '\nTags: ' + node.tags.join(', ') : ''}`}
        nodeColor={() => '#39ff14'}
        linkColor={() => 'rgba(57, 255, 20, 0.15)'}
        backgroundColor="#000000"
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const isHovered = node.__isHovered;
          const fontSize = Math.max(10 / globalScale, 3);
          const nodeSize = isHovered ? 5 : 3;

          // Glow effect
          if (isHovered) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(57, 255, 20, 0.15)';
            ctx.fill();
          }

          // Node dot
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
          ctx.fillStyle = isHovered ? '#39ff14' : '#ff3131';
          ctx.fill();

          // Label
          ctx.font = `${fontSize}px "Courier New", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = isHovered ? '#39ff14' : 'rgba(57, 255, 20, 0.7)';

          const label = (node.title || '').substring(0, 25);
          ctx.fillText(label, node.x, node.y + nodeSize + 2);

          // Type badge
          if (isHovered && node.type) {
            ctx.font = `${Math.max(8 / globalScale, 2)}px "Courier New", monospace`;
            ctx.fillStyle = 'rgba(255, 49, 49, 0.8)';
            ctx.fillText(`[${node.type.toUpperCase()}]`, node.x, node.y + nodeSize + fontSize + 4);
          }
        }}
        nodeCanvasObjectMode={() => 'replace'}
        linkDirectionalParticles={3}
        linkDirectionalParticleSpeed={0.008}
        linkDirectionalParticleColor={() => '#39ff14'}
        linkDirectionalParticleWidth={1.5}
        linkWidth={0.5}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        warmupTicks={50}
      />
    </div>
  );
}