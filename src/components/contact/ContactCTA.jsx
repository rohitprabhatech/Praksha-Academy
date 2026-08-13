import { Box, Typography, Button, Stack } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GradientBlobs from "../common/GradientBlobs";
import AnimatedReveal from "../common/AnimatedReveal";

const ContactCTA = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        textAlign: "center",
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 6 },
        background: `linear-gradient(135deg, ${premium.navySoft} 0%, ${premium.navy} 100%)`,
        border: `1px solid ${premium.glassBorder}`,
      }}
    >
      <GradientBlobs variant="cta" />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <AnimatedReveal>
          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.8rem", md: "2.4rem" }, color: premium.white, mb: 2 }}>
            Still have questions?
          </Typography>
          <Typography variant="body1" sx={{ color: premium.grayLight, maxWidth: 480, mx: "auto", mb: 4 }}>
            We're here to help you choose the right path.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              endIcon={<FaArrowRight />}
              href="#contact-form"
              sx={{ px: 4.5, py: 1.6, background: `linear-gradient(90deg, ${premium.blue}, ${premium.purple})`, boxShadow: `0 8px 24px ${premium.blue}55` }}
            >
              Talk to Praksha Academy
            </Button>
          </Stack>
        </AnimatedReveal>
      </Box>
    </Box>
  );
};

export default ContactCTA;
