import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdmin() {
      const token = localStorage.getItem('porao_admin_token');
      if (token) {
        try {
          const userData = await api.auth.getMe();
          if (userData.role === 'admin') {
            setAdmin(userData);
          } else {
            localStorage.removeItem('porao_admin_token');
          }
        } catch (error) {
          console.error('Failed to load admin session:', error.message);
          localStorage.removeItem('porao_admin_token');
        }
      }
      setLoading(false);
    }
    loadAdmin();
  }, []);

  const adminLogin = async ({ email, password }) => {
    try {
      const data = await api.auth.login(email, password);
      if (data.user.role !== 'admin') {
        return { error: 'Access denied. You are not an administrator.' };
      }
      localStorage.setItem('porao_admin_token', data.token);
      setAdmin(data.user);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('porao_admin_token');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, adminLogin, adminLogout }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
