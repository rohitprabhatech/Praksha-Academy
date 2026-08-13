import { Box, Typography, Divider } from "@mui/material";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { contactPalette as p } from "./contactPalette";
import contactData from "../../data/contactData";

/**
 * Minimal horizontal "contact rail" — icon + label + value, not a grid of
 * boxed cards. Each item only renders if the matching channel is
 * configured in contactData.js. Renders nothing (not an empty rail) if
 * no channel is confirmed yet.
 */
const ContactRail = () => {
  const { phone, email, whatsapp, hasPhysicalAddress, address, academyName } = contactData;

  const items = [
    phone && { icon: <FaPhoneAlt />, label: "CALL", value: phone, href: `tel:${phone}` },
    email && { icon: <FaEnvelope />, label: "EMAIL", value: email, href: `mailto:${email}` },
    whatsapp && {
      icon: <FaWhatsapp />,
      label: "WHATSAPP",
      value: "Chat with us",
      href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi! I'd like to know more about ${academyName}.`)}`,
      external: true,
    },
    hasPhysicalAddress && address && { icon: <FaMapMarkerAlt />, label: "OFFICE", value: address, href: "#location" },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: p.white,
        borderBottom: `1px solid ${p.border}`,
        py: { xs: 2.5, md: 0 },
      }}
    >
      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
            alignItems: { sm: "center" },
            justifyContent: { sm: "space-between" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          {items.map((item, index) => (
            <Box key={item.label} sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="a"
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="pa-rail-item"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  textDecoration: "none",
                  px: { xs: 1.5, md: 2.5 },
                  py: { xs: 1, md: 2.5 },
                }}
              >
                <Box sx={{ color: p.blue, fontSize: 16 }} aria-hidden="true">
                  {item.icon}
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: p.textSecondary, fontWeight: 700, letterSpacing: 1, display: "block", fontSize: "0.68rem" }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: p.textPrimary, fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
              {index < items.length - 1 && (
                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" }, mx: 0.5, borderColor: p.border }} />
              )}
            </Box>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default ContactRail;
