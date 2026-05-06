import { authors } from '../data/posts';
import { posts } from '../data/posts';
import { Link } from 'react-router-dom';
import { FileText, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="hero-gradient min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-slate-100 mb-4">
            About <span className="gradient-text">Porao Blog</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We are a small team of writers, thinkers, and makers who believe that good ideas deserve beautiful writing. Porao Blog is our home for long-form stories that make you think.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card rounded-3xl p-10 md:p-14 mb-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-500/8 blur-3xl pointer-events-none" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-100 mb-4">Our Mission</h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            The internet moves fast. We do not. Porao Blog exists to slow things down — to explore ideas thoroughly, to write with care, and to give readers something worth their attention. We cover technology, design, science, travel, food, and lifestyle through the lens of curiosity and craft.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            { icon: FileText, label: 'Articles Published', value: posts.length + '+' },
            { icon: Users, label: 'Monthly Readers', value: '8K+' },
            { icon: Users, label: 'Newsletter Subscribers', value: '5K+' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card rounded-2xl p-6 text-center">
              <Icon size={22} className="text-sky-400 mx-auto mb-3" />
              <p className="font-serif text-3xl font-bold text-slate-100 mb-1">{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-16">
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
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                  <span><strong className="text-slate-300">{author.articles}</strong> articles</span>
                  <span><strong className="text-slate-300">{author.followers}</strong> followers</span>
                </div>
                <a
                  href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <Twitter size={12} /> {author.twitter}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-card rounded-3xl p-10">
          <h2 className="font-serif text-2xl font-bold text-slate-100 mb-3">Want to write for us?</h2>
          <p className="text-slate-400 mb-6">We are always looking for thoughtful voices. Pitch us your idea.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors shadow-lg shadow-sky-500/20"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
