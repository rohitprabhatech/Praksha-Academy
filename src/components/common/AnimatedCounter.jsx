import { useState, useRef, useEffect } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import AnimatedReveal from "./AnimatedReveal";

/**
 * Counts up from 0 to `value` once scrolled into view, using a plain
 * requestAnimationFrame loop — no external counting library.
 *
 * Previously used react-countup's <CountUp /> component, but its default
 * export doesn't resolve to a valid React component under this project's
 * Vite/ESM setup (a known CJS/ESM interop issue with that package),
 * which threw "Element type is invalid" and crashed the whole page with
 * no error boundary in place. This version has no external dependency,
 * so that failure mode isn't possible.
 */
const easeOutQuad = (t) => t * (2 - t);

const AnimatedCounter = ({ value, suffix = "", decimals = 0, duration = 1500, sx = {} }) => {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Cancel any in-flight animation frame on unmount to avoid a
  // setState-after-unmount call if the user navigates away mid-count.
  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  const startCounting = () => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(value * easeOutQuad(progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <AnimatedReveal onReveal={startCounting}>
      <Typography variant="h3" sx={{ fontWeight: 700, ...sx }}>
        {display.toFixed(decimals)}
        {suffix}
      </Typography>
    </AnimatedReveal>
  );
};

export default AnimatedCounter;
