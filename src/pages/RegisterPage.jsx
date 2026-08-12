import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icons';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');

    setLoading(true);
    setTimeout(() => {
      const result = register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      setLoading(false);
      if (result.error) return setError(result.error);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <main className="hero-gradient min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center shadow-lg">
            <Icon.Feather size={18} className="text-white" />
          </div>
          <span className="font-serif font-bold text-2xl text-slate-100">Porao<span className="text-sky-400">Blog</span></span>
        </Link>

        <div className="glass-card rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-slate-100 mb-1">Create an account</h1>
            <p className="text-slate-400 text-sm">Join thousands of curious readers</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl px-4 py-3 mb-5 text-sm">
              <Icon.AlertCircle size={16} className="flex-shrink-0 mt-0.5" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-slate-300 text-sm font-medium mb-1.5">Full Name</label>
              <div className="relative">
                <Icon.User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your full name"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-1.5">Email Address</label>
              <div className="relative">
                <Icon.Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-slate-300 text-sm font-medium mb-1.5">Phone Number</label>
              <div className="relative">
                <Icon.Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+880 17XX XXX XXX"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Icon.Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input id="password" name="password" type={showPw ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder="Min. 6 characters"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-10 pr-10 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm" />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPw ? <Icon.EyeOff size={16} /> : <Icon.Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label htmlFor="confirm" className="block text-slate-300 text-sm font-medium mb-1.5">Confirm Password</label>
              <div className="relative">
                <Icon.Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input id="confirm" name="confirm" type={showPw ? 'text' : 'password'} required value={form.confirm} onChange={handleChange} placeholder="Repeat your password"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors shadow-lg shadow-sky-500/20 text-sm mt-1">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
