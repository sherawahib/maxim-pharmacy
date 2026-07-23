export type ShopProduct = {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  image: string;
  price: number;
  was: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  badgeTone: "hot" | "navy" | "sale" | "teal" | "new";
  inStock: boolean;
  sku?: string;
  size?: string;
  form?: string;
  shortBlurb?: string;
  description?: string;
  highlights?: string[];
  howToUse?: string[];
  ingredients?: string;
  warnings?: string;
};

export function productHref(id: string) {
  return `/shop/${id}`;
}

export function getProductById(id: string): ShopProduct | undefined {
  return shopProducts.find((p) => p.id === id);
}

export function getRelatedProducts(product: ShopProduct, limit = 4): ShopProduct[] {
  const same = shopProducts.filter(
    (p) => p.id !== product.id && p.categoryId === product.categoryId && p.inStock
  );
  if (same.length >= limit) return same.slice(0, limit);
  const extra = shopProducts.filter(
    (p) => p.id !== product.id && p.categoryId !== product.categoryId && p.inStock
  );
  return [...same, ...extra].slice(0, limit);
}

const DETAIL_DEFAULTS: Record<
  string,
  Partial<
    Pick<
      ShopProduct,
      | "sku"
      | "size"
      | "form"
      | "shortBlurb"
      | "description"
      | "highlights"
      | "howToUse"
      | "ingredients"
      | "warnings"
    >
  >
