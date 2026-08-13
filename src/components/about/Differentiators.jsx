import { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { colors } from "../../theme/theme";
import aboutData from "../../data/aboutData";

/**
 * "What Makes Us Different" — interactive feature list on desktop
 * (click/hover an item, a visual panel on the right highlights it),
 * accordion on mobile so nothing requires hover to access.
 */
const Differentiators = () => {
  const items = aboutData.differentiators;
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState("panel0");

  return (
    <>
      {/* Desktop: two-column interactive list */}
      <div className="row g-5 d-none d-md-flex align-items-stretch">
        <div className="col-md-6">
          {items.map((item, index) => (
            <Box
              key={item.title}
              role="button"
              tabIndex={0}
              onClick={() => setActive(index)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(index); } }}
              aria-pressed={active === index}
              sx={{
                display: "flex",
                gap: 3,
                p: 3,
                mb: 1.5,
                borderRadius: "12px",
                cursor: "pointer",
                border: `1px solid ${active === index ? colors.primaryBlue : colors.borderColor}`,
                backgroundColor: active === index ? "rgba(37,99,235,0.05)" : "transparent",
                transition: "all 0.25s ease",
                "&:focus-visible": { outline: `3px solid ${colors.primaryBlue}`, outlineOffset: "2px" },
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: active === index ? colors.primaryBlue : colors.borderColor, fontWeight: 700, minWidth: 48 }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </Typography>
              <Box>
                <Typography variant="h6" sx={{ color: colors.textPrimary, mb: active === index ? 1 : 0 }}>
                  {item.title}
                </Typography>
                {active === index && (
                  <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </div>

        {/* Visual panel */}
        <div className="col-md-6">
          <Box
            sx={{
              height: "100%",
              minHeight: 320,
              borderRadius: "18px",
              background: `linear-gradient(135deg, ${colors.primaryBlue} 0%, #1E40AF 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ color: colors.textWhite, fontWeight: 600, lineHeight: 1.4 }}>
              {items[active].title}
            </Typography>
          </Box>
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="d-md-none">
        {items.map((item, index) => (
          <Accordion
            key={item.title}
            expanded={expanded === `panel${index}`}
            onChange={(_e, isExp) => setExpanded(isExp ? `panel${index}` : false)}
            disableGutters
            elevation={0}
            sx={{ border: `1px solid ${colors.borderColor}`, borderRadius: "10px !important", mb: 1.5, "&:before": { display: "none" }, overflow: "hidden" }}
          >
            <AccordionSummary expandIcon={<FaChevronDown size={14} color={colors.textSecondary} aria-hidden="true" />} sx={{ backgroundColor: colors.sectionBackground }}>
              <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 700 }}>
                {String(index + 1).padStart(2, "0")}. {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7 }}>
                {item.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Differentiators;
