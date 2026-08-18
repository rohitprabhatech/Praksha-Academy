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
      <div className="col-lg-10">
        <AnimatedReveal>
          <Typography
            component="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.45rem" },
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
              color: premium.textPrimary,
              mb: 2,
            }}
          >
            Who we are & our vision.
          </Typography>
          <Typography variant="body1" sx={{
            color: premium.textSecondary, fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.75, mb: 2.25 }}>
          {story}
        </Typography>
        <Typography variant="body1" sx={{
          color: premium.textSecondary, fontSize: { xs: "0.95rem", md: "1rem" },
          lineHeight: 1.75
        }}>
          {belief}
        </Typography>
      </AnimatedReveal>
    </div>
    </div >
  );
};

export default WhoWeAre;
