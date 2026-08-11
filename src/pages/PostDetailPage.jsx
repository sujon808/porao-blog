import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../lib/storage';
import { CategoryBadge } from '../components/PostCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { Clock, Calendar, ArrowLeft, Link2, Tag } from 'lucide-react';
import PostCard from '../components/PostCard';

export default function PostDetailPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main className="hero-gradient min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm font-medium mb-8 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Article */}
          <article className="lg:col-span-3">
            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden h-64 md:h-96 mb-8">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <CategoryBadge category={post.category} />
              <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                <Calendar size={13} />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                <Clock size={13} />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-800/60">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full bg-slate-800 ring-2 ring-sky-500/20" />
              <div>
                <Link to="/about" className="text-slate-100 font-semibold hover:text-sky-400 transition-colors">{post.author.name}</Link>
                <p className="text-slate-500 text-sm">{post.author.role}</p>
              </div>
              {/* Share */}
              <div className="ml-auto flex items-center gap-2">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-colors border border-slate-700/40">
                  {/* <Twitter size={15} /> */}
                </a>
                <button onClick={handleCopyLink} className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors border border-slate-700/40">
                  <Link2 size={15} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-slate-800/60">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-slate-500" />
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/40 text-slate-400 text-xs font-medium hover:text-sky-400 hover:border-sky-500/30 cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author bio card */}
            <div className="mt-10 glass-card rounded-2xl p-6 flex flex-col sm:flex-row gap-5">
              <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-2xl bg-slate-800 flex-shrink-0" />
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Written by</p>
                <h3 className="font-semibold text-slate-100 text-lg">{post.author.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{post.author.bio}</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <NewsletterSignup compact />

            {related.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-slate-100 mb-4">Related Articles</h3>
                <div className="flex flex-col gap-3">
                  {related.map((rp) => (
                    <PostCard key={rp.id} post={rp} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* More articles */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-bold text-slate-100 mb-6">More to Read</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <PostCard key={rp.id} post={rp} featured />
              ))}
            </div>
          </section>
        )}

        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </div>
    </main>
  );
}
