import { Box, Typography, Button } from "@mui/material";
import { FaMapMarkedAlt, FaExternalLinkAlt, FaLaptop } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GlassCard from "../common/GlassCard";
import AnimatedReveal from "../common/AnimatedReveal";
import ImagePlaceholder from "../common/ImagePlaceholder";
import mediaData from "../../data/mediaData";
import contactData from "../../data/contactData";

/**
 * "Come meet us" split layout when a real address is confirmed
 * (contactData.hasPhysicalAddress), otherwise an honest "we teach
 * online" version using the same layout — no fabricated address or map
 * either way.
 */
const LocationSection = () => {
  const { hasPhysicalAddress, address, mapUrl, workingHours, academyName } = contactData;
  const hasRealLocation = hasPhysicalAddress && address;

  return (
    <div id="location" className="row align-items-center g-5">
      <div className="col-lg-5">
        <AnimatedReveal direction="left">
          <Typography variant="overline" sx={{ color: premium.cyan, fontWeight: 700, letterSpacing: 2 }}>
            {hasRealLocation ? "VISIT US" : "HOW WE TEACH"}
          </Typography>
          <Typography variant="h3" sx={{ color: premium.white, fontWeight: 700, fontSize: { xs: "1.8rem", md: "2.2rem" }, mt: 1, mb: 2.5 }}>
            {hasRealLocation ? "Come meet us." : "Learn From Wherever You Are"}
          </Typography>

          {hasRealLocation ? (
            <>
              <Typography variant="subtitle1" sx={{ color: premium.white, fontWeight: 600 }}>
                {academyName}
              </Typography>
              <Typography variant="body2" sx={{ color: premium.grayLight, mb: 2 }}>
                {address}
              </Typography>
              {workingHours && (
                <Typography variant="body2" sx={{ color: premium.gray, mb: 3 }}>
                  {Array.isArray(workingHours)
                    ? workingHours.map((h) => `${h.day}: ${h.time}`).join(" · ")
                    : workingHours}
                </Typography>
              )}
              {mapUrl && (
                <Button
                  variant="contained"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<FaExternalLinkAlt size={12} />}
                  sx={{ background: `linear-gradient(90deg, ${premium.blue}, ${premium.purple})`, px: 3.5, py: 1.4 }}
                >
                  Get Directions
                </Button>
              )}
            </>
          ) : (
            <Typography variant="body1" sx={{ color: premium.grayLight, lineHeight: 1.8, maxWidth: 420 }}>
              Praksha Academy classes are delivered fully online, so there's
              no physical office to visit — reach us through the form or the
              contact options on this page instead.
            </Typography>
          )}
        </AnimatedReveal>
      </div>

      <div className="col-lg-7">
        <AnimatedReveal direction="right" delay={100}>
          {hasRealLocation ? (
            <GlassCard tone="dark" hoverLift={false} sx={{ p: 2, position: "relative" }}>
              <Box sx={{ borderRadius: "14px", overflow: "hidden", textAlign: "center", py: 6 }}>
                <Box sx={{ color: premium.cyan, fontSize: 32, mb: 1.5 }} aria-hidden="true">
                  <FaMapMarkedAlt />
                </Box>
                <Typography variant="body2" sx={{ color: premium.grayLight }}>
                  Map preview — configure mapUrl in contactData.js for a live embed.
                </Typography>
              </Box>
              {/* Floating overlay card */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  backgroundColor: premium.glassBgLight,
                  borderRadius: "12px",
                  px: 2.5,
                  py: 1.5,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
                }}
              >
                <Typography variant="subtitle2" sx={{ color: premium.textOnLight, fontWeight: 700 }}>
                  {academyName}
                </Typography>
                <Typography variant="caption" sx={{ color: premium.textOnLightSecondary }}>
                  You're always welcome.
                </Typography>
              </Box>
            </GlassCard>
          ) : (
            <Box sx={{ position: "relative" }}>
              <Box
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  bottom: 16,
                  left: 16,
                  borderRadius: "18px",
                  background: `linear-gradient(135deg, ${premium.blue}33, ${premium.cyan}22)`,
                }}
              />
              <Box className="pa-image-hover" sx={{ position: "relative" }}>
                <ImagePlaceholder
                  src={mediaData.onlineLearning.image}
                  alt={mediaData.onlineLearning.imageAlt}
                  aspectRatio="4/3"
                  borderRadius="18px"
                  sx={{ border: `1px solid ${premium.glassBorder}` }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: premium.glassBgLight,
                    borderRadius: "10px",
                    px: 1.75,
                    py: 1,
                  }}
                >
                  <FaLaptop color={premium.blue} size={14} />
                  <Typography variant="caption" sx={{ color: premium.textOnLight, fontWeight: 600 }}>
                    100% Online
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default LocationSection;
