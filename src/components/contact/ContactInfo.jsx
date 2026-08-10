import { Box, Typography, Stack, IconButton } from "@mui/material";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { colors } from "../../theme/theme";

const infoItems = [
  {
    icon: <FaMapMarkerAlt />,
    label: "Visit Us",
    value: "2nd Floor, Fountain Chowk, Pune, Maharashtra 411001",
  },
  {
    icon: <FaPhoneAlt />,
    label: "Call Us",
    value: "+91 98765 43210",
  },
  {
    icon: <FaEnvelope />,
    label: "Email Us",
    value: "support@prakshaacademy.com",
  },
];

const socials = [FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube];

const ContactInfo = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: "12px",
        p: { xs: 3, md: 4 },
      }}
    >
      <Typography variant="h5" sx={{ color: colors.textPrimary, mb: 3 }}>
        Contact Information
      </Typography>

      <Stack spacing={3} sx={{ mb: 4 }}>
        {infoItems.map((item) => (
          <Stack direction="row" spacing={2} key={item.label} alignItems="flex-start">
            <Box
              sx={{
                width: 44,
                height: 44,
                minWidth: 44,
                borderRadius: "10px",
                backgroundColor: "rgba(37,99,235,0.08)",
                color: colors.primaryBlue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              {item.icon}
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 600 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                {item.value}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>

      <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 600, mb: 1.5 }}>
        Follow Us
      </Typography>
      <Stack direction="row" spacing={1}>
        {socials.map((Icon, i) => (
          <IconButton
            key={i}
            sx={{
              backgroundColor: colors.sectionBackground,
              color: colors.textSecondary,
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: colors.primaryBlue, color: colors.textWhite },
            }}
          >
            <Icon size={16} />
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
};

export default ContactInfo;
