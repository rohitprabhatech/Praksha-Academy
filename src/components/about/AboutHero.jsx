import { motion } from "framer-motion";
import { Box, Typography, Button, Stack } from "@mui/material";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GradientBlobs from "../common/GradientBlobs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" } }),
};

const AboutHero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: premium.navy,
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 12 },
        textAlign: "center",
      }}
    >
      <GradientBlobs variant="hero" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
          <Typography
            variant="overline"
            sx={{ color: premium.cyan, fontWeight: 700, letterSpacing: 3, display: "block", mb: 2 }}
          >
            ABOUT PRAKSHA ACADEMY
          </Typography>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.1}>
          <Typography
            component="h1"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
              lineHeight: 1.12,
              color: premium.white,
              mb: 3,
              maxWidth: 820,
              mx: "auto",
              background: `linear-gradient(90deg, ${premium.white} 30%, ${premium.cyan} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Building Skills. Creating Futures.
          </Typography>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.2}>
          <Typography
            variant="body1"
            sx={{ color: premium.grayLight, fontSize: "1.15rem", lineHeight: 1.8, maxWidth: 620, mx: "auto", mb: 5 }}
          >
            Praksha Academy pairs experienced teachers with a curriculum
            designed to make hard concepts click — from Class 8 foundations
            to career-ready programming and data science.
          </Typography>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              endIcon={<FaArrowRight />}
              href="/courses"
              sx={{
                px: 4.5,
                py: 1.6,
                background: `linear-gradient(90deg, ${premium.blue}, ${premium.purple})`,
                boxShadow: `0 8px 24px ${premium.blue}55`,
                "&:hover": { boxShadow: `0 10px 30px ${premium.blue}77` },
              }}
            >
              Explore Courses
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FaPlayCircle />}
              href="/contact"
              sx={{
                px: 4.5,
                py: 1.6,
                color: premium.white,
                borderColor: "rgba(255,255,255,0.25)",
                "&:hover": { borderColor: premium.cyan, backgroundColor: "rgba(34,211,238,0.06)" },
              }}
            >
              Talk to Us
            </Button>
          </Stack>
        </motion.div>
      </div>
    </Box>
  );
};

export default AboutHero;
