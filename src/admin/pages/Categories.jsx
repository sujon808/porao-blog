import { useState, useCallback } from 'react';
import { getAllCategories, createCategory, deleteCategory } from '../../lib/storage';
import { Plus, Trash2, Tag } from 'lucide-react';

export default function Categories() {
  const [cats, setCats]     = useState(() => getAllCategories());
  const [label, setLabel]   = useState('');
  const [error, setError]   = useState('');
  const [confirm, setConfirm] = useState(null);

  const refresh = useCallback(() => setCats(getAllCategories()), []);

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = label.trim();
    if (!trimmed) { setError('Category name is required'); return; }
    if (cats.some(c => c.label.toLowerCase() === trimmed.toLowerCase())) {
      setError('Category already exists'); return;
    }
    createCategory(trimmed);
    setLabel('');
    setError('');
    refresh();
  }

  function handleDelete(id) {
    deleteCategory(id);
    setConfirm(null);
    refresh();
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Categories</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage blog categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add form */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6">
          <h2 className="text-slate-200 font-semibold text-sm mb-4">Add Category</h2>
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <div>
              <label htmlFor="cat-label" className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input id="cat-label" type="text" value={label}
                onChange={e => { setLabel(e.target.value); setError(''); }}
                placeholder="e.g. Photography"
                className={`w-full bg-slate-800/60 border rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 outline-none text-sm transition
                  ${error ? 'border-red-500/50' : 'border-slate-700/50 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10'}`}
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>
            <button type="submit"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition shadow-lg shadow-sky-500/20">
              <Plus size={15} /> Add Category
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-800/60">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{cats.length} categories</p>
          </div>
          {cats.length === 0 ? (
            <div className="p-10 text-center">
              <Tag size={32} className="text-slate-700 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">No categories yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/40">
              {cats.map(cat => (
                <div key={cat.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/30 transition group">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                    <Tag size={14} className="text-sky-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium text-sm">{cat.label}</p>
                    <p className="text-slate-600 text-xs mt-0.5">ID: <code className="text-slate-500">{cat.id}</code></p>
                  </div>
                  {confirm === cat.id ? (
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => handleDelete(cat.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs font-medium hover:bg-red-500/25 transition">
                        Confirm Delete
                      </button>
                      <button onClick={() => setConfirm(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-400 text-xs font-medium hover:bg-slate-700 transition">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirm(cat.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition opacity-0 group-hover:opacity-100">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
