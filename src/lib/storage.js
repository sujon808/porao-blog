/* ─── Keys ─── */
const K = {
  posts:      'porao_posts',
  categories: 'porao_categories',
  messages:   'porao_messages',
  auth:       'porao_admin_auth',
  pin:        'porao_admin_pin',
};
const DEFAULT_PIN = '1234';

function read(key)        { try { return JSON.parse(localStorage.getItem(key)) ?? null; } catch { return null; } }
function write(key, val)  { localStorage.setItem(key, JSON.stringify(val)); }

/* ─── Init (call once at app start) ─── */
export function initStorage(staticPosts, staticCategories) {
  if (!read(K.posts))      write(K.posts, staticPosts);
  if (!read(K.categories)) write(K.categories, staticCategories);
}

/* ─── Slug helper ─── */
export function slugify(title) {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
}

/* ═══ AUTH ═══ */
export function isLoggedIn()  { return sessionStorage.getItem(K.auth) === 'true'; }
export function adminLogin(pin) {
  if (pin === (localStorage.getItem(K.pin) || DEFAULT_PIN)) {
    sessionStorage.setItem(K.auth, 'true'); return true;
  }
  return false;
}
export function adminLogout() { sessionStorage.removeItem(K.auth); }
export function changeAdminPin(oldPin, newPin) {
  const currentPin = localStorage.getItem(K.pin) || DEFAULT_PIN;
  if (oldPin === currentPin) {
    localStorage.setItem(K.pin, newPin);
    return true;
  }
  return false;
}

/* ═══ POSTS ═══ */
export function getAllPosts()            { return read(K.posts) ?? []; }
export function getPostBySlug(slug)      { return getAllPosts().find(p => p.slug === slug) ?? null; }
export function getFeaturedPosts()       { return getAllPosts().filter(p => p.featured); }
export function getPostsByCategory(id)   { return getAllPosts().filter(p => p.category === id); }
export function getRelatedPosts(current, limit = 3) {
  return getAllPosts().filter(p => p.id !== current.id && p.category === current.category).slice(0, limit);
}

export function createPost(data) {
  const post = {
    ...data,
    id: Date.now(),
    slug: data.slug || slugify(data.title),
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    tags: typeof data.tags === 'string' ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : (data.tags ?? []),
  };
  write(K.posts, [post, ...getAllPosts()]);
  return post;
}

export function updatePost(updated) {
  write(K.posts, getAllPosts().map(p => p.id === updated.id ? updated : p));
}

export function deletePost(id) {
  write(K.posts, getAllPosts().filter(p => p.id !== id));
}

/* ═══ CATEGORIES ═══ */
export function getAllCategories() { return read(K.categories) ?? []; }

export function createCategory(label) {
  const cat = { id: slugify(label), label };
  write(K.categories, [...getAllCategories(), cat]);
  return cat;
}

export function deleteCategory(id) {
  write(K.categories, getAllCategories().filter(c => c.id !== id));
}

/* ═══ MESSAGES ═══ */
export function getMessages()     { return read(K.messages) ?? []; }
export function getUnreadCount()  { return getMessages().filter(m => !m.read).length; }

export function saveMessage(data) {
  const msg = { ...data, id: Date.now(), date: new Date().toISOString(), read: false };
  write(K.messages, [msg, ...getMessages()]);
  return msg;
}

export function markMessageRead(id) {
  write(K.messages, getMessages().map(m => m.id === id ? { ...m, read: true } : m));
}

export function deleteMessage(id) {
  write(K.messages, getMessages().filter(m => m.id !== id));
}
