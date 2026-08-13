/**
 * Shared "premium academy" palette for the About and Contact pages.
 *
 * Defined locally (not merged into the global theme.js) so this specific
 * visual direction doesn't ripple into Home/Courses/Auth pages that use
 * the mandatory brand palette. Both About and Contact import this same
 * file so they read as one cohesive brand rather than two different
 * redesigns.
 */
export const premium = {
  navy: "#07111F",
  navyDeep: "#050B14",
  navySoft: "#0D1B2E",
  blue: "#2563EB",
  cyan: "#22D3EE",
  purple: "#7C3AED",
  white: "#FFFFFF",
  gray: "#94A3B8",
  grayLight: "#CBD5E1",

  // Glassmorphism surface tokens
  glassBg: "rgba(255,255,255,0.06)",
  glassBgLight: "rgba(255,255,255,0.85)",
  glassBorder: "rgba(255,255,255,0.14)",
  glassBorderLight: "rgba(15,23,42,0.08)",

  // Light-section text (used on white/glassBgLight surfaces)
  textOnLight: "#0F172A",
  textOnLightSecondary: "#475569",
};

export default premium;
