import { createContext, useContext, useState, useEffect } from 'react';

// Default admin credentials (hardcoded for frontend-only template)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin@123',
};

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('pb_admin');
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  const adminLogin = ({ username, password }) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser = { username, role: 'admin', loginAt: new Date().toISOString() };
      localStorage.setItem('pb_admin', JSON.stringify(adminUser));
      setAdmin(adminUser);
      return { success: true };
    }
    return { error: 'Invalid admin credentials.' };
  };

  const adminLogout = () => {
    localStorage.removeItem('pb_admin');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
