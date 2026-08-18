import { Box, Typography, Button } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";

/**
 * Editorial closing statement — plain background, huge bold text, one
 * button. No dark panel, no gradient, no background photo overlay.
 */
const CTASection = () => {
  return (
    <Box sx={{ borderTop: `1px solid ${premium.border}`, pt: { xs: 6, md: 8 } }}>
      <AnimatedReveal>
        <Typography
          component="h2"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            lineHeight: 1.15,
            color: premium.textPrimary,
            mb: 3,
            maxWidth: 640,
          }}
        >
          Ready to transform your future?
        </Typography>
        <Typography variant="body1" sx={{ color: premium.textSecondary, fontSize: "1.1rem", maxWidth: 480, mb: 4 }}>
          Join Praksha Academy and take the first step towards where you're
          headed.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/contact"
          sx={{
            px: 4,
            py: 1.4,
            borderRadius: "8px",
            fontWeight: 600,
            backgroundColor: premium.textPrimary,
            "&:hover": { backgroundColor: "#0F172A" },
          }}
        >
          Contact us
        </Button>
      </AnimatedReveal>
    </Box>
  );
};

export default CTASection;
