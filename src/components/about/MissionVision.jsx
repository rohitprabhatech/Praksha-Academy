import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import aboutData from "../../data/aboutData";

/**
 * Plain two-column statement block — a thin top rule and large numeral
 * label stand in for a card border, keeping the editorial rhythm rather
 * than boxing the content.
 */
const MissionVision = () => {
  return (
    <div className="row g-5">
      <div className="col-md-6">
        <AnimatedReveal>
          <Box sx={{ borderTop: `2px solid ${premium.textPrimary}`, pt: 2.5 }}>
            <Typography variant="overline" sx={{ color: premium.textSecondary, fontWeight: 600, letterSpacing: 1.5, fontSize: "0.8rem" }}>
              MISSION
            </Typography>
            <Typography variant="body1" sx={{ color: premium.textPrimary, fontSize: "1.2rem", lineHeight: 1.6, fontWeight: 500, mt: 1 }}>
              {aboutData.mission}
            </Typography>
          </Box>
        </AnimatedReveal>
      </div>
      <div className="col-md-6">
        <AnimatedReveal delay={100}>
          <Box sx={{ borderTop: `2px solid ${premium.orange}`, pt: 2.5 }}>
            <Typography variant="overline" sx={{ color: premium.textSecondary, fontWeight: 600, letterSpacing: 1.5, fontSize: "0.8rem" }}>
              VISION
            </Typography>
            <Typography variant="body1" sx={{ color: premium.textPrimary, fontSize: "1.2rem", lineHeight: 1.6, fontWeight: 500, mt: 1 }}>
              {aboutData.vision}
            </Typography>
          </Box>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default MissionVision;
