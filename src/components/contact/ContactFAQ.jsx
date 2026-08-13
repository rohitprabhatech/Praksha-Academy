import { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import contactData from "../../data/contactData";

const ContactFAQ = () => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_e, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <Box sx={{ maxWidth: 760, mx: "auto" }}>
      {contactData.faqs.map((item, index) => {
        const isOpen = expanded === `contact-panel${index}`;
        return (
          <Accordion
            key={item.q}
            expanded={isOpen}
            onChange={handleChange(`contact-panel${index}`)}
            disableGutters
            elevation={0}
            sx={{
              backgroundColor: premium.glassBg,
              backdropFilter: "blur(16px)",
              border: `1px solid ${isOpen ? "rgba(34,211,238,0.4)" : premium.glassBorder}`,
              borderRadius: "14px !important",
              mb: 1.5,
              "&:before": { display: "none" },
              transition: "border-color 0.25s ease",
            }}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isOpen ? premium.cyan : "rgba(255,255,255,0.08)",
                    color: isOpen ? premium.navy : premium.grayLight,
                    transition: "all 0.25s ease",
                    transform: isOpen ? "rotate(45deg)" : "none",
                  }}
                >
                  <FaPlus size={11} />
                </Box>
              }
              sx={{ px: 3, py: 0.5 }}
            >
              <Typography variant="subtitle1" sx={{ color: premium.white, fontWeight: 600 }}>
                {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
              <Typography variant="body2" sx={{ color: premium.grayLight, lineHeight: 1.7 }}>
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default ContactFAQ;
