export interface ProductVariant {
  id: string;
  label: string; // e.g. "128GB / Midnight Black"
  priceDelta: number; // added to basePrice
  inStock: boolean;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  // 1Fi's real product is 0% interest / zero fees ("No-Cost EMI") across the
  // board — kept as fields (not hardcoded to 0 in the calc) so the UI still
  // works correctly if a future backend ever returns a non-zero value.
  interestRatePercent: number;
  processingFee: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  images: string[];
  basePrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  inStock: boolean;
}

export interface EMIBreakdown {
  planId: string;
  tenureMonths: number;
  monthlyAmount: number;
  totalPayable: number;
  interestAmount: number;
  processingFee: number;
}

export type AsyncStatus = "idle" | "loading" | "success" | "error";
