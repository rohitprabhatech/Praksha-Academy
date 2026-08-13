import { colors } from "../../theme/theme";

/**
 * Contact page palette — extends the shared, mandatory theme.js tokens
 * with the navy/bright-blue accents this redesign uses. Defined locally
 * rather than added to theme.js so the global design-token file (used
 * across Home/Courses/Auth) isn't touched for a single page's treatment.
 *
 * primaryBlue and secondaryAmber below are pulled straight from theme.js
 * so this page stays on-brand — only navy and brightBlue are new.
 */
export const contactPalette = {
  navy: "#0B1F3A",
  navyLight: "#122A4D",
  blue: colors.primaryBlue, // #2563EB
  brightBlue: "#3B82F6",
  amber: colors.secondaryOrange, // #F59E0B
  background: "#F7F9FC",
  white: "#FFFFFF",
  textPrimary: "#172033",
  textSecondary: colors.textSecondary, // #64748B
  border: colors.borderColor, // #E2E8F0
};

export default contactPalette;
