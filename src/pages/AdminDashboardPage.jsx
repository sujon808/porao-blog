import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { posts, categories, authors } from '../data/posts';
import Icon from '../components/Icons';

// Get registered users from localStorage
const getRegisteredUsers = () => JSON.parse(localStorage.getItem('pb_users') || '[]');

// Get all submitted contact messages
const getAllMessages = () => JSON.parse(localStorage.getItem('pb_messages') || '[]');

// Theme-based style mapping helper
const getThemeStyles = (theme) => ({
  theme,
  text: theme === 'light' ? 'text-slate-800' : 'text-slate-100',
  subtext: theme === 'light' ? 'text-slate-500' : 'text-slate-400',
  card: theme === 'light' ? 'bg-white border border-slate-200 shadow-sm rounded-2xl p-6' : 'glass-card rounded-2xl p-6',
  cardHeader: theme === 'light' ? 'bg-white border border-slate-200 shadow-sm rounded-2xl p-5' : 'glass-card rounded-2xl p-5',
  cardNav: theme === 'light' ? 'bg-white border border-slate-200 shadow-sm rounded-2xl p-2' : 'glass-card rounded-2xl p-2',
  cardInner: theme === 'light' ? 'bg-slate-50 border border-slate-200' : 'bg-slate-800/40 border-slate-700/40',
  border: theme === 'light' ? 'border-slate-200' : 'border-slate-800/60',
  input: theme === 'light' ? 'bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10' : 'bg-slate-800/60 border-slate-700/50 text-slate-200 placeholder-slate-500 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10',
  tableRowHover: theme === 'light' ? 'hover:bg-slate-50/50' : 'hover:bg-slate-800/20',
  tableHeaderBorder: theme === 'light' ? 'border-b border-slate-200' : 'border-b border-slate-800/60',
  tableRowBorder: theme === 'light' ? 'divide-y divide-slate-150' : 'divide-y divide-slate-800/40',
  pillInactive: theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-slate-200',
  sidebarButtonActive: theme === 'light' ? 'bg-violet-500/10 text-violet-600' : 'bg-violet-500/15 text-violet-400',
  sidebarButtonInactive: theme === 'light' ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60',
  dropdownBg: theme === 'light' ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900 border-slate-800 shadow-2xl',
});

