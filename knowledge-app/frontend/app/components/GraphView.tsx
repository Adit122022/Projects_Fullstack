'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function GraphView() {
  const { data } = useQuery({
    queryKey: ['graph'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/graph`, {
        params: { userId: 'demo-user' }
      });
      return response.data;
    }
  });

  if (!data) return <div>Loading graph...</div>;

  return (
    <div className="bg-white rounded-lg shadow" style={{ height: '600px' }}>
      <ForceGraph2D
        graphData={data}
        nodeLabel="title"
        nodeAutoColorBy="type"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
}