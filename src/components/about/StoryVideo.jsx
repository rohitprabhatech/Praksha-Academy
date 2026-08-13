import { useState, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { colors } from "../../theme/theme";
import mediaData from "../../data/mediaData";
import ImagePlaceholder from "../common/ImagePlaceholder";
import VideoModal from "../common/VideoModal";

/**
 * "See how learning happens" story section. Renders nothing if no real
 * video URL is configured in mediaData.storyVideo — never wires up a fake
 * YouTube ID just to have something playable.
 */
const StoryVideo = () => {
  const { videoUrl, posterImage } = mediaData.storyVideo;
  const [open, setOpen] = useState(false);
  const playButtonRef = useRef(null);

  if (!videoUrl) return null;

  return (
    <Box sx={{ position: "relative", textAlign: "center" }}>
      <Typography variant="h2" component="h2" sx={{ color: colors.textPrimary, fontSize: { xs: "1.75rem", md: "2.25rem" }, mb: 4 }}>
        See how learning happens.
      </Typography>

      <Box sx={{ position: "relative", maxWidth: 820, mx: "auto" }}>
        <ImagePlaceholder src={posterImage} alt="Praksha Academy story video preview" aspectRatio="16/9" borderRadius="18px" label="Video preview coming soon" />
        <IconButton
          ref={playButtonRef}
          onClick={() => setOpen(true)}
          aria-label="Watch the Praksha Academy story video"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 76,
            height: 76,
            backgroundColor: "rgba(255,255,255,0.95)",
            color: colors.primaryBlue,
            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            transition: "transform 0.25s ease",
            "&:hover": { backgroundColor: colors.cardBackground, transform: "translate(-50%, -50%) scale(1.06)" },
            "&:focus-visible": { outline: `3px solid ${colors.primaryBlue}`, outlineOffset: "3px" },
          }}
        >
          <FaPlay size={26} style={{ marginLeft: 4 }} />
        </IconButton>
      </Box>

      <VideoModal open={open} onClose={() => setOpen(false)} videoUrl={videoUrl} returnFocusRef={playButtonRef} />
    </Box>
  );
};

export default StoryVideo;
