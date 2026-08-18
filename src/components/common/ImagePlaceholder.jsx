import { useState } from "react";
import { Box } from "@mui/material";
import { FaImage } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";

/**
 * Graceful image slot.
 *
 * Renders the real <img> when `src` is set AND the file actually loads.
 * If `src` is null, OR the file 404s (e.g. mediaData.js points at a
 * local path that hasn't been added yet — see IMAGE_SOURCING.md), this
 * falls back to a clean branded placeholder instead of the browser's
 * broken-image icon. That fallback is tracked via onError, since a
 * local path is always a non-empty string even before the file exists.
 *
 * Usage:
 *   <ImagePlaceholder src={mediaData.about.hero} alt="..." aspectRatio="4/3" />
 */
const ImagePlaceholder = ({
  src,
  alt = "",
  aspectRatio = "4/3",
  borderRadius = "16px",
  label = "Photo coming soon",
  lazy = true,
  sx = {},
}) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        onError={() => setFailed(true)}
        sx={{
          width: "100%",
          aspectRatio,
          objectFit: "cover",
          borderRadius,
          display: "block",
          ...sx,
        }}
      />
    );
  }

  return (
    <Box
      role="img"
      aria-label={alt || label}
      sx={{
        width: "100%",
        aspectRatio,
        borderRadius,
        backgroundColor: premium.sectionBg,
        border: `1px dashed ${premium.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        color: premium.textLight,
        ...sx,
      }}
    >
      <FaImage size={28} aria-hidden="true" />
      <Box component="span" sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: 0.5, textAlign: "center", px: 2 }}>
        {label}
      </Box>
    </Box>
  );
};

export default ImagePlaceholder;
