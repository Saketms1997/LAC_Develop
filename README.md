# LAC Stones Pvt. Ltd. Website

A modern, premium, responsive business website for LAC Stones, a marble, granite, natural stone and tiles supplier. Built with React, Vite, Tailwind CSS v4 and Framer Motion. Brand: ivory marble, brushed gold and near-black, with the logo in `public/images/` (`lac-brand.jpg` full artwork, `lac-mark.png` emblem, `lac-hero.jpg` hero crop).

## 🌟 Features

### Complete Multi-Page Website
- **Home Page** - Premium landing page with hero section, featured products, testimonials, projects gallery
- **Products Page** - Comprehensive product catalog with filtering, search, and sorting
- **Product Details Page** - Individual product pages with image gallery, specifications, colors, finishes, sizes
- **About Us Page** - Company story, mission, vision, core values, quality assurance information
- **Projects Gallery** - Portfolio showcase with category filtering (8+ sample projects)
- **Contact Us Page** - Contact form, company information, Google Maps integration, WhatsApp chat

### Key Functionality
- ✅ **WhatsApp Integration** - Floating button on every page, product-specific enquiries, automatic message generation
- ✅ **Product Filtering** - By category, subcategory, with advanced search and sorting
- ✅ **Image Galleries** - Product image carousel, masonry-style project gallery
- ✅ **Responsive Design** - Mobile-first, fully responsive on all devices
- ✅ **Form Validation** - Contact form with email and phone validation
- ✅ **SEO Optimized** - Meta tags, semantic HTML, breadcrumb navigation, alt attributes
- ✅ **Smooth Animations** - Framer Motion animations, hover effects, transitions
- ✅ **Premium Design** - Luxury stone showroom aesthetic with elegant typography and spacing

## 🛠️ Technology Stack

- **React.js 18+** - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **JavaScript (ES6+)** - Core language

## 📋 Project Structure

