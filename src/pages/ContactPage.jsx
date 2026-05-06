import { useState } from 'react';
import { Mail, MapPin, Twitter, CheckCircle, Send } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@poraoblog.com', href: 'mailto:hello@poraoblog.com' },
  { icon: Twitter, label: 'Twitter', value: '@poraoblog', href: 'https://twitter.com' },
  { icon: MapPin, label: 'Based in', value: 'Dhaka, Bangladesh', href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="hero-gradient min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-100 mb-3">Get in Touch</h1>
          <p className="text-slate-400 text-lg">Have a story idea, feedback, or just want to say hello? We would love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-slate-100 mb-2">Message Sent!</h2>
                <p className="text-slate-400">Thanks for reaching out. We will get back to you within 24–48 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 text-sky-400 hover:text-sky-300 text-sm underline transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-slate-300 text-sm font-medium mb-2">Subject</label>
                  <input
                    id="subject" name="subject" type="text" required
                    value={form.subject} onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-slate-300 text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message" name="message" rows={6} required
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us more…"
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors shadow-lg shadow-sky-500/20"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <aside className="flex flex-col gap-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="text-slate-200 text-sm font-medium hover:text-sky-400 transition-colors">{value}</a>
                  ) : (
                    <p className="text-slate-200 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="glass-card rounded-2xl p-5 mt-2">
              <h3 className="text-slate-200 font-semibold text-sm mb-2">Response Time</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We aim to respond to all messages within 24–48 hours on business days.</p>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-slate-200 font-semibold text-sm mb-2">Write for Us</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Have a great story to tell? We welcome pitches from writers on all topics we cover.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
