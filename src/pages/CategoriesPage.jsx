import { Link } from 'react-router-dom';
import { categories, posts } from '../data/posts';
import { CategoryBadge } from '../components/PostCard';
import Icon from '../components/Icons';

const categoryMeta = {
  technology: {
    emoji: '💻',
    description: 'Artificial intelligence, software, the future of computing, and the people shaping it.',
    gradient: 'from-sky-500/20 to-sky-500/5',
    border: 'border-sky-500/20',
  },
  design: {
    emoji: '🎨',
    description: 'UX, product design, design systems, creative process, and visual culture.',
    gradient: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/20',
  },
  lifestyle: {
    emoji: '🌿',
    description: 'Minimalism, habits, intentional living, and the art of everyday life.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
  },
  travel: {
    emoji: '✈️',
    description: 'Slow travel, hidden destinations, cultural immersion, and travel philosophy.',
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
  },
  food: {
    emoji: '🍜',
    description: 'Cooking, food science, culinary culture, and the stories behind what we eat.',
    gradient: 'from-rose-500/20 to-rose-500/5',
    border: 'border-rose-500/20',
  },
  science: {
    emoji: '🔬',
    description: 'Neuroscience, psychology, emerging research, and the science of being human.',
    gradient: 'from-teal-500/20 to-teal-500/5',
    border: 'border-teal-500/20',
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const posts      = getAllPosts();
  return (
    <main className="hero-gradient min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-100 mb-3">Categories</h1>
          <p className="text-slate-400 text-lg">Browse all topics covered on Porao Blog</p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => {
            const meta = categoryMeta[cat.id] || { emoji: '📌', description: '', gradient: 'from-slate-700/20 to-slate-700/5', border: 'border-slate-700' };
            const count = posts.filter((p) => p.category === cat.id).length;

            return (
              <Link
                key={cat.id}
                to={`/blog?search=${cat.id}`}
                className={`group relative overflow-hidden rounded-2xl border ${meta.border} bg-gradient-to-br ${meta.gradient} p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl`}
              >
                <div className="text-4xl mb-4">{meta.emoji}</div>
                <h2 className="font-serif text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">
                  {cat.label}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{meta.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{count} article{count !== 1 ? 's' : ''}</span>
                  <span className="flex items-center gap-1 text-sky-400 text-xs font-semibold group-hover:gap-2 transition-all">
                    Explore <Icon.ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent per category */}
        {categories.map((cat) => {
          const catPosts = posts.filter((p) => p.category === cat.id);
          if (!catPosts.length) return null;
          return (
            <section key={cat.id} className="mb-14">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{categoryMeta[cat.id]?.emoji}</span>
                  <h2 className="font-serif text-xl font-bold text-slate-100">{cat.label}</h2>
                  <CategoryBadge category={cat.id} />
                </div>
                <Link to={`/blog?category=${cat.id}`} className="flex items-center gap-1 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors">
                  View all <Icon.ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group glass-card rounded-xl overflow-hidden hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-sm font-bold text-slate-100 group-hover:text-sky-400 transition-colors line-clamp-2 mb-1">{post.title}</h3>
                      <span className="text-slate-500 text-xs">{post.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
