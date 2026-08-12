import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pb_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const register = ({ name, email, phone, password }) => {
    const users = JSON.parse(localStorage.getItem('pb_users') || '[]');
    const exists = users.find((u) => u.email === email || u.phone === phone);
    if (exists) return { error: 'An account with this email or phone already exists.' };

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password, // NOTE: plain text for demo only — never do this in production
      joinedAt: new Date().toISOString(),
      savedPosts: [],
      bio: '',
    };
    users.push(newUser);
    localStorage.setItem('pb_users', JSON.stringify(users));

    const { password: _, ...safeUser } = newUser;
    localStorage.setItem('pb_user', JSON.stringify(safeUser));
    setUser(safeUser);
    return { success: true };
  };

  const login = ({ identifier, password }) => {
    const users = JSON.parse(localStorage.getItem('pb_users') || '[]');
    const found = users.find(
      (u) => (u.email === identifier || u.phone === identifier) && u.password === password
    );
    if (!found) return { error: 'Invalid credentials. Please check your email/phone and password.' };

    const { password: _, ...safeUser } = found;
    localStorage.setItem('pb_user', JSON.stringify(safeUser));
    setUser(safeUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('pb_user');
    setUser(null);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('pb_user', JSON.stringify(updated));

    // Also update in the users array
    const users = JSON.parse(localStorage.getItem('pb_users') || '[]');
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('pb_users', JSON.stringify(users));
    }
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
