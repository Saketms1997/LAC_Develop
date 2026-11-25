import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, MessageCircle, Share2, Heart } from 'lucide-react';
import { Navbar, Footer, WhatsAppButton, Breadcrumb, EmptyState } from '../components/Layout';
import { FormInput, FormTextarea } from '../components/Cards';
import { useProducts, useCategories } from '../services/store';
import { generateWhatsAppLink } from '../utils/helpers';
import { getProductSEO, setPageMeta } from '../utils/seo';

const ProductDetailPage = () => {
  const PRODUCTS = useProducts();
  const CATEGORIES = useCategories();
  const [navOpen, setNavOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [liked, setLiked] = useState(false);
  const [enquiryData, setEnquiryData] = useState({ name: '', email: '', phone: '' });

  // Get product ID from URL
  const productId = window.location.pathname.split('/').pop();
  const product = PRODUCTS.find(p => p.id === productId);

  React.useEffect(() => {
    if (product) {
      setPageMeta(getProductSEO(product));
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-marble-white">
        <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
        <WhatsAppButton />
        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <EmptyState
              title="Product Not Found"
              description="The product you're looking for doesn't exist or has been removed."
              action={{ label: 'Back to Products', path: '/products' }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const hasMultipleImages = galleryImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: CATEGORIES[product.category]?.name || product.category, path: `/products?category=${product.category}` },
    { label: product.name, path: `/product/${product.id}`, isActive: true },
  ];

  return (
    <div className="min-h-screen bg-marble-white">
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
      <WhatsAppButton />

      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Product Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative bg-marble-cream rounded-lg overflow-hidden h-96 md:h-screen md:max-h-96">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-stone-200 transition z-10"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-stone-200 transition z-10"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Thumbnails */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 rounded-full p-2">
                      {galleryImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition ${
                            i === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end">
                  {product.featured && (
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="bg-stone-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div>
                <span className="text-xs text-stone-600 uppercase tracking-wide font-semibold">
                  {CATEGORIES[product.category]?.name || product.category} / {product.subcategory}
                </span>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-2 mb-4">
                  {product.name}
                </h1>

                <p className="text-lg text-stone-600 mb-6">{product.description}</p>

                {/* Key Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-stone-200">
                  {product.details && (
                    <>
                      {product.details.origin && (
                        <div>
                          <p className="text-sm text-stone-600 uppercase tracking-wide">Origin</p>
                          <p className="text-lg font-semibold text-stone-900">{product.details.origin}</p>
                        </div>
                      )}
                      {product.details.density && (
                        <div>
                          <p className="text-sm text-stone-600 uppercase tracking-wide">Density</p>
                          <p className="text-lg font-semibold text-stone-900">{product.details.density}</p>
                        </div>
                      )}
                      {product.details.hardness && (
                        <div>
                          <p className="text-sm text-stone-600 uppercase tracking-wide">Hardness</p>
                          <p className="text-lg font-semibold text-stone-900">{product.details.hardness}</p>
                        </div>
                      )}
                      {product.details.water_absorption && (
                        <div>
                          <p className="text-sm text-stone-600 uppercase tracking-wide">Water Absorption</p>
                          <p className="text-lg font-semibold text-stone-900">{product.details.water_absorption}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Options */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-stone-900 mb-2 block">Available Colors</label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          className={`px-4 py-2 rounded border-2 transition ${
                            selectedColor === i
                              ? 'border-stone-900 bg-marble-cream'
                              : 'border-stone-300 hover:border-stone-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.finishes && product.finishes.length > 0 && (
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-stone-900 mb-2 block">Finishes</label>
                    <div className="flex flex-wrap gap-2">
                      {product.finishes.map((finish, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedFinish(i)}
                          className={`px-4 py-2 rounded border-2 transition ${
                            selectedFinish === i
                              ? 'border-stone-900 bg-marble-cream'
                              : 'border-stone-300 hover:border-stone-600'
                          }`}
                        >
                          {finish}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-8">
                    <label className="text-sm font-semibold text-stone-900 mb-2 block">Sizes</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    >
                      {product.sizes.map((size, i) => (
                        <option key={i} value={i}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <a
                    href={generateWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Enquire on WhatsApp
                  </a>
                  <a href="/contact" className="btn-secondary w-full block text-center">
                    Request Quote
                  </a>
                </div>

                {/* Share & Like */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-stone-200">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex-1 py-2 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                      liked
                        ? 'border-yellow-600 bg-yellow-600 bg-opacity-10 text-yellow-600'
                        : 'border-stone-300 text-stone-600 hover:border-yellow-600'
                    }`}
                  >
                    <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                    Save
                  </button>
                  <button className="flex-1 py-2 rounded-lg border-2 border-stone-300 transition hover:border-stone-600 flex items-center justify-center gap-2 text-stone-600">
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            {/* Applications */}
            {product.details && product.details.applications && product.details.applications.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Applications</h3>
                <ul className="space-y-2">
                  {product.details.applications.map((app, i) => (
                    <li key={i} className="flex gap-3">
                      <ChevronRight size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700">{app}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Maintenance */}
            {product.details && product.details.maintenance && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Maintenance</h3>
                <p className="text-stone-700 leading-relaxed">{product.details.maintenance}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-gradient-to-r from-stone-50 to-marble-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 text-center">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <a
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition group cursor-pointer"
                >
                  <div className="overflow-hidden h-64 bg-marble-cream">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-yellow-600 transition">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-stone-600 line-clamp-2">{relatedProduct.description}</p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;

