import { Box, Typography } from "@mui/material";
import { FaBullseye, FaLightbulb } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GlassCard from "../common/GlassCard";
import AnimatedReveal from "../common/AnimatedReveal";

const MissionVision = () => {
  return (
    <div className="row g-4">
      <div className="col-md-6">
        <AnimatedReveal>
          <GlassCard tone="dark" sx={{ p: { xs: 3.5, md: 5 }, height: "100%" }}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${premium.blue}, ${premium.cyan})`,
                color: premium.white,
                fontSize: 22,
                mb: 3,
              }}
            >
              <FaBullseye />
            </Box>
            <Typography variant="h5" sx={{ color: premium.white, fontWeight: 700, mb: 2 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: premium.grayLight, lineHeight: 1.8 }}>
              To make quality, teacher-led learning genuinely accessible —
              pairing every student with instruction that adapts to how they
              actually learn, at a price that doesn't put it out of reach.
            </Typography>
          </GlassCard>
        </AnimatedReveal>
      </div>

      <div className="col-md-6">
        <AnimatedReveal delay={100}>
          <GlassCard tone="dark" sx={{ p: { xs: 3.5, md: 5 }, height: "100%" }}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${premium.purple}, ${premium.blue})`,
                color: premium.white,
                fontSize: 22,
                mb: 3,
              }}
            >
              <FaLightbulb />
            </Box>
            <Typography variant="h5" sx={{ color: premium.white, fontWeight: 700, mb: 2 }}>
              Our Vision
            </Typography>
            <Typography variant="body1" sx={{ color: premium.grayLight, lineHeight: 1.8 }}>
              A future where a student's postcode or family income has
              nothing to do with the quality of teaching they can reach —
              where structured, mentored learning is simply the default.
            </Typography>
          </GlassCard>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default MissionVision;
