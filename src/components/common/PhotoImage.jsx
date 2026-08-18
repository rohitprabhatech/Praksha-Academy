import { useState } from "react";
import { Box } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * Renders a real photograph with a consistent rounded/bordered frame.
 * If the image URL ever fails to load (network issue, a since-removed
 * Unsplash photo, offline dev environment, etc.), it swaps to a plain
 * soft gradient panel instead of the browser's broken-image icon — the
 * layout and spacing stay identical either way, so the page never looks
 * visually broken.
 */
const PhotoImage = ({ src, alt, aspectRatio = "4/3.2", sx = {} }) => {
  const [failed, setFailed] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio,
        borderRadius: "18px",
        overflow: "hidden",
        border: `1px solid ${premium.border}`,
        boxShadow: "0 12px 32px rgba(15,23,42,0.10)",
        background: failed
          ? `linear-gradient(135deg, ${premium.blue}1A 0%, ${premium.purple}14 100%)`
          : premium.sectionBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {!failed && (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
    </Box>
  );
};

export default PhotoImage;
