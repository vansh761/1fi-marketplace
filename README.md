# 1Fi Marketplace — Shop Page Assignment

A React Native (Expo) implementation of the Shop page with a fully built
**1Fi Marketplace** section, per the assignment spec. "Top Brands" and
"Nearby Stores" are intentionally blank, as specified.

## What the real Shop page looks like (from actual screenshots)

Working from screenshots of the live app, not guesses:

- **Hero banner**: purple gradient card, a "✦ NO-COST EMIs" pill badge, the
  headline "Shop today, *Pay later using* Mutual funds." (middle line
  italic), subtext "No credit score required. No interest. Backed by your
  investments.", and an illustration of a phone/laptop/car/bike spilling out
  of a gold shopping bag. Copy is transcribed verbatim in
  `MarketplaceHero.tsx`; the illustration itself is substituted with an
  icon cluster since the real 3D asset can't be recreated faithfully —
  flagged clearly in that file's comments.
- **The real Shop page currently has only 2 tabs** — Top Brands and Nearby
  Stores. "1Fi Marketplace" doesn't exist in the live app yet, which matches
  the assignment: you're adding it as a genuinely new 3rd tab, not filling
  in an existing one.
- **Segmented tab style**: lavender track, active tab is a white pill with
  purple bold text and a small purple underline mark, inactive tabs are
  plain gray text — implemented in `SegmentedTabs.tsx`.
- **Search bar** sits directly below the tabs, with placeholder text that
  changes per tab ("Search online stores..." for Top Brands, "Search
  stores..." for Nearby Stores; "Search products..." for Marketplace here).
- **List card style**: white rounded cards (large radius), a square logo/
  image in the top-left, bold black title, gray subtitle. Crucially, the
  real subtitle copy is **"No-cost EMIs upto N months"** — not a computed
  monthly amount — so `ProductCard.tsx` was changed to match that exact
  pattern instead of showing an invented "EMI from ₹X/mo" hint.
- **Bottom nav is 5 tabs**: Home, Shop, EMI Dues, Limit, Profile, as a
  floating white pill bar with the active tab in purple and a small purple
  bar above its icon. The project now has a real bottom tab navigator
  (`FloatingTabBar.tsx`) instead of treating Shop as a standalone screen —
  Home/EMI Dues/Limit/Profile are explicit out-of-scope placeholders so the
  navigation shell feels real without pretending to build features that
  weren't asked for.
- **Hero illustration**: this now uses the actual illustration cropped
  directly from a real screenshot (`assets/hero-illustration.png`), not a
  redrawn substitute. One thing worth knowing: it's sourced from a phone
  screenshot rather than the original design file, so it won't be
  perfectly crisp on every screen density — that's an inherent limit of
  working from a screenshot, not something to chase further. If this repo
  ever becomes a general portfolio piece beyond this specific assignment,
  swap it for original artwork — using a company's proprietary illustration
  is fine for a scoped evaluation exercise like this, less fine for a
  public portfolio piece that outlives the assignment.
- **Eligibility check**: tapping "Proceed" now walks through what the real
  1Fi flow actually does — mobile number + PAN entry with basic format
  validation, a simulated "checking eligibility" state, then an approved
  summary. There's no real backend/KYC service behind this (out of scope
  for the assignment), but the shape of the flow matches the real product's
  mechanism instead of inventing a generic checkout that doesn't exist in
  the real app.

## What 1Fi actually is (confirmed from the Play Store listing and 1fi.in)

1Fi is **not** a general e-commerce marketplace — it's a Buy-Now-Pay-Later
platform where users pledge mutual fund units as collateral to unlock a
spending limit, then shop at partner merchants using **0% interest,
zero-fee "No-Cost EMI"** (no processing fee, no foreclosure charge, no
CIBIL check). Confirmed product categories from their real "Best Sellers"
rail: iPhones, Samsung Galaxy, OnePlus, MacBooks, and (per a customer
testimonial) two-wheelers like a Royal Enfield. The mock catalog in this
project reflects that — every EMI plan is 0% interest, matching the real
product, not the interest-bearing plans a generic BNPL clone would have.

