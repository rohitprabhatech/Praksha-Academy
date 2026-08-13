import { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

/**
 * Wraps children and fades/slides them in once they scroll into view.
 * Fires once (doesn't re-animate on scroll back up). Fully inert when the
 * user has prefers-reduced-motion enabled — content just appears at full
 * opacity with no transform, no observer needed.
 *
 * Usage:
 *   <AnimatedReveal><Card /></AnimatedReveal>
 *   <AnimatedReveal delay={150} direction="up"><Card /></AnimatedReveal>
 */
const AnimatedReveal = ({ children, delay = 0, direction = "up", as = "div", sx = {}, onReveal }) => {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(prefersReducedMotion);
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      onReveal?.();
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onReveal?.();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  const offset = direction === "up" ? "24px" : direction === "left" ? "-24px" : direction === "right" ? "24px" : "0px";
  const transform = direction === "up" ? `translateY(${visible ? 0 : offset})` : `translateX(${visible ? 0 : offset})`;

  return (
    <Box
      ref={ref}
      component={as}
      sx={{
        opacity: visible ? 1 : 0,
        transform: prefersReducedMotion ? "none" : transform,
        transition: prefersReducedMotion ? "none" : `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default AnimatedReveal;
