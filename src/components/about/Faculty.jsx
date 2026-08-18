import { Box, Typography, Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";

const Faculty = () => {
  return (
    <AnimatedReveal>
      <Box
        sx={{
          position: "relative",
          py: { xs: 4, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <Box sx={{ maxWidth: 700 }}>
          <Typography
            sx={{
              color: premium.orange,
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              mb: 1,
            }}
          >
            THE PEOPLE BEHIND THE LEARNING
          </Typography>

          <Typography
            component="h3"
            sx={{
              color: premium.textPrimary,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.7rem", md: "2.25rem" },
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              mb: 1.2,
            }}
          >
            Meet our teaching community.
          </Typography>

          <Typography
            sx={{
              color: premium.textSecondary,
              fontSize: "0.95rem",
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            Learn with experienced educators who bring clarity,
            practical guidance and personal attention to every learner.
          </Typography>
        </Box>

        {/* RIGHT */}
        <Button
          href="/contact"
          variant="outlined"
          endIcon={<FaArrowRight size={11} />}
          sx={{
            flexShrink: 0,
            borderRadius: "8px",
            px: 2.5,
            py: 1.1,
            fontWeight: 600,
            textTransform: "none",
            color: premium.blue,
            borderColor: "rgba(37, 99, 235, 0.35)",
            "&:hover": {
              borderColor: premium.blue,
              backgroundColor: "rgba(37, 99, 235, 0.04)",
            },
          }}
        >
          Meet the team
        </Button>
      </Box>
    </AnimatedReveal>
  );
};

export default Faculty;