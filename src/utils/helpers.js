import { WHATSAPP_NUMBER, COMPANY_INFO } from '../config/constants';
import { addEnquiry } from '../services/store';

export const generateWhatsAppLink = (productName = null) => {
  let message = productName
    ? `Hello, I am interested in ${productName}. Please share the price, availability, sizes, and additional details.`
    : `Hello, I would like to inquire about your products and services. Please get in touch.`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`;
};

export const getWhatsAppPhone = () => {
  return WHATSAPP_NUMBER.replace(/\D/g, '');
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91-${cleaned}`;
  }
  return phone;
};

export const sendEmailEnquiry = async (enquiry) => {
  // Saved to the admin enquiries inbox; swap for an API call when a backend exists.
  addEnquiry(enquiry);
  return true;
};

export const capitalizeWords = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getImageUrl = (imagePath, width = 600, height = 600) => {
  if (!imagePath) return 'https://via.placeholder.com/600x600?text=No+Image';
  return imagePath;
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const formatPrice = (price) => {
  if (!price) return 'Request Price';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(phone.replace(/\D/g, ''));
};

export const getWindowWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }
  return 1024;
};

export const isMobile = () => getWindowWidth() < 768;
export const isTablet = () => getWindowWidth() >= 768 && getWindowWidth() < 1024;
export const isDesktop = () => getWindowWidth() >= 1024;

export const getSEOFriendlyUrl = (category, subcategory = null) => {
  if (subcategory) {
    return `/products/${slugify(category)}/${slugify(subcategory)}`;
  }
  return `/products/${slugify(category)}`;
};

export const getBreadcrumbs = (currentPath) => {
  const pathParts = currentPath.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', path: '/' }];
  
  let path = '';
  pathParts.forEach((part, index) => {
    path += `/${part}`;
    breadcrumbs.push({
      label: capitalizeWords(part.replace('-', ' ')),
      path: path,
      isActive: index === pathParts.length - 1,
    });
  });
  
  return breadcrumbs;
};

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
