import { useState } from 'react';
import { authors } from '../data/posts';
import { posts } from '../data/posts';
import { Link } from 'react-router-dom';
import {
  FileText, Users, Heart, Lightbulb, Globe,
  BookOpen, Coffee, Star, Send, CheckCircle, Mail, MapPin,
  AtSign,
} from 'lucide-react';
import { saveMessage } from '../lib/storage';

/* ─── Timeline ─── */
const timeline = [
  { year: '2022', title: 'The Spark', desc: 'Porao started as a personal notebook — a place to write down thoughts on tech, design, and everyday curiosities from Dhaka.' },
  { year: '2023', title: 'Going Public', desc: 'The blog went live. The first post about Bengali street food and digital culture unexpectedly went viral, attracting readers from 40+ countries.' },
  { year: '2024', title: 'Team Grows', desc: 'Ayasha and Marcus joined as contributors, bringing their expertise in journalism and design to shape the voice of Porao Blog.' },
  { year: '2025', title: 'Community First', desc: 'Launched a newsletter and reader community. Over 5,000 subscribers joined within the first three months.' },
  { year: '2026', title: 'New Chapter', desc: "Porao Blog v2 launches with a fresh design, expanded categories, and a commitment to long-form storytelling rooted in South Asian perspectives." },
];

/* ─── Values ─── */
const values = [
  { icon: Heart, title: 'Deshi at Heart', desc: 'Born in Dhaka, raised by curiosity. We bring a South Asian lens to global conversations — because our perspectives matter.' },
  { icon: BookOpen, title: 'Long-Form Stories', desc: 'We resist clickbait. Every piece is crafted with care, depth, and the patience to explore an idea fully.' },
  { icon: Lightbulb, title: 'Curious by Nature', desc: 'We ask "why?" before "what." Our writers chase understanding, not traffic. Curiosity is our editorial compass.' },
  { icon: Globe, title: 'Globally Minded', desc: 'Rooted locally, thinking globally. We cover ideas that connect Dhaka to the rest of the world and back again.' },
  { icon: Coffee, title: 'Slow & Intentional', desc: 'No daily churn. We publish less and mean more. Quality over quantity, always.' },
  { icon: Star, title: 'Reader-First', desc: 'No ads, no sponsored fluff. Our only loyalty is to the reader — and the truth of a good story.' },
];

/* ─── Contact Form (inline) ─── */
function InlineContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      saveMessage({ ...form, subject: '(About Page)', source: 'About Page' });
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <h3 className="font-serif text-xl font-bold text-slate-100 mb-2">Got your message!</h3>
        <p className="text-slate-400 text-sm mb-4">We'll get back to you within 24–48 hours.</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
          className="text-sky-400 hover:text-sky-300 text-sm underline transition-colors"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="about-name" className="block text-slate-300 text-sm font-medium mb-2">Your Name</label>
          <input
            id="about-name" name="name" type="text" required
            value={form.name} onChange={handleChange}
            placeholder="Rahim / Sarah / Marcus…"
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm"
          />
        </div>
        <div>
          <label htmlFor="about-email" className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
          <input
            id="about-email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="about-message" className="block text-slate-300 text-sm font-medium mb-2">Message</label>
        <textarea
          id="about-message" name="message" rows={5} required
          value={form.message} onChange={handleChange}
          placeholder="Say hello, pitch a story idea, or share feedback…"
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="self-start inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-semibold transition-all shadow-lg shadow-sky-500/20"
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send size={15} />
        )}
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

