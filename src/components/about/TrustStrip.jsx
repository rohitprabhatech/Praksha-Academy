import { Box, Typography } from "@mui/material";
import { FaChalkboardTeacher, FaTasks, FaHeadset, FaLayerGroup, FaBriefcase } from "react-icons/fa";
import { colors } from "../../theme/theme";
import AnimatedReveal from "../common/AnimatedReveal";

/**
 * Restrained credibility strip — describes HOW Praksha Academy teaches,
 * not unverified numbers. If you later want real quantitative stats, add
 * them to aboutData.stats and use the (data-gated) Statistics component
 * instead of adding fake figures here.
 */
const points = [
  { icon: <FaChalkboardTeacher />, label: "Structured Learning" },
  { icon: <FaTasks />, label: "Practice-Based Classes" },
  { icon: <FaHeadset />, label: "Student Support" },
  { icon: <FaLayerGroup />, label: "Experienced Faculty" },
  { icon: <FaBriefcase />, label: "Career-Focused Programs" },
];

const TrustStrip = () => {
  return (
    <Box
      component="section"
      aria-label="What Praksha Academy offers"
      sx={{ backgroundColor: colors.cardBackground, borderBottom: `1px solid ${colors.borderColor}`, py: { xs: 3.5, md: 4.5 } }}
    >
      <div className="container">
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 5 },
            overflowX: { xs: "auto", md: "visible" },
            justifyContent: { md: "center" },
            flexWrap: { md: "wrap" },
            pb: { xs: 1, md: 0 },
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {points.map((point, index) => (
            <AnimatedReveal key={point.label} delay={index * 80}>
              <Box
                className="pa-trust-item"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  minWidth: { xs: 96, md: "auto" },
                  px: { md: 2 },
                  cursor: "default",
                }}
              >
                <Box sx={{ color: colors.primaryBlue, fontSize: 22, transition: "transform 0.25s ease" }} aria-hidden="true">
                  {point.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: colors.textSecondary, fontWeight: 600, fontSize: "0.85rem", textAlign: "center" }}
                >
                  {point.label}
                </Typography>
              </Box>
            </AnimatedReveal>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default TrustStrip;