```
stone-business-website/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Navbar, Footer, Breadcrumb, WhatsAppButton
│   │   └── Cards.jsx           # Reusable card components (Product, Testimonial, etc.)
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Products.jsx        # Products catalog
│   │   ├── ProductDetail.jsx   # Individual product page
│   │   ├── About.jsx           # About us page
│   │   ├── Projects.jsx        # Projects gallery
│   │   └── Contact.jsx         # Contact page
│   ├── data/
│   │   ├── products.js         # 20+ products with detailed specs
│   │   └── projects.js         # 8 sample projects
│   ├── config/
│   │   └── constants.js        # Company info, navigation, testimonials
│   ├── utils/
│   │   ├── helpers.js          # Helper functions (WhatsApp links, validation)
│   │   └── seo.js              # SEO metadata and utilities
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML entry point
├── public/images/              # Placeholder stone textures
├── scripts/generate-images.mjs # Regenerates the placeholder images
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd D:\Lac_Develop\stone-business-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized build will be in the `dist/` folder.

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production-optimized build
- `npm run preview` - Preview the production build locally

## 🎨 Design Features

### Premium Aesthetic
- **Color Scheme**: Charcoal black, marble white, warm beige, golden/bronze accents
- **Typography**: Professional serif and sans-serif fonts
- **Layout**: Minimalistic with generous spacing
- **Images**: High-quality stone and marble photography

### Component Library
- Product cards with hover animations
- Testimonial cards with ratings
- Feature highlight cards
- Project gallery cards with hover overlay
- Form inputs with validation feedback
- Loading spinners and empty states

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

All pages are fully responsive and tested on mobile, tablet, and desktop viewports.

## 🔄 Product Management

### Adding New Products
Edit `src/data/products.js`:

```javascript
{
  id: 'product-id',
  name: 'Product Name',
  category: 'marble', // or granite, natural-stones, tiles, other
  subcategory: 'Italian Marble',
  images: ['url1', 'url2', ...],
  description: 'Product description...',
  colors: ['Pure White', 'Off-White'],
  finishes: ['Polished', 'Honed', 'Brushed'],
  sizes: ['600x600 mm', '800x800 mm', ...],
  thickness: ['10mm', '15mm', '20mm'],
  details: { origin: 'Italy', density: '2.7 g/cm³' },
  applications: ['Flooring', 'Wall Cladding', ...],
  maintenance: 'Regular dusting...',
  featured: true,
  bestseller: false
}
```

### Adding New Projects
Edit `src/data/projects.js`:

```javascript
{
  id: 'project-id',
  title: 'Project Title',
  category: 'Residential Interiors', // or other categories
  location: 'City, State',
  image: 'image-url',
  description: 'Project description...'
}
```

## ⚙️ Configuration

### Company Information
Edit `src/config/constants.js`:

```javascript
export const COMPANY = {
  name: 'Premium Stone Enterprises',
  phone: '+91-9876543210',
  email: 'info@premiumstone.com',
  address: 'Stone Plaza, Industrial Area, Jaipur, Rajasthan 302001',
  whatsappPhone: '919876543210', // No + or spaces
  ...
};
```

### WhatsApp Integration
WhatsApp links are generated automatically with product names and company phone number. Configure the phone number in `constants.js`.

## 🔍 SEO Optimization

The website includes:
- Meta titles and descriptions for all pages
- Semantic HTML structure
- Proper heading hierarchy (H1, H2, H3)
- Image alt attributes
- Breadcrumb navigation
- Sitemap-ready routing
- Mobile-friendly meta viewport
- Schema markup ready for structured data

**Target Keywords**:
- Marble supplier
- Granite supplier
- Natural stone supplier
- Premium marble slabs
- Granite slabs
- Tiles showroom
- Marble and granite dealers
- Location-specific: Jaipur marble supplier, Rajasthan stones, etc.

## 📧 Contact Form

The contact form includes:
- Full name field
- Email address field (validated)
- Phone number field (validated)
- Product interest dropdown
- Message text area
- WhatsApp enquiry option
- 24-hour response time guarantee message

Form validation ensures:
- All fields are required
- Email format is valid
- Phone number is valid (10+ digits)

## 🎯 Lead Generation

### WhatsApp Lead Generation
1. **Floating WhatsApp Button** - Present on every page
2. **Product-Specific Enquiry** - Auto-generates product name in message
3. **Quote Request** - Direct link from product detail page
4. **Contact Form Option** - Dedicated WhatsApp checkbox on contact page

Each WhatsApp link prefills a customized message like:
```
"Hello, I am interested in [Product Name]. 
Please share the price, availability, sizes, and additional details."
```

## 🔐 Admin Panel

Open **`/admin`** (there is also a small "Admin" link in the site footer). Default password: `admin123`. To change it, create a `.env` file containing `VITE_ADMIN_PASSWORD=your-password` and restart the dev server.

| Section | What you can do |
|---|---|
| Dashboard | Stats, recent enquiries, export / import / reset the catalogue (JSON) |
| Products | Search, add, edit, delete; toggle **Featured** (homepage) and **Bestseller** |
| Add / Edit product | Name, URL slug, category, description, colors, finishes, sizes, thickness, specs, applications, **multiple image upload** (first image = main) or image URL |
| Categories | Add / rename categories and edit subcategories (a category with products can't be deleted) |
| Enquiries | Contact-form submissions with status (New / Contacted / Closed), call / email / WhatsApp reply |

**Important limitations of this first version**

- Data is stored in the **browser's localStorage** (`src/services/store.js`), on top of the sample data in `src/data/`. Changes are visible only in the browser where they were made, not to other visitors. Use **Export catalogue** on the Dashboard to back up.
- The password check runs in the browser, so it only keeps casual visitors out. It is not real security.
- Uploaded images are downscaled (max 1000px) and stored in localStorage (~5 MB limit), so don't upload hundreds of photos.
- To go live, replace the functions in `src/services/store.js` and `src/services/auth.js` with calls to a real backend (e.g. Node/Express + MongoDB, cloud image storage, real login). The pages and hooks do not need to change.

## 🖼️ Placeholder Images

Product, project, hero and about images in `public/images/` are generated stone textures (`node scripts/generate-images.mjs`). Replace any file with a real photo using the same name, or upload real photos per product in the admin panel.

## 🔐 Future Enhancements

The architecture is ready for:
- Backend API integration
- Product inventory management system
- Admin dashboard for content management
- User authentication
- Shopping cart functionality
- Order tracking system
- Customer reviews and ratings
- Blog functionality
- Newsletter subscription
- Enquiry management system
- Analytics and reporting

## 📄 License

This project is a custom business website. All rights reserved to Premium Stone Enterprises.

## 🤝 Support

For customization, features, or deployment assistance, contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅
