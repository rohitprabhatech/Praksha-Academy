import { Box, Typography } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import aboutData from "../../data/aboutData";

const Achievements = () => {
  const items = aboutData.recognition?.length
    ? aboutData.recognition.map((item) => ({ title: item.title, description: `${item.issuer || "Recognition"}${item.year ? ` · ${item.year}` : ""}` }))
    : aboutData.differentiators.slice(0, 4).map((item) => ({ title: item.title, description: item.description }));

  return (
    <Box className="pa-achievements">
      <div className="row g-4 align-items-start">
        <div className="col-lg-5">
          <AnimatedReveal direction="left">
            <Typography className="pa-eyebrow" component="p">ACHIEVEMENTS & IMPACT</Typography>
            <Typography component="h2" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: "2rem", md: "3rem" }, lineHeight: 1.1, color: premium.textPrimary, letterSpacing: "-0.03em", mb: 2 }}>
              Progress is built, not promised.
            </Typography>
            <Typography sx={{ color: premium.textSecondary, lineHeight: 1.8, maxWidth: 470 }}>
              We focus on the habits, guidance and practice that help learners make meaningful progress over time.
            </Typography>
          </AnimatedReveal>
        </div>
        <div className="col-lg-7">
          <Box className="pa-achievement-list">
            {items.map((item, index) => (
              <AnimatedReveal key={item.title} delay={index * 70}>
                <Box className="pa-achievement-row">
                  <Box className="pa-check"><FaCheck size={12} /></Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: premium.textPrimary }}>{item.title}</Typography>
                    <Typography sx={{ color: premium.textSecondary, mt: 0.5, lineHeight: 1.65 }}>{item.description}</Typography>
                  </Box>
                </Box>
              </AnimatedReveal>
            ))}
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Achievements;
