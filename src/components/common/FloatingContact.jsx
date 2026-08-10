import { useState, useEffect } from "react";
import { Box, Tooltip, Zoom } from "@mui/material";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { colors } from "../../theme/theme";

/**
 * Sticky bottom-right action buttons for instant contact — WhatsApp + Call.
 * Common pattern on Indian coaching/edtech sites (Physics Wallah, Vedantu).
 *
 * NOTE: If @omkarghule's "Common Components" branch already ships something
 * like this globally (e.g. in App.jsx), don't mount it twice — either drop
 * this file or point it at the shared one to avoid two floating buttons
 * stacking on top of each other.
 */
const WHATSAPP_NUMBER = "919876543210"; // replace with real number, country code, no symbols
const PHONE_NUMBER = "+919876543210";

const FloatingContact = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buttonSx = {
    width: 52,
    height: 52,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textWhite,
    fontSize: 22,
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.25s ease",
    "&:hover": { transform: "scale(1.08)" },
  };

  return (
    <Zoom in={visible}>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 28 },
          right: { xs: 20, md: 28 },
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Tooltip title="Chat with us on WhatsApp" placement="left">
          <Box
            component="a"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hi! I'd like to know more about Praksha Academy courses."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ...buttonSx, backgroundColor: "#25D366" }}
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp />
          </Box>
        </Tooltip>
        <Tooltip title="Call us" placement="left">
          <Box
            component="a"
            href={`tel:${PHONE_NUMBER}`}
            sx={{ ...buttonSx, backgroundColor: colors.primaryBlue }}
            aria-label="Call Praksha Academy"
          >
            <FaPhoneAlt size={18} />
          </Box>
        </Tooltip>
      </Box>
    </Zoom>
  );
};

export default FloatingContact;
