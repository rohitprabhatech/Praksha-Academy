import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import GradientBlobs from "../common/GradientBlobs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" } }),
};

const ContactHero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: premium.navy,
        pt: { xs: 10, md: 13 },
        pb: { xs: 9, md: 10 },
        textAlign: "center",
      }}
    >
      <GradientBlobs variant="hero" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
          <Typography variant="overline" sx={{ color: premium.cyan, fontWeight: 700, letterSpacing: 3, display: "block", mb: 2 }}>
            GET IN TOUCH
          </Typography>
        </motion.div>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.1}>
          <Typography
            component="h1"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.4rem" },
              lineHeight: 1.15,
              color: premium.white,
              mb: 3,
              maxWidth: 720,
              mx: "auto",
              background: `linear-gradient(90deg, ${premium.white} 30%, ${premium.cyan} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Have a Question? We're Here to Help.
          </Typography>
        </motion.div>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.2}>
          <Typography variant="body1" sx={{ color: premium.grayLight, fontSize: "1.1rem", lineHeight: 1.8, maxWidth: 560, mx: "auto" }}>
            Whether you're exploring courses, applying for admission, or just
            have a quick question — reach out below. A real person from
            Praksha Academy reads every message.
          </Typography>
        </motion.div>
      </div>
    </Box>
  );
};

export default ContactHero;
