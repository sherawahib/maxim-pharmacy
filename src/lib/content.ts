export const site = {
  name: "Maxim Pharmacy",
  tagline: "Trusted care, delivered with confidence",
  phone: "+1 123 456 7890",
  phoneHref: "tel:+11234567890",
  email: "info@maximpharmacy.com",
  emailHref: "mailto:info@maximpharmacy.com",
  hours: "Mon – Sat: 9:00 am – 6:00 pm",
  location: "USA",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  locations: [
    "Downtown Pharmacy",
    "South Florida Pharmacy",
    "Miami Lakes Pharmacy",
    "West Palm Pharmacy",
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const categories = [
  {
    title: "Nutrition & Weight",
    blurb: "Metabolism support and balanced wellness essentials.",
    href: "/shop?category=nutrition",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
    count: "48 products",
    featured: true,
  },
  {
    title: "Skin Essentials",
    blurb: "Dermatologist-minded care for calm, healthy skin.",
    href: "/shop?category=skin",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1000&q=80",
    count: "36 products",
    featured: false,
  },
  {
    title: "Vitamins & Minerals",
    blurb: "Daily foundations for energy, immunity, and recovery.",
    href: "/shop?category=vitamins",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=1000&q=80",
    count: "62 products",
    featured: false,
  },
  {
    title: "Cold & Flu Care",
    blurb: "Fast-acting relief when seasonal symptoms hit.",
    href: "/shop?category=cold-flu",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    count: "29 products",
    featured: false,
  },
];

export const services = [
  {
    title: "Multi-Dose Packaging",
    blurb:
      "Organized, labeled packaging that makes complex medication schedules simple and safe.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Durable Medical Equipment",
    blurb:
      "Quality mobility and home-care equipment selected with pharmacist guidance.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Non-Sterile Compounding",
    blurb:
      "Custom formulations tailored to your prescription when standard options fall short.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Free Delivery*",
    blurb:
      "Discreet, reliable delivery so your care arrives when you need it — hassle-free.",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Upload Your Prescription",
    blurb: "Snap a photo or upload your doctor's prescription securely.",
  },
  {
    step: "02",
    title: "Choose Your Products",
    blurb: "Browse medicines and health products curated for everyday care.",
  },
  {
    step: "03",
    title: "Get It Delivered",
    blurb: "Receive your order at your door — fast, safe, and discreet.",
  },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "immuno-boost",
    name: "ImmunoBoost",
    category: "Vitamin",
    price: 63,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
    badge: "Bestseller",
  },
  {
    id: "metabo-trim",
    name: "MetaboTrim",
    category: "Herbal",
    price: 87,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "derma-glow",
    name: "DermaGlow",
    category: "Cream",
    price: 55,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1620916569875-d82350f0b6d0?auto=format&fit=crop&w=900&q=80",
    badge: "New",
  },
  {
    id: "cough-relief",
    name: "CoughRelief Max",
    category: "Syrup",
    price: 42,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "nutri-core",
    name: "NutriCore Essentials",
    category: "Vitamin",
    price: 12,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "slimvia",
    name: "Slimvia Burn",
    category: "Herbal",
    price: 26,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "acne-shield",
    name: "AcneShield Gel",
    category: "Cream",
    price: 82,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "flu-away",
    name: "FluAway Tabs",
    category: "Tablet",
    price: 36,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "vital-ease",
    name: "VitalEase Multivitamins",
    category: "Supplement",
    price: 63,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80",
  },
];

export const shopCategories = [
  "Baby Care & Essentials",
  "Personal Wellness & Hygiene",
  "Prescription Medicines",
  "Vitamins & Health Supplements",
  "Home Health Devices",
  "First Aid & Medical Supplies",
];

export const promotions = [
  {
    badge: "5% Cashback",
    title: "Vitamins & Supplements",
    href: "/shop?category=vitamins",
  },
  {
    badge: "Flat 10% OFF",
    title: "Baby & Childcare",
    href: "/shop?category=baby",
  },
  {
    badge: "12% Cashback",
    title: "Personal Care & Wellness",
    href: "/shop?category=wellness",
  },
];

export const testimonials = [
  {
    quote:
      "Ordering was seamless, and the pharmacist followed up personally. I finally feel confident managing my prescriptions online.",
    name: "Jennifer Troyer",
    role: "Administrator",
  },
  {
    quote:
      "Delivery arrived on time, packaging was discreet, and the team answered every insurance question without the runaround.",
    name: "Fergus Douglas",
    role: "Happy Customer",
  },
  {
    quote:
      "From upload to doorstep, everything felt polished. Maxim has become our family's go-to pharmacy.",
    name: "Lucy Smith",
    role: "Satisfied Customer",
  },
  {
    quote:
      "Professional advice, clear pricing, and genuine care. This is what modern pharmacy should feel like.",
    name: "John Smith",
    role: "Satisfied Client",
  },
];

export const team = [
  {
    name: "Emma Collins",
    role: "Chief Medical Officer",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "James Bennett",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sophie Turner",
    role: "Customer Experience Manager",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Daniel Harris",
    role: "Lead Pharmacist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },
];

export const posts = [
  {
    title: "5 Natural Ways to Strengthen Your Immune System",
    excerpt:
      "Discover simple lifestyle habits and key supplements that can naturally boost your immunity.",
    href: "/blog",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    date: "Mar 12, 2026",
    tag: "Immunity",
  },
  {
    title: "Skincare Advice for Sensitive Skin",
    excerpt:
      "Learn how to care for sensitive skin with gentle routines and dermatologist-recommended products.",
    href: "/blog",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    date: "Mar 4, 2026",
    tag: "Skincare",
  },
  {
    title: "Do You Really Need Supplements?",
    excerpt:
      "Find out when supplements are helpful and how to choose the right ones for your health needs.",
    href: "/blog",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=1200&q=80",
    date: "Feb 21, 2026",
    tag: "Wellness",
  },
];

export const trustItems = [
  {
    id: "shipping",
    title: "Free Shipping & Returns",
    blurb: "On all orders over $200",
  },
  {
    id: "payment",
    title: "Secure Payment",
    blurb: "Encrypted checkout every time",
  },
  {
    id: "guarantee",
    title: "Money-Back Guarantee",
    blurb: "Returns within 30 days",
  },
  {
    id: "support",
    title: "24/7 Customer Support",
    blurb: "Friendly help when you need it",
  },
] as const;
