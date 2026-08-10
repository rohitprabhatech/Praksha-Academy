import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { colors } from "../../theme/theme";

/**
 * Lightbox video player. Pass a YouTube embed URL (or any iframe-embeddable
 * video URL) via `videoUrl`.
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   <VideoModal open={open} onClose={() => setOpen(false)} videoUrl="https://www.youtube.com/embed/VIDEO_ID" />
 */
const VideoModal = ({ open, onClose, videoUrl }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "14px", backgroundColor: "#000", overflow: "hidden" },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close video"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          color: colors.textWhite,
          backgroundColor: "rgba(0,0,0,0.5)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <FaTimes size={16} />
      </IconButton>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: "relative", pt: "56.25%" /* 16:9 */ }}>
          {open && (
            <Box
              component="iframe"
              src={`${videoUrl}?autoplay=1`}
              title="Praksha Academy — Our Story"
              allow="autoplay; fullscreen"
              allowFullScreen
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
