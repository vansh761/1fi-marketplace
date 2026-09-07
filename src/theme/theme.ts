/**
 * Design tokens.
 *
 * `primary` below (#6C28D9) is 1Fi's real brand color — pulled from the
 * theme-color meta tag on 1fi.in, their official marketing site. This is a
 * strong signal but NOT a substitute for actually opening the app: marketing
 * site branding and in-app UI occasionally diverge slightly, and things like
 * exact card radius, spacing, and font family can only be confirmed by
 * screenshotting the real Shop page. Treat this as a verified starting point,
 * not a finished match — spend 10 minutes confirming against the app itself.
 */

export const theme = {
  colors: {
    background: "#F5F5F7", // matches the light grey shown behind cards in real screenshots
    surface: "#FFFFFF",
    primary: "#6C28D9", // confirmed against real Shop page screenshots (hero + active tab + active nav)
    primaryLight: "#EFE7FB", // segmented-tab track / chip background, sampled from screenshots
    heroGradientStart: "#4C1D95", // dark violet corner of the hero banner
    heroGradientEnd: "#7C3AED", // lighter violet corner of the hero banner
    accent: "#16A34A",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    success: "#16A34A",
    error: "#DC2626",
    disabled: "#D1D5DB",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    pill: 999,
  },
  typography: {
    h1: { fontSize: 24, fontWeight: "700" as const },
    h2: { fontSize: 18, fontWeight: "700" as const },
    body: { fontSize: 14, fontWeight: "400" as const },
    caption: { fontSize: 12, fontWeight: "400" as const },
    button: { fontSize: 15, fontWeight: "600" as const },
  },
  shadow: {
    card: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
  },
};

export type Theme = typeof theme;
