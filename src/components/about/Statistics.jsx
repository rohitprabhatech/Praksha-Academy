import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import GlassCard from "../common/GlassCard";
import AnimatedReveal from "../common/AnimatedReveal";
import AnimatedCounter from "../common/AnimatedCounter";
import aboutData from "../../data/aboutData";

/**
 * Renders nothing if aboutData.stats is empty. Currently populated with
 * placeholder demo numbers (see the loud warning comment in
 * aboutData.js) — do not treat these as confirmed real figures.
 */
const Statistics = () => {
  const { stats } = aboutData;
  if (stats.length === 0) return null;

  return (
    <div className="row g-4">
      {stats.map((stat, index) => (
        <div className="col-6 col-md-3" key={stat.label}>
          <AnimatedReveal delay={index * 80}>
            <GlassCard tone="dark" hoverLift sx={{ p: 3.5, textAlign: "center" }}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} sx={{ color: premium.cyan, mb: 0.5 }} />
              <Typography variant="body2" sx={{ color: premium.grayLight, fontWeight: 500 }}>
                {stat.label}
              </Typography>
            </GlassCard>
          </AnimatedReveal>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
