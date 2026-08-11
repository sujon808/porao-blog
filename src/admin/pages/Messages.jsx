import { useState, useCallback } from 'react';
import { getMessages, deleteMessage, markMessageRead } from '../../lib/storage';
import { Mail, Trash2, CheckCircle, ChevronRight, Inbox } from 'lucide-react';

export default function Messages() {
  const [msgs, setMsgs]       = useState(() => getMessages());
  const [selected, setSelected] = useState(null);

  const refresh = useCallback(() => setMsgs(getMessages()), []);

  function open(msg) {
    markMessageRead(msg.id);
    setSelected({ ...msg, read: true });
    refresh();
  }

  function remove(id) {
    deleteMessage(id);
    if (selected?.id === id) setSelected(null);
    refresh();
  }

  const unread = msgs.filter(m => !m.read).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-100">Messages</h1>
          {unread > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-sky-500 text-white text-xs font-bold">{unread} unread</span>
          )}
        </div>
        <p className="text-slate-500 text-sm mt-0.5">Contact form submissions from readers</p>
      </div>

      {msgs.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-16 text-center">
          <Inbox size={40} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">No messages yet</p>
          <p className="text-slate-600 text-sm mt-1">When readers fill the contact form, messages will appear here.</p>
        </div>
      ) : (
        <div className="flex gap-4 h-[calc(100vh-10rem)]">
          {/* List */}
          <div className="w-80 flex-shrink-0 bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-800/60">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{msgs.length} total</p>
            </div>
            <div className="overflow-y-auto flex-1">
              {msgs.map(m => (
                <button key={m.id} onClick={() => open(m)}
                  className={`w-full text-left px-4 py-3.5 border-b border-slate-800/40 transition-colors flex gap-3 items-start
                    ${selected?.id === m.id ? 'bg-sky-500/10 border-l-2 border-l-sky-500' : 'hover:bg-slate-800/40'}
                  `}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${m.read ? 'bg-slate-800' : 'bg-sky-500/15 border border-sky-500/25'}`}>
                    <Mail size={14} className={m.read ? 'text-slate-500' : 'text-sky-400'} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className={`text-xs font-semibold truncate ${m.read ? 'text-slate-300' : 'text-slate-100'}`}>{m.name}</p>
                      {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />}
                    </div>
                    <p className="text-slate-500 text-xs truncate">{m.subject || '(no subject)'}</p>
                    <p className="text-slate-600 text-[10px] mt-1">
                      {new Date(m.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-slate-700 flex-shrink-0 mt-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="flex-1 bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col">
            {selected ? (
              <>
                <div className="px-6 py-4 border-b border-slate-800/60 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 text-xs">Read</span>
                    </div>
                    <h2 className="text-slate-100 font-semibold text-base">{selected.subject || '(no subject)'}</h2>
                  </div>
                  <button onClick={() => remove(selected.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-xs font-medium flex-shrink-0">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
                <div className="px-6 py-4 border-b border-slate-800/40 grid grid-cols-2 gap-4">
                  {[
                    { label: 'From', value: selected.name },
                    { label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                    { label: 'Date', value: new Date(selected.date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) },
                    { label: 'Source', value: selected.source || 'Contact Page' },
                  ].map(({ label, value, href }) => (
                    <div key={label}>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      {href
                        ? <a href={href} className="text-sky-400 text-sm hover:underline">{value}</a>
                        : <p className="text-slate-200 text-sm">{value}</p>}
                    </div>
                  ))}
                </div>
                <div className="px-6 py-5 flex-1 overflow-y-auto">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Message</p>
                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail size={36} className="text-slate-700 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
