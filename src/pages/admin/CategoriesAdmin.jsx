import React, { useState } from 'react';
import { Plus, Trash2, Save, RotateCcw } from 'lucide-react';
import { useCategories, useProducts, saveCategories, resetCategories } from '../../services/store';
import { slugify } from '../../utils/helpers';

const inputCls =
  'w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600';

const toDraft = (categories) =>
  Object.fromEntries(
    Object.entries(categories).map(([key, cat]) => [key, { ...cat, subcategoriesText: (cat.subcategories || []).join('\n') }])
  );

const CategoriesAdmin = () => {
  const categories = useCategories();
  const products = useProducts();
  const [draft, setDraft] = useState(() => toDraft(categories));
  const [newName, setNewName] = useState('');
  const [status, setStatus] = useState(null);

  const update = (key, patch) => {
    setDraft((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
    setStatus(null);
  };

  const addCategory = () => {
    const name = newName.trim();
    const key = slugify(name);
    if (!name) return;
    if (draft[key]) {
      setStatus({ type: 'error', text: 'A category with this name already exists.' });
      return;
    }
    setDraft((prev) => ({ ...prev, [key]: { name, description: '', subcategories: [], subcategoriesText: '' } }));
    setNewName('');
    setStatus(null);
  };

  const removeCategory = (key) => {
    const used = products.filter((p) => p.category === key).length;
    if (used > 0) {
      setStatus({ type: 'error', text: `Cannot delete "${draft[key].name}": ${used} product(s) still use it.` });
      return;
    }
    setDraft((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setStatus(null);
  };

  const handleSave = () => {
    const emptyName = Object.values(draft).some((cat) => !cat.name.trim());
    if (emptyName) {
      setStatus({ type: 'error', text: 'Every category needs a name.' });
      return;
    }
    const result = Object.fromEntries(
      Object.entries(draft).map(([key, { subcategoriesText, ...cat }]) => [
        key,
        {
          ...cat,
          name: cat.name.trim(),
          subcategories: subcategoriesText.split('\n').map((s) => s.trim()).filter(Boolean),
        },
      ])
    );
    try {
      saveCategories(result);
      setStatus({ type: 'success', text: 'Categories saved.' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset categories to the original list?')) {
      resetCategories();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Categories</h1>
          <p className="text-stone-500">Categories and subcategories shown in product filters and the product form.</p>
        </div>
        <button onClick={handleSave} className="btn-accent flex items-center gap-2 text-sm cursor-pointer">
          <Save size={16} /> Save changes
        </button>
      </div>

      {status && (
        <p className={`mb-4 text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-700'}`} role="status">
          {status.text}
        </p>
      )}

      <div className="space-y-4">
        {Object.entries(draft).map(([key, cat]) => (
          <section key={key} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <p className="text-xs text-stone-400">
                URL key: <code>{key}</code> · {products.filter((p) => p.category === key).length} products
              </p>
              <button onClick={() => removeCategory(key)} className="text-red-500 hover:text-red-700 cursor-pointer" title="Delete category">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-sm font-medium text-stone-700 mb-1">Name</span>
                  <input className={inputCls} value={cat.name} onChange={(e) => update(key, { name: e.target.value })} />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-stone-700 mb-1">Description</span>
                  <textarea className={inputCls} rows={3} value={cat.description || ''} onChange={(e) => update(key, { description: e.target.value })} />
                </label>
              </div>
              <label className="block">
                <span className="block text-sm font-medium text-stone-700 mb-1">Subcategories (one per line)</span>
                <textarea className={inputCls} rows={7} value={cat.subcategoriesText} onChange={(e) => update(key, { subcategoriesText: e.target.value })} />
              </label>
            </div>
          </section>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-4 flex flex-wrap gap-3 items-end">
        <label className="flex-1 min-w-[220px]">
          <span className="block text-sm font-medium text-stone-700 mb-1">New category name</span>
          <input
            className={inputCls}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCategory();
              }
            }}
            placeholder="e.g. Pebbles & Landscaping"
          />
        </label>
        <button onClick={addCategory} className="btn-primary flex items-center gap-2 text-sm cursor-pointer">
          <Plus size={16} /> Add category
        </button>
        <button onClick={handleReset} className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 px-3 py-3 cursor-pointer">
          <RotateCcw size={16} /> Reset to default
        </button>
      </div>
      <p className="text-xs text-stone-400 mt-3">Remember to click “Save changes” after adding or editing categories.</p>
    </div>
  );
};

export default CategoriesAdmin;
