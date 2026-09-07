# 1Fi Marketplace
 
An implementation of the **1Fi Marketplace** section on the Shop page, built for the SDE Intern assignment. Product browsing, variant selection, EMI plan selection, and an eligibility-check CTA — built to match the real app's UI and actual business model, not a generic e-commerce clone.
 
## Setup
 
```bash
npm install
npx expo start
```
 
Scan the QR code with the **Expo Go** app on Android, or press `a` with a device connected via USB. No Android Studio or build step required.
 
## Product understanding
 
1Fi isn't a general marketplace — it's a platform where users pledge mutual fund units as collateral to unlock a spending limit, then shop at partner merchants on **0% interest, zero-fee "No-Cost EMI"** (confirmed from the Play Store listing and 1fi.in: no processing fee, no CIBIL check). That shaped three concrete decisions here rather than defaulting to a generic BNPL template:
 
- **Every EMI plan in the mock catalog is 0% interest.** A generic clone would have plans charging interest at longer tenures; this one doesn't, because the real product doesn't.
- **Product catalog** (iPhone 17, Galaxy S25 Ultra, OnePlus 15, MacBook Pro, even a Royal Enfield) is drawn from 1Fi's actual "Best Sellers" rail and a customer testimonial on their site, not invented categories.
- **The "Proceed" flow asks for mobile number + PAN**, because that's how 1Fi's real eligibility check works — an identity-based instant approval, not a card/UPI payment form. Building a fake checkout page would have actively misrepresented how the product works.
## UI/UX consistency
 
Built from actual screenshots of the live Shop page, not guesses:
 
| Element | Source of truth |
|---|---|
| Hero banner copy, badge, layout | Transcribed verbatim from a screenshot |
| Hero illustration | Cropped directly from the same screenshot (`assets/hero-illustration.png`) |
| Brand color `#6C28D9` | Confirmed from 1fi.in's theme-color metadata |
| Segmented tab style (lavender track, white active pill + underline) | Matched from screenshot |
| Card copy pattern — **"No-cost EMIs upto N months"** | The real app's actual subtitle wording, not an invented price hint |
| Bottom nav (Home / Shop / EMI Dues / Limit / Profile, floating pill) | Matched from screenshot; Shop is the only functional tab, the rest are labeled placeholders so the nav shell feels real without pretending to build out-of-scope features |
 
The Shop page's other two options — **Top Brands** and **Nearby Stores** — are left intentionally blank, exactly as the assignment specifies. Note: the live app currently only has these two tabs; **1Fi Marketplace is a genuinely new third tab added here**, not an existing one being filled in.
 
## Engineering quality
 
**Data flow is one-directional and mock-swappable:**
 
```
data/mockProducts.ts → services/api.ts → hooks/ (React Query) → screens
```
 
`MOCK_PRODUCTS` is imported in exactly one place: `services/api.ts`. No screen or component ever touches it directly — they only call `useProducts()` / `useProduct(id)`. `fetchProducts()` and `fetchProductById()` are `async`, simulate real network delay, and simulate an ~8% random failure rate. Point those two functions at a real endpoint and nothing else in the app changes.
 
**State management** uses React Query rather than ad-hoc `useState` + `useEffect` fetching — loading, error, caching, and refetch all come from the library instead of being hand-rolled per screen.
 
**EMI math** (`calculateEMI`) is a pure function, decoupled from data-fetching, independently testable.
 
**Component reusability**: `ProductCard`, `EMIPlanCard`, `PriceTag`, `SegmentedTabs`, `SearchBar` carry no business logic — they're pure presentation, driven entirely by props.
 
```
src/
  theme/        design tokens — one file controls color/spacing/type app-wide
  types/        shared TS interfaces (Product, Variant, EMIPlan)
  data/         mock catalog
  services/     api.ts (async, swappable), EMI calculation
  hooks/        useProducts / useProduct — React Query wrappers
  components/   reusable, presentation-only
  screens/      Shop → Marketplace list → Product detail
  navigation/   bottom tabs (Home/Shop/EMI Dues/Limit/Profile) + Shop stack
```
 
## Functionality
 
Full flow: Shop → 1Fi Marketplace tab → browse/search products → open a product → select a variant (price updates live) → select an EMI plan (monthly amount recalculates) → Proceed → mobile + PAN entry with format validation → simulated eligibility check → confirmation summary.
 
Out-of-stock products and variants are visibly disabled, not just hidden.
 
## Data/API implementation
 
Mock API layer in `services/api.ts` is deliberately shaped like a real REST client — async, latent, fallible — specifically so the loading and error states below aren't theoretical.
 
## Attention to detail
 
- **Loading**: skeleton placeholders on the product grid, spinner on product detail.
- **Error**: dedicated error view with retry, triggered by the mock API's simulated failure rate — not just a happy-path demo.
- **Empty state**: distinct messaging for "no products" vs. "no results for your search."
- **Responsiveness**: 2-column grid, `SafeAreaView` throughout, tested on a physical Android device via Expo Go.
- **Search**: live filtering by product name, brand, and category.
- **Pull-to-refresh** on the product grid.
## Known scope boundaries (intentional, not oversights)
 
- **Top Brands / Nearby Stores**: blank, per the assignment's explicit instruction.
- **Mutual fund pledging / actual KYC verification**: the real app's next step after eligibility approval. No real backend exists for this assignment, so the flow stops at a clearly-labeled confirmation summary rather than simulating a lending process that would require real financial infrastructure to do honestly.
- **Hero illustration**: sourced from a compressed phone screenshot rather than the original design asset, so it won't be pixel-crisp at every screen density.
