import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * UI taxonomy for routing an enquiry — not a business fact, safe to
 * define statically. Selecting a category sets ContactForm's initial
 * "inquiry type" field. Text-only pills — the selected state (blue
 * border + tinted background + bold text) carries the affordance
 * without needing an icon.
 */
export const inquiryCategories = [
  { id: "course", label: "Course Information" },
  { id: "admissions", label: "Admissions" },
  { id: "career", label: "Career Guidance" },
  { id: "partnership", label: "Partnership" },
  { id: "general", label: "General Question" },
];

const InquiryCards = ({ selected, onSelect }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
      {inquiryCategories.map((category) => {
        const isActive = selected === category.id;
        return (
          <Box
            key={category.id}
            component="button"
            type="button"
            onClick={() => onSelect(category.id)}
            aria-pressed={isActive}
            sx={{
              px: 2.25,
              py: 1.25,
              borderRadius: "12px",
              border: `1px solid ${isActive ? premium.blue : premium.border}`,
              backgroundColor: isActive ? "rgba(37,99,235,0.08)" : premium.cardBg,
              color: isActive ? premium.blue : premium.textSecondary,
              fontFamily: "inherit",
              fontSize: "0.9rem",
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": { borderColor: premium.blue, color: premium.blue },
              "&:focus-visible": { outline: `2px solid ${premium.blue}`, outlineOffset: 2 },
            }}
          >
            <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit", color: "inherit" }}>
              {category.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default InquiryCards;
