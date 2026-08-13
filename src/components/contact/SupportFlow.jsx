import { Box, Typography } from "@mui/material";
import { FaQuestionCircle, FaListUl, FaComments, FaGraduationCap } from "react-icons/fa";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import { colors } from "../../theme/theme";

const steps = [
  { icon: <FaQuestionCircle />, label: "Have a Question", color: colors.primaryBlue, bg: "rgba(37,99,235,0.1)" },
  { icon: <FaListUl />, label: "Choose a Program", color: colors.secondaryOrange, bg: "rgba(245,158,11,0.12)" },
  { icon: <FaComments />, label: "Talk to an Advisor", color: colors.successGreen, bg: "rgba(34,197,94,0.12)" },
  { icon: <FaGraduationCap />, label: "Start Learning", color: "#7C3AED", bg: "rgba(124,58,237,0.1)" },
];

/**
 * Visual horizontal process showing what happens after someone reaches
 * out — more useful than another paragraph explaining the same thing.
 */
const SupportFlow = () => {
  return (
    <Box>
      {/* Desktop: horizontal */}
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
        {steps.map((step, index) => (
          <Box key={step.label} sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center" }}>
              <Box
                aria-hidden="true"
                sx={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: step.bg, color: step.color, fontSize: 20, mb: 1.5 }}
              >
                {step.icon}
              </Box>
              <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 700 }}>
                {step.label}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box sx={{ color: colors.dividerColor, px: 1 }} aria-hidden="true">
                <FaArrowRight />
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Mobile: vertical */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {steps.map((step, index) => (
          <Box key={step.label} sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                aria-hidden="true"
                sx={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: step.bg, color: step.color, fontSize: 18, mb: 1 }}
              >
                {step.icon}
              </Box>
              <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 700, mb: 1 }}>
                {step.label}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box sx={{ color: colors.dividerColor, py: 0.5 }} aria-hidden="true">
                <FaArrowDown />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SupportFlow;