> = {
  "immuno-boost": {
    sku: "MX-VB-1001",
    size: "60 capsules",
    form: "Capsule",
    shortBlurb: "Daily immune support with vitamin C, zinc, and botanicals.",
    description:
      "ImmunoBoost is a pharmacist-curated formula designed for everyday immune resilience. Each capsule blends vitamin C, zinc, and carefully selected botanicals to help you stay ready through busy seasons — without harsh stimulants.",
    highlights: [
      "Clinically inspired vitamin C + zinc blend",
      "Once-daily convenience",
      "No artificial colors",
      "Third-party quality checked",
    ],
    howToUse: [
      "Take 1 capsule daily with food",
      "Best taken in the morning with water",
      "Do not exceed recommended dose",
    ],
    ingredients:
      "Vitamin C (ascorbic acid), Zinc citrate, Elderberry extract, Echinacea, Vegetable capsule, Rice flour.",
    warnings:
      "Consult a pharmacist or physician if pregnant, nursing, or taking medication. Keep out of reach of children.",
  },
  "nutri-core": {
    sku: "MX-VB-1005",
    size: "90 tablets",
    form: "Tablet",
    shortBlurb: "Affordable daily multivitamin essentials for everyday wellness.",
    description:
      "NutriCore Essentials covers foundational micronutrients for adults who want simple, reliable daily support at a smart price.",
    highlights: ["Budget-friendly daily pack", "Essential vitamins & minerals", "Easy-to-swallow tablets"],
    howToUse: ["Take 1 tablet daily with a meal", "Store in a cool, dry place"],
    ingredients: "Vitamin A, B-complex, C, D3, E, Calcium, Magnesium, Iron, Cellulose.",
    warnings: "Iron-containing products can be harmful to children if swallowed. Keep tightly closed.",
  },
  "vital-ease": {
    sku: "MX-VB-1009",
    size: "30 softgels",
    form: "Softgel",
    shortBlurb: "Complete multivitamin softgels for energy and daily balance.",
    description:
      "VitalEase Multivitamins deliver a balanced spectrum of nutrients in an easy softgel format for adults with active routines.",
    highlights: ["Broad-spectrum support", "Softgel absorption", "Once daily"],
    howToUse: ["Take 1 softgel daily with breakfast"],
    ingredients: "Multivitamin & mineral complex, Fish gelatin softgel, Soybean oil.",
    warnings: "Contains fish gelatin. Ask a pharmacist about interactions.",
  },
  "metabo-trim": {
    sku: "MX-NW-2002",
    size: "45 capsules",
    form: "Capsule",
    shortBlurb: "Metabolism-focused herbal blend for active lifestyle support.",
    description:
      "MetaboTrim combines green tea extract and metabolic botanicals to complement diet and exercise — not a miracle pill, a daily wellness partner.",
    highlights: ["Green tea complex", "Caffeine-conscious formula", "Made for routine use"],
    howToUse: ["Take 1 capsule before a meal", "Use with balanced diet and activity"],
    ingredients: "Green tea extract, Chromium, Capsicum, Guarana, Capsule shell.",
    warnings: "Contains caffeine. Not for children or caffeine-sensitive individuals.",
  },
  slimvia: {
    sku: "MX-NW-2006",
    size: "30 capsules",
    form: "Capsule",
    shortBlurb: "New-generation thermogenic support for focused wellness goals.",
    description:
      "Slimvia Burn is crafted for adults seeking a clean thermogenic option alongside nutrition coaching and movement.",
    highlights: ["New formula", "Stimulant-aware dosing", "Pair with protein-rich meals"],
    howToUse: ["Take 1 capsule mid-morning", "Avoid late-evening doses"],
    ingredients: "L-Carnitine, Green coffee, Cayenne, Chromium picolinate.",
    warnings: "Discontinue if you feel jittery. Consult your clinician before use.",
  },
  "derma-glow": {
    sku: "MX-SK-3003",
    size: "50 ml",
    form: "Cream",
    shortBlurb: "Brightening cream for calm, even-looking skin.",
    description:
      "DermaGlow is a lightweight cream that helps support a smoother, brighter look with dermatologist-loved hydrators and gentle actives.",
    highlights: ["15% promotional savings", "Non-greasy finish", "Fragrance-light"],
    howToUse: ["Apply a pea-sized amount morning and night", "Follow with SPF by day"],
    ingredients: "Niacinamide, Hyaluronic acid, Glycerin, Shea butter, Purified water.",
    warnings: "For external use only. Patch test if you have sensitive skin.",
  },
  "acne-shield": {
    sku: "MX-SK-3007",
    size: "40 ml",
    form: "Gel",
    shortBlurb: "Targeted gel for clearer-looking skin routines.",
    description:
      "AcneShield Gel helps manage blemish-prone areas with a clear gel texture that absorbs quickly under moisturizer.",
    highlights: ["Top-rated formula", "Spot or thin-layer use", "Oil-control friendly"],
    howToUse: ["Cleanse, then apply a thin layer", "Start once daily, then increase if tolerated"],
    ingredients: "Salicylic acid 1%, Aloe vera, Witch hazel, Carbomer gel base.",
    warnings: "May cause dryness. Use sunscreen daily. Avoid eye area.",
  },
  "cough-relief": {
    sku: "MX-CF-4004",
    size: "120 ml",
    form: "Syrup",
    shortBlurb: "Soothing syrup for cough and throat comfort.",
    description:
      "CoughRelief Max is formulated to calm cough irritation and support more comfortable breathing during seasonal colds.",
    highlights: ["Adult syrup format", "Honey-soothing profile", "Measured dosing cup"],
    howToUse: ["Adults: 10 ml every 6–8 hours as needed", "Do not exceed 4 doses in 24 hours"],
    ingredients: "Dextromethorphan HBr, Menthol, Honey flavor, Purified water, Sorbitol.",
    warnings: "Do not use with MAOIs. Ask a pharmacist before combining cold medicines.",
  },
  "flu-away": {
    sku: "MX-CF-4008",
    size: "20 tablets",
    form: "Tablet",
    shortBlurb: "Multi-symptom flu relief tablets for busy days.",
    description:
      "FluAway Tabs help ease fever, body aches, and congestion so you can rest and recover with pharmacist-backed OTC care.",
    highlights: ["Multi-symptom relief", "Daytime formula", "Travel-friendly blister"],
    howToUse: ["Take 2 tablets with water every 6 hours", "Max 8 tablets / 24 hours"],
    ingredients: "Acetaminophen, Phenylephrine HCl, Chlorpheniramine maleate.",
    warnings: "Liver warning: contains acetaminophen. Avoid alcohol. Not for children under 12.",
  },
  "baby-calm": {
    sku: "MX-BB-5001",
    size: "200 ml",
    form: "Lotion",
    shortBlurb: "Gentle lotion for delicate baby skin.",
    description:
      "BabyCalm Lotion is fragrance-light and pediatrician-minded for daily moisture on sensitive skin.",
    highlights: ["Gentle care", "Tear-free mindset", "Dermatologically tested"],
    howToUse: ["Apply after bath on clean skin", "Massage gently until absorbed"],
    ingredients: "Purified water, Glycerin, Shea butter, Panthenol, Vitamin E.",
    warnings: "External use only. Stop use if irritation occurs.",
  },
  "little-drops": {
    sku: "MX-BB-5002",
    size: "50 ml",
    form: "Drops",
    shortBlurb: "Vitamin D drops for infants and little ones.",
    description:
      "LittleDrops Vitamin D supports healthy growth routines with an easy dropper for accurate caregiver dosing.",
    highlights: ["Best-seller baby essential", "Precise dropper", "Unflavored"],
    howToUse: ["Follow age guidance on label or pediatric advice", "Mix with milk if preferred"],
    ingredients: "Vitamin D3 in MCT oil.",
    warnings: "Keep dropper clean. Do not exceed labeled dose.",
  },
  "pure-hygiene": {
    sku: "MX-WL-6003",
    size: "Travel kit",
    form: "Kit",
    shortBlurb: "Personal hygiene essentials in one compact kit.",
    description:
      "PureHygiene Kit packs sanitizer, wipes, and care basics for home, work, or travel — curated by Maxim Pharmacy.",
    highlights: ["Ready-to-go kit", "Everyday hygiene", "Gift-friendly"],
    howToUse: ["Use sanitizer on dry hands", "Dispose of wipes properly"],
    ingredients: "See individual item labels inside the kit.",
    warnings: "Flammable sanitizer — keep away from heat and flame.",
  },
  "calm-night": {
    sku: "MX-WL-6004",
    size: "30 gummies",
    form: "Gummy",
    shortBlurb: "Evening wellness gummies for wind-down routines.",
    description:
      "CalmNight Wellness supports a gentler evening routine with botanicals chosen for relaxation — not a sedative medication.",
    highlights: ["12% off", "Sugar-conscious gummies", "Non-habit forming botanicals"],
    howToUse: ["Take 2 gummies 30–60 minutes before bed"],
    ingredients: "Magnesium, L-theanine, Chamomile, Lemon balm, Pectin gummy base.",
    warnings: "May cause drowsiness. Do not drive after use if sleepy.",
  },
  "herbal-balance": {
    sku: "MX-HB-7002",
    size: "20 sachets",
    form: "Tea",
    shortBlurb: "Herbal tea blend for daily balance rituals.",
    description:
      "Herbal Balance Tea is a calming cup for afternoon resets — caffeine-free and crafted with traditional botanicals.",
    highlights: ["New arrival", "Caffeine-free", "Brew in 4 minutes"],
    howToUse: ["Steep 1 sachet in hot water 3–5 minutes", "Enjoy up to 2 cups daily"],
    ingredients: "Peppermint, Lemongrass, Ginger, Hibiscus, Spearmint.",
    warnings: "If you have plant allergies, review ingredients carefully.",
  },
  "green-shield": {
    sku: "MX-HB-7006",
    size: "250 ml",
    form: "Tonic",
    shortBlurb: "Plant-based tonic for seasonal wellness rituals.",
    description:
      "GreenShield Tonic is a concentrated herbal liquid for adults seeking botanical immune-season support.",
    highlights: ["Herbal concentrate", "Shake before use", "Currently restocking"],
    howToUse: ["Mix 15 ml in water once daily", "Shake well before measuring"],
    ingredients: "Echinacea, Astragalus, Ginger, Vegetable glycerin, Purified water.",
    warnings: "Not for use during pregnancy without medical advice.",
  },
  "medikit-pro": {
    sku: "MX-FA-8009",
    size: "72-piece kit",
    form: "Kit",
    shortBlurb: "Complete first-aid kit for home and travel.",
    description:
      "MediKit Pro organizes bandages, antiseptic, and emergency basics so your household is ready for minor injuries.",
    highlights: ["72 essential pieces", "Labeled compartments", "Compact hard case"],
    howToUse: ["Clean wound before dressing", "Replace used items promptly"],
    ingredients: "Assorted sterile dressings, antiseptic wipes, tape, scissors, gloves.",
    warnings: "Seek emergency care for serious injuries or allergic reactions.",
  },
  "quick-bandage": {
    sku: "MX-FA-8005",
    size: "40 count",
    form: "Bandages",
    shortBlurb: "Flexible bandage pack for everyday cuts and scrapes.",
    description:
      "QuickBandage Pack keeps a value assortment of flexible bandages ready in drawers, bags, and glove boxes.",
    highlights: ["Value pack", "Assorted sizes", "Strong adhesive"],
    howToUse: ["Dry skin, apply bandage firmly", "Change daily or if wet"],
    ingredients: "Sterile pad, adhesive fabric / plastic strips.",
    warnings: "Discontinue if skin irritation develops.",
  },
};

