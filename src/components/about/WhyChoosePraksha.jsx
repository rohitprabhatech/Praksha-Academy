import { Box, Typography } from "@mui/material";
import { FaGraduationCap, FaLaptopCode, FaLightbulb, FaBriefcase } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GlassCard from "../common/GlassCard";
import AnimatedReveal from "../common/AnimatedReveal";

const features = [
  { icon: <FaGraduationCap />, title: "Quality Education", description: "Structured learning with a focus on real understanding, not memorization." },
  { icon: <FaLaptopCode />, title: "Skill Development", description: "Building both technical and soft skills for real-world success." },
  { icon: <FaLightbulb />, title: "Innovation & Tech", description: "Using modern tools and technology to make learning more effective." },
  { icon: <FaBriefcase />, title: "Career Support", description: "Guidance and mentorship aimed at a genuinely brighter future." },
];

const WhyChoosePraksha = () => {
  return (
    <div className="row g-4">
      {features.map((feature, index) => (
        <div className="col-sm-6 col-lg-3" key={feature.title}>
          <AnimatedReveal delay={index * 80}>
            <GlassCard sx={{ p: 3, height: "100%", textAlign: "center" }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(37,99,235,0.08)",
                  color: premium.blue,
                  fontSize: 20,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ color: premium.textPrimary, fontWeight: 700, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: premium.textSecondary, lineHeight: 1.6 }}>
                {feature.description}
              </Typography>
            </GlassCard>
          </AnimatedReveal>
        </div>
      ))}
    </div>
  );
};

export default WhyChoosePraksha;
