'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';

const API_URL = '/api';

export function SaveItemButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [type, setType] = useState('article');

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data: { url: string; type: string }) => {
      return axios.post(`${API_URL}/item`, {
        ...data,
        userId: 'demo-user'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      setUrl('');
      setIsOpen(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({ url, type });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-4 py-2 bg-black border border-neon-green text-neon-green text-xs font-bold uppercase transition-all hover:bg-neon-green hover:text-black hover:shadow-[0_0_15px_#39ff14] relative overflow-hidden"
      >
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
        <span>[ CREATE_RECORD ]</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0  h-screen  bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] font-mono p-4">
          <div className="bg-black border border-neon-green p-8 w-full max-w-md relative shadow-[0_0_50px_rgba(57,255,20,0.15)]">
            {/* Header decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-neon-green/20" />
            <div className="absolute top-2 left-2 text-[8px] text-neon-green font-bold opacity-30">ENCRYPTED_ENTRY_FORM_v1.0.4</div>

            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-bold uppercase tracking-tighter text-neon-green">
                <span className="text-neon-red mr-2">»</span>Initialize_Record
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-neon-green hover:text-neon-red transition-colors">
                <span className="text-xs font-bold">[ CLOSE_X ]</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-bold text-neon-green/60 px-1">target_uri</label>
                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-black border border-neon-green/30 text-neon-green px-4 py-3 text-sm focus:outline-none focus:border-neon-green focus:shadow-[0_0_10px_rgba(57,255,20,0.1)] transition-all placeholder:text-neon-green/10"
                    placeholder="https://source-node.com/data"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-neon-green/10 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-bold text-neon-green/60 px-1">entity_class</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-black border border-neon-green/30 text-neon-green px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-all"
                >
                  <option value="article">ARTICLE_STREAM</option>
                  <option value="video">VIDEO_VISUAL</option>
                  <option value="pdf">DOC_BINARY</option>
                  <option value="tweet">SOCIAL_FEED</option>
                  <option value="image">STATIC_STATIC</option>
                  <option value="link">WEB_POINTER</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 border border-neon-red/30 text-neon-red text-xs font-bold uppercase hover:bg-neon-red/10 transition-all"
                >
                  [ ABORT ]
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-1 px-4 py-3 bg-neon-green text-black text-xs font-bold uppercase hover:shadow-[0_0_15px_#39ff14] disabled:opacity-50 transition-all"
                >
                  {saveMutation.isPending ? 'EXECUTING...' : '[ INJECT_CORE ]'}
                </button>
              </div>
            </form>

            <div className="mt-8 text-[8px] text-neon-green/20 font-bold uppercase tracking-widest text-center">
              Auth: Authorized_User_Demo | Port: 3001
            </div>
          </div>
        </div>
      )}
    </>
  );
}