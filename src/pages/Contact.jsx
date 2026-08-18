import { Box } from "@mui/material";

import ContactHero from "../components/contact/ContactHero";
import ContactInfoCards from "../components/contact/ContactInfoCards";
import ContactForm from "../components/contact/ContactForm";
import LocationSection from "../components/contact/LocationSection";
import ContactFAQ from "../components/contact/ContactFAQ";
import SectionHeading from "../components/common/SectionHeading";

import { premium } from "../theme/premiumPalette";

import "../styles/about-contact.css";

const Contact = () => {
  return (
    <Box
      sx={{
        backgroundColor: premium.background,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ============================================================
          HERO
      ============================================================ */}
      <ContactHero />

      {/* ============================================================
          MAIN CONTACT CONTENT
      ============================================================ */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        {/* ==========================================================
            CONTACT FORM
        ========================================================== */}
        <Box
          id="contact-form"
          sx={{
            position: "relative",
            mt: {
              xs: "-35px",
              md: "-70px",
            },
            mb: {
              xs: 5,
              md: 6,
            },
            zIndex: 3,
          }}
        >
          <ContactForm />
        </Box>

        {/* ==========================================================
            CONTACT INFORMATION
        ========================================================== */}
        <Box
          component="section"
          aria-label="Contact Information"
          sx={{
            mb: {
              xs: 5,
              md: 6,
            },
          }}
        >
          <ContactInfoCards />
        </Box>

        {/* ==========================================================
            GOOGLE MAP + WORKING HOURS
        ========================================================== */}
        <Box
          component="section"
          aria-label="Campus Details and Working Hours"
          sx={{
            mb: {
              xs: 6,
              md: 7,
            },
          }}
        >
          <LocationSection />
        </Box>

        {/* ==========================================================
            FAQ
        ========================================================== */}
        <Box
          component="section"
          aria-label="Frequently Asked Questions"
          sx={{
            pb: {
              xs: 7,
              md: 9,
            },
          }}
        >
          <SectionHeading
            title="FAQ Preview"
            subtitle="Find answers to common questions before reaching out."
            align="left"
          />

          <ContactFAQ />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;