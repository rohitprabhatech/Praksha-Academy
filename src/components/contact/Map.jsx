import { Box } from "@mui/material";
import { colors } from "../../theme/theme";

// Replace the src below with the real Praksha Academy location embed URL
// (Google Maps -> Share -> Embed a map -> copy the src attribute).
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60376.05!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1699999999999";

const Map = () => {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${colors.borderColor}`,
        height: { xs: 280, md: "100%" },
        minHeight: 280,
      }}
    >
      <iframe
        title="Praksha Academy Location"
        src={MAP_EMBED_SRC}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
};

export default Map;
