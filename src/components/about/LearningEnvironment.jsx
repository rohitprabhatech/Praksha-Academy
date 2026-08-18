import { Box, Typography, Button } from "@mui/material";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import PhotoImage from "../common/PhotoImage";
import photos from "../../data/photos";
import aboutData from "../../data/aboutData";

/**
 * "Our Learning Approach" — what a student's day-to-day actually looks
 * like, paired with an on-brand illustration instead of a stock photo.
 * The checklist items come straight from aboutData.learningEnvironment
 * (Live Classes / Practice / Mentorship / Progress Tracking) — no
 * invented claims.
 */
const LearningEnvironment = () => {
  const items = aboutData.learningEnvironment;

  return (
    <div className="row align-items-center g-5">
      <div className="col-lg-6">
        <AnimatedReveal direction="left">
          <Box sx={{ position: "relative", maxWidth: 460, mx: { xs: "auto", lg: 0 } }}>
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                top: -18,
                left: -18,
                right: 18,
                bottom: 18,
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${premium.blue}1A, ${premium.purple}14)`,
                zIndex: 0,
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }} className="pa-image-hover">
              <PhotoImage src={photos.learningApproach.src} alt={photos.learningApproach.alt} aspectRatio="4/3.3" />
            </Box>
          </Box>
        </AnimatedReveal>
      </div>

      <div className="col-lg-6">
        <AnimatedReveal direction="right" delay={100}>
          <Typography variant="overline" sx={{ color: premium.blue, fontWeight: 700, letterSpacing: 2 }}>
            HOW CLASSES WORK
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: premium.textPrimary, fontWeight: 700, fontSize: { xs: "1.8rem", md: "2.2rem" }, mt: 1, mb: 2.5 }}
          >
            Our Learning Approach
          </Typography>
          <Typography variant="body1" sx={{ color: premium.textSecondary, lineHeight: 1.8, mb: 3.5 }}>
            Every course is built around the same core loop — attend, practice,
            get feedback, and track progress — so you always know where you
            stand and what to work on next.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            {items.map((item, index) => (
              <AnimatedReveal delay={150 + index * 80} key={item.key}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
                  <Box sx={{ color: premium.blue, fontSize: 20, mt: 0.25, flexShrink: 0 }} aria-hidden="true">
                    <FaCheckCircle />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: premium.textPrimary, fontWeight: 600, mb: 0.25 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: premium.textSecondary, lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </AnimatedReveal>
            ))}
          </Box>

          <Button
            variant="contained"
            endIcon={<FaArrowRight />}
            href="/courses"
            sx={{
              px: 4,
              py: 1.4,
              background: `linear-gradient(90deg, ${premium.blue}, ${premium.blueLight})`,
              boxShadow: `0 8px 24px ${premium.blue}33`,
              "&:hover": { boxShadow: `0 10px 30px ${premium.blue}55` },
            }}
          >
            Explore Courses
          </Button>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default LearningEnvironment;
