import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { EMIBreakdown, EMIPlan, Product } from "@/types";

const NETWORK_DELAY_MS = 700;

/**
 * Simulates network latency + occasional failure so the UI is forced to
 * handle real loading/error states instead of always taking the happy path.
 * Set FORCE_ERROR_RATE to 0 to disable random failures during a demo.
 */
const FORCE_ERROR_RATE = 0.08;

class ApiError extends Error {
  constructor(message: string, public status = 500) {
    super(message);
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateRequest<T>(resolveValue: () => T): Promise<T> {
  await delay(NETWORK_DELAY_MS);
  if (Math.random() < FORCE_ERROR_RATE) {
    throw new ApiError("Something went wrong while fetching data. Please try again.");
  }
  return resolveValue();
}

/**
 * GET /marketplace/products
 * Replace the body of this function with a real fetch() call to swap in
 * a live backend without touching any calling code (hooks/screens).
 */
export async function fetchProducts(params?: { category?: string }): Promise<Product[]> {
  return simulateRequest(() => {
    if (params?.category) {
      return MOCK_PRODUCTS.filter((p) => p.category === params.category);
    }
    return MOCK_PRODUCTS;
  });
}

/**
 * GET /marketplace/products/:id
 */
export async function fetchProductById(id: string): Promise<Product> {
  return simulateRequest(() => {
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new ApiError(`Product ${id} not found`, 404);
    }
    return product;
  });
}

/**
 * Pure calculation, kept separate from data-fetching so it's independently
 * testable and reusable anywhere a price needs to be shown (list, detail,
 * cart, confirmation).
 */
export function calculateEMI(principal: number, plan: EMIPlan): EMIBreakdown {
  const interestAmount = principal * (plan.interestRatePercent / 100) * (plan.tenureMonths / 12);
  const totalPayable = principal + interestAmount + plan.processingFee;
  const monthlyAmount = Math.round((principal + interestAmount) / plan.tenureMonths);

  return {
    planId: plan.id,
    tenureMonths: plan.tenureMonths,
    monthlyAmount,
    totalPayable: Math.round(totalPayable),
    interestAmount: Math.round(interestAmount),
    processingFee: plan.processingFee,
  };
}

export { ApiError };