const AdminSidebar = ({ activeTab, setActiveTab, adminLogout, s }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Icon.BarChart2 },
    { id: 'posts', label: 'Posts', icon: Icon.FileText },
    { id: 'users', label: 'Users', icon: Icon.Users },
    { id: 'messages', label: 'Messages', icon: Icon.Mail },
    { id: 'categories', label: 'Categories', icon: Icon.Tag },
    { id: 'settings', label: 'Site Settings', icon: Icon.Settings },
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
      {/* Admin brand */}
      <div className={s.cardHeader} style={{ borderColor: s.theme === 'light' ? undefined : 'rgba(139,92,246,0.25)' }}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Icon.Settings size={18} className="text-white" />
        </div>
        <div className="mt-3 lg:mt-0">
          <p className={`${s.text} font-semibold text-sm`}>Admin Panel</p>
          <p className="text-slate-500 text-xs">Porao Blog</p>
        </div>
      </div>

      {/* Nav */}
      <nav className={s.cardNav}>
        <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {navItems.map(({ id, label, icon: NavIcon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left whitespace-nowrap ${
                activeTab === id ? s.sidebarButtonActive : s.sidebarButtonInactive
              }`}>
              <NavIcon size={16} /> {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer actions */}
      <div className={s.cardNav}>
        <div className="flex flex-row lg:flex-col gap-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-sky-400 hover:bg-sky-500/5 transition-colors w-full">
            <Icon.BookOpen size={16} /> View Site
          </Link>
          <button onClick={() => { adminLogout(); navigate('/admin/login'); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-colors w-full text-left">
            <Icon.LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

// ─── Tab: Overview ───
function OverviewTab({ s }) {
  const users = getRegisteredUsers();
  const msgs = getAllMessages();
  
  const statCards = [
    { label: 'Total Posts', value: posts.length, icon: Icon.FileText, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
    { label: 'Total Messages', value: msgs.length, icon: Icon.Mail, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
    { label: 'Registered Users', value: users.length, icon: Icon.Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Authors', value: authors.length, icon: Icon.Edit, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Ic, color, bg }) => (
          <div key={label} className={s.card}>
            <div className={`w-10 h-10 rounded-xl border ${bg} flex items-center justify-center mb-3`}>
              <Ic size={18} className={color} />
            </div>
            <p className={`font-bold text-3xl ${s.text}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className={s.card}>
        <h2 className={`font-semibold ${s.text} mb-4`}>Recent Posts</h2>
        <div className="flex flex-col divide-y divide-slate-800/30">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center gap-4 py-3">
              <img src={post.image} alt={post.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className={`${s.text} text-sm font-medium line-clamp-1`}>{post.title}</p>
                <p className="text-slate-500 text-xs">{post.author.name} · {post.readTime}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                post.featured ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-700/40 text-slate-400 border-slate-700'
              }`}>
                {post.featured ? 'Featured' : 'Published'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Registrations & Messages previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={s.card}>
          <h2 className={`font-semibold ${s.text} mb-4`}>Recent User Registrations</h2>
          {users.length === 0 ? (
            <p className="text-slate-500 text-sm">No users registered yet.</p>
          ) : (
            <div className="flex flex-col divide-y divide-slate-800/30">
              {users.slice(-3).reverse().map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`${s.text} text-sm font-medium`}>{u.name}</p>
                    <p className="text-slate-500 text-xs">{u.email}</p>
                  </div>
                  <span className="text-slate-400 text-xs">{new Date(u.joinedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={s.card}>
          <h2 className={`font-semibold ${s.text} mb-4`}>Recent Contact Messages</h2>
          {msgs.length === 0 ? (
            <p className="text-slate-500 text-sm">No contact messages received.</p>
          ) : (
            <div className="flex flex-col divide-y divide-slate-800/30">
              {msgs.slice(-3).reverse().map((m) => (
                <div key={m.id} className="py-3">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p className={`${s.text} text-sm font-semibold truncate`}>{m.subject}</p>
                    <span className="text-slate-500 text-xs flex-shrink-0">{new Date(m.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-400 text-xs truncate">From: {m.name} ({m.email})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Posts ───
function PostsTab({ s }) {
  const [search, setSearch] = useState('');
  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={s.card}>
      <div className="flex items-center justify-between mb-5">
        <h2 className={`font-semibold ${s.text}`}>All Posts ({posts.length})</h2>
        <div className="relative">
          <Icon.Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts…"
            className={`${s.input} rounded-xl pl-8 pr-4 py-2 text-sm outline-none transition w-48`} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={s.tableHeaderBorder}>
              <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Title</th>
              <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Category</th>
              <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Author</th>
              <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Date</th>
              <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className={s.tableRowBorder}>
            {filtered.map((post) => (
              <tr key={post.id} className={`${s.tableRowHover}`}>
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <img src={post.image} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <Link to={`/blog/${post.slug}`} target="_blank"
                        className={`${s.text} hover:text-violet-500 transition-colors font-medium line-clamp-1`}>{post.title}</Link>
                      <p className="text-slate-500 text-xs">{post.readTime}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 pr-4">
                  <span className={`capitalize text-xs px-2.5 py-1 rounded-full border ${s.theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800/60 border-slate-700/40 text-slate-400'}`}>{post.category}</span>
                </td>
                <td className="py-3.5 pr-4 text-slate-500 text-xs">{post.author.name}</td>
                <td className="py-3.5 pr-4 text-slate-400 text-xs">{new Date(post.publishedAt).toLocaleDateString()}</td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    post.featured ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {post.featured ? '⭐ Featured' : '✓ Published'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Users ───
function UsersTab({ s }) {
  const [users, setUsers] = useState(getRegisteredUsers());

  const deleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    localStorage.setItem('pb_users', JSON.stringify(updated));
    setUsers(updated);
  };

  return (
    <div className={s.card}>
      <div className="flex items-center justify-between mb-5">
        <h2 className={`font-semibold ${s.text}`}>Registered Users ({users.length})</h2>
      </div>
      {users.length === 0 ? (
        <div className="text-center py-12">
          <Icon.Users size={40} className="text-slate-500 mx-auto mb-3" />
          <p className="text-slate-500">No users registered yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={s.tableHeaderBorder}>
                <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">User</th>
                <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Phone</th>
                <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Joined</th>
                <th className="text-left text-slate-500 text-xs uppercase tracking-wider pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className={s.tableRowBorder}>
              {users.map((user) => (
                <tr key={user.id} className={s.tableRowHover}>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`${s.text} font-medium`}>{user.name}</p>
                        <p className="text-slate-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500 text-xs">{user.phone || '—'}</td>
                  <td className="py-3.5 pr-4 text-slate-400 text-xs">{new Date(user.joinedAt).toLocaleDateString()}</td>
                  <td className="py-3.5">
                    <button onClick={() => deleteUser(user.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-medium transition-colors">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Messages ───
function MessagesTab({ s }) {
  const [msgs, setMsgs] = useState(getAllMessages());

  const deleteMsg = (id) => {
    const updated = msgs.filter((m) => m.id !== id);
    localStorage.setItem('pb_messages', JSON.stringify(updated));
    setMsgs(updated);
  };

  return (
    <div className={s.card}>
      <h2 className={`font-semibold ${s.text} mb-5`}>Received Messages ({msgs.length})</h2>
      {msgs.length === 0 ? (
        <div className="text-center py-12">
          <Icon.Mail size={40} className="text-slate-500 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No contact messages received yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {msgs.map((m) => (
            <div key={m.id} className={`p-5 rounded-xl ${s.cardInner} flex flex-col md:flex-row gap-4 justify-between items-start`}>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">Message</span>
                  <span className="text-slate-500 text-xs">{new Date(m.submittedAt).toLocaleString()}</span>
                </div>
                <h3 className={`${s.text} font-semibold text-base mb-1`}>{m.subject}</h3>
                <p className={`${s.theme === 'light' ? 'text-slate-600' : 'text-slate-400'} text-sm whitespace-pre-wrap leading-relaxed mb-3`}>{m.message}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className={`font-medium ${s.theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>{m.name}</span>
                  <span>·</span>
                  <a href={`mailto:${m.email}`} className="text-sky-500 hover:underline">{m.email}</a>
                  {m.userId && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-500 flex items-center gap-1"><Icon.CheckCircle size={12} /> Registered User</span>
                    </>
                  )}
                </div>
              </div>
              <button onClick={() => deleteMsg(m.id)}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-semibold transition-colors flex-shrink-0">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Categories ───
function CategoriesTab({ s }) {
  return (
    <div className={s.card}>
      <h2 className={`font-semibold ${s.text} mb-5`}>Categories ({categories.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const count = posts.filter((p) => p.category === cat.id).length;
          return (
            <div key={cat.id} className={`flex items-center justify-between p-4 rounded-xl ${s.cardInner}`}>
              <div>
                <p className={`${s.text} font-medium capitalize`}>{cat.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{count} article{count !== 1 ? 's' : ''}</p>
              </div>
              <span className={`text-2xl font-black ${s.theme === 'light' ? 'text-slate-300' : 'text-slate-750'}`}>{String(count).padStart(2, '0')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Settings ───
function SettingsTab({ s }) {
  const [siteName, setSiteName] = useState('Porao Blog');
  const [tagline, setTagline] = useState('Stories, ideas, and perspectives that matter.');
  const [saved, setSaved] = useState(false);

  return (
    <div className={s.card}>
      <h2 className={`font-semibold ${s.text} mb-5`}>Site Settings</h2>
      {saved && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl px-4 py-3 text-sm mb-4">
          <Icon.CheckCircle size={16} /> Settings saved!
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <label className={`block ${s.theme === 'light' ? 'text-slate-700' : 'text-slate-300'} text-sm font-medium mb-1.5`}>Site Name</label>
          <input value={siteName} onChange={(e) => setSiteName(e.target.value)}
            className={`${s.input} w-full rounded-xl px-4 py-3 text-sm outline-none transition`} />
        </div>
        <div>
          <label className={`block ${s.theme === 'light' ? 'text-slate-700' : 'text-slate-300'} text-sm font-medium mb-1.5`}>Tagline</label>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)}
            className={`${s.input} w-full rounded-xl px-4 py-3 text-sm outline-none transition`} />
        </div>
        <div>
          <label className={`block ${s.theme === 'light' ? 'text-slate-700' : 'text-slate-300'} text-sm font-medium mb-1.5`}>Admin Password</label>
          <input defaultValue="admin@123" type="password"
            className="w-full bg-slate-800/10 border border-slate-700/20 rounded-xl px-4 py-3 text-slate-500 outline-none text-sm cursor-not-allowed" disabled />
          <p className="text-slate-500 text-xs mt-1">Password changes require backend integration.</p>
        </div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className="self-start px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-500/20">
          Save Settings
        </button>
      </div>
    </div>
  );
}

// ─── Main AdminDashboard ───
export default function AdminDashboardPage() {
  const { admin, adminLogout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Theme Switcher State
  const [theme, setTheme] = useState(() => localStorage.getItem('pb_admin_theme') || 'dark');

  // To-Do list state
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('pb_admin_todos') || '[]'));
  const [todoInput, setTodoInput] = useState('');
  const [showTodoDropdown, setShowTodoDropdown] = useState(false);

  if (!admin) return <Navigate to="/admin/login" replace />;

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pb_admin_theme', next);
    setTheme(next);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    const newTodo = { id: Date.now(), text: todoInput.trim(), completed: false };
    const updated = [...todos, newTodo];
    setTodos(updated);
    localStorage.setItem('pb_admin_todos', JSON.stringify(updated));
    setTodoInput('');
  };

  const toggleTodo = (id) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos(updated);
    localStorage.setItem('pb_admin_todos', JSON.stringify(updated));
  };

  const deleteTodo = (id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    localStorage.setItem('pb_admin_todos', JSON.stringify(updated));
  };

  // Get current styles based on theme
  const s = getThemeStyles(theme);

  const tabComponents = {
    overview: <OverviewTab s={s} />,
    posts: <PostsTab s={s} />,
    users: <UsersTab s={s} />,
    messages: <MessagesTab s={s} />,
    categories: <CategoriesTab s={s} />,
    settings: <SettingsTab s={s} />,
  };

  const pendingTodosCount = todos.filter(t => !t.completed).length;

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${theme === 'light' ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-100'}`}
      style={{
        background: theme === 'light'
          ? 'radial-gradient(ellipse at 20% 10%, rgba(139,92,246,0.04) 0%, transparent 50%), #f8fafc'
          : 'radial-gradient(ellipse at 20% 10%, rgba(139,92,246,0.07) 0%, transparent 50%), #0f172a'
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className={`flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b ${s.border}`}>
          <div>
            <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">Signed in as <strong className="text-violet-500">{admin.username}</strong></p>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Dark/Light mode switcher */}
            <button onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-colors ${
                theme === 'light' ? 'border-slate-200 hover:bg-slate-100 text-slate-500' : 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-violet-400'
              }`}
              title="Toggle Theme">
              {theme === 'dark' ? <Icon.Sun size={18} /> : <Icon.Moon size={18} />}
            </button>

            {/* Admin tasks (To-Do List) Dropdown */}
            <div className="relative">
              <button onClick={() => setShowTodoDropdown(!showTodoDropdown)}
                className={`p-2.5 rounded-xl border transition-colors relative ${
                  theme === 'light' ? 'border-slate-200 hover:bg-slate-100 text-slate-500' : 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-violet-400'
                }`}
                title="Admin To-Do List">
                <Icon.CheckCircle size={18} />
                {pendingTodosCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                    {pendingTodosCount}
                  </span>
                )}
              </button>

              {/* To-Do Overlay Dropdown */}
              {showTodoDropdown && (
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl border p-5 z-50 ${s.dropdownBg}`}>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className={`font-semibold text-sm ${s.text}`}>Admin Tasks</h3>
                    <span className="text-[10px] uppercase font-bold text-violet-500 tracking-wider">
                      {pendingTodosCount} pending
                    </span>
                  </div>

                  {/* Tasks List */}
                  <div className="max-h-48 overflow-y-auto mb-3 flex flex-col gap-2 pr-1">
                    {todos.length === 0 ? (
                      <p className="text-slate-400 text-xs py-6 text-center">No tasks on your plate.</p>
                    ) : (
                      todos.map((todo) => (
                        <div key={todo.id} className={`flex items-center justify-between gap-2 p-2 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-slate-800/40 border-slate-700/30'
                        }`}>
                          <label className="flex items-center gap-2 flex-1 cursor-pointer min-w-0">
                            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}
                              className="rounded border-slate-300 text-violet-600 focus:ring-violet-500/20 w-4 h-4" />
                            <span className={`text-xs truncate ${
                              todo.completed ? 'line-through text-slate-400' : s.text
                            }`}>{todo.text}</span>
                          </label>
                          <button onClick={() => deleteTodo(todo.id)} className="text-slate-400 hover:text-rose-500 p-1 transition-colors">
                            <Icon.Trash size={12} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Form */}
                  <form onSubmit={addTodo} className="flex gap-2">
                    <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} placeholder="Add new task..."
                      className={`flex-1 rounded-xl px-3 py-2 text-xs outline-none transition ${s.input}`} />
                    <button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-3 py-2 text-xs font-semibold shadow-md transition-colors whitespace-nowrap">
                      Add
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Role Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Admin
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} adminLogout={adminLogout} s={s} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {tabComponents[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
}
