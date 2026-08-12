import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import Icon from '../components/Icons';

export default function AdminLoginPage() {
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = adminLogin(form);
      setLoading(false);
      if (result.error) return setError(result.error);
      navigate('/admin/dashboard');
    }, 700);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(139,92,246,0.15) 0%, transparent 60%), #0f172a' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Icon.Settings size={18} className="text-white" />
          </div>
          <span className="font-serif font-bold text-2xl text-slate-100">
            Porao<span className="text-violet-400">Admin</span>
          </span>
        </Link>

        <div className="glass-card rounded-3xl p-8" style={{ borderColor: 'rgba(139,92,246,0.15)' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4">
              <Icon.Lock size={28} className="text-violet-400" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-slate-100 mb-1">Admin Access</h1>
            <p className="text-slate-400 text-sm">Restricted area — authorized personnel only</p>
          </div>

          {/* Hint */}
          <div className="flex items-start gap-2 bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-3 mb-5 text-xs text-slate-400">
            <Icon.AlertCircle size={14} className="text-slate-500 flex-shrink-0 mt-0.5" />
            <span>Demo credentials — Username: <strong className="text-slate-200">admin</strong> · Password: <strong className="text-slate-200">admin@123</strong></span>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl px-4 py-3 mb-5 text-sm">
              <Icon.AlertCircle size={16} className="flex-shrink-0 mt-0.5" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-slate-300 text-sm font-medium mb-1.5">Username</label>
              <div className="relative">
                <Icon.User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input id="username" name="username" type="text" required
                  value={form.username} onChange={handleChange} placeholder="Admin username"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="adminpw" className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Icon.Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input id="adminpw" name="password" type={showPw ? 'text' : 'password'} required
                  value={form.password} onChange={handleChange} placeholder="Admin password"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-10 pr-10 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition text-sm" />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPw ? <Icon.EyeOff size={16} /> : <Icon.Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors shadow-lg shadow-violet-500/20 text-sm mt-1">
              {loading ? 'Authenticating…' : 'Sign In as Admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
              <Icon.ArrowLeft size={13} /> Back to site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
