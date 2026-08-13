import { Box, Typography } from "@mui/material";
import { FaLaptop } from "react-icons/fa";
import { colors } from "../../theme/theme";
import contactData from "../../data/contactData";
import mediaData from "../../data/mediaData";
import ImagePlaceholder from "../common/ImagePlaceholder";
import AnimatedReveal from "../common/AnimatedReveal";

/**
 * Praksha Academy's physical-location status isn't confirmed
 * (contactData.hasPhysicalAddress). Rather than inventing branch
 * addresses or a fake map, this shows an honest "we teach online"
 * message with room for a real illustration/photo later.
 *
 * Once real offline centers are confirmed: build a BranchLocator that
 * reads from a `branches` array in contactData.js (city, address, phone,
 * hours) instead of this section.
 */
const OnlineSupport = () => {
  if (contactData.hasPhysicalAddress) return null; // real address exists — MapPreview should be used instead
  const { image, imageAlt } = mediaData.onlineLearning;

  return (
    <AnimatedReveal>
      <div className="row align-items-center g-4">
        <div className="col-md-5">
          <Box className="pa-image-hover">
            <ImagePlaceholder src={image} alt={imageAlt} aspectRatio="4/3" borderRadius="16px" label="Online learning illustration" />
          </Box>
        </div>
        <div className="col-md-7">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(37,99,235,0.1)",
              color: colors.primaryBlue,
              fontSize: 22,
              mb: 2,
            }}
            aria-hidden="true"
          >
            <FaLaptop />
          </Box>
          <Typography variant="h5" sx={{ color: colors.textPrimary, mb: 1.5 }}>
            Learn From Wherever You Are
          </Typography>
          <Typography variant="body1" sx={{ color: colors.textSecondary, lineHeight: 1.75, maxWidth: 480 }}>
            Praksha Academy classes are delivered online — reach us through
            the contact options on this page rather than visiting an office.
          </Typography>
        </div>
      </div>
    </AnimatedReveal>
  );
};

export default OnlineSupport;
