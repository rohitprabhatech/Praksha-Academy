import { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Link } from "@mui/material";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import { colors } from "../../theme/theme";

const faqs = [
  {
    q: "How do I enroll in a course?",
    a: "Create a free account, browse the Courses page, and click Enroll on any course card — you'll be guided through payment and access setup.",
  },
  {
    q: "Do you offer live classes or recorded ones?",
    a: "Both. Most courses include live sessions with instructors plus recorded lectures you can revisit anytime from your dashboard.",
  },
  {
    q: "What age groups do you teach?",
    a: "Our academic tracks cover Class 8 through Class 12, alongside standalone English and programming courses open to all ages.",
  },
  {
    q: "Can I get a refund if a course isn't right for me?",
    a: "Yes — see our Refund Policy page for the eligibility window and process; most requests are resolved within 5–7 business days.",
  },
];

const FAQPreview = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.borderColor}`, borderRadius: "12px", p: { xs: 3, md: 4 } }}>
      <Typography variant="h5" sx={{ color: colors.textPrimary, mb: 0.5 }}>
        Frequently Asked Questions
      </Typography>
      <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 3 }}>
        Quick answers before you reach out.
      </Typography>

      {faqs.map((item, index) => (
        <Accordion
          key={item.q}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          disableGutters
          elevation={0}
          sx={{
            border: `1px solid ${colors.borderColor}`,
            borderRadius: "10px !important",
            mb: 1.5,
            "&:before": { display: "none" },
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<FaChevronDown size={14} color={colors.textSecondary} />}
            sx={{ backgroundColor: colors.sectionBackground }}
          >
            <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 600 }}>
              {item.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7 }}>
              {item.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Link
        href="/faq"
        underline="none"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          mt: 1,
          color: colors.primaryBlue,
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        View all FAQs <FaArrowRight size={12} />
      </Link>
    </Box>
  );
};

export default FAQPreview;
