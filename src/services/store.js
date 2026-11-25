import { useSyncExternalStore } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';

/*
 * Data layer. Everything the site and the admin panel read/write goes through here.
 * Today it persists to localStorage on top of the seed data in src/data; to move to a
 * real backend, replace the read/write functions below with API calls and keep the
 * exported hooks/actions unchanged.
 */

const KEYS = {
  products: 'ps_products',
  categories: 'ps_categories',
  enquiries: 'ps_enquiries',
};

const DEFAULTS = {
  products: PRODUCTS,
  categories: CATEGORIES,
  enquiries: [],
};

const listeners = new Set();
const cache = {};

const emit = () => listeners.forEach((listener) => listener());

const read = (name) => {
  if (!(name in cache)) {
    try {
      const raw = localStorage.getItem(KEYS[name]);
      cache[name] = raw ? JSON.parse(raw) : DEFAULTS[name];
    } catch {
      cache[name] = DEFAULTS[name];
    }
  }
  return cache[name];
};

// Throws if the browser storage quota is exceeded (e.g. too many large images).
const write = (name, value) => {
  localStorage.setItem(KEYS[name], JSON.stringify(value));
  cache[name] = value;
  emit();
};

const reset = (name) => {
  localStorage.removeItem(KEYS[name]);
  delete cache[name];
  emit();
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (Object.values(KEYS).includes(event.key)) {
      Object.keys(cache).forEach((key) => delete cache[key]);
      emit();
    }
  });
}

const useStore = (name) => useSyncExternalStore(subscribe, () => read(name), () => DEFAULTS[name]);

export const useProducts = () => useStore('products');
export const useCategories = () => useStore('categories');
export const useEnquiries = () => useStore('enquiries');

// Products
export const saveProduct = (product, originalId = null) => {
  const products = read('products');
  const lookupId = originalId || product.id;
  const exists = products.some((p) => p.id === lookupId);
  if (products.some((p) => p.id === product.id && p.id !== lookupId)) {
    throw new Error('A product with this URL slug already exists.');
  }
  write(
    'products',
    exists ? products.map((p) => (p.id === lookupId ? product : p)) : [product, ...products]
  );
};

export const updateProductFlags = (id, flags) => {
  write('products', read('products').map((p) => (p.id === id ? { ...p, ...flags } : p)));
};

export const deleteProduct = (id) => {
  write('products', read('products').filter((p) => p.id !== id));
};

export const replaceProducts = (products) => write('products', products);
export const resetProducts = () => reset('products');

// Categories
export const saveCategories = (categories) => write('categories', categories);
export const resetCategories = () => reset('categories');

// Enquiries
export const addEnquiry = (enquiry) => {
  const entry = {
    id: `enq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: 'new',
    source: 'contact-form',
    createdAt: new Date().toISOString(),
    ...enquiry,
  };
  write('enquiries', [entry, ...read('enquiries')]);
  return entry;
};

export const updateEnquiry = (id, patch) => {
  write('enquiries', read('enquiries').map((e) => (e.id === id ? { ...e, ...patch } : e)));
};

export const deleteEnquiry = (id) => {
  write('enquiries', read('enquiries').filter((e) => e.id !== id));
};
