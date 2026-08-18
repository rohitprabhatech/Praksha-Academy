import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { FaArrowRight, FaBookOpen, FaUsers } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import mediaData from "../../data/mediaData";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const AboutHero = () => (
  <Box component="section" className="pa-about-hero" sx={{ backgroundColor: premium.background }}>
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <Typography className="pa-eyebrow" component="p">ABOUT PRAKSHA ACADEMY</Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "2.65rem", sm: "3.5rem", md: "4.35rem" },
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
                color: premium.textPrimary,
                mb: 3,
                maxWidth: 720,
              }}
            >
              Learning that turns curiosity into <Box component="span" sx={{ color: premium.blue }}>confidence.</Box>
            </Typography>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.12}>
            <Typography sx={{ color: premium.textSecondary, fontSize: { xs: "1rem", md: "1.12rem" }, lineHeight: 1.8, maxWidth: 620, mb: 4 }}>
              Praksha Academy brings academic foundations, communication and future-ready technology skills together through structured, mentor-led learning.
            </Typography>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.22}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
              <Button variant="contained" color="primary" href="/courses" endIcon={<FaArrowRight size={12} />}>
                Explore courses
              </Button>
              <Button variant="text" href="/contact" sx={{ color: premium.textPrimary, fontWeight: 600 }}>
                Talk to us
              </Button>
            </Box>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.32}>
            <Box className="pa-hero-proof" sx={{ mt: 5 }}>
              <Box><FaBookOpen color={premium.blue} size={18} /><span>Structured learning</span></Box>
              <Box><FaUsers color={premium.orange} size={18} /><span>Mentor-led support</span></Box>
            </Box>
          </motion.div>
        </div>

        <div className="col-lg-6">
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Box className="pa-hero-visual">
              <Box className="pa-hero-image-wrap">
                <Box component="img" src={mediaData.about.hero} alt={mediaData.about.heroAlt} className="pa-hero-image" loading="eager" />
              </Box>
              <Box className="pa-hero-note">
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: 1.2, color: premium.blue }}>OUR APPROACH</Typography>
                <Typography sx={{ fontWeight: 700, color: premium.textPrimary, mt: 0.4 }}>Understand → Practice → Apply</Typography>
              </Box>
              <Box className="pa-hero-accent pa-hero-accent-blue" />
              <Box className="pa-hero-accent pa-hero-accent-orange" />
            </Box>
          </motion.div>
        </div>
      </div>
    </div>
  </Box>
);

export default AboutHero;
