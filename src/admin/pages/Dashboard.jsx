import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getAllCategories, getMessages } from '../../lib/storage';
import { FileText, Tag, MessageSquare, Mail, Star, Plus, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const posts      = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const messages   = useMemo(() => getMessages(), []);
  const unread     = messages.filter(m => !m.read).length;
  const featured   = posts.filter(p => p.featured).length;
  const recent     = messages.slice(0, 5);

  const stats = [
    { icon: FileText,      label: 'Total Posts',      value: posts.length,      color: 'sky',     to: '/admin/posts' },
    { icon: Star,          label: 'Featured Posts',   value: featured,          color: 'violet',  to: '/admin/posts' },
    { icon: Tag,           label: 'Categories',       value: categories.length, color: 'emerald', to: '/admin/categories' },
    { icon: MessageSquare, label: 'Messages',         value: messages.length,   color: 'amber',   to: '/admin/messages' },
  ];

  const colorMap = {
    sky:     { bg: 'bg-sky-500/10',     border: 'border-sky-500/20',     text: 'text-sky-400'     },
    violet:  { bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  text: 'text-violet-400'  },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400'   },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back to Porao Blog Admin</p>
        </div>
        <Link to="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20">
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color, to }) => {
          const c = colorMap[color];
          return (
            <Link key={label} to={to}
              className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700 transition-all hover:-translate-y-0.5">
              <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-3`}>
                <Icon size={18} className={c.text} />
              </div>
              <p className="text-2xl font-bold text-slate-100">{value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-slate-100 font-semibold text-sm">Recent Messages</h2>
              {unread > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold">{unread} new</span>
              )}
            </div>
            <Link to="/admin/messages" className="text-sky-400 text-xs hover:text-sky-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">No messages yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recent.map(m => (
                <Link key={m.id} to="/admin/messages"
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${m.read ? 'hover:bg-slate-800/40' : 'bg-sky-500/5 border border-sky-500/15 hover:bg-sky-500/8'}`}>
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={13} className="text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-slate-200 text-xs font-semibold truncate">{m.name}</p>
                      {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />}
                    </div>
                    <p className="text-slate-500 text-xs truncate">{m.subject || m.message?.slice(0, 40)}</p>
                  </div>
                  <p className="text-slate-600 text-[10px] flex-shrink-0 mt-0.5">
                    {new Date(m.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Posts */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-100 font-semibold text-sm">Recent Posts</h2>
            <Link to="/admin/posts" className="text-sky-400 text-xs hover:text-sky-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {posts.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">No posts yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {posts.slice(0, 5).map(p => (
                <Link key={p.id} to={`/admin/posts/${p.id}/edit`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-800 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-slate-200 text-xs font-semibold truncate">{p.title}</p>
                    <p className="text-slate-500 text-xs">{p.category} · {p.readTime}</p>
                  </div>
                  {p.featured && <Star size={12} className="text-amber-400 flex-shrink-0" />}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
