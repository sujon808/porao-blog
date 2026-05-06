import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  if (compact) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-serif text-lg font-bold text-slate-100 mb-1">Stay in the loop</h3>
        <p className="text-slate-400 text-sm mb-4">Get new articles delivered to your inbox.</p>
        {submitted ? (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle size={16} /> <span>You're subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 transition"
            />
            <button type="submit" className="w-full px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20">
              Subscribe
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-slate-900 to-violet-500/10 p-10 md:p-16 text-center">
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/30 mb-6">
          <Mail size={24} className="text-sky-400" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 mb-3">
          Never miss a story
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg">
          Join over 5,000 curious readers getting thoughtful articles every week.
        </p>
        {submitted ? (
          <div className="inline-flex items-center gap-2 text-emerald-400 text-lg font-semibold">
            <CheckCircle size={22} /> <span>You're subscribed — welcome aboard!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-slate-800/80 border border-slate-700/50 rounded-xl px-5 py-3.5 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition"
            />
            <button type="submit" className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors shadow-xl shadow-sky-500/20 whitespace-nowrap">
              Subscribe Free
            </button>
          </form>
        )}
        <p className="text-slate-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
