import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ProjectCard } from '../components/Cards';
import { Navbar, Footer, WhatsAppButton, Breadcrumb } from '../components/Layout';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';
import { setPageMeta, SEO_METADATA } from '../utils/seo';

const ProjectsPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  React.useEffect(() => {
    setPageMeta(SEO_METADATA.projects);
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return PROJECTS;
    }
    return PROJECTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects', isActive: true },
  ];

  return (
    <div className="min-h-screen bg-marble-white">
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-marble-cream max-w-2xl mx-auto">
              Explore our portfolio of premium stone installations across residential, commercial, and hospitality spaces.
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

      {/* Category Filter */}
      <section className="bg-white py-8 border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 overflow-x-auto">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-stone-800 text-white'
                    : 'bg-marble-cream text-stone-800 hover:bg-stone-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layoutId={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">No Projects Found</h3>
              <p className="text-stone-600">
                No projects in this category yet. Check back soon or explore other categories.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-stone-600 mb-6">
              Interested in a similar project? Let's talk about your vision.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              Start Your Project <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Project Statistics */}
      <section className="py-20 bg-gradient-to-r from-stone-50 to-marble-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: PROJECTS.length.toString(),
                label: 'Projects Completed',
                description: 'Successfully completed premium stone installations across India',
              },
              {
                number: '500+',
                label: 'Happy Clients',
                description: 'Satisfied customers across residential and commercial sectors',
              },
              {
                number: '15+',
                label: 'Years Experience',
                description: 'Decades of expertise in premium stone supply and installation',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg p-8 text-center border border-stone-100"
              >
                <div className="text-4xl font-serif font-bold text-yellow-600 mb-2">{stat.number}</div>
                <h3 className="font-semibold text-stone-900 mb-2">{stat.label}</h3>
                <p className="text-stone-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-stone-800 to-stone-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-marble-cream mb-6">
            Our expert team can help bring your vision to life with premium stones and exceptional craftsmanship.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Get Your Quote Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

