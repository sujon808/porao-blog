import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from './Icons';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/blog?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Icon.Feather size={16} className="text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-slate-100 tracking-tight">
              Porao<span className="text-sky-400">Blog</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sky-400 bg-sky-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
            >
              <Icon.Search size={18} />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/40 text-slate-200 text-sm font-medium transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl glass-card border border-slate-700/50 shadow-2xl py-1 z-50">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-sky-400 hover:bg-sky-500/5 transition-colors">Dashboard</Link>
                    <button onClick={() => { logout(); setDropdownOpen(false); navigate('/'); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-colors flex items-center gap-2">
                      <Icon.LogOut size={14} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 rounded-lg text-slate-300 hover:text-slate-100 text-sm font-medium transition-colors">
                  Sign in
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20">
                  Get Started
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <Icon.X size={20} /> : <Icon.Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Icon.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 transition"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="mt-2 px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium text-center">Dashboard</Link>
                <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} className="mt-1 px-4 py-2.5 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-medium">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-2 px-4 py-2.5 rounded-lg bg-slate-800/60 text-slate-300 text-sm font-medium text-center">Sign in</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="mt-1 px-4 py-2.5 rounded-lg bg-sky-500 text-white text-sm font-semibold text-center">Get Started</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
