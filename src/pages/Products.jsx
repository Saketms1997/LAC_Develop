import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sliders } from 'lucide-react';
import { ProductCard } from '../components/Cards';
import { Navbar, Footer, WhatsAppButton, Breadcrumb, EmptyState } from '../components/Layout';
import { useProducts, useCategories } from '../services/store';
import { setPageMeta, SEO_METADATA } from '../utils/seo';

const ProductsPage = () => {
  const PRODUCTS = useProducts();
  const CATEGORIES = useCategories();
  const [navOpen, setNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    setPageMeta(SEO_METADATA.products);
    
    // Check URL params for category filter
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      result = result.filter(p => p.subcategory === selectedSubcategory);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'bestseller':
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [PRODUCTS, searchTerm, selectedCategory, selectedSubcategory, sortBy]);

  const subcategories = selectedCategory !== 'all' && CATEGORIES[selectedCategory]
    ? CATEGORIES[selectedCategory].subcategories
    : [];

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products', isActive: true },
  ];

  return (
    <div className="min-h-screen bg-marble-white">
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Our Products
            </h1>
            <p className="text-lg text-marble-cream max-w-2xl mx-auto">
              Browse our comprehensive collection of premium marble, granite, natural stones, and tiles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:col-span-1`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-6"
            >
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">Search</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                    }}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === 'all'
                        ? 'bg-stone-800 text-white font-semibold'
                        : 'hover:bg-marble-cream'
                    }`}
                  >
                    All Products
                  </button>
                  {Object.entries(CATEGORIES).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedCategory(key);
                        setSelectedSubcategory('all');
                      }}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === key
                          ? 'bg-stone-800 text-white font-semibold'
                          : 'hover:bg-marble-cream'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Filter */}
              {subcategories.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-2">Type</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                        selectedSubcategory === 'all'
                          ? 'bg-yellow-600 text-white font-semibold'
                          : 'hover:bg-marble-cream'
                      }`}
                    >
                      All Types
                    </button>
                    {subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                          selectedSubcategory === sub
                            ? 'bg-yellow-600 text-white font-semibold'
                            : 'hover:bg-marble-cream'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="featured">Featured</option>
                  <option value="bestseller">Bestseller</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="bg-marble-cream rounded-lg p-4 text-center">
                <p className="text-stone-900 font-semibold">{filteredProducts.length} Products</p>
              </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6 flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <Sliders size={20} />
                Filters
              </button>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Products Found"
                description="Try adjusting your filters or search terms to find what you're looking for."
                action={{ label: 'View All Products', path: '/products' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-stone-800 to-stone-900 mt-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-marble-cream mb-6">
            Our team can help you find the perfect stone for your project.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Contact Our Experts
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;

