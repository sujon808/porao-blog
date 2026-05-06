import { Link } from 'react-router-dom';
import { Feather, Twitter, Github, Rss } from 'lucide-react';

const footerLinks = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: 'Categories', to: '/categories' },
    { label: 'Authors', to: '/about' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Use', to: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center shadow-lg">
                <Feather size={18} className="text-white" />
              </div>
              <span className="font-serif font-bold text-2xl text-slate-100">
                Porao<span className="text-sky-400">Blog</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Stories, ideas, and perspectives that matter. Curated writing on technology, design, lifestyle, and the things that make us think.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800/60 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-colors border border-slate-700/40">
                <Twitter size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800/60 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors border border-slate-700/40">
                <Github size={16} />
              </a>
              <a href="/rss.xml" className="p-2.5 rounded-xl bg-slate-800/60 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors border border-slate-700/40">
                <Rss size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-slate-200 font-semibold text-sm uppercase tracking-wider mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Porao Blog. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Made with ♥ for curious minds</p>
        </div>
      </div>
    </footer>
  );
}
