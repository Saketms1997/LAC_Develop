import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import AboutPage from './pages/About';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ProductForm from './pages/admin/ProductForm';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import EnquiriesAdmin from './pages/admin/EnquiriesAdmin';
import FloatingStones from './components/FloatingStones';
import './index.css';

function App() {
  return (
    <Router>
      <FloatingStones />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="enquiries" element={<EnquiriesAdmin />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-marble-white flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-stone-900 mb-4">404</h1>
        <p className="text-2xl font-semibold text-stone-600 mb-6">Page Not Found</p>
        <p className="text-stone-600 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary inline-block">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default App;
