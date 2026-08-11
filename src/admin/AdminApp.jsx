import { Outlet, NavLink, Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { isLoggedIn, adminLogout, getUnreadCount } from '../lib/storage';
import { LayoutDashboard, FileText, Tag, MessageSquare, LogOut, PenLine, ExternalLink, Settings as SettingsIcon } from 'lucide-react';
import AdminLogin  from './AdminLogin';
import Dashboard   from './pages/Dashboard';
import Messages    from './pages/Messages';
import PostsList   from './pages/PostsList';
import PostEditor  from './pages/PostEditor';
import Categories  from './pages/Categories';
import Settings    from './pages/Settings';

/* ── Auth guard ── */
function RequireAuth() {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

/* ── Sidebar ── */
function Sidebar() {
  const navigate = useNavigate();
  const unread = getUnreadCount();

  const links = [
    { to: '/admin',            icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/posts',      icon: FileText,        label: 'Posts' },
    { to: '/admin/categories', icon: Tag,             label: 'Categories' },
    { to: '/admin/messages',   icon: MessageSquare,   label: 'Messages', badge: unread },
    { to: '/admin/settings',   icon: SettingsIcon,    label: 'Settings' },
  ];

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col bg-[#0a0f1e] border-r border-slate-800/60 h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/25 flex items-center justify-center">
            <PenLine size={15} className="text-sky-400" />
          </div>
          <div>
            <p className="text-slate-100 text-sm font-bold leading-none">Porao Blog</p>
            <p className="text-slate-500 text-[10px] mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ to, icon: Icon, label, end, badge }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
               ${isActive
                 ? 'bg-sky-500/12 text-sky-400 border border-sky-500/20'
                 : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`
            }>
            <Icon size={16} />
            <span className="flex-1">{label}</span>
            {badge > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold min-w-[18px] text-center">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-800/60 flex flex-col gap-1">
        <a href="/" target="_blank" rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all">
          <ExternalLink size={16} /> View Blog
        </a>
        <button onClick={() => { adminLogout(); navigate('/admin/login'); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition-all w-full text-left">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

/* ── Admin Layout ── */
function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#050a14]">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ── Admin Router ── */
export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index         element={<Dashboard />} />
          <Route path="messages"          element={<Messages />} />
          <Route path="posts"             element={<PostsList />} />
          <Route path="posts/new"         element={<PostEditor />} />
          <Route path="posts/:id/edit"    element={<PostEditor />} />
          <Route path="categories"        element={<Categories />} />
          <Route path="settings"          element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
