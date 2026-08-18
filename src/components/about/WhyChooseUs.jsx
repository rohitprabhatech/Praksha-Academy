import { Box, Typography } from "@mui/material";
import { FaTools, FaChalkboardTeacher, FaLaptopCode, FaSeedling } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GlassCard from "../common/GlassCard";
import AnimatedReveal from "../common/AnimatedReveal";

const reasons = [
  { icon: <FaTools />, title: "Practical Learning", gradient: [premium.blue, premium.blueLight], description: "Every concept is paired with hands-on practice — not passive video watching." },
  { icon: <FaChalkboardTeacher />, title: "Expert Guidance", gradient: [premium.orange, "#FBBF24"], description: "Teachers who explain the 'why', not just the answer, and stay available for questions." },
  { icon: <FaLaptopCode />, title: "Technology Focus", gradient: [premium.blueLight, premium.blue], description: "Modern, in-demand technical skills alongside strong academic fundamentals." },
  { icon: <FaSeedling />, title: "Growth Mindset", gradient: [premium.green, "#4ADE80"], description: "Progress is tracked and celebrated — improvement matters more than a single score." },
];

const WhyChooseUs = () => {
  return (
    <div className="row g-4">
      {reasons.map((reason, index) => (
        <div className="col-sm-6 col-lg-3" key={reason.title}>
          <AnimatedReveal delay={index * 80}>
            <GlassCard sx={{ p: 3.5, height: "100%", textAlign: "center" }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${reason.gradient[0]}, ${reason.gradient[1]})`,
                  color: premium.white,
                  fontSize: 20,
                  mx: "auto",
                  mb: 2.5,
                }}
              >
                {reason.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ color: premium.textPrimary, fontWeight: 600, mb: 1.5 }}>
                {reason.title}
              </Typography>
              <Typography variant="body2" sx={{ color: premium.textSecondary, lineHeight: 1.7 }}>
                {reason.description}
              </Typography>
            </GlassCard>
          </AnimatedReveal>
        </div>
      ))}
    </div>
  );
};

export default WhyChooseUs;
