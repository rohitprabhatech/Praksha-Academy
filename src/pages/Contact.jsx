import { Box, Typography } from "@mui/material";
import ContactForm from "../components/contact/ContactForm";
import RequestCallback from "../components/contact/RequestCallback";
import ContactInfo from "../components/contact/ContactInfo";
import WorkingHours from "../components/contact/WorkingHours";
import BranchLocator from "../components/contact/BranchLocator";
import Map from "../components/contact/Map";
import FAQPreview from "../components/contact/FAQPreview";
import FloatingContact from "../components/common/FloatingContact";
import { colors } from "../theme/theme";
import "../styles/about-contact.css";

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="row justify-content-center text-center mb-5">
    <div className="col-lg-7">
      <Typography variant="overline" sx={{ color: colors.primaryBlue, fontWeight: 600, letterSpacing: 1.5 }}>
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

const Contact = () => {
  return (
    <Box sx={{ backgroundColor: colors.pageBackground, position: "relative" }}>
      {/* Page header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.primaryBlue} 0%, #1E40AF 100%)`,
          color: colors.textWhite,
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <div className="container">
          <Typography
            variant="overline"
            className="pa-fade-up"
            sx={{ color: colors.secondaryOrange, fontWeight: 600, letterSpacing: 1.5 }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h3"
            className="pa-fade-up pa-delay-1"
            sx={{ mt: 1, fontSize: { xs: "1.9rem", md: "2.5rem" } }}
          >
            We'd love to hear from you
          </Typography>
          <Typography
            variant="body1"
            className="pa-fade-up pa-delay-2"
            sx={{ color: "rgba(255,255,255,0.85)", mt: 1.5, maxWidth: 560, mx: "auto" }}
          >
            Questions about a course, admissions, or anything else — our team
            typically replies within one business day.
          </Typography>
        </div>
      </Box>

      {/* Form + Info + Quick Callback */}
      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <ContactForm />
            </div>
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4">
                <RequestCallback />
                <ContactInfo />
                <WorkingHours />
              </div>
            </div>
          </div>
        </div>
      </Box>

      {/* Branch Locator */}
      <Box component="section" sx={{ py: { xs: 6, md: 8 }, backgroundColor: colors.sectionBackground }}>
        <div className="container">
          <SectionHeading eyebrow="Find Us" title="Visit an Offline Center" />
          <BranchLocator />
        </div>
      </Box>

      {/* Map */}
      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <div className="container">
          <Map />
        </div>
      </Box>

      {/* FAQ Preview */}
      <Box component="section" sx={{ pb: { xs: 6, md: 9 } }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <FAQPreview />
            </div>
          </div>
        </div>
      </Box>

      <FloatingContact />
    </Box>
  );
};

export default Contact;
