import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trophy, Users, Award, Zap } from 'lucide-react';
import { Navbar, Footer, WhatsAppButton, Breadcrumb } from '../components/Layout';
import { FeatureCard } from '../components/Cards';
import { COMPANY_INFO, WHY_CHOOSE_US } from '../config/constants';
import { setPageMeta, SEO_METADATA } from '../utils/seo';

const AboutPage = () => {
  const [navOpen, setNavOpen] = useState(false);

  React.useEffect(() => {
    setPageMeta(SEO_METADATA.about);
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about', isActive: true },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'Every stone is handpicked and inspected for superior quality and finish.',
      icon: Trophy,
    },
    {
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We listen and deliver what you need.',
      icon: Users,
    },
    {
      title: 'Excellence',
      description: 'Precision craftsmanship and attention to detail in every project.',
      icon: Award,
    },
    {
      title: 'Innovation',
      description: 'Latest techniques and technology for best results.',
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-marble-white">
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">About LAC Stones</h1>
            <p className="text-lg text-marble-cream max-w-2xl mx-auto">
              Your trusted partner in premium natural stones for over 15 years.
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

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="rounded-lg overflow-hidden h-96"
            >
              <img
                src="/images/about.svg"
                alt="LAC Stones Showroom"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
              <span className="text-yellow-600 font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-6">
                Excellence in Natural Stones Since 2010
              </h2>
              <p className="text-lg text-stone-600 mb-4">
                LAC Stones Pvt. Ltd. was founded with a vision to bring the world's finest natural stones to your doorstep. What started as a small showroom has grown into a trusted supplier serving architects, designers, and homeowners across India.
              </p>
              <p className="text-lg text-stone-600 mb-6">
                Our commitment to quality, craftsmanship, and customer satisfaction has made us a preferred choice for premium marble, granite, natural stones, and tiles. We work directly with quarries to source the best materials and partner with skilled artisans to deliver exceptional finishes.
              </p>
              <div className="space-y-3">
                {[
                  'Handpicked stones from finest quarries worldwide',
                  'Expert consultation and design support',
                  'Precision cutting and finishing',
                  'On-time delivery and professional installation',
                  'Competitive pricing without compromising quality',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Check size={20} className="text-yellow-600 flex-shrink-0 mt-1" />
                    <span className="text-stone-600">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-stone-50 to-marble-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-8 border border-stone-100">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Our Mission</h3>
              <p className="text-stone-600 mb-4">
                To provide premium quality natural stones and exceptional customer service that transforms spaces into beautiful, lasting works of art.
              </p>
              <p className="text-stone-600">
                We believe that every project deserves the finest materials and expertise. Our mission is to make premium stones accessible and to exceed expectations in every interaction.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg p-8 border border-stone-100">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Our Vision</h3>
              <p className="text-stone-600 mb-4">
                To be the most trusted and preferred supplier of premium natural stones in India, known for quality, reliability, and innovation.
              </p>
              <p className="text-stone-600">
                We aspire to continuously improve our offerings, expand our collection, and set new industry standards for craftsmanship and customer care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="quality" className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Core Values</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2">What Drives Us</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mt-4">
              Our values guide every decision and shape our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <FeatureCard key={i} icon={value.icon} title={value.title} description={value.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-semibold uppercase tracking-wider">Our Guarantee</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2">Quality Assurance</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Selection Process',
                description: 'Every stone is hand-selected from premium quarries and carefully inspected for quality, color consistency, and finish.',
                items: ['Quarry partnerships', 'Quality inspection', 'Color matching', 'Finish verification'],
              },
              {
                title: 'Finishing Standards',
                description: 'Our experienced artisans employ precision techniques to achieve perfect cuts, polishes, and finishes.',
                items: ['Precision cutting', 'Expert polishing', 'Detail work', 'Surface treatment'],
              },
              {
                title: 'Quality Guarantee',
                description: 'We stand behind our products with comprehensive warranties and after-sales support.',
                items: ['Material warranty', 'Workmanship guarantee', 'Installation support', 'Customer care'],
              },
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-marble-cream rounded-lg p-8 border border-stone-100"
              >
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{section.title}</h3>
                <p className="text-stone-600 mb-6">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-2 items-start">
                      <Check size={16} className="text-yellow-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '15+', label: 'Years of Experience' },
              { number: '10,000+', label: 'Happy Customers' },
              { number: '500+', label: 'Projects Completed' },
              { number: '100%', label: 'Quality Guarantee' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="text-5xl font-serif font-bold mb-2 text-yellow-600">{stat.number}</div>
                <div className="text-marble-cream">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-marble-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
            Experience LAC Stones Quality
          </h2>
          <p className="text-lg text-stone-600 mb-6">
            Visit our showroom or connect with our experts for personalized consultation.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
            <a href="/products" className="btn-secondary">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

