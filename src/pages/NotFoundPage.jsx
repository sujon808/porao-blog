import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="hero-gradient min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-serif text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-violet-500 leading-none mb-4 select-none">
          404
        </p>
        <h1 className="font-serif text-3xl font-bold text-slate-100 mb-3">Page not found</h1>
        <p className="text-slate-400 max-w-sm mx-auto mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors shadow-lg shadow-sky-500/20"
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card hover:border-sky-500/30 text-slate-300 hover:text-sky-400 font-semibold transition-all"
          >
            <ArrowLeft size={16} /> Browse Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
