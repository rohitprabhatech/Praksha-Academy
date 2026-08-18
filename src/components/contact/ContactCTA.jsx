import { Box, Typography, Button } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";

/**
 * Light blue-tinted closing band, matching the reference — a softer
 * treatment than the About page's dark gradient CTA, appropriate for a
 * "we're still here if you need us" closing note rather than a hard
 * sales push.
 */
const ContactCTA = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        borderRadius: "20px",
        py: { xs: 5, md: 6 },
        px: { xs: 3, md: 6 },
        backgroundColor: "rgba(37,99,235,0.06)",
        border: `1px solid ${premium.border}`,
      }}
    >
      <AnimatedReveal>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.9rem" }, color: premium.textPrimary, mb: 1.5 }}>
          Still Have Questions? Chat with an Advisor.
        </Typography>
        <Typography variant="body1" sx={{ color: premium.textSecondary, maxWidth: 480, mx: "auto", mb: 3.5 }}>
          Our academic counselors are available to guide your course
          choices.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="#contact-form"
          sx={{ px: 4, py: 1.4, backgroundColor: premium.blue, "&:hover": { backgroundColor: premium.blueHover } }}
        >
          Talk to a Praksha Academy Advisor
        </Button>
      </AnimatedReveal>
    </Box>
  );
};

export default ContactCTA;
