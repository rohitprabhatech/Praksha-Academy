import { Box, Typography, Avatar } from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";
import { colors } from "../../theme/theme";
import aboutData from "../../data/aboutData";

/**
 * Student testimonials. Reads aboutData.testimonials, which is
 * intentionally empty. Renders nothing until real, verified student
 * quotes are added — never invents a testimonial. The parent page
 * (About.jsx) skips the surrounding section heading when this returns
 * null, so no empty "Student Stories" heading appears over nothing.
 */
const StudentStories = () => {
  const testimonials = aboutData.testimonials;
  if (testimonials.length === 0) return null;

  return (
    <div className="row g-4">
      {testimonials.map((t) => (
        <div className="col-md-6 col-lg-4" key={t.name}>
          <Box sx={{ border: `1px solid ${colors.borderColor}`, borderRadius: "14px", p: 3.5, height: "100%", backgroundColor: colors.cardBackground }}>
            <Box sx={{ color: colors.primaryBlue, fontSize: 20, mb: 1.5 }} aria-hidden="true">
              <FaQuoteLeft />
            </Box>
            <Typography variant="body1" sx={{ color: colors.textPrimary, lineHeight: 1.7, mb: 3, fontStyle: "italic" }}>
              "{t.quote}"
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar src={t.photo || undefined} alt={t.name} sx={{ width: 40, height: 40 }}>
                {!t.photo && t.name?.[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 600 }}>
                  {t.name}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                  {t.program}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default StudentStories;
