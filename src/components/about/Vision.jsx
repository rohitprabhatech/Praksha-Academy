import { Box, Typography, Paper } from "@mui/material";
import { FaLightbulb } from "react-icons/fa";
import { colors } from "../../theme/theme";

const Vision = () => {
  return (
    <Paper
      elevation={0}
      className="pa-hover-card"
      sx={{
        p: 4,
        height: "100%",
        border: `1px solid ${colors.borderColor}`,
        backgroundColor: colors.cardBackground,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          color: colors.secondaryOrange,
          mb: 3,
          fontSize: 24,
        }}
      >
        <FaLightbulb />
      </Box>
      <Typography variant="h5" sx={{ mb: 2, color: colors.textPrimary }}>
        Our Vision
      </Typography>
      <Typography variant="body1" sx={{ color: colors.textSecondary, lineHeight: 1.8 }}>
        To become the learning platform Indian students turn to first — one
        that closes the gap between school fundamentals and future-ready
        skills like programming, AI, and data science, without losing the
        personal guidance of a great teacher.
      </Typography>
    </Paper>
  );
};

export default Vision;
