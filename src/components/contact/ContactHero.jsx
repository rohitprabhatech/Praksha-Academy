import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import mediaData from "../../data/mediaData";

const MotionBox = motion(Box);

const ContactHero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#F8FAFC",
        minHeight: {
          xs: "auto",
          md: "570px",
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Very subtle background decoration */}
      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          backgroundColor: "rgba(37, 99, 235, 0.04)",
          top: -120,
          left: -100,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          py: {
            xs: 7,
            sm: 8,
            md: 10,
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            alignItems: "center",
            gap: {
              xs: 5,
              md: 3,
              lg: 6,
            },
          }}
        >
          {/* ================= LEFT CONTENT ================= */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            sx={{
              maxWidth: {
                xs: "100%",
                md: "620px",
              },
              pr: {
                md: 2,
                lg: 4,
              },
            }}
          >
            {/* Small eyebrow */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: "#2563EB",
                }}
              />

              <Typography
                sx={{
                  color: "#2563EB",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Praksha Academy
              </Typography>
            </Box>

            {/* Main heading */}
            <Typography
              component="h1"
              sx={{
                color: "#1E293B",
                fontWeight: 800,
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.2rem",
                  md: "3.8rem",
                  lg: "4.4rem",
                },
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                mb: 2.5,
              }}
            >
              Connect With Us.
              <br />
              Let's Start Your
              <br />

              <Box
                component="span"
                sx={{
                  color: "#2563EB",
                }}
              >
                Learning Journey.
              </Box>
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                color: "#64748B",
                fontSize: {
                  xs: "1rem",
                  md: "1.08rem",
                },
                lineHeight: 1.75,
                maxWidth: "570px",
                mb: 3.5,
              }}
            >
              We're here to support you every step of the way. Explore our
              programs, ask a question, or connect directly with the Praksha
              Academy team.
            </Typography>

            {/* CTA */}
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                borderRadius: "10px",
                px: 3,
                py: 1.45,
                fontSize: "0.95rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.18)",
                transition: "all 0.3s ease",

                "&:hover": {
                  backgroundColor: "#1D4ED8",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 25px rgba(37, 99, 235, 0.22)",
                },

                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Send an Inquiry
            </Button>
          </MotionBox>

          {/* ================= RIGHT IMAGE ================= */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            {/* Image container */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: {
                  xs: "300px",
                  sm: "380px",
                  md: "440px",
                  lg: "480px",
                },
                overflow: "hidden",
                borderRadius: {
                  xs: "12px",
                  md: "16px",
                },
                border: "1px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.10)",
              }}
            >
              <Box
                component="img"
                src={mediaData.contact.hero}
                alt={mediaData.contact.heroAlt}
                loading="eager"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.5s ease",

                  "&:hover": {
                    transform: "scale(1.025)",
                  },
                }}
              />

              {/* Small clean information badge */}
              <Box
                sx={{
                  position: "absolute",
                  left: {
                    xs: 16,
                    md: 20,
                  },
                  bottom: {
                    xs: 16,
                    md: 20,
                  },
                  backgroundColor: "rgba(255, 255, 255, 0.96)",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  px: 2,
                  py: 1.4,
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Typography
                  sx={{
                    color: "#1E293B",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  Praksha Academy
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "0.72rem",
                    mt: 0.25,
                  }}
                >
                  Learn. Grow. Build your future.
                </Typography>
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactHero;