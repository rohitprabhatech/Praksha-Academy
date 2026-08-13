import { Box, Typography } from "@mui/material";
import { FaLightbulb, FaPencilAlt, FaRocket, FaComments, FaSyncAlt, FaMedal } from "react-icons/fa";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import { colors } from "../../theme/theme";
import aboutData from "../../data/aboutData";
import AnimatedReveal from "../common/AnimatedReveal";

const icons = [FaLightbulb, FaPencilAlt, FaRocket, FaComments, FaSyncAlt, FaMedal];

/**
 * Visual learning-flow diagram: Understand → Practice → Apply → Feedback
 * → Improve → Confidence. Connected horizontally on desktop, stacked
 * vertically on mobile. Hover lifts a step and highlights its icon.
 */
const LearningModel = () => {
  const steps = aboutData.learningPhilosophy;

  return (
    <Box>
      {/* Desktop: horizontal connected flow */}
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "stretch" }} role="list" aria-label="Praksha Academy learning model steps">
        {steps.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Box key={item.step} sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <AnimatedReveal delay={index * 90} sx={{ flex: 1 }}>
                <Box
                  role="listitem"
                  className="pa-hover-card"
                  sx={{
                    backgroundColor: colors.cardBackground,
                    border: `1px solid ${colors.borderColor}`,
                    borderRadius: "14px",
                    p: 3,
                    textAlign: "center",
                    minHeight: 168,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(37,99,235,0.1)",
                      color: colors.primaryBlue,
                      fontSize: 18,
                      mb: 1.5,
                    }}
                  >
                    <Icon />
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 700, mb: 1 }}>
                    {item.step}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.6, fontSize: "0.82rem" }}>
                    {item.description}
                  </Typography>
                </Box>
              </AnimatedReveal>
              {index < steps.length - 1 && (
                <Box sx={{ color: colors.dividerColor, px: 1, flexShrink: 0 }} aria-hidden="true">
                  <FaArrowRight />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Mobile: vertical stack */}
      <Box sx={{ display: { xs: "block", md: "none" } }} role="list" aria-label="Praksha Academy learning model steps">
        {steps.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Box key={item.step} role="listitem">
              <Box sx={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.borderColor}`, borderRadius: "14px", p: 2.5, display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  aria-hidden="true"
                  sx={{ width: 40, height: 40, minWidth: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(37,99,235,0.1)", color: colors.primaryBlue, fontSize: 16 }}
                >
                  <Icon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 700, mb: 0.5 }}>
                    {item.step}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
              {index < steps.length - 1 && (
                <Box sx={{ color: colors.dividerColor, textAlign: "center", py: 1 }} aria-hidden="true">
                  <FaArrowDown />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default LearningModel;
