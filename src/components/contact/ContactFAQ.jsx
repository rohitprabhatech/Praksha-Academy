import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { premium } from "../../theme/premiumPalette";
import contactData from "../../data/contactData";

const ContactFAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {contactData.faqs.map((item, index) => {
        const panel = `contact-panel-${index}`;
        const isOpen = expanded === panel;

        return (
          <Accordion
            key={item.q}
            expanded={isOpen}
            onChange={handleChange(panel)}
            disableGutters
            elevation={0}
            sx={{
              mb: 1.25,
              backgroundColor: premium.cardBg,
              border: `1px solid ${
                isOpen ? premium.blue : premium.border
              }`,
              borderRadius: "10px !important",
              overflow: "hidden",
              transition: "border-color 0.3s ease",

              "&:before": {
                display: "none",
              },

              "&:hover": {
                borderColor: isOpen
                  ? premium.blue
                  : "rgba(37,99,235,0.35)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isOpen
                      ? premium.blue
                      : premium.sectionBg,
                    color: isOpen
                      ? premium.white
                      : premium.textSecondary,
                    transition: "all 0.3s ease",
                  }}
                >
                  <AddIcon
                    sx={{
                      fontSize: 18,
                      transform: isOpen
                        ? "rotate(45deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>
              }
              sx={{
                minHeight: 58,
                px: { xs: 2, md: 2.5 },

                "& .MuiAccordionSummary-content": {
                  my: 1.5,
                },
              }}
            >
              <Typography
                sx={{
                  color: premium.textPrimary,
                  fontSize: {
                    xs: "0.86rem",
                    md: "0.9rem",
                  },
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                {item.q}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: { xs: 2, md: 2.5 },
                pb: 2.5,
                pt: 0,
              }}
            >
              <Typography
                sx={{
                  color: premium.textSecondary,
                  fontSize: "0.86rem",
                  lineHeight: 1.75,
                  maxWidth: "90%",
                }}
              >
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