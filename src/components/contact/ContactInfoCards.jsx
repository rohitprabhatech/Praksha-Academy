import { Box, Typography } from "@mui/material";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GlassCard from "../common/GlassCard";
import AnimatedReveal from "../common/AnimatedReveal";
import contactData from "../../data/contactData";

/**
 * Each card only renders if the matching field is set in contactData.js.
 * Nothing here is invented — an unconfirmed address/phone/hours simply
 * doesn't produce a card, rather than showing a placeholder value.
 */
const ContactInfoCards = () => {
  const { address, hasPhysicalAddress, email, phone, workingHours } = contactData;

  const cards = [
    hasPhysicalAddress && address && { icon: <FaMapMarkerAlt />, label: "Location", value: address, gradient: [premium.blue, premium.cyan] },
    email && { icon: <FaEnvelope />, label: "Email", value: email, gradient: [premium.purple, premium.blue] },
    phone && { icon: <FaPhoneAlt />, label: "Phone", value: phone, gradient: [premium.cyan, premium.purple] },
    workingHours && {
      icon: <FaClock />,
      label: "Working Hours",
      value: Array.isArray(workingHours) ? workingHours.map((h) => `${h.day}: ${h.time}`).join(" · ") : workingHours,
      gradient: [premium.blue, premium.purple],
    },
  ].filter(Boolean);

  if (cards.length === 0) return null;

  return (
    <div className="row g-4">
      {cards.map((card, index) => (
        <div className="col-sm-6 col-lg-3" key={card.label}>
          <AnimatedReveal delay={index * 80}>
            <GlassCard tone="dark" sx={{ p: 3.5, height: "100%", textAlign: "center" }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${card.gradient[0]}, ${card.gradient[1]})`,
                  color: premium.white,
                  fontSize: 20,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {card.icon}
              </Box>
              <Typography variant="subtitle2" sx={{ color: premium.cyan, fontWeight: 700, letterSpacing: 0.5, mb: 0.75 }}>
                {card.label}
              </Typography>
              <Typography variant="body2" sx={{ color: premium.grayLight, lineHeight: 1.6 }}>
                {card.value}
              </Typography>
            </GlassCard>
          </AnimatedReveal>
        </div>
      ))}
    </div>
  );
};

export default ContactInfoCards;
