import { Box, Typography } from "@mui/material";
import { FaSearch, FaBook, FaPencilRuler, FaHammer, FaChartLine } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";

const steps = [
  { icon: <FaSearch />, title: "Discover", description: "Find the right course and track for your goals." },
  { icon: <FaBook />, title: "Learn", description: "Structured lessons that build concepts step by step." },
  { icon: <FaPencilRuler />, title: "Practice", description: "Exercises and assignments that reinforce every lesson." },
  { icon: <FaHammer />, title: "Build", description: "Apply what you've learned to real projects and problems." },
  { icon: <FaChartLine />, title: "Grow", description: "Track progress and keep leveling up, term after term." },
];

const LearningJourney = () => {
  return (
    <Box sx={{ position: "relative" }}>
      {/* Connector line — desktop only */}
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 34,
          left: "10%",
          right: "10%",
          height: 2,
          background: `linear-gradient(90deg, ${premium.blue}, ${premium.orange})`,
          opacity: 0.4,
        }}
      />

      <div className="row g-4">
        {steps.map((step, index) => (
          <div className="col-6 col-md" key={step.title}>
            <AnimatedReveal delay={index * 100}>
              <Box sx={{ textAlign: "center", position: "relative" }}>
                <Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    position: "relative",
                    zIndex: 1,
                    background: `linear-gradient(135deg, ${premium.blue}, ${premium.blueLight})`,
                    color: premium.white,
                    fontSize: 24,
                    border: `3px solid ${premium.background}`,
                    boxShadow: `0 0 0 2px rgba(37,99,235,0.25)`,
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: premium.blue, fontWeight: 700, letterSpacing: 1, display: "block", mb: 0.5 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: premium.textPrimary, fontWeight: 600, mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: premium.textSecondary, lineHeight: 1.6, maxWidth: 180, mx: "auto" }}>
                  {step.description}
                </Typography>
              </Box>
            </AnimatedReveal>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default LearningJourney;
