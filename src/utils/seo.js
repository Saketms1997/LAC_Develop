export const SEO_METADATA = {
  home: {
    title: 'Marble, Granite & Natural Stone Supplier | LAC Stones Pvt. Ltd.',
    description: 'Transforming spaces with nature\'s finest stones. Premium marble, granite, natural stones & tiles supplier in Jaipur, Rajasthan. Free quotes & expert consultation.',
    keywords: 'marble supplier, granite supplier, natural stone, marble slabs, granite slabs, tiles showroom, stone dealer, Jaipur',
  },
  products: {
    title: 'Premium Marble, Granite & Natural Stones Catalogue | LAC Stones',
    description: 'Browse our extensive collection of premium marble, granite, natural stones, and tiles. Finest quality stones for residential and commercial projects.',
    keywords: 'marble catalogue, granite selection, stone varieties, tiles collection, natural stones, premium materials',
  },
  about: {
    title: 'About LAC Stones Pvt. Ltd. | Natural Stone Supplier',
    description: 'Discover our story, mission, and commitment to quality. Over 15 years of excellence in natural stone supply and services.',
    keywords: 'about stone supplier, company profile, stone industry experience, quality assurance',
  },
  projects: {
    title: 'Our Projects & Gallery | LAC Stones Portfolio',
    description: 'Explore completed projects featuring premium marble, granite, and natural stone installations in residential, commercial, and hospitality spaces.',
    keywords: 'stone projects, marble gallery, granite installations, completed work, portfolio',
  },
  contact: {
    title: 'Contact LAC Stones Pvt. Ltd. | Get Quote & Enquiry',
    description: 'Get in touch for quotes, consultations, and product enquiries. Reach our stone experts in Jaipur, Rajasthan.',
    keywords: 'contact stone supplier, get quote, enquiry, stone consultation, Jaipur',
  },
};

export const getProductSEO = (product) => ({
  title: `${product.name} - Premium Quality ${product.category} | LAC Stones`,
  description: product.description,
  keywords: `${product.name}, ${product.category}, ${product.subcategory}, stone supplier, premium materials`,
  image: product.image,
});

export const setPageMeta = (metadata) => {
  if (typeof document === 'undefined') return;

  // Set title
  document.title = metadata.title;

  // Set or update meta tags
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = metadata.description;

  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = metadata.keywords;

  // Set OG tags
  setOGTags({
    title: metadata.title,
    description: metadata.description,
    image: metadata.image || '/images/lac-brand.jpg',
  });
};

const setOGTags = (data) => {
  const tags = {
    'og:title': data.title,
    'og:description': data.description,
    'og:image': data.image,
    'og:type': 'website',
  };

  Object.entries(tags).forEach(([property, content]) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  });
};

export const getStructuredData = (data) => {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LAC Stones Pvt. Ltd.',
    url: 'https://lacstones.com',
    logo: 'https://lacstones.com/images/lac-mark.png',
    description: 'Premium marble, granite, natural stones, and tiles supplier',
    sameAs: [],
  };

  if (data?.type === 'product' && data?.product) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.product.name,
      description: data.product.description,
      image: data.product.image,
      brand: 'LAC Stones',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    };
  }

  return baseStructure;
};
