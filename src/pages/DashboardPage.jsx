import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { posts } from '../data/posts';
import Icon from '../components/Icons';

const stats = (user) => {
  const allMessages = JSON.parse(localStorage.getItem('pb_messages') || '[]');
  const userMsgCount = allMessages.filter(m => m.userId === user?.id || m.email === user?.email).length;
  return [
    { label: 'Articles Read', value: '12', icon: Icon.BookOpen, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
    { label: 'Saved Posts', value: String(user?.savedPosts?.length || 0), icon: Icon.Heart, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { label: 'Days Active', value: Math.max(1, Math.floor((Date.now() - new Date(user?.joinedAt || Date.now())) / 86400000) + 1).toString(), icon: Icon.BarChart2, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
    { label: 'Messages Sent', value: String(userMsgCount), icon: Icon.Mail, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];
};

const recentPosts = posts.slice(0, 3);

const navItems = [
  { id: 'overview', label: 'Overview', icon: Icon.BarChart2 },
  { id: 'saved', label: 'Saved Posts', icon: Icon.Heart },
  { id: 'messages', label: 'My Messages', icon: Icon.Mail },
  { id: 'profile', label: 'My Profile', icon: Icon.User },
  { id: 'settings', label: 'Settings', icon: Icon.Settings },
];

export default function DashboardPage() {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [saved, setSaved] = useState(false);

  if (!user) return <Navigate to="/login" state={{ from: '/dashboard' }} replace />;

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <main className="hero-gradient min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-100">
              Hey, {user.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">Here's what's happening on your account</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-slate-300 hover:text-sky-400 hover:border-sky-500/30 text-sm font-medium transition-all">
              <Icon.BookOpen size={15} /> Browse Blog
            </Link>
            <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 hover:border-rose-500/20 text-sm font-medium transition-all">
              <Icon.LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-4">
            {/* User card */}
            <div className="glass-card rounded-2xl p-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white text-2xl font-black mx-auto mb-3 shadow-lg shadow-sky-500/20">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-semibold text-slate-100 text-base">{user.name}</h3>
              <p className="text-slate-500 text-xs mt-0.5">{user.email}</p>
              {user.phone && <p className="text-slate-600 text-xs">{user.phone}</p>}
              {user.bio && <p className="text-slate-400 text-xs mt-2 leading-relaxed">{user.bio}</p>}
            </div>

            {/* Nav */}
            <nav className="glass-card rounded-2xl p-2 flex flex-col gap-1">
              {navItems.map(({ id, label, icon: NavIcon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left ${
                    activeTab === id ? 'bg-sky-500/15 text-sky-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <NavIcon size={16} /> {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats(user).map(({ label, value, icon: StatIcon, color, bg }) => (
                <div key={label} className="glass-card rounded-2xl p-5">
                  <div className={`w-9 h-9 rounded-xl border ${bg} flex items-center justify-center mb-3`}>
                    <StatIcon size={17} className={color} />
                  </div>
                  <p className="font-bold text-2xl text-slate-100">{value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-5">
                {/* Recent articles */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-slate-100">Recent Articles</h2>
                    <Link to="/blog" className="text-sky-400 hover:text-sky-300 text-xs transition-colors flex items-center gap-1">
                      View all <Icon.ArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-3">
                    {recentPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/40 transition-colors">
                        <img src={post.image} alt={post.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-200 text-sm font-medium group-hover:text-sky-400 transition-colors line-clamp-1">{post.title}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{post.readTime} · {post.category}</p>
                        </div>
                        <Icon.ArrowRight size={14} className="text-slate-600 group-hover:text-sky-400 transition-colors flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Welcome card */}
                <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-slate-900 to-violet-500/10 p-6">
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-sky-500/10 blur-3xl" />
                  <h3 className="font-serif text-xl font-bold text-slate-100 mb-2">Start exploring</h3>
                  <p className="text-slate-400 text-sm mb-4">Discover stories on technology, design, science, travel, food, and more.</p>
                  <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20">
                    Browse Articles <Icon.ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="glass-card rounded-2xl p-8 text-center">
                <Icon.Heart size={40} className="text-slate-700 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-slate-300 mb-2">No saved posts yet</h3>
                <p className="text-slate-500 text-sm mb-5">Browse articles and save the ones you love to read later.</p>
                <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors">
                  Browse Articles
                </Link>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold text-slate-100 mb-5">My Sent Messages</h2>
                {(() => {
                  const allMessages = JSON.parse(localStorage.getItem('pb_messages') || '[]');
                  const userMessages = allMessages.filter(m => m.userId === user.id || m.email === user.email);
                  if (userMessages.length === 0) {
                    return (
                      <div className="text-center py-10">
                        <Icon.Mail size={36} className="text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">You haven't sent any messages yet.</p>
                        <Link to="/contact" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-colors">
                          Send a Message
                        </Link>
                      </div>
                    );
                  }
                  return (
                    <div className="flex flex-col gap-4">
                      {userMessages.map((msg) => (
                        <div key={msg.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="text-slate-200 font-semibold text-sm">{msg.subject}</h3>
                            <span className="text-slate-500 text-xs">{new Date(msg.submittedAt).toLocaleString()}</span>
                          </div>
                          <p className="text-slate-400 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold text-slate-100 mb-5">Edit Profile</h2>
                {saved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl px-4 py-3 mb-4 text-sm">
                    <Icon.CheckCircle size={16} /> Profile updated successfully!
                  </div>
                )}
                <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Full Name</label>
                    <input value={profileForm.name} onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Email</label>
                    <input value={user.email} disabled
                      className="w-full bg-slate-800/30 border border-slate-700/30 rounded-xl px-4 py-3 text-slate-500 outline-none text-sm cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Phone</label>
                    <input value={user.phone || ''} disabled
                      className="w-full bg-slate-800/30 border border-slate-700/30 rounded-xl px-4 py-3 text-slate-500 outline-none text-sm cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Bio <span className="text-slate-600">(optional)</span></label>
                    <textarea value={profileForm.bio} onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))} rows={3} placeholder="Tell us a bit about yourself…"
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 transition text-sm resize-none" />
                  </div>
                  <button type="submit" className="self-start px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
                <h2 className="font-semibold text-slate-100">Account Settings</h2>
                <div className="border border-slate-800/60 rounded-xl divide-y divide-slate-800/60">
                  {[
                    { label: 'Email Notifications', sub: 'Receive new article digests', defaultOn: true },
                    { label: 'Newsletter', sub: 'Weekly curated picks', defaultOn: true },
                    { label: 'Browser Notifications', sub: 'Get notified in browser', defaultOn: false },
                  ].map(({ label, sub, defaultOn }) => (
                    <ToggleRow key={label} label={label} sub={sub} defaultOn={defaultOn} />
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-800/60">
                  <h3 className="text-slate-300 font-medium text-sm mb-3">Danger Zone</h3>
                  <button className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ToggleRow({ label, sub, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div>
        <p className="text-slate-200 text-sm font-medium">{label}</p>
        <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-sky-500' : 'bg-slate-700'}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}
