import { Box, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import aboutData from "../../data/aboutData";

const AcademyTimeline = () => {
  const journey = aboutData.studentJourney || [];
  if (!journey.length) return null;

  return (
    <Box className="pa-journey">
      {journey.map((item, index) => (
        <AnimatedReveal key={`${item.step}-${index}`} delay={index * 70}>
          <Box className="pa-journey-item">
            <Box className="pa-journey-number">{String(index + 1).padStart(2, "0")}</Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, color: premium.textPrimary, fontSize: { xs: "1rem", md: "1.12rem" } }}>{item.step}</Typography>
              <Typography sx={{ color: premium.textSecondary, mt: 0.7, lineHeight: 1.7, maxWidth: 640 }}>{item.description}</Typography>
            </Box>
            {index < journey.length - 1 && <FaArrowRight className="pa-journey-arrow" size={13} aria-hidden="true" />}
          </Box>
        </AnimatedReveal>
      ))}
    </Box>
  );
};

export default AcademyTimeline;
