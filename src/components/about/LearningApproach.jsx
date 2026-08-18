import { Box, Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import BrandIllustration from "../common/BrandIllustration";

const steps = [
  {
    number: "01",
    title: "Understand",
    text: "Build a clear foundation before moving forward.",
  },
  {
    number: "02",
    title: "Practice",
    text: "Turn concepts into skill through guided exercises.",
  },
  {
    number: "03",
    title: "Apply",
    text: "Use what you learn to solve practical problems.",
  },
];

const LearningApproach = () => {
  return (
    <div className="row align-items-center g-5">
      <div className="col-lg-5">
        <AnimatedReveal direction="left">
          <Box
            sx={{
              position: "relative",
              maxWidth: 430,
              mx: { xs: "auto", lg: 0 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: "14px -14px -14px 14px",
                border: `1px solid ${premium.border}`,
                borderRadius: "20px",
                background: premium.cardBg,
              }}
            />

            <Box
              sx={{
                position: "relative",
                minHeight: 360,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${premium.border}`,
                borderRadius: "20px",
                background: "#ffffff",
                p: 4,
              }}
            >
              <BrandIllustration variant="learning" />
            </Box>
          </Box>
        </AnimatedReveal>
      </div>

      <div className="col-lg-7">
        <AnimatedReveal direction="right">
          <Typography
            sx={{
              color: premium.orange,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              mb: 1.5,
            }}
          >
            HOW WE TEACH
          </Typography>

          <Typography
            sx={{
              color: premium.textPrimary,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.65rem" },
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              mb: 2,
              maxWidth: 600,
            }}
          >
            Learn it.
            <br />
            Practice it.
            <br />
            <span style={{ color: premium.blue }}>Build with it.</span>
          </Typography>

          <Typography
            sx={{
              color: premium.textSecondary,
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: 570,
              mb: 4,
            }}
          >
            Learning should move beyond watching lessons. We help students
            understand concepts, practice with guidance, and apply their
            knowledge to meaningful work.
          </Typography>

          <Box>
            {steps.map((step, index) => (
              <Box
                key={step.number}
                sx={{
                  display: "flex",
                  gap: 2.5,
                  py: 2.2,
                  borderTop:
                    index === 0
                      ? `1px solid ${premium.border}`
                      : "none",
                  borderBottom: `1px solid ${premium.border}`,
                }}
              >
                <Typography
                  sx={{
                    color: premium.orange,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    minWidth: 28,
                    pt: 0.3,
                  }}
                >
                  {step.number}
                </Typography>

                <Box>
                  <Typography
                    sx={{
                      color: premium.textPrimary,
                      fontWeight: 600,
                      fontSize: "1rem",
                      mb: 0.4,
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: premium.textSecondary,
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </AnimatedReveal>
      </div>
    </div>
  );
};

export default LearningApproach;