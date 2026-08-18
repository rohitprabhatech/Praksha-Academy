import { motion, useReducedMotion } from "framer-motion";
import { Box } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * Decorative background texture.
 *
 * dark={true}  — for the navy hero sections: subtle white dot-grid, thin
 *                curved-glow blobs in blue/cyan/purple (per the reference
 *                design's "thin curved lines, soft blue/purple glow").
 * dark={false} — for light sections/CTAs: soft pastel blobs, low opacity.
 *
 * Motion is intentionally slow and small — ambient texture, not a focal
 * animation. Disables drift entirely when prefers-reduced-motion is set.
 */
const blobTransition = (duration, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
});

const GradientBlobs = ({ variant = "hero", dark = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const big = variant === "hero" ? 520 : 360;
  const med = variant === "hero" ? 420 : 300;

  const dotColor = dark ? "rgba(255,255,255,0.08)" : premium.border;
  const c1 = dark ? `${premium.blue}3D` : `${premium.blue}22`;
  const c2 = dark ? `${premium.purple}33` : `${premium.orange}1F`;
  const c3 = dark ? `${premium.cyan}2E` : `${premium.green}18`;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
        opacity: dark ? 1 : 0.6,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: big,
          height: big,
          borderRadius: "50%",
          top: -160,
          right: -120,
          background: `radial-gradient(circle, ${c1} 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
        animate={prefersReducedMotion ? undefined : { x: [0, 24, 0], y: [0, 18, 0] }}
        transition={blobTransition(10)}
      />
      <motion.div
        style={{
          position: "absolute",
          width: med,
          height: med,
          borderRadius: "50%",
          bottom: -140,
          left: -100,
          background: `radial-gradient(circle, ${c2} 0%, transparent 70%)`,
          filter: "blur(14px)",
        }}
        animate={prefersReducedMotion ? undefined : { x: [0, -20, 0], y: [0, -16, 0] }}
        transition={blobTransition(12, 1)}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          top: "30%",
          left: "40%",
          background: `radial-gradient(circle, ${c3} 0%, transparent 70%)`,
          filter: "blur(18px)",
        }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={blobTransition(8, 0.5)}
      />

      {/* Thin curved accent line — reference asks for "thin curved lines" */}
      {dark && (
        <svg
          viewBox="0 0 800 600"
          style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", opacity: 0.25 }}
        >
          <path d="M 780 -20 C 620 120, 700 320, 500 480 S 420 700, 250 650" stroke={premium.cyan} strokeWidth="1.5" fill="none" />
          <path d="M 800 60 C 660 180, 720 380, 560 520" stroke={premium.blueLight} strokeWidth="1" fill="none" />
        </svg>
      )}
    </Box>
  );
};

export default GradientBlobs;
