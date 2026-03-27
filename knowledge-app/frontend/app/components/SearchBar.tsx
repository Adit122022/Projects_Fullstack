'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2, Filter, Calendar, Tag, FileType } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

interface SearchFilters {
    type?: string;
    tags?: string[];
    dateFrom?: string;
    dateTo?: string;
}

export function SearchBar() {
    const [query, setQuery] = useState('');
    const API_URL = '/api';
    const [isOpen, setIsOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [filters, setFilters] = useState<SearchFilters>({});
    const searchRef = useRef<HTMLDivElement>(null);

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    // Click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowFilters(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search query
    const { data, isLoading } = useQuery({
        queryKey: ['search', debouncedQuery, filters],
        queryFn: async () => {
            if (!debouncedQuery.trim()) return { items: [] };

            const response = await axios.get(`${API_URL}/search`, {
                params: {
                    q: debouncedQuery,
                    ...filters
                }
            });
            return response.data;
        },
        enabled: debouncedQuery.length > 2
    });

    const handleClear = () => {
        setQuery('');
        setDebouncedQuery('');
        setFilters({});
        setIsOpen(false);
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl font-mono">
            {/* Search Input */}
            <div className="relative flex gap-2">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-green/50 group-focus-within:text-neon-green" />

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="[SYSTEM_QUERY] >_"
                        className="w-full pl-10 pr-10 py-2.5 bg-black/80 border border-neon-green/30 text-neon-green placeholder:text-neon-green/30 rounded-none focus:outline-none focus:border-neon-green focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all"
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {isLoading && query ? (
                            <Loader2 className="w-4 h-4 text-neon-green animate-spin" />
                        ) : query ? (
                            <button onClick={handleClear} className="text-neon-green/50 hover:text-neon-red transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2.5 border transition-all relative ${
                        showFilters 
                        ? 'bg-neon-green text-black border-neon-green shadow-[0_0_10px_#39ff14]' 
                        : 'border-neon-green/30 text-neon-green hover:border-neon-green/60 hover:bg-neon-green/5'
                    }`}
                >
                    <Filter className="w-4 h-4" />
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-red text-white text-[10px] flex items-center justify-center border border-black animate-pulse">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-black border border-neon-green p-6 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center gap-2 mb-4 border-b border-neon-green/20 pb-2">
                         <div className="w-2 h-2 bg-neon-green rounded-full" />
                         <span className="text-xs font-bold uppercase tracking-widest">Filter_Parameters</span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Type Filter */}
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-neon-green/60 mb-2">
                                <FileType className="w-3 h-3 inline mr-1" />
                                resource_type
                            </label>
                            <select
                                value={filters.type || ''}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
                                className="w-full bg-black border border-neon-green/30 text-neon-green px-3 py-2 text-xs focus:outline-none focus:border-neon-green"
                            >
                                <option value="" className="bg-black text-neon-green/50">ALL_TYPES</option>
                                <option value="article" className="bg-black text-neon-green">ARTICLE</option>
                                <option value="video" className="bg-black text-neon-green">VIDEO</option>
                                <option value="pdf" className="bg-black text-neon-green">PDF</option>
                                <option value="tweet" className="bg-black text-neon-green">TWEET</option>
                                <option value="image" className="bg-black text-neon-green">IMAGE</option>
                                <option value="link" className="bg-black text-neon-green">LINK</option>
                            </select>
                        </div>

                        {/* Date From */}
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-neon-green/60 mb-2">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                timestamp_start
                            </label>
                            <input
                                type="date"
                                value={filters.dateFrom || ''}
                                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
                                className="w-full bg-black border border-neon-green/30 text-neon-green px-3 py-2 text-xs focus:outline-none focus:border-neon-green [color-scheme:dark]"
                            />
                        </div>

                        {/* Date To */}
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-neon-green/60 mb-2">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                timestamp_end
                            </label>
                            <input
                                type="date"
                                value={filters.dateTo || ''}
                                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
                                className="w-full bg-black border border-neon-green/30 text-neon-green px-3 py-2 text-xs focus:outline-none focus:border-neon-green [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neon-green/10">
                        <button
                            onClick={() => setFilters({})}
                            className="px-4 py-1.5 text-[10px] font-bold text-neon-red hover:bg-neon-red/10 border border-transparent hover:border-neon-red transition-all"
                        >
                            [ RESET_ALL ]
                        </button>
                        <button
                            onClick={() => setShowFilters(false)}
                            className="px-4 py-1.5 text-[10px] font-bold bg-neon-green text-black hover:shadow-[0_0_10px_#39ff14] transition-all"
                        >
                            [ APPLY_EXEC ]
                        </button>
                    </div>
                </div>
            )}

            {/* Search Results Dropdown */}
            {isOpen && query.length > 0 && !showFilters && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-black border border-neon-green/40 shadow-[0_15px_40px_rgba(0,0,0,0.9)] max-h-[500px] overflow-y-auto z-50 divide-y divide-neon-green/10">
                    <div className="bg-neon-green/5 px-4 py-1.5 border-b border-neon-green/20">
                         <span className="text-[10px] font-bold tracking-[0.2em] opacity-60">SRCH_RSLTS // {data?.items.length || 0} FOUND</span>
                    </div>

                    {debouncedQuery.length < 3 ? (
                        <div className="p-8 text-center text-neon-green/40 text-xs italic animate-pulse">
                            AWAITING_INPUT_MIN_3_CHARS...
                        </div>
                    ) : isLoading ? (
                        <div className="p-12 text-center">
                            <Loader2 className="w-6 h-6 text-neon-green animate-spin mx-auto" />
                            <p className="text-[10px] font-bold mt-4 tracking-widest animate-pulse font-mono">RETRIEVING_DATA_FROM_GRID...</p>
                        </div>
                    ) : data?.items.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-3xl mb-4 opacity-50">⚠️</div>
                            <p className="text-neon-red font-bold uppercase tracking-widest text-xs">Error: No_Matches_Found</p>
                            <p className="text-[10px] text-neon-green/40 mt-2">Check syntax and retry query</p>
                        </div>
                    ) : (
                        <div>
                            {data?.items.map((item: any) => (
                                <button
                                    key={item._id}
                                    onClick={() => window.open(item.url, '_blank')}
                                    className="w-full p-4 hover:bg-neon-green/[0.03] text-left transition-all group flex gap-4"
                                >
                                    <div className="w-20 h-20 flex-shrink-0 bg-black border border-neon-green/20 relative group-hover:border-neon-green/60 transition-colors overflow-hidden">
                                        {item.metadata?.thumbnail ? (
                                            <img
                                                src={item.metadata.thumbnail}
                                                alt=""
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale transition-all"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xl grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0">
                                                {item.type === 'article' ? '📄' :
                                                    item.type === 'video' ? '🎥' :
                                                        item.type === 'pdf' ? '📕' : '🔗'}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-neon-green/5 pointer-events-none" />
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 bg-neon-green rounded-full opacity-40 group-hover:opacity-100 animate-pulse" />
                                            <h4 className="font-bold text-neon-green group-hover:text-neon-green text-sm truncate uppercase tracking-tight">
                                                {item.title}
                                            </h4>
                                        </div>
                                        
                                        <p className="text-[10px] text-neon-green/40 truncate font-mono mb-2">
                                            SRC_LOC: {item.metadata?.domain || item.url}
                                        </p>
                                        
                                        <div className="flex gap-4 items-center mt-1">
                                            <span className="text-[9px] px-2 py-0.5 border border-neon-green/20 text-neon-green/60 uppercase">
                                                {item.type}
                                            </span>
                                            <span className="text-[9px] text-neon-green/30 uppercase tracking-widest">
                                                ID: {item._id.substring(0, 8)} | {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="text-neon-green font-bold text-xl">»</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}