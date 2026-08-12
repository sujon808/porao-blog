import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, User, LogOut, Menu, X, Search, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useCart } from '../context/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { admin, adminLogout } = useAdminAuth();
  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md group-hover:bg-indigo-600 transition-colors duration-300">
              <span className="text-white font-extrabold text-lg tracking-wider">প</span>
            </div>
            <span className="font-sans font-bold text-2xl text-slate-900 tracking-tight">
              Porao<span className="text-indigo-600 font-extrabold font-serif">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {/* If admin is logged in, show shortcut to admin dashboard */}
            {admin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all duration-300"
              >
                <Shield size={14} />
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Action Menu */}
          <div className="flex items-center gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2.5 rounded-full text-slate-600 hover:bg-slate-50 transition-colors"
              title="Search Catalog"
            >
              <Search size={20} />
            </button>

            {/* Shopping Cart Trigger */}
            <Link
              to="/cart"
              className="p-2.5 rounded-full text-slate-600 hover:bg-slate-50 transition-colors relative flex items-center justify-center"
              title="View Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 flex items-center justify-center px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block text-slate-800 text-xs font-bold">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                    >
                      My Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={14} /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : admin ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                    <Shield size={14} />
                  </div>
                  <span className="hidden lg:block text-emerald-800 text-xs font-bold">Admin</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        adminLogout();
                        setDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={14} /> Admin Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-sm font-semibold transition-colors shadow-md hover:shadow-lg shadow-indigo-600/10"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Inline Search Panel */}
        {searchOpen && (
          <div className="pb-4 pt-1 animate-fadeIn border-t border-slate-50">
            <form onSubmit={handleSearch} className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for today? (e.g. Panjabi, Polo Shirt, Sharee)..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500/50 transition-all duration-300"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-inner animate-slideDown">
          <nav className="flex flex-col px-4 py-4 gap-1.5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {admin && (
              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
              >
                <Shield size={14} />
                Admin Dashboard
              </Link>
            )}

            {/* Mobile Actions */}
            <div className="border-t border-slate-50 mt-3 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-4 py-2 bg-slate-50 rounded-xl mb-1 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl bg-slate-50 text-slate-700 text-sm font-semibold text-center"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate('/');
                    }}
                    className="px-4 py-3 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold text-center flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </>
              ) : admin ? (
                <>
                  <button
                    onClick={() => {
                      adminLogout();
                      setMenuOpen(false);
                      navigate('/');
                    }}
                    className="px-4 py-3 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold text-center flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} /> Admin Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-800 text-sm font-semibold text-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold text-center shadow-md shadow-indigo-600/5"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
