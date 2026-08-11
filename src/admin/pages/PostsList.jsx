import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, deletePost } from '../../lib/storage';
import { Plus, Pencil, Trash2, Star, Search, FileText } from 'lucide-react';

export default function PostsList() {
  const [posts, setPosts]   = useState(() => getAllPosts());
  const [query, setQuery]   = useState('');
  const [confirm, setConfirm] = useState(null); // id to confirm delete

  const refresh = useCallback(() => setPosts(getAllPosts()), []);

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  function handleDelete(id) {
    deletePost(id);
    setConfirm(null);
    refresh();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Posts</h1>
          <p className="text-slate-500 text-sm mt-0.5">{posts.length} total articles</p>
        </div>
        <Link to="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20">
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text" placeholder="Search posts…"
          value={query} onChange={e => setQuery(e.target.value)}
          className="w-full max-w-xs bg-slate-900/60 border border-slate-800/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/15 transition"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={36} className="text-slate-700 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">No posts found.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60">
                <th className="text-left px-4 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Author</th>
                <th className="text-left px-4 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr key={post.id} className={`border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={post.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-800 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-slate-200 font-medium text-sm truncate max-w-[200px]">{post.title}</p>
                          {post.featured && <Star size={11} className="text-amber-400 flex-shrink-0" />}
                        </div>
                        <p className="text-slate-600 text-xs">{post.readTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs capitalize">{post.category}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs hidden lg:table-cell">
                    {post.author?.name ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Link to={`/admin/posts/${post.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-sky-400 transition">
                        <Pencil size={14} />
                      </Link>
                      {confirm === post.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(post.id)}
                            className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition">
                            Yes
                          </button>
                          <button onClick={() => setConfirm(null)}
                            className="px-2 py-1 rounded-lg bg-slate-700/50 text-slate-400 text-xs hover:bg-slate-700 transition">
                            No
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirm(post.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
