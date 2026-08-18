import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import ImagePlaceholder from "../common/ImagePlaceholder";
import mediaData from "../../data/mediaData";
import aboutData from "../../data/aboutData";

/**
 * "Our Pedagogy" — two overlapping circular photos on the left (a quiet
 * editorial touch, not a decorative gimmick), a plain numbered list on
 * the right. No pills, no rotating text, no card boxes.
 */
const LearningModel = () => {
  const { description, pillars } = aboutData.pedagogy;

  return (
    <div className="row align-items-center g-5">
      <div className="col-md-5">
        <AnimatedReveal direction="left">
          <Box sx={{ position: "relative", maxWidth: 320, mx: "auto" }}>
            <Box sx={{ width: { xs: 110, md: 130 }, height: { xs: 110, md: 130 }, borderRadius: "50%", overflow: "hidden", position: "relative", zIndex: 1 }}>
              <ImagePlaceholder src={mediaData.about.pedagogyTop} alt={mediaData.about.pedagogyTopAlt} aspectRatio="1/1" borderRadius="0" />
            </Box>
            <Box
              sx={{
                width: { xs: 190, md: 220 },
                height: { xs: 190, md: 220 },
                borderRadius: "50%",
                overflow: "hidden",
                ml: { xs: 7, md: 9 },
                mt: { xs: -3, md: -4 },
              }}
            >
              <ImagePlaceholder src={mediaData.about.pedagogyMain} alt={mediaData.about.pedagogyMainAlt} aspectRatio="1/1" borderRadius="0" />
            </Box>
          </Box>
        </AnimatedReveal>
      </div>

      <div className="col-md-7">
        <AnimatedReveal direction="right" delay={100}>
          <Typography component="h2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: "1.9rem", md: "2.3rem" }, color: premium.textPrimary, mb: 2.5 }}>
            Our pedagogy.
          </Typography>
          <Typography variant="body1" sx={{ color: premium.textSecondary, fontSize: "1.1rem", lineHeight: 1.8, mb: 4 }}>
            {description}
          </Typography>

          <Box>
            {pillars.map((pillar, index) => (
              <Box
                key={pillar.title}
                sx={{
                  display: "flex",
                  gap: 3,
                  py: 2.5,
                  borderTop: index === 0 ? `1px solid ${premium.border}` : "none",
                  borderBottom: `1px solid ${premium.border}`,
                }}
              >
                <Typography sx={{ color: premium.orange, fontWeight: 700, fontSize: "1.1rem", flexShrink: 0, width: 32 }}>
                  0{index + 1}
                </Typography>
                <Box>
                  <Typography sx={{ color: premium.textPrimary, fontWeight: 600, fontSize: "1.05rem", mb: 0.5 }}>
                    {pillar.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: premium.textSecondary }}>
                    {pillar.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default LearningModel;
