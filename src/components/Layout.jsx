import React from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink, getWhatsAppPhone } from '../utils/helpers';

export const Navbar = ({ isOpen, setIsOpen }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled
          ? 'bg-marble-white/95 border-stone-200 shadow-[0_8px_30px_-12px_rgba(20,18,15,0.25)]'
          : 'bg-marble-white/95 border-stone-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" aria-label="LAC Stones home">
            <img
              src="/images/lac-mark-sm.png"
              alt="LAC Stones logo"
              width="46"
              height="50"
              className="h-12 w-auto drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
            <span className="flex flex-col leading-none">
              <span className="font-sans font-medium tracking-[0.22em] sm:tracking-[0.28em] text-stone-900 text-base sm:text-lg">LAC STONES</span>
              <span className="font-sans text-[0.6rem] tracking-[0.45em] text-yellow-700 mt-1.5">PVT. LTD.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-9">
            {navLinks.map((link) => {
              const active = link.path === '/' ? currentPath === '/' : currentPath.startsWith(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className={`relative text-[0.8rem] font-medium uppercase tracking-[0.18em] py-2 transition-colors after:absolute after:left-0 after:bottom-0 after:h-px after:bg-yellow-600 after:transition-all after:duration-300 ${
                    active
                      ? 'text-stone-900 after:w-full'
                      : 'text-stone-600 hover:text-stone-900 after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex gap-4 items-center">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent flex items-center gap-2 !py-2.5 !px-5"
            >
              <MessageCircle size={16} />
              <span>Chat Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <div className="space-y-1 text-stone-900">
              <div className={`h-0.5 w-6 transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ backgroundColor: 'currentColor' }}></div>
              <div className={`h-0.5 w-6 transition-all ${isOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'currentColor' }}></div>
              <div className={`h-0.5 w-6 transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ backgroundColor: 'currentColor' }}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-5 space-y-1 border-t border-stone-200">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="block px-2 py-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-700 hover:text-yellow-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block btn-accent mt-3 text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export const Footer = () => {
  const footerLinks = {
    products: [
      { id: 'marble', label: 'Marble', path: '/products?category=marble' },
      { id: 'granite', label: 'Granite', path: '/products?category=granite' },
      { id: 'natural-stones', label: 'Natural Stones', path: '/products?category=natural-stones' },
      { id: 'tiles', label: 'Tiles', path: '/products?category=tiles' },
    ],
    company: [
      { id: 'about', label: 'About Us', path: '/about' },
      { id: 'projects', label: 'Our Projects', path: '/projects' },
      { id: 'quality', label: 'Quality Assurance', path: '#' },
      { id: 'blog', label: 'Blog', path: '#' },
    ],
    support: [
      { id: 'contact', label: 'Contact Us', path: '/contact' },
      { id: 'faq', label: 'FAQ', path: '#' },
      { id: 'privacy', label: 'Privacy Policy', path: '#' },
      { id: 'terms', label: 'Terms & Conditions', path: '#' },
    ],
  };

  return (
    <footer className="bg-stone-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-5" aria-label="LAC Stones home">
              <img src="/images/lac-mark-sm.png" alt="LAC Stones logo" width="46" height="50" className="h-14 w-auto" loading="lazy" />
              <span className="flex flex-col leading-none">
                <span className="font-sans font-medium tracking-[0.28em] text-xl">LAC STONES</span>
                <span className="font-sans text-[0.6rem] tracking-[0.45em] text-yellow-500 mt-1.5">PVT. LTD.</span>
              </span>
            </a>
            <p className="font-serif italic text-xl text-yellow-300 mb-3">Nature, Crafted for Timeless Spaces.</p>
            <p className="text-stone-300 font-light mb-4">
              Your trusted partner for premium marble, granite, natural stones, and tiles.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition">
                f
              </a>
              <a href="#" className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition">
                i
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.id}>
                  <a href={link.path} className="text-stone-300 hover:text-yellow-600 transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.id}>
                  <a href={link.path} className="text-stone-300 hover:text-yellow-600 transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.id}>
                  <a href={link.path} className="text-stone-300 hover:text-yellow-600 transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h5 className="font-semibold mb-2">Address</h5>
              <p className="text-stone-300">Stone Plaza, Industrial Area, Jaipur, Rajasthan 302001</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Email</h5>
              <p className="text-stone-300">info@lacstones.com</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Phone</h5>
              <p className="text-stone-300">+91-9876543210</p>
            </div>
          </div>
          <div className="text-center border-t border-stone-800 pt-6 text-stone-400">
            <p>&copy; {new Date().getFullYear()} LAC Stones Pvt. Ltd. All rights reserved. | <a href="/admin" className="hover:text-yellow-500">Admin</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppButton = ({ productName = null }) => {
  return (
    <a
      href={generateWhatsAppLink(productName)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-40"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={24} fill="currentColor" />
    </a>
  );
};

export const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumb gap-2 py-4">
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center gap-2">
          {index > 0 && <ChevronRight size={16} className="text-stone-400" />}
          {item.isActive ? (
            <span className="text-stone-900 font-semibold">{item.label}</span>
          ) : (
            <a href={item.path} className="breadcrumb-link">
              {item.label}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
    </div>
  );
};

export const EmptyState = ({ title, description, action }) => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 mb-6">{description}</p>
      {action && <a href={action.path} className="btn-primary">{action.label}</a>}
    </div>
  );
};