export function getProductDetail(id: string): ShopProduct | null {
  const base = getProductById(id);
  if (!base) return null;
  const extra = DETAIL_DEFAULTS[id] ?? {};
  return {
    ...base,
    sku: extra.sku ?? `MX-${base.id.slice(0, 8).toUpperCase()}`,
    size: extra.size ?? "Standard pack",
    form: extra.form ?? "OTC",
    shortBlurb:
      extra.shortBlurb ??
      `${base.name} from Maxim Pharmacy — trusted ${base.category.toLowerCase()} care.`,
    description:
      extra.description ??
      `${base.name} is a Maxim Pharmacy catalog essential in ${base.category}. Quality-checked and ready for discreet delivery.`,
    highlights: extra.highlights ?? [
      "Pharmacist-curated catalog",
      "Secure checkout",
      "Fast local delivery options",
    ],
    howToUse: extra.howToUse ?? [
      "Follow label directions carefully",
      "Ask our pharmacists if unsure",
    ],
    ingredients: extra.ingredients ?? "See packaging for full ingredient list.",
    warnings:
      extra.warnings ??
      "Read all labels. Consult a healthcare professional if you have medical conditions.",
  };
}

export type ShopCategory = {
  id: string;
  label: string;
  icon: string;
  blurb: string;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: "all",
    label: "All Products",
    icon: "fa-border-all",
    blurb: "Full pharmacy catalog",
  },
  {
    id: "vitamins",
    label: "Vitamins & Minerals",
    icon: "fa-capsules",
    blurb: "Daily energy foundations",
  },
  {
    id: "nutrition",
    label: "Nutrition & Weight",
    icon: "fa-leaf",
    blurb: "Metabolism & wellness",
  },
  {
    id: "skin",
    label: "Skin Essentials",
    icon: "fa-spa",
    blurb: "Calm, healthy skin care",
  },
  {
    id: "cold-flu",
    label: "Cold & Flu Care",
    icon: "fa-head-side-cough",
    blurb: "Fast seasonal relief",
  },
  {
    id: "baby",
    label: "Baby Care",
    icon: "fa-baby",
    blurb: "Gentle childcare essentials",
  },
  {
    id: "wellness",
    label: "Personal Wellness",
    icon: "fa-heart-pulse",
    blurb: "Hygiene & everyday care",
  },
  {
    id: "herbal",
    label: "Herbal Remedies",
    icon: "fa-seedling",
    blurb: "Plant-based support",
  },
  {
    id: "first-aid",
    label: "First Aid",
    icon: "fa-kit-medical",
    blurb: "Home medical supplies",
  },
];

