import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import ImagePlaceholder from "../common/ImagePlaceholder";
import mediaData from "../../data/mediaData";

const WhoWeAre = () => {
  const media = mediaData.whoWeAre;

  return (
    <div className="row align-items-center g-5">
      <div className="col-lg-6">
        <AnimatedReveal direction="left">
          <Box sx={{ position: "relative" }}>
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                top: -20,
                left: -20,
                right: 20,
                bottom: 20,
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${premium.blue}33, ${premium.purple}22)`,
                zIndex: 0,
              }}
            />
            <Box className="pa-image-hover" sx={{ position: "relative", zIndex: 1 }}>
              <ImagePlaceholder
                src={media?.image}
                alt={media?.imageAlt || "Students learning together"}
                aspectRatio="4/3.4"
                borderRadius="18px"
                sx={{ border: `1px solid ${premium.glassBorder}` }}
              />
            </Box>
          </Box>
        </AnimatedReveal>
      </div>

      <div className="col-lg-6">
        <AnimatedReveal direction="right" delay={100}>
          <Typography variant="overline" sx={{ color: premium.cyan, fontWeight: 700, letterSpacing: 2 }}>
            WHO WE ARE
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: premium.white, fontWeight: 700, fontSize: { xs: "1.9rem", md: "2.4rem" }, mt: 1, mb: 3 }}
          >
            An academy built around how students actually learn
          </Typography>
          <Typography variant="body1" sx={{ color: premium.grayLight, lineHeight: 1.85, mb: 2, fontSize: "1.05rem" }}>
            Praksha Academy exists to make structured, mentored learning
            available to every student — not just those who can afford
            premium private tutoring. Our teachers combine subject depth
            with the patience to actually explain a concept until it makes
            sense.
          </Typography>
          <Typography variant="body1" sx={{ color: premium.grayLight, lineHeight: 1.85, fontSize: "1.05rem" }}>
            From school-board fundamentals to industry-ready technical
            skills, every course is built around real practice, honest
            feedback, and a pace that fits the student — not a fixed
            syllabus that leaves anyone behind.
          </Typography>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default WhoWeAre;
