import { Box, Typography, Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";

const CTASection = () => {
  return (
    <AnimatedReveal>
      <Box
        sx={{
          borderTop: `1px solid ${premium.border}`,
          borderBottom: `1px solid ${premium.border}`,
          py: { xs: 5, md: 6 },
        }}
      >
        <div className="row align-items-center g-4">

          {/* TEXT */}
          <div className="col-lg-8">
            <Typography
              sx={{
                color: premium.orange,
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                mb: 1.2,
              }}
            >
              START YOUR JOURNEY
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: {
                  xs: "2rem",
                  md: "2.7rem",
                },
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                color: premium.textPrimary,
                mb: 1.5,
              }}
            >
              Ready to start learning?
            </Typography>

            <Typography
              sx={{
                color: premium.textSecondary,
                fontSize: "0.95rem",
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              Explore practical courses, build useful skills,
              and take the next step with Praksha Academy.
            </Typography>
          </div>

          {/* ACTIONS */}
          <div className="col-lg-4">
            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "flex-start",
                  lg: "flex-end",
                },
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Button
                href="/courses"
                variant="contained"
                endIcon={<FaArrowRight size={11} />}
                sx={{
                  px: 2.8,
                  py: 1.3,
                  borderRadius: "9px",
                  textTransform: "none",
                  fontWeight: 700,
                  backgroundColor: premium.blue,
                  boxShadow: "0 8px 20px rgba(37,99,235,0.16)",
                  "&:hover": {
                    backgroundColor: premium.blueHover,
                    boxShadow: "0 10px 24px rgba(37,99,235,0.20)",
                  },
                }}
              >
                Explore Courses
              </Button>

              <Button
                href="/contact"
                variant="outlined"
                sx={{
                  px: 2.5,
                  py: 1.3,
                  borderRadius: "9px",
                  textTransform: "none",
                  fontWeight: 600,
                  color: premium.textPrimary,
                  borderColor: premium.border,
                  "&:hover": {
                    borderColor: premium.blue,
                    color: premium.blue,
                    backgroundColor: "transparent",
                  },
                }}
              >
                Contact us
              </Button>
            </Box>
          </div>

        </div>
      </Box>
    </AnimatedReveal>
  );
};

export default CTASection;