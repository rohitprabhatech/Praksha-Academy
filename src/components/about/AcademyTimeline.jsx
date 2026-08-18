import { Box, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import aboutData from "../../data/aboutData";

const AcademyTimeline = () => {
  const journey = aboutData.studentJourney || [];

  if (!journey.length) return null;

  return (
    <Box className="pa-journey-premium">
      {journey.map((item, index) => {
        const number = String(index + 1).padStart(2, "0");

        return (
          <AnimatedReveal
            key={`${item.step}-${index}`}
            delay={index * 70}
          >
            <Box
              className="pa-journey-premium-item"
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "48px 1fr",
                  md: "80px 1fr auto",
                },
                alignItems: "center",
                gap: { xs: 2, md: 3 },
                position: "relative",
                py: { xs: 2.5, md: 3.2 },
                borderBottom:
                  index < journey.length - 1
                    ? `1px solid ${premium.border}`
                    : "none",
              }}
            >
              {/* NUMBER */}
              <Box
                sx={{
                  width: { xs: 42, md: 50 },
                  height: { xs: 42, md: 50 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    index === 0
                      ? premium.blue
                      : premium.cardBg,
                  color:
                    index === 0
                      ? premium.white
                      : premium.textPrimary,
                  border:
                    index === 0
                      ? "none"
                      : `1px solid ${premium.border}`,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  boxShadow:
                    index === 0
                      ? "0 8px 20px rgba(37,99,235,0.16)"
                      : "none",
                }}
              >
                {number}
              </Box>

              {/* CONTENT */}
              <Box>
                <Typography
                  sx={{
                    color: premium.textPrimary,
                    fontWeight: 700,
                    fontSize: {
                      xs: "1rem",
                      md: "1.15rem",
                    },
                    letterSpacing: "-0.015em",
                    mb: 0.5,
                  }}
                >
                  {item.step}
                </Typography>

                <Typography
                  sx={{
                    color: premium.textSecondary,
                    fontSize: {
                      xs: "0.82rem",
                      md: "0.9rem",
                    },
                    lineHeight: 1.65,
                    maxWidth: 650,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>

              {/* ARROW */}
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${premium.border}`,
                  color: premium.orange,
                }}
              >
                <FaArrowRight size={12} />
              </Box>
            </Box>
          </AnimatedReveal>
        );
      })}
    </Box>
  );
};

export default AcademyTimeline;