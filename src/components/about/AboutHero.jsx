import { useState } from "react";
import { Box, Typography, Button, Stack, Paper, Avatar, AvatarGroup } from "@mui/material";
import { FaArrowRight, FaPlayCircle, FaStar } from "react-icons/fa";
import { colors } from "../../theme/theme";
import VideoModal from "../common/VideoModal";

const trustLogos = ["CBSE", "ICSE", "NCERT Aligned", "Maharashtra State Board"];

const AboutHero = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.primaryBlue} 0%, #1E40AF 100%)`,
        color: colors.textWhite,
        pt: { xs: 8, md: 10 },
        pb: { xs: 10, md: 6 },
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left: copy */}
          <div className="col-lg-6">
            <Typography
              variant="overline"
              className="pa-fade-up"
              sx={{
                letterSpacing: 2,
                fontWeight: 600,
                color: colors.secondaryOrange,
                display: "inline-block",
                mb: 2,
              }}
            >
              About Praksha Academy
            </Typography>

            <Typography
              variant="h2"
              className="pa-fade-up pa-delay-1"
              sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mb: 3, lineHeight: 1.2 }}
            >
              Learning built around every student's pace, not the other way around
            </Typography>

            <Typography
              variant="body1"
              className="pa-fade-up pa-delay-2"
              sx={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", mb: 4, maxWidth: 480 }}
            >
              From Class 8 foundations to industry-ready programming and data
              science, Praksha Academy pairs experienced teachers with a
              curriculum designed to make hard concepts click — online, at a
              price every family can afford.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              className="pa-fade-up pa-delay-3"
              sx={{ mb: 5 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<FaArrowRight />}
                sx={{ px: 4, py: 1.5 }}
              >
                Explore Courses
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FaPlayCircle />}
                onClick={() => setVideoOpen(true)}
                sx={{
                  px: 4,
                  py: 1.5,
                  color: colors.textWhite,
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": {
                    borderColor: colors.textWhite,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Watch Our Story
              </Button>
            </Stack>

            {/* Trust strip */}
            <Box className="pa-fade-up pa-delay-4">
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 1, textTransform: "uppercase", mb: 1.5, display: "block" }}
              >
                Curriculum aligned with
              </Typography>
              <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
                {trustLogos.map((logo) => (
                  <Typography
                    key={logo}
                    variant="subtitle2"
                    sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}
                  >
                    {logo}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </div>

          {/* Right: image + floating stat card */}
          <div className="col-lg-6">
            <Box sx={{ position: "relative" }} className="pa-fade-in pa-delay-2">
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                alt="Praksha Academy students learning together"
                sx={{
                  width: "100%",
                  height: { xs: 280, md: 380 },
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                }}
              />

              {/* Floating rating card */}
              <Paper
                elevation={0}
                sx={{
                  position: "absolute",
                  bottom: { xs: -24, md: 24 },
                  left: { xs: 16, md: -24 },
                  right: { xs: 16, md: "auto" },
                  p: 2.5,
                  borderRadius: "14px",
                  backgroundColor: colors.cardBackground,
                  boxShadow: "0 12px 30px rgba(30,41,59,0.18)",
                  minWidth: { md: 240 },
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 32, height: 32, fontSize: 12, border: `2px solid ${colors.cardBackground}` } }}>
                    <Avatar src="https://i.pravatar.cc/80?img=32" />
                    <Avatar src="https://i.pravatar.cc/80?img=45" />
                    <Avatar src="https://i.pravatar.cc/80?img=8" />
                    <Avatar src="https://i.pravatar.cc/80?img=15" />
                  </AvatarGroup>
                  <Typography variant="body2" sx={{ color: colors.textSecondary, fontWeight: 600 }}>
                    12,000+ learners
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={13} color={colors.secondaryOrange} />
                  ))}
                  <Typography variant="caption" sx={{ color: colors.textSecondary, ml: 0.5 }}>
                    4.8/5 average rating
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          </div>
        </div>
      </div>

      {/* TODO: replace REPLACE_WITH_VIDEO_ID with the real YouTube video ID before merging */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/REPLACE_WITH_VIDEO_ID"
      />
    </Box>
  );
};

export default AboutHero;
