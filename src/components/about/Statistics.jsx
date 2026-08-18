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
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, minmax(0, 1fr))" },
        gap: { xs: 3, md: 2.5 },
      }}
    >
      {stats.map((stat, index) => (
        <Box
          key={stat.label}
          sx={{
            p: { xs: 2.5, md: 3 },
            border: `1px solid ${premium.border}`,
            borderRadius: "14px",
            backgroundColor: premium.cardBg,
            textAlign: "center",
            boxShadow: "0 8px 22px rgba(15, 23, 42, 0.02)",
            borderLeft: { md: index === 0 ? `1px solid ${premium.border}` : `1px solid ${premium.border}` },
          }}
        >
          <AnimatedReveal delay={index * 80}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} sx={{ color: premium.textPrimary, fontSize: { xs: "2rem", md: "2.7rem" }, fontWeight: 700, letterSpacing: "-0.04em" }} />
            <Typography variant="body2" sx={{ color: premium.textSecondary, fontWeight: 600, mt: 1, lineHeight: 1.5 }}>
              {stat.label}
            </Typography>
          </AnimatedReveal>
        </Box>
      ))}
    </Box>
  );
};

export default Statistics;
