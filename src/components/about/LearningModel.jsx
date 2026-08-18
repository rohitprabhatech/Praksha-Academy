import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import ImagePlaceholder from "../common/ImagePlaceholder";
import mediaData from "../../data/mediaData";
import aboutData from "../../data/aboutData";

const LearningModel = () => {
  const { description, pillars } = aboutData.pedagogy;

  return (
    <div className="row align-items-center g-5">
      {/* Visual */}
      <div className="col-lg-5">
        <AnimatedReveal direction="left">
          <Box
            sx={{
              position: "relative",
              maxWidth: 390,
              mx: "auto",
              py: 3,
            }}
          >
            <Box
              sx={{
                width: { xs: 150, md: 180 },
                height: { xs: 150, md: 180 },
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                zIndex: 2,
                border: "6px solid #fff",
                boxShadow: "0 18px 40px rgba(15,23,42,0.10)",
              }}
            >
              <ImagePlaceholder
                src={mediaData.about.pedagogyTop}
                alt={mediaData.about.pedagogyTopAlt}
                aspectRatio="1/1"
                borderRadius="0"
              />
            </Box>

            <Box
              sx={{
                width: { xs: 210, md: 250 },
                height: { xs: 210, md: 250 },
                borderRadius: "50%",
                overflow: "hidden",
                ml: { xs: 8, md: 11 },
                mt: { xs: -4, md: -6 },
                border: "6px solid #fff",
                boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
              }}
            >
              <ImagePlaceholder
                src={mediaData.about.pedagogyMain}
                alt={mediaData.about.pedagogyMainAlt}
                aspectRatio="1/1"
                borderRadius="0"
              />
            </Box>
          </Box>
        </AnimatedReveal>
      </div>

      {/* Content */}
      <div className="col-lg-7">
        <AnimatedReveal direction="right" delay={100}>
          <Typography
            sx={{
              color: premium.orange,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              mb: 1.5,
            }}
          >
            OUR PEDAGOGY
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.6rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: premium.textPrimary,
              mb: 2,
            }}
          >
            Learn with purpose.
            <br />
            <span style={{ color: premium.blue }}>
              Build with confidence.
            </span>
          </Typography>

          <Typography
            sx={{
              color: premium.textSecondary,
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: 590,
              mb: 4,
            }}
          >
            {description}
          </Typography>

          <Box>
            {pillars.map((pillar, index) => (
              <Box
                key={pillar.title}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "42px 1fr",
                  gap: 2,
                  py: 2.3,
                  borderTop: `1px solid ${premium.border}`,
                  "&:last-child": {
                    borderBottom: `1px solid ${premium.border}`,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: premium.orange,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    pt: 0.25,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>

                <Box>
                  <Typography
                    sx={{
                      color: premium.textPrimary,
                      fontWeight: 650,
                      fontSize: "1rem",
                      mb: 0.5,
                    }}
                  >
                    {pillar.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: premium.textSecondary,
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
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