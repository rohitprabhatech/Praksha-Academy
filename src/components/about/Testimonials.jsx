import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import aboutData from "../../data/aboutData";

/**
 * Editorial story block — a bold statement followed by supporting
 * paragraphs, no card, no icon badge. Matches Le Wagon's "Unlock your
 * potential" pattern: belief statement first, plain prose second.
 */
const WhoWeAre = () => {
  const { story, belief } = aboutData.whoWeAre;

  return (
    <div className="row">
      <div className="col-lg-8">
        <AnimatedReveal>
          <Typography
            component="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.9rem", md: "2.6rem" },
              lineHeight: 1.2,
              color: premium.textPrimary,
              mb: 3,
            }}
          >
            Who we are & our vision.
          </Typography>
          <Typography variant="body1" sx={{ color: premium.textSecondary, fontSize: "1.1rem", lineHeight: 1.8, mb: 2.5 }}>
            {story}
          </Typography>
          <Typography variant="body1" sx={{ color: premium.textSecondary, fontSize: "1.1rem", lineHeight: 1.8 }}>
            {belief}
          </Typography>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default WhoWeAre;
