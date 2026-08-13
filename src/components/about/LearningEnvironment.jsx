import { Box, Typography } from "@mui/material";
import { colors } from "../../theme/theme";
import aboutData from "../../data/aboutData";
import mediaData from "../../data/mediaData";
import ImagePlaceholder from "../common/ImagePlaceholder";
import AnimatedReveal from "../common/AnimatedReveal";

/**
 * "What learning feels like here" — image cards for Live Classes,
 * Practice, Mentorship, Progress Tracking. Images come from
 * mediaData.learningEnvironment, matched to aboutData.learningEnvironment
 * by `key`; falls back to a clean placeholder per card when no image is
 * configured yet.
 */
const LearningEnvironment = () => {
  const cards = aboutData.learningEnvironment;
  const images = mediaData.learningEnvironment;

  return (
    <div className="row g-4">
      {cards.map((card, index) => {
        const imageEntry = images.find((m) => m.key === card.key);
        return (
          <div className="col-sm-6 col-lg-3" key={card.key}>
            <AnimatedReveal delay={index * 80}>
              <Box
                className="pa-hover-card"
                sx={{ border: `1px solid ${colors.borderColor}`, borderRadius: "16px", overflow: "hidden", backgroundColor: colors.cardBackground, height: "100%" }}
              >
                <Box className="pa-image-hover">
                  <ImagePlaceholder
                    src={imageEntry?.image}
                    alt={card.title}
                    aspectRatio="4/3"
                    borderRadius="0"
                    label={`${card.title} photo coming soon`}
                  />
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 700, mb: 0.75 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                    {card.description}
                  </Typography>
                </Box>
              </Box>
            </AnimatedReveal>
          </div>
        );
      })}
    </div>
  );
};

export default LearningEnvironment;
