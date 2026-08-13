import { Box, Typography } from "@mui/material";
import { FaBook, FaUserGraduate, FaBriefcase, FaHandshake, FaCommentDots } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";

/**
 * UI taxonomy for routing an enquiry — not a business fact, safe to
 * define statically. Selecting a category sets ContactForm's initial
 * "inquiry type" field.
 */
export const inquiryCategories = [
  { id: "course", icon: <FaBook />, label: "Course Information" },
  { id: "admissions", icon: <FaUserGraduate />, label: "Admissions" },
  { id: "career", icon: <FaBriefcase />, label: "Career Guidance" },
  { id: "partnership", icon: <FaHandshake />, label: "Partnership" },
  { id: "general", icon: <FaCommentDots />, label: "General Question" },
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
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1.25,
              borderRadius: "12px",
              border: `1px solid ${isActive ? premium.cyan : premium.glassBorder}`,
              backgroundColor: isActive ? "rgba(34,211,238,0.12)" : premium.glassBg,
              color: isActive ? premium.cyan : premium.grayLight,
              fontFamily: "inherit",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": { borderColor: premium.cyan, color: premium.cyan },
              "&:focus-visible": { outline: `2px solid ${premium.cyan}`, outlineOffset: 2 },
            }}
          >
            <Box sx={{ fontSize: 14, display: "flex" }} aria-hidden="true">
              {category.icon}
            </Box>
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
