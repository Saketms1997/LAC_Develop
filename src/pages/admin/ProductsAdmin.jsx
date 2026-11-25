import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Star, TrendingUp, ExternalLink } from 'lucide-react';
import { useProducts, useCategories, deleteProduct, updateProductFlags } from '../../services/store';

const ProductsAdmin = () => {
  const products = useProducts();
  const categories = useCategories();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!term || p.name.toLowerCase().includes(term) || (p.subcategory || '').toLowerCase().includes(term))
    );
  }, [products, search, category]);

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      deleteProduct(product.id);
    }
  };

  const flagButton = (product, flag, Icon, label) => (
    <button
      onClick={() => updateProductFlags(product.id, { [flag]: !product[flag] })}
      title={`${product[flag] ? 'Remove from' : 'Mark as'} ${label}`}
      aria-pressed={!!product[flag]}
      className={`p-2 rounded-lg cursor-pointer transition-colors ${
        product[flag] ? 'bg-yellow-100 text-yellow-700' : 'bg-stone-100 text-stone-400 hover:text-stone-700'
      }`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Products</h1>
          <p className="text-stone-500">{products.length} products · star = homepage featured, chart = bestseller</p>
        </div>
        <Link to="/admin/products/new" className="btn-accent flex items-center gap-2 text-sm">
          <Plus size={16} /> Add product
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-stone-300 rounded-lg px-3 py-2.5 bg-white"
        >
          <option value="all">All categories</option>
          {Object.entries(categories).map(([key, cat]) => (
            <option key={key} value={key}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-stone-500 py-12">No products match your search.</p>
        ) : (
          <ul className="divide-y divide-stone-100">
            {filtered.map((product) => (
              <li key={product.id} className="flex items-center gap-4 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-stone-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 truncate">{product.name}</p>
                  <p className="text-sm text-stone-500 truncate">
                    {categories[product.category]?.name || product.category}
                    {product.subcategory ? ` / ${product.subcategory}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {flagButton(product, 'featured', Star, 'featured')}
                  {flagButton(product, 'bestseller', TrendingUp, 'bestseller')}
                  <a
                    href={`/product/${product.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on website"
                    className="p-2 rounded-lg bg-stone-100 text-stone-500 hover:text-stone-900"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <Link
                    to={`/admin/products/${product.id}`}
                    title="Edit"
                    className="p-2 rounded-lg bg-stone-100 text-stone-500 hover:text-stone-900"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(product)}
                    title="Delete"
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
