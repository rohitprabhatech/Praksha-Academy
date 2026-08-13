import { Box, Typography, Button } from "@mui/material";
import { colors } from "../../theme/theme";
import contactData from "../../data/contactData";

/**
 * Dark navy closing CTA — deliberately different from the hero (no grid
 * texture repeat, different geometric accent) so it doesn't read as a
 * copy-paste of the top of the page.
 */
const FinalCTA = () => {
  const { phone, whatsapp, email } = contactData;
  const href = phone ? `tel:${phone}` : whatsapp ? `https://wa.me/${whatsapp}` : email ? `mailto:${email}` : "#contact-form";

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: colors.deepNavy,
        borderRadius: "20px",
        p: { xs: 5, md: 8 },
        textAlign: "center",
      }}
    >
      {/* Restrained geometric accents, distinct from the hero's composition */}
      <Box
        aria-hidden="true"
        sx={{ position: "absolute", top: -40, left: "10%", width: 120, height: 120, borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", transform: "rotate(18deg)" }}
      />
      <Box
        aria-hidden="true"
        sx={{ position: "absolute", bottom: -50, right: "8%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.25), rgba(11,31,58,0) 70%)" }}
      />

      <Box sx={{ position: "relative" }}>
        <Typography variant="h3" component="h2" sx={{ color: colors.textWhite, fontWeight: 700, mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
          Still have questions?
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.72)", mb: 4, maxWidth: 480, mx: "auto", fontSize: "1.05rem" }}>
          We're here to help you choose the right path.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          sx={{ px: 4, py: 1.5, backgroundColor: colors.secondaryOrange, "&:hover": { backgroundColor: colors.secondaryOrangeHover } }}
        >
          Talk to Praksha Academy →
        </Button>
      </Box>
    </Box>
  );
};

export default FinalCTA;
