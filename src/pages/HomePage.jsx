import { Link } from 'react-router-dom';
import { posts, getFeaturedPosts } from '../data/posts';
import PostCard from '../components/PostCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { CategoryBadge } from '../components/PostCard';
import Icon from '../components/Icons';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const heroPrimary = featuredPosts[0];
  const heroSecondary = featuredPosts.slice(1, 3);
  const recentPosts = posts.slice(0, 4);
  const trendingPosts = posts.slice(2, 5);

  return (
    <main className="hero-gradient min-h-screen">
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
            <Icon.Sparkles size={14} /> <span>Ideas worth reading</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-100 leading-tight mb-4">
            Porao <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
            Stories, ideas, and perspectives on technology, design, travel, and everything in between.
          </p>
        </div>

        {heroPrimary && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <Link to={`/blog/${heroPrimary.slug}`}
              className="lg:col-span-3 group glass-card rounded-3xl overflow-hidden hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/10">
              <div className="relative h-72 lg:h-96 overflow-hidden">
                <img src={heroPrimary.image} alt={heroPrimary.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <CategoryBadge category={heroPrimary.category} />
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mt-3 mb-2 leading-tight group-hover:text-sky-300 transition-colors">{heroPrimary.title}</h2>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-4 max-w-lg">{heroPrimary.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <img src={heroPrimary.author.avatar} alt={heroPrimary.author.name} className="w-6 h-6 rounded-full bg-slate-700" />
                    <span>{heroPrimary.author.name}</span>
                    <span>·</span>
                    <span>{heroPrimary.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="lg:col-span-2 flex flex-col gap-5">
              {heroSecondary.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}
                  className="group glass-card rounded-2xl overflow-hidden flex-1 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/5">
                  <div className="relative h-36 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute top-3 left-3"><CategoryBadge category={post.category} /></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-slate-100 group-hover:text-sky-400 transition-colors leading-snug mb-2">{post.title}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-slate-100">Recent Articles</h2>
              <Link to="/blog" className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors">
                View all <Icon.ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentPosts.map((post) => <PostCard key={post.id} post={post} featured />)}
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon.TrendingUp size={18} className="text-sky-400" />
                <h3 className="font-semibold text-slate-100">Trending Now</h3>
              </div>
              <div className="flex flex-col gap-4">
                {trendingPosts.map((post, i) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group flex items-start gap-3">
                    <span className="text-3xl font-black text-slate-800 group-hover:text-sky-500/30 transition-colors leading-none mt-0.5 select-none w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-slate-200 text-sm font-medium group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">{post.title}</p>
                      <span className="text-slate-500 text-xs">{post.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <NewsletterSignup compact />
          </aside>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <NewsletterSignup />
      </section>
    </main>
  );
}
