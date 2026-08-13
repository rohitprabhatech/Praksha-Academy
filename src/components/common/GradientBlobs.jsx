import { motion, useReducedMotion } from "framer-motion";
import { Box } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * Decorative background for dark hero sections: a subtle dot-grid, two
 * slowly-drifting gradient blobs, and a handful of glowing particles.
 * Motion is intentionally slow and small — this is ambient texture, not
 * a focal animation. Respects prefers-reduced-motion by disabling the
 * blob drift (particles/grid are static regardless, so nothing moves).
 */
const blobTransition = (duration, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
});

const GradientBlobs = ({ variant = "hero" }) => {
  const prefersReducedMotion = useReducedMotion();
  const particlePositions = [
    { top: "18%", left: "12%", size: 3 },
    { top: "30%", left: "82%", size: 2 },
    { top: "62%", left: "20%", size: 2 },
    { top: "75%", left: "68%", size: 3 },
    { top: "45%", left: "50%", size: 2 },
    { top: "12%", left: "60%", size: 2 },
  ];

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: variant === "hero" ? 520 : 360,
          height: variant === "hero" ? 520 : 360,
          borderRadius: "50%",
          top: -120,
          right: -100,
          background: `radial-gradient(circle, ${premium.blue}55 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={prefersReducedMotion ? undefined : { x: [0, 24, 0], y: [0, 18, 0] }}
        transition={blobTransition(10)}
      />
      <motion.div
        style={{
          position: "absolute",
          width: variant === "hero" ? 420 : 300,
          height: variant === "hero" ? 420 : 300,
          borderRadius: "50%",
          bottom: -140,
          left: -80,
          background: `radial-gradient(circle, ${premium.purple}45 0%, transparent 70%)`,
          filter: "blur(24px)",
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
          top: "35%",
          left: "38%",
          background: `radial-gradient(circle, ${premium.cyan}30 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={blobTransition(8, 0.5)}
      />

      {particlePositions.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.size * 2,
            height: p.size * 2,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? premium.cyan : premium.blue,
            boxShadow: `0 0 8px 2px ${i % 2 === 0 ? premium.cyan : premium.blue}`,
          }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.3, 0.9, 0.3] }}
          transition={blobTransition(3 + i * 0.4, i * 0.3)}
        />
      ))}
    </Box>
  );
};

export default GradientBlobs;
