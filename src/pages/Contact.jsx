import { Box } from "@mui/material";
import ContactHero from "../components/contact/ContactHero";
import ContactInfoCards from "../components/contact/ContactInfoCards";
import ContactForm from "../components/contact/ContactForm";
import LocationSection from "../components/contact/LocationSection";
import ContactFAQ from "../components/contact/ContactFAQ";
import ContactCTA from "../components/contact/ContactCTA";
import FloatingContact from "../components/common/FloatingContact";
import SectionHeading from "../components/common/SectionHeading";
import { premium } from "../theme/premiumPalette";
import "../styles/about-contact.css";

/**
 * Same dark-navy canvas and component system as the About page (see
 * theme/premiumPalette.js) so both read as one cohesive brand.
 */
const Contact = () => {
  return (
    <Box sx={{ backgroundColor: premium.navy, position: "relative", overflowX: "hidden" }}>
      <ContactHero />

      {/* Contact info cards */}
      <Box component="section" sx={{ py: { xs: 7, md: 9 } }}>
        <div className="container">
          <ContactInfoCards />
        </div>
      </Box>

      {/* Contact form */}
      <Box component="section" id="contact-form" sx={{ py: { xs: 4, md: 6 } }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </Box>

      {/* Location */}
      <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
        <div className="container">
          <LocationSection />
        </div>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
        <div className="container">
          <SectionHeading eyebrow="Before You Reach Out" title="Frequently Asked Questions" dark />
          <ContactFAQ />
        </div>
      </Box>

      {/* Final CTA */}
      <Box component="section" sx={{ py: { xs: 4, md: 6 }, pb: { xs: 10, md: 14 } }}>
        <div className="container">
          <ContactCTA />
        </div>
      </Box>

      <FloatingContact />
    </Box>
  );
};

export default Contact;
