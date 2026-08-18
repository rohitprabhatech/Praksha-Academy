import { Box, Typography } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import contactData from "../../data/contactData";

const ContactInfoCards = () => {
  const cards = [
    {
      icon: <PhoneOutlinedIcon />,
      label: "Call Us",
      value: contactData.phone || "Contact details coming soon",
      available: Boolean(contactData.phone),
    },
    {
      icon: <EmailOutlinedIcon />,
      label: "Email",
      value: contactData.email || "Email support coming soon",
      available: Boolean(contactData.email),
    },
  ];

  return (
    <div className="row g-3">
      {cards.map((card, index) => (
        <div className="col-md-6" key={card.label}>
          <AnimatedReveal delay={index * 100}>
            <Box
              className="pa-contact-info-card"
              sx={{
                position: "relative",
                height: "100%",
                minHeight: 150,
                p: { xs: 2.5, md: 3 },
                backgroundColor: premium.cardBg,
                border: `1px solid ${premium.border}`,
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.3s ease",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  backgroundColor: premium.blue,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease",
                },

                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(37,99,235,0.3)",
                  boxShadow: "0 12px 28px rgba(30,41,59,0.08)",
                },

                "&:hover::before": {
                  transform: "scaleX(1)",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(37,99,235,0.08)",
                  color: premium.blue,
                  mb: 2,

                  "& svg": {
                    fontSize: 21,
                  },
                }}
              >
                {card.icon}
              </Box>

              <Typography
                sx={{
                  color: premium.textPrimary,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                {card.label}
              </Typography>

              <Typography
                sx={{
                  color: card.available
                    ? premium.textPrimary
                    : premium.textSecondary,
                  fontSize: {
                    xs: "0.9rem",
                    md: "0.95rem",
                  },
                  fontWeight: card.available ? 600 : 400,
                  lineHeight: 1.5,
                  wordBreak: "break-word",
                }}
              >
                {card.value}
              </Typography>

              {card.available && (
                <ArrowForwardIcon
                  sx={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    fontSize: 18,
                    color: premium.blue,
                    opacity: 0,
                    transform: "translateX(-5px)",
                    transition: "all 0.3s ease",

                    ".pa-contact-info-card:hover &": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  }}
                />
              )}
            </Box>
          </AnimatedReveal>
        </div>
      ))}
    </div>
  );
};

export default ContactInfoCards;