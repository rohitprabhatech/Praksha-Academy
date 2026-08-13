import { Box, Typography } from "@mui/material";
import { FaSearch, FaClipboardList, FaBookReader, FaPencilRuler, FaUserFriends, FaChartLine } from "react-icons/fa";
import { colors } from "../../theme/theme";
import aboutData from "../../data/aboutData";
import AnimatedReveal from "../common/AnimatedReveal";

const icons = [FaSearch, FaClipboardList, FaBookReader, FaPencilRuler, FaUserFriends, FaChartLine];

/**
 * Vertical timeline: numbered, iconed nodes with a connecting line and a
 * staggered scroll-reveal per step.
 */
const StudentJourney = () => {
  const steps = aboutData.studentJourney;

  return (
    <Box sx={{ position: "relative", pl: { xs: 4, md: 6 } }} role="list" aria-label="Student journey at Praksha Academy">
      <Box
        aria-hidden="true"
        sx={{ position: "absolute", left: { xs: 15, md: 23 }, top: 8, bottom: 8, width: 2, backgroundColor: colors.borderColor }}
      />
      {steps.map((item, index) => {
        const Icon = icons[index % icons.length];
        return (
          <AnimatedReveal key={item.step} delay={index * 90}>
            <Box role="listitem" sx={{ position: "relative", pb: index === steps.length - 1 ? 0 : 4.5 }}>
              <Box
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  left: { xs: -33, md: -49 },
                  top: 0,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: colors.cardBackground,
                  border: `2px solid ${colors.primaryBlue}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  color: colors.primaryBlue,
                }}
              >
                <Icon size={14} />
              </Box>
              <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 700, mb: 0.5 }}>
                {item.step}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7, maxWidth: 480 }}>
                {item.description}
              </Typography>
            </Box>
          </AnimatedReveal>
        );
      })}
    </Box>
  );
};

export default StudentJourney;
