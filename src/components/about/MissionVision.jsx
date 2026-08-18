import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import aboutData from "../../data/aboutData";

const MissionVision = () => {
  return (
    <div className="row g-4 g-lg-5 align-items-stretch">

      {/* Mission */}
      <div className="col-md-6 d-flex">
        <div className="w-100 d-flex">
          <AnimatedReveal>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                padding: { xs: "24px 0", md: "28px 0" },
                borderTop: `1px solid ${premium.border}`,
                borderBottom: `1px solid ${premium.border}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: premium.blue,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  mb: 1.5,
                }}
              >
                MISSION
              </Typography>

              <Typography
                sx={{
                  color: premium.textPrimary,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                  lineHeight: 1.7,
                  fontWeight: 500,
                  maxWidth: "520px",
                }}
              >
                {aboutData.mission}
              </Typography>
            </Box>
          </AnimatedReveal>
        </div>
      </div>

      {/* Vision */}
      <div className="col-md-6 d-flex">
        <div className="w-100 d-flex">
          <AnimatedReveal delay={100}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                padding: { xs: "24px 0", md: "28px 0" },
                borderTop: `1px solid rgba(249,115,22,0.45)`,
                borderBottom: `1px solid rgba(249,115,22,0.45)`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: premium.orange,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  mb: 1.5,
                }}
              >
                VISION
              </Typography>

              <Typography
                sx={{
                  color: premium.textPrimary,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                  lineHeight: 1.7,
                  fontWeight: 500,
                  maxWidth: "520px",
                }}
              >
                {aboutData.vision}
              </Typography>
            </Box>
          </AnimatedReveal>
        </div>
      </div>

    </div>
  );
};

export default MissionVision;