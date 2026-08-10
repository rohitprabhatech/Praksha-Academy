import { Box, Typography } from "@mui/material";
import AboutHero from "../components/about/AboutHero";
import FounderMessage from "../components/about/FounderMessage";
import Mission from "../components/about/Mission";
import Vision from "../components/about/Vision";
import Values from "../components/about/Values";
import Timeline from "../components/about/Timeline";
import Statistics from "../components/about/Statistics";
import Team from "../components/about/Team";
import Recognition from "../components/about/Recognition";
import CTASection from "../components/about/CTASection";
import FloatingContact from "../components/common/FloatingContact";
import { colors } from "../theme/theme";
import "../styles/about-contact.css";

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="row justify-content-center text-center mb-5">
    <div className="col-lg-7">
      <Typography
        variant="overline"
        sx={{ color: colors.primaryBlue, fontWeight: 600, letterSpacing: 1.5 }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h3" sx={{ color: colors.textPrimary, mt: 1, mb: 2, fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: colors.textSecondary }}>
          {subtitle}
        </Typography>
      )}
    </div>
  </div>
);

const About = () => {
  return (
    <Box sx={{ backgroundColor: colors.pageBackground, position: "relative" }}>
      <AboutHero />

      {/* Achievements — placed high, right after hero, PW/Udemy-style scale signal */}
      <Statistics />

      {/* Founder's Note */}
      <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
        <div className="container">
          <SectionHeading
            eyebrow="From The Founder"
            title="Why We Started Praksha Academy"
          />
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <FounderMessage />
            </div>
          </div>
        </div>
      </Box>

      {/* Mission & Vision */}
      <Box component="section" sx={{ py: { xs: 6, md: 9 }, backgroundColor: colors.sectionBackground }}>
        <div className="container">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Mission & Vision"
          />
          <div className="row g-4">
            <div className="col-md-6">
              <Mission />
            </div>
            <div className="col-md-6">
              <Vision />
            </div>
          </div>
        </div>
      </Box>

      {/* Core Values */}
      <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
        <div className="container">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Core Values"
            subtitle="The principles that guide every course we build and every class we teach."
          />
          <Values />
        </div>
      </Box>

      {/* Our Journey */}
      <Box component="section" sx={{ py: { xs: 6, md: 9 }, backgroundColor: colors.sectionBackground }}>
        <div className="container">
          <SectionHeading
            eyebrow="Since 2019"
            title="Our Journey"
            subtitle="A few of the milestones that shaped Praksha Academy into what it is today."
          />
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Timeline />
            </div>
          </div>
        </div>
      </Box>

      {/* Team */}
      <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
        <div className="container">
          <SectionHeading
            eyebrow="Meet The Team"
            title="The People Behind Praksha Academy"
            subtitle="Educators and mentors dedicated to helping every student succeed."
          />
          <Team />
        </div>
      </Box>

      {/* Recognition / Press */}
      <Box component="section" sx={{ py: { xs: 6, md: 9 }, backgroundColor: colors.sectionBackground }}>
        <div className="container">
          <SectionHeading
            eyebrow="Trusted & Recognized"
            title="Awards & Recognition"
          />
          <Recognition />
        </div>
      </Box>

      {/* CTA */}
      <Box component="section" sx={{ pb: { xs: 6, md: 9 } }}>
        <div className="container">
          <CTASection />
        </div>
      </Box>

      <FloatingContact />
    </Box>
  );
};

export default About;
