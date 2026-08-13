import { Box, Typography, Button, Stack } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GradientBlobs from "../common/GradientBlobs";
import AnimatedReveal from "../common/AnimatedReveal";

const CTASection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        textAlign: "center",
        py: { xs: 6, md: 9 },
        px: { xs: 3, md: 6 },
        background: `linear-gradient(135deg, ${premium.navySoft} 0%, ${premium.navy} 100%)`,
        border: `1px solid ${premium.glassBorder}`,
      }}
    >
      <GradientBlobs variant="cta" />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <AnimatedReveal>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.9rem", md: "2.6rem" },
              color: premium.white,
              mb: 2,
            }}
          >
            Your Journey Starts Here.
          </Typography>
          <Typography variant="body1" sx={{ color: premium.grayLight, maxWidth: 520, mx: "auto", mb: 4, fontSize: "1.05rem" }}>
            Browse our courses or talk to our team — we'll help you find the
            right track for where you're headed.
          </Typography>
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
              }}
            >
              Browse Courses
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="/contact"
              sx={{
                px: 4.5,
                py: 1.6,
                color: premium.white,
                borderColor: "rgba(255,255,255,0.25)",
                "&:hover": { borderColor: premium.cyan, backgroundColor: "rgba(34,211,238,0.06)" },
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </AnimatedReveal>
      </Box>
    </Box>
  );
};

export default CTASection;
