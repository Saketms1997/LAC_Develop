import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Star, TrendingUp, Tags, Inbox, Plus, Download, Upload, RotateCcw } from 'lucide-react';
import {
  useProducts,
  useCategories,
  useEnquiries,
  replaceProducts,
  resetProducts,
  resetCategories,
  saveCategories,
} from '../../services/store';

const StatCard = ({ icon: Icon, label, value, to }) => (
  <Link to={to} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
    <div className="w-12 h-12 rounded-lg bg-stone-800 text-yellow-500 flex items-center justify-center">
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-stone-900">{value}</p>
      <p className="text-sm text-stone-500">{label}</p>
    </div>
  </Link>
);

const download = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const Dashboard = () => {
  const products = useProducts();
  const categories = useCategories();
  const enquiries = useEnquiries();
  const fileRef = useRef(null);
  const [message, setMessage] = useState(null);

  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;

  const handleImport = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const importedProducts = Array.isArray(data) ? data : data.products;
      if (!Array.isArray(importedProducts) || importedProducts.some((p) => !p.id || !p.name || !p.category)) {
        throw new Error('File must contain products with id, name and category.');
      }
      replaceProducts(importedProducts);
      if (data.categories && typeof data.categories === 'object') saveCategories(data.categories);
      setMessage({ type: 'success', text: `Imported ${importedProducts.length} products.` });
    } catch (err) {
      setMessage({ type: 'error', text: `Import failed: ${err.message}` });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all products and categories to the original sample data? Your changes will be lost.')) {
      resetProducts();
      resetCategories();
      setMessage({ type: 'success', text: 'Catalogue reset to sample data.' });
    }
  };

  return (
    <div className="max-w-6xl">
      <h1 className="font-serif text-3xl font-bold text-stone-900 mb-1">Dashboard</h1>
      <p className="text-stone-500 mb-8">Manage your catalogue, homepage and customer enquiries.</p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="Products" value={products.length} to="/admin/products" />
        <StatCard icon={Star} label="Featured on homepage" value={products.filter((p) => p.featured).length} to="/admin/products" />
        <StatCard icon={TrendingUp} label="Bestsellers" value={products.filter((p) => p.bestseller).length} to="/admin/products" />
        <StatCard icon={Tags} label="Categories" value={Object.keys(categories).length} to="/admin/categories" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-stone-900 flex items-center gap-2">
              <Inbox size={18} /> Recent enquiries
              {newEnquiries > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{newEnquiries} new</span>}
            </h2>
            <Link to="/admin/enquiries" className="text-sm text-yellow-700 hover:underline">View all</Link>
          </div>
          {enquiries.length === 0 ? (
            <p className="text-stone-500 text-sm py-6 text-center">No enquiries yet. Submissions from the Contact page appear here.</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {enquiries.slice(0, 5).map((enq) => (
                <li key={enq.id} className="py-3 flex justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-stone-900 truncate">{enq.name}</p>
                    <p className="text-sm text-stone-500 truncate">{enq.message}</p>
                  </div>
                  <span className="text-xs text-stone-400 whitespace-nowrap">{new Date(enq.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          <h2 className="font-semibold text-lg text-stone-900 mb-2">Quick actions</h2>
          <Link to="/admin/products/new" className="btn-accent w-full flex items-center justify-center gap-2 text-sm">
            <Plus size={16} /> Add product
          </Link>
          <button
            onClick={() => download('products-backup.json', { products, categories })}
            className="w-full flex items-center justify-center gap-2 border border-stone-300 rounded-lg px-4 py-2.5 text-sm hover:bg-stone-50 cursor-pointer"
          >
            <Download size={16} /> Export catalogue (JSON)
          </button>
          <button
            onClick={() => fileRef.current.click()}
            className="w-full flex items-center justify-center gap-2 border border-stone-300 rounded-lg px-4 py-2.5 text-sm hover:bg-stone-50 cursor-pointer"
          >
            <Upload size={16} /> Import catalogue (JSON)
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 text-red-600 border border-red-200 rounded-lg px-4 py-2.5 text-sm hover:bg-red-50 cursor-pointer"
          >
            <RotateCcw size={16} /> Reset to sample data
          </button>
          {message && (
            <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-700'}`}>{message.text}</p>
          )}
          <p className="text-xs text-stone-400 pt-2">
            Changes are saved in this browser only. Export a backup regularly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