/** Map promo / marquee query values → category ids */
const CATEGORY_ALIASES: Record<string, string> = {
  all: "all",
  vitamins: "vitamins",
  vitamin: "vitamins",
  minerals: "vitamins",
  nutrition: "nutrition",
  weight: "nutrition",
  skin: "skin",
  cream: "skin",
  "cold-flu": "cold-flu",
  cold: "cold-flu",
  flu: "cold-flu",
  syrup: "cold-flu",
  tablet: "cold-flu",
  baby: "baby",
  childcare: "baby",
  wellness: "wellness",
  hygiene: "wellness",
  herbal: "herbal",
  "first-aid": "first-aid",
  firstaid: "first-aid",
};

export function resolveCategoryId(raw?: string | null): string {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  return CATEGORY_ALIASES[key] ?? "all";
}

export const shopProducts: ShopProduct[] = [
  {
    id: "immuno-boost",
    name: "ImmunoBoost",
    categoryId: "vitamins",
    category: "Vitamins & Minerals",
    image: "/assets/images/best-product1.png",
    price: 63,
    was: 75,
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    badgeTone: "hot",
    inStock: true,
  },
  {
    id: "nutri-core",
    name: "NutriCore Essentials",
    categoryId: "vitamins",
    category: "Vitamins & Minerals",
    image: "/assets/images/best-product5.png",
    price: 12,
    was: 18,
    rating: 4.8,
    reviews: 341,
    badge: "Value",
    badgeTone: "teal",
    inStock: true,
  },
  {
    id: "vital-ease",
    name: "VitalEase Multivitamins",
    categoryId: "vitamins",
    category: "Vitamins & Minerals",
    image: "/assets/images/best-product9.png",
    price: 48,
    was: null,
    rating: 4.7,
    reviews: 112,
    badge: null,
    badgeTone: "navy",
    inStock: true,
  },
  {
    id: "metabo-trim",
    name: "MetaboTrim",
    categoryId: "nutrition",
    category: "Nutrition & Weight",
    image: "/assets/images/best-product2.png",
    price: 87,
    was: null,
    rating: 4.7,
    reviews: 96,
    badge: "Popular",
    badgeTone: "navy",
    inStock: true,
  },
  {
    id: "slimvia",
    name: "Slimvia Burn",
    categoryId: "nutrition",
    category: "Nutrition & Weight",
    image: "/assets/images/best-product6.png",
    price: 26,
    was: null,
    rating: 4.5,
    reviews: 58,
    badge: "New",
    badgeTone: "new",
    inStock: true,
  },
  {
    id: "derma-glow",
    name: "DermaGlow",
    categoryId: "skin",
    category: "Skin Essentials",
    image: "/assets/images/best-product3.png",
    price: 55,
    was: 64,
    rating: 4.9,
    reviews: 214,
    badge: "15% OFF",
    badgeTone: "sale",
    inStock: true,
  },
  {
    id: "acne-shield",
    name: "AcneShield Gel",
    categoryId: "skin",
    category: "Skin Essentials",
    image: "/assets/images/best-product7.png",
    price: 82,
    was: 95,
    rating: 4.8,
    reviews: 167,
    badge: "Top Rated",
    badgeTone: "navy",
    inStock: true,
  },
  {
    id: "cough-relief",
    name: "CoughRelief Max",
    categoryId: "cold-flu",
    category: "Cold & Flu Care",
    image: "/assets/images/best-product4.png",
    price: 42,
    was: null,
    rating: 4.6,
    reviews: 73,
    badge: null,
    badgeTone: "navy",
    inStock: true,
  },
  {
    id: "flu-away",
    name: "FluAway Tabs",
    categoryId: "cold-flu",
    category: "Cold & Flu Care",
    image: "/assets/images/best-product8.png",
    price: 36,
    was: null,
    rating: 4.7,
    reviews: 89,
    badge: null,
    badgeTone: "navy",
    inStock: true,
  },
  {
    id: "baby-calm",
    name: "BabyCalm Lotion",
    categoryId: "baby",
    category: "Baby Care",
    image: "/assets/images/product1.png",
    price: 22,
    was: 28,
    rating: 4.8,
    reviews: 64,
    badge: "Gentle",
    badgeTone: "teal",
    inStock: true,
  },
  {
    id: "little-drops",
    name: "LittleDrops Vitamin D",
    categoryId: "baby",
    category: "Baby Care",
    image: "/assets/images/product2.png",
    price: 19,
    was: null,
    rating: 4.9,
    reviews: 141,
    badge: "Best Seller",
    badgeTone: "hot",
    inStock: true,
  },
  {
    id: "pure-hygiene",
    name: "PureHygiene Kit",
    categoryId: "wellness",
    category: "Personal Wellness",
    image: "/assets/images/product3.png",
    price: 34,
    was: null,
    rating: 4.6,
    reviews: 52,
    badge: null,
    badgeTone: "navy",
    inStock: true,
  },
  {
    id: "calm-night",
    name: "CalmNight Wellness",
    categoryId: "wellness",
    category: "Personal Wellness",
    image: "/assets/images/product4.png",
    price: 29,
    was: 35,
    rating: 4.5,
    reviews: 88,
    badge: "12% OFF",
    badgeTone: "sale",
    inStock: true,
  },
  {
    id: "herbal-balance",
    name: "Herbal Balance Tea",
    categoryId: "herbal",
    category: "Herbal Remedies",
    image: "/assets/images/best-product2.png",
    price: 24,
    was: null,
    rating: 4.4,
    reviews: 47,
    badge: "New",
    badgeTone: "new",
    inStock: true,
  },
  {
    id: "green-shield",
    name: "GreenShield Tonic",
    categoryId: "herbal",
    category: "Herbal Remedies",
    image: "/assets/images/best-product6.png",
    price: 39,
    was: 45,
    rating: 4.6,
    reviews: 71,
    badge: null,
    badgeTone: "navy",
    inStock: false,
  },
  {
    id: "medikit-pro",
    name: "MediKit Pro",
    categoryId: "first-aid",
    category: "First Aid",
    image: "/assets/images/best-product9.png",
    price: 54,
    was: null,
    rating: 4.8,
    reviews: 103,
    badge: "Essential",
    badgeTone: "navy",
    inStock: true,
  },
  {
    id: "quick-bandage",
    name: "QuickBandage Pack",
    categoryId: "first-aid",
    category: "First Aid",
    image: "/assets/images/best-product5.png",
    price: 14,
    was: 18,
    rating: 4.7,
    reviews: 210,
    badge: "Value",
    badgeTone: "teal",
    inStock: true,
  },
];

