import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminApp from './admin/AdminApp';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin — no Navbar/Footer */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public */}
        <Route path="/*" element={
          <PublicLayout>
            <Routes>
              <Route path="/"             element={<HomePage />} />
              <Route path="/blog"         element={<BlogPage />} />
              <Route path="/blog/:slug"   element={<PostDetailPage />} />
              <Route path="/categories"   element={<CategoriesPage />} />
              <Route path="/about"        element={<AboutPage />} />
              <Route path="/contact"      element={<ContactPage />} />
              <Route path="/privacy"      element={<PrivacyPage />} />
              <Route path="/terms"        element={<TermsPage />} />
              <Route path="*"             element={<NotFoundPage />} />
            </Routes>
          </PublicLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
