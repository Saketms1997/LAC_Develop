import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Phone, Mail, MessageCircle, Check } from 'lucide-react';
import { Navbar, Footer, WhatsAppButton, Breadcrumb } from '../components/Layout';
import { FormInput, FormTextarea, FormSelect } from '../components/Cards';
import { COMPANY_INFO } from '../config/constants';
import { generateWhatsAppLink, sendEmailEnquiry, validateEmail, validatePhone } from '../utils/helpers';
import { setPageMeta, SEO_METADATA } from '../utils/seo';
import { useCategories } from '../services/store';

const ContactPage = () => {
  const CATEGORIES = useCategories();
  const [navOpen, setNavOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    setPageMeta(SEO_METADATA.contact);
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await sendEmailEnquiry(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', interestedIn: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Contact Us', path: '/contact', isActive: true },
  ];

  const categoryOptions = Object.values(CATEGORIES).map(cat => cat.name);

  return (
    <div className="min-h-screen bg-marble-white">
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-marble-cream max-w-2xl mx-auto">
              Have questions? Our team is here to help you with quotes and consultations.
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

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Contact Information</h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Address</h3>
                  <p className="text-stone-600">{COMPANY_INFO.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Phone</h3>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-stone-600 hover:text-yellow-600">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Email</h3>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-stone-600 hover:text-yellow-600">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">WhatsApp</h3>
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-green-600"
                  >
                    Chat Now
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 bg-marble-cream rounded-lg overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.0804154039936!2d75.78967!3d26.91239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJaipur%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-lg p-8 border border-stone-100 shadow-lg">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Send us a Message</h2>

              {submitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Message Sent Successfully!</h3>
                    <p className="text-green-700 text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  placeholder="Your full name"
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="your@email.com"
                />

                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  placeholder="+91-9876543210"
                />

                <FormSelect
                  label="Interested In"
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleChange}
                  options={categoryOptions}
                />

                <FormTextarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                  placeholder="Tell us about your project..."
                  rows={5}
                />

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-stone-600 text-center">
                  We'll respond to your inquiry within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-green-50 border-t border-b border-green-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <MessageCircle size={48} className="mx-auto text-green-600 mb-4" />
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Quick Chat</h2>
          <p className="text-lg text-stone-600 mb-6">
            Need instant assistance? Chat with us on WhatsApp for quick responses.
          </p>
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

