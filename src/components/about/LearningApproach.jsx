import { Box, Typography, Button } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import BrandIllustration from "../common/BrandIllustration";

const points = ["Interactive Classes", "Live Projects", "Regular Assessments", "Mentor Support", "Career Guidance"];

const LearningApproach = () => {
  return (
    <div className="row align-items-center g-5">
      <div className="col-lg-5">
        <AnimatedReveal direction="left">
          <Box sx={{ position: "relative" }}>
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                top: -16,
                left: -16,
                right: 16,
                bottom: 16,
                borderRadius: "18px",
                background: `linear-gradient(135deg, ${premium.blue}18, ${premium.purple}14)`,
              }}
            />
            <Box
              className="pa-image-hover"
              sx={{
                position: "relative",
                aspectRatio: "4/3.3",
                borderRadius: "16px",
                border: `1px solid ${premium.border}`,
                backgroundColor: premium.cardBg,
                p: 3,
              }}
            >
              <BrandIllustration variant="learning" />
            </Box>
          </Box>
        </AnimatedReveal>
      </div>

      <div className="col-lg-7">
        <AnimatedReveal direction="right" delay={100}>
          <Typography variant="h4" sx={{ color: premium.textPrimary, fontWeight: 700, fontSize: { xs: "1.7rem", md: "2.1rem" }, mb: 2.5 }}>
            Our Learning Approach
          </Typography>
          <Typography variant="body1" sx={{ color: premium.textSecondary, lineHeight: 1.8, mb: 3, maxWidth: 500 }}>
            Every course is built around actually doing the work — not just
            watching someone else do it. Here's what that looks like day to
            day.
          </Typography>
          <Box sx={{ mb: 3.5 }}>
            {points.map((point) => (
              <Box key={point} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Box sx={{ color: premium.green, fontSize: 18, display: "flex" }}>
                  <FaCheckCircle />
                </Box>
                <Typography variant="body1" sx={{ color: premium.textPrimary, fontWeight: 500 }}>
                  {point}
                </Typography>
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            href="/courses"
            sx={{ px: 3.5, py: 1.3, backgroundColor: premium.blue, "&:hover": { backgroundColor: premium.blueHover } }}
          >
            Learn More
          </Button>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default LearningApproach;
