import { Box, Typography } from "@mui/material";
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import MissionVision from "../components/about/MissionVision";
import LearningModel from "../components/about/LearningModel";
import AcademyTimeline from "../components/about/AcademyTimeline";
import Statistics from "../components/about/Statistics";
import CTASection from "../components/about/CTASection";
import FloatingContact from "../components/common/FloatingContact";
import SectionHeading from "../components/common/SectionHeading";
import AnimatedReveal from "../components/common/AnimatedReveal";
import { premium } from "../theme/premiumPalette";
import aboutData from "../data/aboutData";
import "../styles/about-contact.css";

const About = () => {
  const hasStats = aboutData.stats.length > 0;

  return (
    <Box
      className="pa-page"
      sx={{
        backgroundColor: premium.background,
        color: premium.textPrimary,
        overflowX: "hidden",
      }}
    >
      {/* HERO */}
      <AboutHero />

      {/* WHO WE ARE */}
      <Box component="section" className="pa-section pa-introduction">
        <div className="container">
          <WhoWeAre />

          <div className="about-mission-vision">
            <MissionVision />
          </div>
        </div>
      </Box>

      {/* HOW WE TEACH */}
      <Box component="section" className="pa-section">
        <div className="container">
          <LearningModel />
        </div>
      </Box>


      {/* OUR JOURNEY */}
      <Box
        component="section"
        className="pa-section pa-soft-section pa-journey-section"
      >
        <div className="container">

          {/* Header */}
          <Box className="pa-journey-header">

            <Box>
              <Typography
                className="pa-eyebrow"
                component="p"
                sx={{
                  mb: 1.2,
                }}
              >
                OUR JOURNEY
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: {
                    xs: "2rem",
                    md: "2.55rem",
                  },
                  lineHeight: 1.08,
                  letterSpacing: "-0.04em",
                  color: premium.textPrimary,
                  m: 0,
                }}
              >
                Learn. Practice.
                <Box
                  component="span"
                  sx={{
                    color: premium.blue,
                  }}
                >
                  {" "}Progress.
                </Box>
              </Typography>
            </Box>

            <Typography
              sx={{
                color: premium.textSecondary,
                lineHeight: 1.7,
                fontSize: {
                  xs: "0.9rem",
                  md: "0.98rem",
                },
                maxWidth: 430,
                m: 0,
              }}
            >
              Every learner follows a structured path designed to turn
              learning into practical progress.
            </Typography>

          </Box>

          {/* Timeline */}
          <Box className="pa-journey-timeline">
            <AcademyTimeline />
          </Box>

        </div>
      </Box>

      {/* STATISTICS */}
      {hasStats && (
        <Box
          component="section"
          className="pa-section pa-stats-section"
        >
          <div className="container">
            <AnimatedReveal>
              <Box sx={{ mb: 4 }}>
                <Typography
                  className="pa-eyebrow"
                  component="p"
                >
                  STATISTICS
                </Typography>

                <Typography
                  component="h2"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: {
                      xs: "2rem",
                      md: "2.8rem",
                    },
                    color: premium.textPrimary,
                    letterSpacing: "-0.03em",
                  }}
                >
                  A snapshot of our impact.
                </Typography>
              </Box>
            </AnimatedReveal>

            <Statistics />
          </div>
        </Box>
      )}


      {/* FINAL CTA */}
      <Box
        component="section"
        className="pa-section pa-final-cta"
      >
        <div className="container">
          <CTASection />
        </div>
      </Box>

      {/* FLOATING CONTACT */}
      <FloatingContact />
    </Box>
  );
};

export default About;