import { Box } from "@mui/material";
import { FaImage } from "react-icons/fa";
import { colors } from "../../theme/theme";

/**
 * Graceful image slot. Renders the real image when `src` is provided;
 * otherwise renders a clean, intentional placeholder (never an invented
 * stock photo standing in as a "real" Praksha Academy photo).
 *
 * Usage:
 *   <ImagePlaceholder src={mediaData.aboutHero.mainImage} alt="..." aspectRatio="4/3" />
 */
const ImagePlaceholder = ({
  src,
  alt = "",
  aspectRatio = "4/3",
  borderRadius = "16px",
  label = "Image coming soon",
  lazy = true,
  sx = {},
}) => {
  if (src) {
    return (
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
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
        backgroundColor: colors.sectionBackground,
        border: `1px dashed ${colors.dividerColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        color: colors.textLight,
        ...sx,
      }}
    >
      <FaImage size={28} aria-hidden="true" />
      <Box component="span" sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: 0.5 }}>
        {label}
      </Box>
    </Box>
  );
};

export default ImagePlaceholder;
