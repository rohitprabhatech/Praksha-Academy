import { motion, useReducedMotion } from "framer-motion";
import { Box } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * Reusable glassmorphism surface. `tone="dark"` for use on the navy hero
 * (translucent white glass), `tone="light"` for use on white/gray page
 * sections (higher-opacity white glass with a soft border) so text stays
 * readable in both contexts.
 */
const GlassCard = ({ children, tone = "light", hoverLift = true, sx = {}, ...rest }) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = tone === "dark";

  return (
    <Box
      component={motion.div}
      whileHover={hoverLift && !prefersReducedMotion ? { y: -6 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      sx={{
        position: "relative",
        borderRadius: "18px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: isDark ? premium.glassBg : premium.glassBgLight,
        border: `1px solid ${isDark ? premium.glassBorder : premium.glassBorderLight}`,
        boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 8px 28px rgba(15,23,42,0.08)",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
