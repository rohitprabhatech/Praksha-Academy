import { motion, useReducedMotion } from "framer-motion";
import { Box } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * Reusable glassmorphism surface for the light theme — translucent white
 * with a soft blue-tinted border, readable dark text on top.
 *
 * The hover-lift animation lives on a plain motion.div wrapper, kept
 * separate from the styled MUI <Box>. Rendering Box with
 * `component={motion.div}` (an earlier version of this file) causes
 * framer-motion to forward MUI's style-shorthand props straight to the
 * DOM as raw attributes, triggering React's "does not recognize the
 * `justifyContent` prop" warning — this structure avoids that entirely.
 */
const GlassCard = ({ children, hoverLift = true, sx = {}, tone, ...rest }) => {
  // `tone` is intentionally destructured out and unused — older call
  // sites still pass tone="dark" from the previous dark-theme version.
  // Consuming it here (rather than dropping it from this signature)
  // stops it from ending up in `...rest` and leaking onto the DOM node,
  // the same class of bug this file was just fixed for.
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={hoverLift && !prefersReducedMotion ? { y: -6 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          borderRadius: "18px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: premium.glassBg,
          border: `1px solid ${premium.glassBorder}`,
          boxShadow: "0 8px 28px rgba(15,23,42,0.08)",
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Box>
    </motion.div>
  );
};

export default GlassCard;
