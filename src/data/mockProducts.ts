import { Product } from "@/types";

/**
 * Categories and specific products (iPhone 17, Galaxy S25 Ultra, MacBook,
 * OnePlus 15, and — per a customer testimonial on 1fi.in mentioning
 * financing a Royal Enfield — two-wheelers) are drawn from 1Fi's actual
 * "Best Sellers" rail on 1fi.in, not invented generically.
 *
 * Per 1Fi's real "No-Cost EMI" model (confirmed on 1fi.in: 0% interest, zero
 * processing/foreclosure/penal charges, tenures from a few months up to
 * multiple years), every plan below carries 0% interest and 0 fees. Do not
 * add interest to these without confirming the real app charges it anywhere
 * — as of the marketing site, it explicitly does not.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "iPhone 17",
    brand: "Apple",
    category: "Smartphones",
    images: [
      "https://picsum.photos/seed/iphone17a/600/600",
      "https://picsum.photos/seed/iphone17b/600/600",
    ],
    basePrice: 79900,
    rating: 4.7,
    reviewCount: 2140,
    description:
      "A19 chip, 48MP dual camera system, all-day battery life. Available on 0% interest No-Cost EMI, backed by your mutual funds.",
    inStock: true,
    variants: [
      { id: "v1", label: "128GB / Black", priceDelta: 0, inStock: true },
      { id: "v2", label: "256GB / Black", priceDelta: 10000, inStock: true },
      { id: "v3", label: "256GB / Lavender", priceDelta: 10000, inStock: true },
    ],
    emiPlans: [
      { id: "e1", tenureMonths: 3, interestRatePercent: 0, processingFee: 0 },
      { id: "e2", tenureMonths: 6, interestRatePercent: 0, processingFee: 0 },
      { id: "e3", tenureMonths: 12, interestRatePercent: 0, processingFee: 0 },
    ],
  },
  {
    id: "p2",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    images: ["https://picsum.photos/seed/galaxys25/600/600"],
    basePrice: 99999,
    rating: 4.5,
    reviewCount: 1876,
    description:
      "200MP camera, Snapdragon flagship chip, S Pen included. Instant eligibility check, no CIBIL impact.",
    inStock: true,
    variants: [
      { id: "v1", label: "256GB / Titanium Black", priceDelta: 0, inStock: true },
      { id: "v2", label: "512GB / Titanium Grey", priceDelta: 12000, inStock: true },
    ],
    emiPlans: [
      { id: "e1", tenureMonths: 3, interestRatePercent: 0, processingFee: 0 },
      { id: "e2", tenureMonths: 9, interestRatePercent: 0, processingFee: 0 },
      { id: "e3", tenureMonths: 12, interestRatePercent: 0, processingFee: 0 },
    ],
  },
  {
    id: "p3",
    name: "OnePlus 15",
    brand: "OnePlus",
    category: "Smartphones",
    images: ["https://picsum.photos/seed/oneplus15/600/600"],
    basePrice: 64999,
    rating: 4.4,
    reviewCount: 942,
    description:
      "Snapdragon flagship, 100W fast charging, Hasselblad camera tuning. Instant approval on eligible mutual fund portfolios.",
    inStock: true,
    variants: [
      { id: "v1", label: "256GB / Sand Storm", priceDelta: 0, inStock: true },
      { id: "v2", label: "512GB / Infinite Black", priceDelta: 6000, inStock: false },
    ],
    emiPlans: [
      { id: "e1", tenureMonths: 3, interestRatePercent: 0, processingFee: 0 },
      { id: "e2", tenureMonths: 6, interestRatePercent: 0, processingFee: 0 },
    ],
  },
  {
    id: "p4",
    name: "MacBook Pro 14\"",
    brand: "Apple",
    category: "Laptops",
    images: ["https://picsum.photos/seed/macbookpro/600/600"],
    basePrice: 169900,
    rating: 4.8,
    reviewCount: 754,
    description:
      "M-series chip, Liquid Retina XDR display, all-day battery. Longer tenures available for higher-ticket purchases like this one.",
    inStock: true,
    variants: [
      { id: "v1", label: "512GB / Space Black", priceDelta: 0, inStock: true },
      { id: "v2", label: "1TB / Space Black", priceDelta: 20000, inStock: true },
    ],
    emiPlans: [
      { id: "e1", tenureMonths: 6, interestRatePercent: 0, processingFee: 0 },
      { id: "e2", tenureMonths: 12, interestRatePercent: 0, processingFee: 0 },
      { id: "e3", tenureMonths: 24, interestRatePercent: 0, processingFee: 0 },
    ],
  },
  {
    id: "p5",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    category: "Two-Wheelers",
    images: ["https://picsum.photos/seed/re350/600/600"],
    basePrice: 224000,
    rating: 4.6,
    reviewCount: 388,
    description:
      "Retro styling, 349cc single-cylinder engine. A real 1Fi customer financed exactly this bike via mutual-fund-backed EMI.",
    inStock: true,
    variants: [
      { id: "v1", label: "Chrome / Black", priceDelta: 0, inStock: true },
      { id: "v2", label: "Halcyon / Green", priceDelta: 8000, inStock: true },
    ],
    emiPlans: [
      { id: "e1", tenureMonths: 12, interestRatePercent: 0, processingFee: 0 },
      { id: "e2", tenureMonths: 24, interestRatePercent: 0, processingFee: 0 },
    ],
  },
  {
    id: "p6",
    name: "SoundWave ANC Headphones",
    brand: "SoundWave",
    category: "Electronics",
    images: ["https://picsum.photos/seed/headphones1/600/600"],
    basePrice: 8999,
    rating: 4.3,
    reviewCount: 1290,
    description: "Active noise cancellation, 40-hour battery life, hi-res audio certified.",
    inStock: false,
    variants: [
      { id: "v1", label: "Black", priceDelta: 0, inStock: false },
      { id: "v2", label: "Blue", priceDelta: 0, inStock: true },
    ],
    emiPlans: [{ id: "e1", tenureMonths: 3, interestRatePercent: 0, processingFee: 0 }],
  },
];