Their brand primary color, `#6C28D9` (purple), is pulled directly from the
`theme-color` meta tag on 1fi.in and is already wired into `theme.ts`. This
is a real signal, not a guess — but it's from the marketing site, not a
screenshot of the app itself, so still worth a quick visual sanity-check
against the actual Shop page once you've downloaded it.

The real user flow also includes an eligibility check and mutual-fund
pledging step before checkout — that's out of scope here per the
assignment ("no implementation required" doesn't apply, but the spec only
asks for browsing + EMI selection + a CTA to proceed, not the full lending
flow), so the "Proceed" button here stops at plan confirmation rather than
simulating fund pledging.

## Why this stack

The assignment doesn't mandate native Android — it asks for consistency
with the app's UI/UX and clean engineering. React Native + Expo gives:
- A single codebase you can test instantly on a real Android phone via the
  **Expo Go** app (scan a QR code, no Android Studio, no build step).
- Idiomatic React patterns (hooks, component composition, a query library)
  that map directly to standard mobile engineering practice.

## Run it

```bash
npm install
npx expo start
```
Scan the QR code with the Expo Go app (Play Store) on your Android phone,
or press `w` to preview in a browser.

## Architecture

```
src/
  theme/       design tokens (colors, spacing, type) — swap these for the
               real 1Fi palette after inspecting the app, and every screen
               updates automatically
  types/       shared TS interfaces for Product / Variant / EMIPlan
  data/        mock catalog (stands in for a backend)
  services/    api.ts — async functions shaped like real REST calls
               (delay + simulated failure rate), plus the EMI math
  hooks/       useProducts / useProduct — React Query wrappers that give
               screens loading/error/data for free
  components/  ProductCard, EMIPlanCard, PriceTag, skeleton loader,
               error state, segmented tabs — all reusable, no
               business logic baked in
  screens/     ShopScreen -> MarketplaceListScreen -> ProductDetailScreen
  navigation/  React Navigation stack
```

**Data flow:** screens never touch `mockProducts.ts` directly — they go
through `services/api.ts` via a `useQuery` hook. This is the "avoid
hardcoding, retrieve dynamically" requirement: point `fetchProducts` /
`fetchProductById` at a real endpoint and nothing else in the app needs to
change.

**EMI calculation** is a pure function (`calculateEMI`) separate from data
fetching, so it's trivially testable and reusable anywhere a price needs
to be shown.

**Loading / error states** are explicit and visible, not swallowed:
skeleton loaders on the grid, a retry-capable error view, an empty state,
and pull-to-refresh — plus a ~8% simulated random failure rate in the mock
API so you can actually see these states without special-casing anything.

## Before you submit — remaining polish

1. **Hero illustration**: swap the icon-cluster placeholder in
   `MarketplaceHero.tsx` for the real 3D illustration, or a cropped
   screenshot region, if you have 15 minutes — everything else in that
   component (copy, layout, colors) is already transcribed from the real
   screen.
2. **Exact font**: match the real app's font family if it's not a system
   default (check via a font-identifier app or just eyeball it against your
   screenshots) — `theme.typography` is the one place to change it.
3. **Tab bar overlap**: the floating bottom tab bar currently stays visible
   on the product detail screen (padding was added so it doesn't cover the
   "Proceed" button). A more polished version would hide the tab bar
   entirely on that screen — worth doing if you have spare time, not
   required.
4. Replace `picsum.photos` placeholder images with real product photos if
   you have time, or leave them — they're clearly placeholder imagery and
   the important thing is the data flowing dynamically, not a specific CDN.

## What to submit

- This repo, pushed to GitHub (public or with reviewer access granted).
- A short screen recording (60–90s) of the flow: Shop → Marketplace →
  product → pick a variant → pick an EMI plan → Proceed. This
  de-risks the "did it actually run" question for the reviewer.
- The Google Form with the repo link, before 8 Sept 2026.
