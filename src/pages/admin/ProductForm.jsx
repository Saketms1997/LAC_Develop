import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Trash2, Link2, ArrowLeftRight } from 'lucide-react';
import { useProducts, useCategories, saveProduct } from '../../services/store';
import { slugify } from '../../utils/helpers';
import { fileToDataUrl } from '../../utils/imageUpload';

const inputCls =
  'w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600';

const Field = ({ label, hint, error, children }) => (
  <label className="block">
    <span className="block text-sm font-medium text-stone-700 mb-1">{label}</span>
    {children}
    {hint && !error && <span className="block text-xs text-stone-400 mt-1">{hint}</span>}
    {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
  </label>
);

const toList = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);
const fromList = (list) => (list || []).join(', ');

const emptyForm = {
  name: '',
  id: '',
  category: '',
  subcategory: '',
  description: '',
  colors: '',
  finishes: '',
  sizes: '',
  thickness: '',
  origin: '',
  density: '',
  hardness: '',
  water_absorption: '',
  applications: '',
  maintenance: '',
  featured: false,
  bestseller: false,
};

const toForm = (product) => ({
  name: product.name,
  id: product.id,
  category: product.category,
  subcategory: product.subcategory || '',
  description: product.description || '',
  colors: fromList(product.colors),
  finishes: fromList(product.finishes),
  sizes: fromList(product.sizes),
  thickness: fromList(product.thickness),
  origin: product.details?.origin || '',
  density: product.details?.density || '',
  hardness: product.details?.hardness || '',
  water_absorption: product.details?.water_absorption || '',
  applications: fromList(product.details?.applications),
  maintenance: product.details?.maintenance || '',
  featured: !!product.featured,
  bestseller: !!product.bestseller,
});

