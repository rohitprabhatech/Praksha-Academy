import { colors } from "./theme";

/**
 * "Praksha Academy EdTech" palette — per the approved reference design
 * (dark navy hero, light body sections, blue/cyan/purple accents).
 *
 * `blue` is pulled straight from the mandatory company palette in
 * theme.js (#2563EB matches exactly), so the core brand color stays
 * consistent with the rest of the site. Navy/cyan/purple are the
 * reference design's explicit hero/accent palette, used only within
 * About/Contact — not merged into the global theme.js, so this specific
 * visual direction doesn't ripple into Home/Courses/Auth.
 */
export const premium = {
  // Hero-only dark surface (body sections stay light — see `background` below)
  heroBg: "#0A1128",
  heroBgSecondary: "#1E293B",

  // Light body sections
  background: colors.pageBackground, // #F8FAFC
  sectionBg: colors.sectionBackground, // #F1F5F9
  cardBg: colors.cardBackground, // #FFFFFF

  // Brand accents
  blue: colors.primaryBlue, // #2563EB — matches theme.js exactly
  blueHover: colors.primaryBlueHover, // #1D4ED8
  blueLight: "#3B82F6",
  cyan: "#22D3EE",
  purple: "#7C3AED",
  orange: colors.secondaryOrange, // #F59E0B — kept for anywhere the base theme still needs it
  green: colors.successGreen, // #22C55E
  red: colors.errorRed, // #EF4444

  // Text
  textPrimary: colors.textPrimary, // #1E293B
  textSecondary: colors.textSecondary, // #64748B
  textLight: colors.textLight, // #94A3B8
  white: "#FFFFFF",

  // Borders / glass surfaces
  border: colors.borderColor, // #E2E8F0
  glassBg: "rgba(255,255,255,0.7)",
  glassBorder: "rgba(37,99,235,0.12)",
  glassBgDark: "rgba(255,255,255,0.06)",
  glassBorderDark: "rgba(255,255,255,0.14)",
};

export default premium;
