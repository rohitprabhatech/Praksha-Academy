import { useState } from "react";
import CountUp from "react-countup";
import { Typography } from "@mui/material";
import AnimatedReveal from "./AnimatedReveal";

/**
 * Counts up from 0 to `value` once the element scrolls into view (fires
 * once, doesn't re-trigger on re-scroll — handled by AnimatedReveal's
 * IntersectionObserver, `once: true`).
 */
const AnimatedCounter = ({ value, suffix = "", decimals = 0, sx = {} }) => {
  const [started, setStarted] = useState(false);

  return (
    <AnimatedReveal onReveal={() => setStarted(true)}>
      <Typography variant="h3" sx={{ fontWeight: 700, ...sx }}>
        {started ? <CountUp end={value} duration={1.8} decimals={decimals} /> : "0"}
        {suffix}
      </Typography>
    </AnimatedReveal>
  );
};

export default AnimatedCounter;
