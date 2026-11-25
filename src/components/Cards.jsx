import React from 'react';
import { Star, ShoppingCart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateWhatsAppLink } from '../utils/helpers';

export const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="product-card group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-marble-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.bestseller && (
          <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Bestseller
          </div>
        )}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-stone-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs text-stone-600 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-stone-600 line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-2">
          {product.colors && product.colors[0] && (
            <span className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded">
              {product.colors[0]}
            </span>
          )}
          {product.finishes && product.finishes[0] && (
            <span className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded">
              {product.finishes[0]}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <a
            href={`/product/${product.id}`}
            className="w-full btn-primary block text-center text-sm"
          >
            View Details
          </a>
          <a
            href={generateWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle size={16} />
            Enquire Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const CategoryCard = ({ category, icon: Icon }) => {
  return (
    <motion.a
      href={`/products?category=${category.id}`}
      whileHover={{ y: -8 }}
      className="bg-white rounded-lg p-8 text-center hover:shadow-2xl transition-shadow cursor-pointer border border-stone-100"
    >
      <div className="bg-gradient-to-br from-stone-100 to-marble-beige w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon size={32} className="text-stone-800" />}
      </div>
      <h3 className="font-semibold text-lg text-stone-900 mb-2">{category.name}</h3>
      <p className="text-sm text-stone-600">{category.description}</p>
    </motion.a>
  );
};

export const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-white rounded-lg p-8 border border-stone-100"
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} fill="#c9a876" className="text-yellow-600" />
        ))}
      </div>

      {/* Text */}
      <p className="text-stone-700 mb-6 italic">"{testimonial.text}"</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-stone-900">{testimonial.name}</h4>
          <p className="text-sm text-stone-600">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg p-8 text-center border border-stone-100 hover:shadow-lg transition-shadow"
    >
      <div className="bg-gradient-to-br from-stone-100 to-marble-beige w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon size={32} className="text-stone-800" />}
      </div>
      <h3 className="font-semibold text-lg text-stone-900 mb-2">{title}</h3>
      <p className="text-sm text-stone-600">{description}</p>
    </motion.div>
  );
};

export const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="group relative overflow-hidden rounded-lg h-72 cursor-pointer"
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white font-semibold text-xl mb-2">{project.title}</h3>
        <p className="text-marble-cream text-sm mb-2">{project.category}</p>
        <p className="text-stone-300 text-sm">{project.location}</p>
      </div>
    </motion.div>
  );
};

export const FormInput = ({ label, type = 'text', name, value, onChange, error, required = false, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg font-sans transition-colors ${
          error
            ? 'border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300'
            : 'border-stone-300 bg-white hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-600'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const FormTextarea = ({ label, name, value, onChange, error, required = false, placeholder, rows = 4 }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg font-sans transition-colors ${
          error
            ? 'border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300'
            : 'border-stone-300 bg-white hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-600'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const FormSelect = ({ label, name, value, onChange, options, error, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg font-sans transition-colors ${
          error
            ? 'border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300'
            : 'border-stone-300 bg-white hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-600'
        }`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