/* ─── Page ─── */
export default function AboutPage() {
  return (
    <main className="hero-gradient min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-5">
            Made in Dhaka 🇧🇩
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-slate-100 mb-5 leading-tight">
            About <span className="gradient-text">Porao Blog</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A blog born in Dhaka, written for the world. We tell stories that make you pause, think, and feel — about technology, design, culture, food, and the beautiful complexity of everyday life.
          </p>
        </div>

        {/* ── Origin Story ── */}
        <div className="glass-card rounded-3xl p-10 md:p-14 mb-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-500/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-500/8 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">The Origin</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-100 mb-6">
              It Started with a Notebook and a Cup of Tea
            </h2>
            <div className="space-y-4 text-slate-400 text-base leading-relaxed max-w-3xl">
              <p>
                <strong className="text-slate-200">Porao</strong> — the Bengali word for a type of fried rice dish — was chosen deliberately. It's humble, familiar, and deeply local. Just like our editorial philosophy.
              </p>
              <p>
                The blog began as a personal writing practice in a small apartment in Dhaka's Mirpur neighbourhood. The founder, Porao, would write after work — not to go viral, not to monetize, but simply because the ideas wouldn't quiet down.
              </p>
              <p>
                What started as notes on technology and Bangladeshi digital culture grew into something bigger: a publication where curious minds from South Asia and beyond could find long-form, thoughtful content that treats readers as intelligent adults.
              </p>
              <p>
                <em className="text-slate-300 font-medium">
                  "আমরা বিশ্বাস করি যে ভালো গল্পের কোনো ভাষাগত সীমানা নেই।"
                </em>
                <br />
                <span className="text-slate-500 text-sm">We believe good stories have no linguistic borders.</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            { icon: FileText, label: 'Articles Published', value: posts.length + '+' },
            { icon: Users, label: 'Monthly Readers', value: '8K+' },
            { icon: Mail, label: 'Newsletter Subscribers', value: '5K+' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card rounded-2xl p-6 text-center hover:border-sky-500/30 transition-all duration-300">
              <Icon size={22} className="text-sky-400 mx-auto mb-3" />
              <p className="font-serif text-3xl font-bold text-slate-100 mb-1">{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Values ── */}
        <div className="mb-16">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest text-center mb-3">What We Stand For</p>
          <h2 className="font-serif text-3xl font-bold text-slate-100 text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-6 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-sky-400" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-16">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest text-center mb-3">Our Journey</p>
          <h2 className="font-serif text-3xl font-bold text-slate-100 text-center mb-10">How We Got Here</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/40 via-violet-500/30 to-transparent hidden sm:block" />
            <div className="flex flex-col gap-6">
              {timeline.map(({ year, title, desc }, i) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-sm font-bold border"
                      style={{
                        background: `rgba(14,165,233,${0.08 + i * 0.03})`,
                        borderColor: `rgba(14,165,233,${0.15 + i * 0.05})`,
                        color: '#38bdf8',
                      }}
                    >
                      {year}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-5 flex-1 hover:border-sky-500/25 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sky-400 text-xs font-bold sm:hidden">{year}</span>
                      <h3 className="font-semibold text-slate-100">{title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Team ── */}
        <div className="mb-16">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest text-center mb-3">The People</p>
          <h2 className="font-serif text-3xl font-bold text-slate-100 text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div key={author.id} className="glass-card rounded-2xl p-6 text-center hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-20 h-20 rounded-2xl mx-auto mb-4 bg-slate-800 ring-4 ring-sky-500/10"
                />
                <h3 className="font-serif text-lg font-bold text-slate-100 mb-0.5">{author.name}</h3>
                <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">{author.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{author.bio}</p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mb-3">
                  <span><strong className="text-slate-300">{author.articles}</strong> articles</span>
                  <span><strong className="text-slate-300">{author.followers}</strong> followers</span>
                </div>
                <a
                  href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <AtSign size={12} /> {author.twitter}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact Section ── */}
        <div className="glass-card rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-500/6 blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left info */}
            <div className="lg:col-span-2">
              <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">Drop Us a Line</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-100 mb-4 leading-tight">
                We'd Love to Hear from You
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Have a story idea? Want to write for us? Just want to say সালাম? Drop us a message — we read every single one.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Mail, label: 'hello@poraoblog.com', href: 'mailto:hello@poraoblog.com' },
                  { icon: AtSign, label: '@poraoblog', href: 'https://twitter.com' },
                  { icon: MapPin, label: 'Dhaka, Bangladesh 🇧🇩', href: null },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-sky-400" />
                    </div>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-sky-400 transition-colors">
                        {label}
                      </a>
                    ) : (
                      <span className="text-slate-300">{label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Right form */}
            <div className="lg:col-span-3">
              <InlineContactForm />
            </div>
          </div>
        </div>

        {/* ── Write for us CTA ── */}
        <div className="text-center glass-card rounded-3xl p-10">
          <h2 className="font-serif text-2xl font-bold text-slate-100 mb-3">Want to write for Porao Blog?</h2>
          <p className="text-slate-400 mb-6">
            We welcome thoughtful voices from Bangladesh and beyond. Pitch us your idea and let's create something worth reading.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors shadow-lg shadow-sky-500/20"
          >
            <Send size={15} /> Get in touch
          </Link>
        </div>

      </div>
    </main>
  );
}
