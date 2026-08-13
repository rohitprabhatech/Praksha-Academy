import { Box } from "@mui/material";
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import MissionVision from "../components/about/MissionVision";
import WhyChooseUs from "../components/about/WhyChooseUs";
import LearningJourney from "../components/about/LearningJourney";
import Statistics from "../components/about/Statistics";
import CTASection from "../components/about/CTASection";
import FloatingContact from "../components/common/FloatingContact";
import SectionHeading from "../components/common/SectionHeading";
import { premium } from "../theme/premiumPalette";
import "../styles/about-contact.css";

/**
 * Full dark-navy canvas so the whole page (not just the hero) reads as
 * one cohesive "premium tech academy" brand, matching the Contact page's
 * same visual system (see theme/premiumPalette.js).
 */
const About = () => {
  return (
    <Box sx={{ backgroundColor: premium.navy, position: "relative", overflowX: "hidden" }}>
      <AboutHero />

      {/* Who We Are */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <div className="container">
          <WhoWeAre />
        </div>
      </Box>

      {/* Mission & Vision */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <div className="container">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Mission & Vision"
            dark
          />
          <MissionVision />
        </div>
      </Box>

      {/* Why Choose Us */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <div className="container">
          <SectionHeading
            eyebrow="Why Praksha Academy"
            title="Built Around How You Learn"
            subtitle="Four things every course is designed to deliver."
            dark
          />
          <WhyChooseUs />
        </div>
      </Box>

      {/* Learning Journey */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <div className="container">
          <SectionHeading
            eyebrow="How It Works"
            title="Your Learning Journey"
            subtitle="Five steps from first lesson to real, applied skill."
            dark
          />
          <LearningJourney />
        </div>
      </Box>

      {/* Statistics */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <div className="container">
          <Statistics />
        </div>
      </Box>

      {/* Final CTA */}
      <Box component="section" sx={{ py: { xs: 4, md: 6 }, pb: { xs: 10, md: 14 } }}>
        <div className="container">
          <CTASection />
        </div>
      </Box>

      <FloatingContact />
    </Box>
  );
};

export default About;
