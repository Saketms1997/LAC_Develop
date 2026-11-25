import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Award, TrendingUp, Zap, DollarSign, Users, Shield, ArrowRight } from 'lucide-react';
import { ProductCard, TestimonialCard, FeatureCard, ProjectCard } from '../components/Cards';
import { Navbar, Footer, WhatsAppButton, Breadcrumb } from '../components/Layout';
import { useProducts, useCategories } from '../services/store';
import { PROJECTS } from '../data/projects';
import { TESTIMONIALS, WHY_CHOOSE_US } from '../config/constants';
import { generateWhatsAppLink, truncateText } from '../utils/helpers';
import { setPageMeta, SEO_METADATA } from '../utils/seo';

const HomePage = () => {
  const PRODUCTS = useProducts();
  const CATEGORIES = useCategories();
  const [navOpen, setNavOpen] = useState(false);

  React.useEffect(() => {
    setPageMeta(SEO_METADATA.home);
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 6);
  const bestsellerProducts = PRODUCTS.filter(p => p.bestseller).slice(0, 6);
  const featuredProjects = PROJECTS.slice(0, 3);

  const iconMap = {
    'Award': Award,
    'TrendingUp': TrendingUp,
    'Zap': Zap,
    'DollarSign': DollarSign,
    'Users': Users,
    'Shield': Shield,
  };

  return (
    <div className="min-h-screen bg-marble-white">
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
      <WhatsAppButton />

      {/* Hero Section: brand artwork on ivory marble */}
      <section className="relative overflow-hidden bg-marble-cream pt-20">
        <div
          className="hero-art h-72 sm:h-96 lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[62%]"
          role="img"
          aria-label="LAC Stones logo on cream marble with gold veining"
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-24 lg:min-h-[680px] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-yellow-700 mb-6">
              <span className="h-px w-10 bg-yellow-600" /> LAC Stones Pvt. Ltd.
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-stone-900 mb-6 leading-[1.02]">
              Transforming Spaces with <span className="italic text-yellow-700">Nature's Finest Stones.</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-stone-700 mb-10 max-w-lg">
              Discover premium-quality marble, granite, natural stones, and tiles for your dream spaces.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a href="/products" className="btn-primary flex items-center gap-2">
                Explore Our Collection <ChevronRight size={18} />
              </a>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                Get a Free Quote <ChevronRight size={18} />
              </a>
            </div>

            <p className="mt-12 text-xs font-medium uppercase tracking-[0.3em] text-stone-500">
              Marble &middot; Granite &middot; Natural Stone &middot; Tiles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Our Collections</span>
            <h2 className="section-title mt-2">Stone Categories</h2>
            <p className="section-subtitle mt-4">
              Explore our extensive range of premium stones, carefully sourced from around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(CATEGORIES).slice(0, 4).map(([key, category]) => {
              const icons = {
                marble: Award,
                granite: Shield,
                'natural-stones': Award,
                tiles: Award,
              };
              return (
                <motion.div
                  key={key}
                  whileHover={{ y: -8 }}
                  className="bg-marble-cream rounded-2xl p-8 text-center hover:shadow-2xl transition-shadow cursor-pointer border border-stone-200 hover:border-yellow-600/50"
                  onClick={() => (window.location.href = `/products?category=${key}`)}
                >
                  <div className="bg-white w-16 h-16 rounded-full shadow-sm flex items-center justify-center mx-auto mb-5">
                    {React.createElement(icons[key] || Award, { size: 28, className: 'text-yellow-700' })}
                  </div>
                  <h3 className="font-serif font-semibold text-2xl text-stone-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-stone-600">{category.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-marble-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Featured Selection</span>
            <h2 className="section-title mt-2">Featured Products</h2>
            <p className="section-subtitle mt-4">
              Handpicked premium stones that define elegance and sophistication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Our Strength</span>
            <h2 className="section-title mt-2">Why Choose LAC Stones?</h2>
            <p className="section-subtitle mt-4">
              We're committed to delivering excellence in every aspect of our service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={iconMap[feature.icon]}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-marble-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Customer Favorites</span>
            <h2 className="section-title mt-2">Best Selling Products</h2>
            <p className="section-subtitle mt-4">
              Most loved by our customers for quality and value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Our Work</span>
            <h2 className="section-title mt-2">Featured Projects</h2>
            <p className="section-subtitle mt-4">
              Explore our completed projects showcasing premium stone installations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/projects" className="btn-primary inline-flex items-center gap-2">
              View All Projects <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-marble-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Customer Love</span>
            <h2 className="section-title mt-2">What Our Clients Say</h2>
            <p className="section-subtitle mt-4">
              Trusted by architects, designers, and homeowners across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-stone-800 to-stone-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-marble-cream mb-8">
              Connect with our experts for personalized consultation and competitive quotes.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <a href="/contact" className="btn-primary">
                Get in Touch
              </a>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Chat Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