const ProductForm = () => {
  const { id: editId } = useParams();
  const navigate = useNavigate();
  const products = useProducts();
  const categories = useCategories();
  const existing = editId ? products.find((p) => p.id === editId) : null;

  const [form, setForm] = useState(() => (existing ? toForm(existing) : emptyForm));
  const [images, setImages] = useState(() =>
    existing ? (existing.gallery?.length ? existing.gallery : [existing.image].filter(Boolean)) : []
  );
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const fileRef = useRef(null);

  if (editId && !existing) {
    return (
      <div className="max-w-xl bg-white rounded-xl p-8 text-center shadow-sm">
        <p className="text-stone-700 mb-4">Product not found.</p>
        <Link to="/admin/products" className="btn-primary inline-block text-sm">Back to products</Link>
      </div>
    );
  }

  const set = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleName = (value) => {
    setForm((prev) => ({ ...prev, name: value, id: slugTouched ? prev.id : slugify(value) }));
    setErrors((prev) => ({ ...prev, name: '', id: '' }));
  };

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files);
    event.target.value = '';
    if (!files.length) return;
    setUploading(true);
    setFormError('');
    try {
      const urls = await Promise.all(files.map((file) => fileToDataUrl(file)));
      setImages((prev) => [...prev, ...urls]);
      setErrors((prev) => ({ ...prev, images: '' }));
    } catch (err) {
      setFormError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const addImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setImageUrl('');
    setErrors((prev) => ({ ...prev, images: '' }));
  };

  const makeMain = (index) => setImages((prev) => [prev[index], ...prev.filter((_, i) => i !== index)]);
  const removeImage = (index) => setImages((prev) => prev.filter((_, i) => i !== index));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Product name is required.';
    if (!form.id.trim()) next.id = 'URL slug is required.';
    if (!form.category) next.category = 'Select a category.';
    if (!form.description.trim()) next.description = 'Description is required.';
    if (images.length === 0) next.images = 'Add at least one image.';
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      setFormError('Please fix the highlighted fields.');
      return;
    }

    const details = { ...(existing?.details || {}) };
    const detailFields = {
      origin: form.origin.trim(),
      density: form.density.trim(),
      hardness: form.hardness.trim(),
      water_absorption: form.water_absorption.trim(),
      maintenance: form.maintenance.trim(),
    };
    Object.entries(detailFields).forEach(([key, value]) => {
      if (value) details[key] = value;
      else delete details[key];
    });
    details.applications = toList(form.applications);

    const product = {
      ...(existing || {}),
      id: slugify(form.id),
      name: form.name.trim(),
      category: form.category,
      subcategory: form.subcategory,
      image: images[0],
      gallery: images,
      description: form.description.trim(),
      colors: toList(form.colors),
      finishes: toList(form.finishes),
      sizes: toList(form.sizes),
      thickness: toList(form.thickness),
      details,
      featured: form.featured,
      bestseller: form.bestseller,
    };

    try {
      saveProduct(product, existing?.id);
      navigate('/admin/products');
    } catch (err) {
      setFormError(
        err.name === 'QuotaExceededError'
          ? 'Browser storage is full. Remove some images or products and try again.'
          : err.message
      );
    }
  };

  const subcategories = categories[form.category]?.subcategories || [];

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl" noValidate>
      <Link to="/admin/products" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 mb-4">
        <ArrowLeft size={16} /> Back to products
      </Link>
      <h1 className="font-serif text-3xl font-bold text-stone-900 mb-6">
        {existing ? `Edit: ${existing.name}` : 'Add product'}
      </h1>

      <div className="space-y-6">
        <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-stone-900">Basic information</h2>
          <Field label="Product name *" error={errors.name}>
            <input className={inputCls} value={form.name} onChange={(e) => handleName(e.target.value)} />
          </Field>
          <Field label="URL slug *" hint={`Page address: /product/${form.id || 'your-slug'}`} error={errors.id}>
            <input
              className={inputCls}
              value={form.id}
              onChange={(e) => {
                setSlugTouched(true);
                set('id', e.target.value);
              }}
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Category *" error={errors.category}>
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) => {
                  set('category', e.target.value);
                  set('subcategory', '');
                }}
              >
                <option value="">Select category</option>
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Subcategory">
              <select className={inputCls} value={form.subcategory} onChange={(e) => set('subcategory', e.target.value)} disabled={!form.category}>
                <option value="">None</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
                {form.subcategory && !subcategories.includes(form.subcategory) && (
                  <option value={form.subcategory}>{form.subcategory}</option>
                )}
              </select>
            </Field>
          </div>
          <Field label="Description *" error={errors.description}>
            <textarea className={inputCls} rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Field>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              Show as featured on homepage
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.bestseller} onChange={(e) => set('bestseller', e.target.checked)} />
              Bestseller
            </label>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-stone-900">Images</h2>
            <p className="text-xs text-stone-400">The first image is the main product image. Uploads are resized automatically.</p>
          </div>

          {images.length > 0 && (
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((src, index) => (
                <li key={`${index}-${src.slice(-24)}`} className="relative group rounded-lg overflow-hidden border border-stone-200">
                  <img src={src} alt={`Product ${index + 1}`} className="w-full aspect-square object-cover bg-stone-100" />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-yellow-600 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">Main</span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-black/60 p-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    {index > 0 && (
                      <button type="button" onClick={() => makeMain(index)} title="Make main image" className="text-white p-1 cursor-pointer">
                        <ArrowLeftRight size={16} />
                      </button>
                    )}
                    <button type="button" onClick={() => removeImage(index)} title="Remove" className="text-red-300 p-1 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 border-2 border-dashed border-stone-300 rounded-lg px-4 py-2.5 text-sm hover:border-yellow-600 cursor-pointer disabled:opacity-50"
            >
              <ImagePlus size={18} /> {uploading ? 'Processing...' : 'Upload images'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
            <div className="flex flex-1 min-w-[240px] gap-2">
              <input
                className={inputCls}
                placeholder="...or paste an image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
              />
              <button type="button" onClick={addImageUrl} className="px-3 rounded-lg bg-stone-100 hover:bg-stone-200 cursor-pointer" title="Add URL">
                <Link2 size={18} />
              </button>
            </div>
          </div>
          {errors.images && <p className="text-xs text-red-600">{errors.images}</p>}
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-stone-900">Specifications</h2>
          <p className="text-xs text-stone-400 -mt-2">Separate multiple values with commas.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Available colors"><input className={inputCls} value={form.colors} onChange={(e) => set('colors', e.target.value)} placeholder="Pure White, Off-White" /></Field>
            <Field label="Finishes"><input className={inputCls} value={form.finishes} onChange={(e) => set('finishes', e.target.value)} placeholder="Polished, Honed" /></Field>
            <Field label="Sizes"><input className={inputCls} value={form.sizes} onChange={(e) => set('sizes', e.target.value)} placeholder="600x600 mm, 800x800 mm" /></Field>
            <Field label="Thickness"><input className={inputCls} value={form.thickness} onChange={(e) => set('thickness', e.target.value)} placeholder="10mm, 15mm, 20mm" /></Field>
            <Field label="Origin"><input className={inputCls} value={form.origin} onChange={(e) => set('origin', e.target.value)} /></Field>
            <Field label="Density"><input className={inputCls} value={form.density} onChange={(e) => set('density', e.target.value)} placeholder="2.7 g/cm³" /></Field>
            <Field label="Hardness"><input className={inputCls} value={form.hardness} onChange={(e) => set('hardness', e.target.value)} /></Field>
            <Field label="Water absorption"><input className={inputCls} value={form.water_absorption} onChange={(e) => set('water_absorption', e.target.value)} /></Field>
          </div>
          <Field label="Applications"><input className={inputCls} value={form.applications} onChange={(e) => set('applications', e.target.value)} placeholder="Flooring, Wall Cladding, Countertops" /></Field>
          <Field label="Maintenance"><textarea className={inputCls} rows={2} value={form.maintenance} onChange={(e) => set('maintenance', e.target.value)} /></Field>
        </section>
      </div>

      {formError && <p className="mt-4 text-sm text-red-600" role="alert">{formError}</p>}

      <div className="flex gap-3 mt-6">
        <button type="submit" className="btn-accent text-sm cursor-pointer">{existing ? 'Save changes' : 'Create product'}</button>
        <Link to="/admin/products" className="btn-secondary text-sm">Cancel</Link>
      </div>
    </form>
  );
};

export default ProductForm;
