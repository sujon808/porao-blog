import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const categoryColors = {
  technology: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  design: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  lifestyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  travel: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  food: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  science: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};

export function CategoryBadge({ category }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryColors[category] || 'bg-slate-700/40 text-slate-400 border-slate-700'}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}

export default function PostCard({ post, featured = false }) {
  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="group block glass-card rounded-2xl overflow-hidden hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/5">
        <div className="relative overflow-hidden h-64">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <CategoryBadge category={post.category} />
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-serif text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
            {post.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <img src={post.author.avatar} alt={post.author.name} className="w-5 h-5 rounded-full bg-slate-700" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="group flex gap-4 p-4 glass-card rounded-xl hover:border-sky-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5">
      <div className="relative overflow-hidden rounded-lg w-24 h-24 flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <CategoryBadge category={post.category} />
        <h3 className="font-serif text-base font-bold text-slate-100 mt-1.5 mb-1 group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}
