import { Box, Typography } from "@mui/material";
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import MissionVision from "../components/about/MissionVision";
import LearningModel from "../components/about/LearningModel";
import AcademyTimeline from "../components/about/AcademyTimeline";
import Achievements from "../components/about/Achievements";
import Faculty from "../components/about/Faculty";
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
    <Box sx={{ backgroundColor: premium.background, color: premium.textPrimary, overflowX: "hidden" }}>
      <AboutHero />

      <Box component="section" className="pa-section pa-introduction">
        <div className="container">
          <div className="row g-5 align-items-end">
            <div className="col-lg-7"><WhoWeAre /></div>
            <div className="col-lg-4 offset-lg-1">
              <AnimatedReveal direction="right">
                <Box className="pa-side-note">
                  <Typography className="pa-eyebrow" component="p">COMPANY INTRODUCTION</Typography>
                  <Typography sx={{ color: premium.textPrimary, fontWeight: 600, lineHeight: 1.65 }}>
                    A learning environment designed to make complex ideas clearer, practice more purposeful, and progress easier to see.
                  </Typography>
                </Box>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </Box>

      <Box component="section" className="pa-section pa-soft-section">
        <div className="container">
          <MissionVision />
        </div>
      </Box>

      <Box component="section" className="pa-section">
        <div className="container">
          <div className="row align-items-end mb-5 g-4">
            <div className="col-lg-7">
              <SectionHeading title="How we teach" align="left" />
            </div>
            <div className="col-lg-4 offset-lg-1">
              <Typography sx={{ color: premium.textSecondary, lineHeight: 1.75 }}>
                Our pedagogy combines clear concepts, hands-on practice and direct mentorship so learners can move from understanding to application.
              </Typography>
            </div>
          </div>
          <LearningModel />
        </div>
      </Box>

      <Box component="section" className="pa-section pa-soft-section">
        <div className="container">
          <div className="row align-items-end mb-5 g-4">
            <div className="col-lg-7"><SectionHeading title="Our journey" align="left" /></div>
            <div className="col-lg-4 offset-lg-1"><Typography sx={{ color: premium.textSecondary, lineHeight: 1.75 }}>A clear path from discovering a program to building confidence through practice and feedback.</Typography></div>
          </div>
          <AcademyTimeline />
        </div>
      </Box>

      <Box component="section" className="pa-section">
        <div className="container"><Achievements /></div>
      </Box>

      {hasStats && (
        <Box component="section" className="pa-section pa-stats-section">
          <div className="container">
            <AnimatedReveal>
              <Box sx={{ mb: 4 }}>
                <Typography className="pa-eyebrow" component="p">STATISTICS</Typography>
                <Typography component="h2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: "2rem", md: "2.8rem" }, color: premium.textPrimary, letterSpacing: "-0.03em" }}>A snapshot of our impact.</Typography>
              </Box>
            </AnimatedReveal>
            <Statistics />
          </div>
        </Box>
      )}

      <Box component="section" className="pa-section">
        <div className="container">
          <SectionHeading title="Team members" align="left" />
          <Typography sx={{ color: premium.textSecondary, lineHeight: 1.75, maxWidth: 650, mt: 1.5, mb: 4 }}>The people who make learning feel personal.</Typography>
          <Faculty />
        </div>
      </Box>

      <Box component="section" className="pa-section pa-final-cta">
        <div className="container"><CTASection /></div>
      </Box>

      <FloatingContact />
    </Box>
  );
};

export default About;
