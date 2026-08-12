import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { posts, categories } from '../data/posts';
import PostCard from '../components/PostCard';
import Icon from '../components/Icons';

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => posts.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const q = query.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  }), [query, activeCategory]);

  return (
    <main className="hero-gradient min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-100 mb-2">All Articles</h1>
          <p className="text-slate-400">Explore {posts.length} stories across all topics</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Icon.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…"
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 transition" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Icon.SlidersHorizontal size={14} className="text-slate-500 flex-shrink-0" />
            <button onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${activeCategory === 'all' ? 'bg-sky-500 border-sky-500 text-white' : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-slate-200'}`}>
              All
            </button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${activeCategory === cat.id ? 'bg-sky-500 border-sky-500 text-white' : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-slate-200'}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No articles found.</p>
            <button onClick={() => { setQuery(''); setActiveCategory('all'); }} className="mt-4 text-sky-400 hover:text-sky-300 text-sm underline">Clear filters</button>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-6">{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => <PostCard key={post.id} post={post} featured />)}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
