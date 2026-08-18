import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
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
  <Box component="section" className="pa-about-hero" sx={{ backgroundColor: premium.background, py: { xs: 5, md: 6, lg: 7 } }}>
    <div className="container">
      <div className="row align-items-center g-5 g-lg-6">
        <div className="col-lg-6">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <Typography className="pa-eyebrow" component="p">ABOUT PRAKSHA ACADEMY</Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "2.5rem", sm: "3.1rem", md: "3.6rem", lg: "4.1rem" },
                lineHeight: 1.05,
                letterSpacing: "-0.045em",
                color: premium.textPrimary,
                mb: 2.5,
                maxWidth: 720,
              }}
            >
              Learning that turns curiosity into <Box component="span" sx={{ color: premium.blue }}>confidence.</Box>
            </Typography>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.12}>
            <Typography sx={{
              color: premium.textSecondary, fontSize: { xs: "0.95rem", md: "1rem" },
              lineHeight: 1.7,
              maxWidth: 590,
              mb: 3.5
            }}>
              Praksha Academy brings academic foundations, communication and future-ready technology skills together through structured, mentor-led learning.
            </Typography>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.22}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
              <Button variant="contained" color="primary" href="/courses" endIcon={<FaArrowRight size={12} />} sx={{ px: 3.2, py: 1.45, borderRadius: "10px", fontWeight: 600, boxShadow: "0 14px 28px rgba(37, 99, 235, 0.14)" }}>
                Explore courses
              </Button>
              <Button
                variant="outlined"
                href="/contact"
                sx={{
                  color: premium.blue,
                  borderColor: premium.blue,
                  fontWeight: 600,
                  px: 2.5,
                  py: 1.35,
                  borderRadius: "10px",
                  "&:hover": {
                    borderColor: premium.blue,
                    backgroundColor: "rgba(37, 99, 235, 0.06)",
                  },
                }}
              >
                Talk to us
              </Button>
            </Box>
          </motion.div>


        </div>

        <div className="col-lg-6">
          <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Box className="pa-hero-visual">
              <Box className="pa-hero-image-wrap">
                <Box component="img" src={mediaData.about.hero} alt={mediaData.about.heroAlt} className="pa-hero-image" loading="eager" />
              </Box>
              <Box
                className="pa-hero-note"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 1.5,
                  p: 1.5,
                  border: `1px solid ${premium.border}`,
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    minWidth: 38,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(37, 99, 235, 0.08)",
                    color: premium.blue,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: premium.blue,
                      mb: 0.3,
                    }}
                  >
                    OUR APPROACH
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: premium.textPrimary,
                    }}
                  >
                    Understand
                    <span style={{ color: premium.blue }}> → </span>
                    Practice
                    <span style={{ color: premium.blue }}> → </span>
                    Apply
                  </Typography>
                </Box>
              </Box>
             
            </Box>
          </motion.div>
        </div>
      </div>
    </div>
  </Box>
);

export default AboutHero;
