import { Box, Typography, Button, Stack } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { colors } from "../../theme/theme";

const CTASection = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.sectionBackground,
        borderRadius: "16px",
        p: { xs: 4, md: 6 },
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ color: colors.textPrimary, mb: 2 }}>
        Ready to start learning with Praksha Academy?
      </Typography>
      <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 4, maxWidth: 560, mx: "auto" }}>
        Browse our courses or get in touch with our team — we'll help you
        find the right track for your goals.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" size="large" endIcon={<FaArrowRight />} sx={{ px: 4, py: 1.5 }}>
          Browse Courses
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            color: colors.primaryBlue,
            borderColor: colors.primaryBlue,
            "&:hover": { backgroundColor: "rgba(37,99,235,0.06)", borderColor: colors.primaryBlueHover },
          }}
        >
          Contact Us
        </Button>
      </Stack>
    </Box>
  );
};

export default CTASection;
