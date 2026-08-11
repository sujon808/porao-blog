import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllPosts, getAllCategories, createPost, updatePost, slugify } from '../../lib/storage';
import { authors } from '../../data/posts';
import { Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const EMPTY = {
  title: '', slug: '', excerpt: '', content: '', category: '',
  image: '', tags: '', readTime: '5 min read', featured: false,
  publishedAt: new Date().toISOString().split('T')[0],
  author: authors[0],
};

export default function PostEditor() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const isEdit    = Boolean(id);
  const categories = getAllCategories();

  const [form, setForm]       = useState(EMPTY);
  const [preview, setPreview] = useState(false);
  const [saved, setSaved]     = useState(false);
  const [errors, setErrors]   = useState({});

  // Load post for editing
  useEffect(() => {
    if (isEdit) {
      const post = getAllPosts().find(p => String(p.id) === id);
      if (post) {
        setForm({
          ...post,
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
          author: post.author ?? authors[0],
        });
      }
    }
  }, [id, isEdit]);

  // Auto-generate slug from title (create mode only)
  useEffect(() => {
    if (!isEdit && form.title) {
      setForm(f => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, isEdit]);

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim())   e.title   = 'Title is required';
    if (!form.excerpt.trim()) e.excerpt  = 'Excerpt is required';
    if (!form.content.trim()) e.content  = 'Content is required';
    if (!form.category)       e.category = 'Pick a category';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    if (isEdit) {
      updatePost({ ...data, id: Number(id) || id });
    } else {
      createPost(data);
    }
    setSaved(true);
    setTimeout(() => navigate('/admin/posts'), 800);
  }

  const fieldClass = (err) =>
    `w-full bg-slate-800/60 border rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 outline-none text-sm transition
     ${err ? 'border-red-500/50 focus:border-red-500/60' : 'border-slate-700/50 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10'}`;

  const labelClass = 'block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/posts')}
            className="p-2 rounded-xl hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 transition">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{isEdit ? 'Edit Post' : 'New Post'}</h1>
            <p className="text-slate-500 text-sm mt-0.5">{isEdit ? 'Update your article' : 'Create a new article'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPreview(p => !p)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 text-sm transition">
            {preview ? <EyeOff size={15} /> : <Eye size={15} />}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={handleSubmit}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition shadow-lg
              ${saved ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-sky-500 hover:bg-sky-400 shadow-sky-500/20'}`}>
            <Save size={15} /> {saved ? 'Saved!' : 'Save Post'}
          </button>
        </div>
      </div>

      {preview ? (
        /* ── Preview ── */
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-8">
          {form.image && <img src={form.image} alt="" className="w-full max-h-72 object-cover rounded-xl mb-6 bg-slate-800" />}
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">{form.category}</p>
          <h1 className="font-serif text-3xl font-bold text-slate-100 mb-3">{form.title || 'Untitled'}</h1>
          <p className="text-slate-400 text-base leading-relaxed mb-6">{form.excerpt}</p>
          <div className="prose-blog" dangerouslySetInnerHTML={{ __html: form.content }} />
        </div>
      ) : (
        /* ── Form ── */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-5">
              <div>
                <label className={labelClass}>Title *</label>
                <input value={form.title} onChange={e => set('title', e.target.value)}
                  placeholder="Your article headline…" className={fieldClass(errors.title)} />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className={labelClass}>Slug</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)}
                  placeholder="auto-generated" className={fieldClass()} />
              </div>
              <div>
                <label className={labelClass}>Excerpt *</label>
                <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                  placeholder="Short summary shown on listing pages…" rows={3}
                  className={`${fieldClass(errors.excerpt)} resize-none`} />
                {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt}</p>}
              </div>
              <div>
                <label className={labelClass}>Content (HTML) *</label>
                <textarea value={form.content} onChange={e => set('content', e.target.value)}
                  placeholder={'<h2>Section Title</h2>\n<p>Your paragraph…</p>'} rows={14}
                  className={`${fieldClass(errors.content)} resize-y font-mono text-xs`} />
                {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content}</p>}
                <p className="text-slate-600 text-xs mt-1">Use HTML tags. Switch to Preview to see rendered output.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <label className={labelClass}>Category *</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className={`${fieldClass(errors.category)} cursor-pointer`}>
                  <option value="">Select category…</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className={labelClass}>Author</label>
                <select
                  value={form.author?.id ?? authors[0].id}
                  onChange={e => set('author', authors.find(a => String(a.id) === e.target.value))}
                  className={`${fieldClass()} cursor-pointer`}>
                  {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Published Date</label>
                <input type="date" value={form.publishedAt} onChange={e => set('publishedAt', e.target.value)}
                  className={fieldClass()} />
              </div>
              <div>
                <label className={labelClass}>Read Time</label>
                <input value={form.readTime} onChange={e => set('readTime', e.target.value)}
                  placeholder="5 min read" className={fieldClass()} />
              </div>
              <div className="flex items-center gap-3 pt-1">
                <input type="checkbox" id="featured" checked={form.featured}
                  onChange={e => set('featured', e.target.checked)}
                  className="w-4 h-4 accent-sky-500 cursor-pointer" />
                <label htmlFor="featured" className="text-slate-300 text-sm cursor-pointer">Mark as Featured</label>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <label className={labelClass}>Cover Image URL</label>
                <input value={form.image} onChange={e => set('image', e.target.value)}
                  placeholder="https://images.unsplash.com/…" className={fieldClass()} />
                {form.image && (
                  <img src={form.image} alt="preview" onError={e => e.target.style.display='none'}
                    className="mt-2 w-full h-28 object-cover rounded-lg bg-slate-800" />
                )}
              </div>
              <div>
                <label className={labelClass}>Tags</label>
                <input value={form.tags} onChange={e => set('tags', e.target.value)}
                  placeholder="AI, Design, Tech (comma separated)" className={fieldClass()} />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
