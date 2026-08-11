import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminLogin } from '../lib/storage';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [pin, setPin]       = useState('');
  const [error, setError]   = useState('');
  const [show, setShow]     = useState(false);
  const [shake, setShake]   = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  function handleSubmit(e) {
    e.preventDefault();
    if (adminLogin(pin)) {
      navigate(from, { replace: true });
    } else {
      setError('Wrong PIN. Try again.');
      setShake(true);
      setPin('');
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a14] px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 60%), #050a14' }}>
      <div className={`w-full max-w-sm ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-sky-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-100">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-1">Enter your PIN to continue</p>
        </div>

        <form onSubmit={handleSubmit}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 flex flex-col gap-5 backdrop-blur-xl shadow-2xl shadow-black/40">
          <div>
            <label htmlFor="pin" className="block text-slate-400 text-sm font-medium mb-2">PIN</label>
            <div className="relative">
              <input
                id="pin" type={show ? 'text' : 'password'} required autoFocus
                value={pin} onChange={e => { setPin(e.target.value); setError(''); }}
                placeholder="••••"
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 pr-11 text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-lg tracking-[0.3em]"
              />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>
          <button type="submit"
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors shadow-lg shadow-sky-500/20">
            Enter Dashboard
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          Porao Blog Admin · Restricted Access
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)}
        }
      `}</style>
    </div>
  );
}