export type PriceBand = "any" | "under25" | "25to50" | "over50";
export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "name";

export type ShopFilterState = {
  categoryId: string;
  query: string;
  sort: SortKey;
  priceBand: PriceBand;
  onSaleOnly: boolean;
  inStockOnly: boolean;
};

export function countByCategory(categoryId: string): number {
  if (categoryId === "all") return shopProducts.length;
  return shopProducts.filter((p) => p.categoryId === categoryId).length;
}

export function filterShopProducts(state: ShopFilterState): ShopProduct[] {
  const q = state.query.trim().toLowerCase();

  let list = shopProducts.filter((p) => {
    const catOk = state.categoryId === "all" || p.categoryId === state.categoryId;
    const qOk =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.categoryId.includes(q);
    const saleOk = !state.onSaleOnly || (p.was != null && p.was > p.price);
    const stockOk = !state.inStockOnly || p.inStock;

    let priceOk = true;
    if (state.priceBand === "under25") priceOk = p.price < 25;
    if (state.priceBand === "25to50") priceOk = p.price >= 25 && p.price <= 50;
    if (state.priceBand === "over50") priceOk = p.price > 50;

    return catOk && qOk && saleOk && stockOk && priceOk;
  });

  if (state.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (state.sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  if (state.sort === "name") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}
