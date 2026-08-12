import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('porao_token');
      if (token) {
        try {
          const userData = await api.auth.getMe();
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user session:', error.message);
          localStorage.removeItem('porao_token');
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const register = async ({ name, email, password }) => {
    try {
      const data = await api.auth.register(name, email, password);
      localStorage.setItem('porao_token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('porao_token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('porao_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
