import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import AnimatedCounter from "../common/AnimatedCounter";
import aboutData from "../../data/aboutData";

/**
 * Plain inline numbers, no card wrapper — matching the reference's
 * "32,000 / #1 / 4.98/5" style: big bold figure, small label beneath,
 * separated by thin vertical rules rather than boxed cards.
 *
 * Renders nothing if aboutData.stats is empty. Currently populated with
 * placeholder demo numbers (see the loud warning comment in
 * aboutData.js) — do not treat these as confirmed real figures.
 */
const Statistics = () => {
  const { stats } = aboutData;
  if (stats.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "flex-start", md: "space-between" },
        gap: { xs: 4, md: 2 },
      }}
    >
      {stats.map((stat, index) => (
        <Box
          key={stat.label}
          sx={{
            pl: { md: index === 0 ? 0 : 4 },
            borderLeft: { md: index === 0 ? "none" : `1px solid ${premium.border}` },
          }}
        >
          <AnimatedReveal delay={index * 80}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} sx={{ color: premium.textPrimary, fontSize: { xs: "2.2rem", md: "3rem" } }} />
            <Typography variant="body2" sx={{ color: premium.textSecondary, fontWeight: 500, mt: 0.5 }}>
              {stat.label}
            </Typography>
          </AnimatedReveal>
        </Box>
      ))}
    </Box>
  );
};

export default Statistics;
