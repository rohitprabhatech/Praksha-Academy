import { Box, Typography, Stack, Paper } from "@mui/material";
import { FaAward, FaCertificate, FaMedal } from "react-icons/fa";
import { colors } from "../../theme/theme";

const awards = [
  {
    icon: <FaAward />,
    title: "Excellence in EdTech 2025",
    org: "Maharashtra Education Summit",
  },
  {
    icon: <FaCertificate />,
    title: "ISO 9001:2015 Certified",
    org: "Quality Management",
  },
  {
    icon: <FaMedal />,
    title: "Top Rated Learning Platform",
    org: "Student Choice Awards 2024",
  },
];

const pressMentions = ["EdTech Review", "Pune Mirror", "The Education Post", "Careers360"];

const Recognition = () => {
  return (
    <Box>
      <div className="row g-4 mb-5">
        {awards.map((award, index) => (
          <div className="col-md-4" key={award.title}>
            <Paper
              elevation={0}
              className={`pa-hover-card pa-fade-up pa-delay-${index + 1}`}
              sx={{
                p: 3,
                height: "100%",
                border: `1px solid ${colors.borderColor}`,
                backgroundColor: colors.cardBackground,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(245, 158, 11, 0.12)",
                  color: colors.secondaryOrange,
                  fontSize: 20,
                }}
              >
                {award.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 600 }}>
                  {award.title}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                  {award.org}
                </Typography>
              </Box>
            </Paper>
          </div>
        ))}
      </div>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="caption"
          sx={{ color: colors.textLight, letterSpacing: 1.5, textTransform: "uppercase", mb: 2, display: "block" }}
        >
          As Featured In
        </Typography>
        <Stack
          direction="row"
          spacing={{ xs: 3, md: 5 }}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          {pressMentions.map((name) => (
            <Typography
              key={name}
              variant="subtitle1"
              sx={{ color: colors.textLight, fontWeight: 700, opacity: 0.8 }}
            >
              {name}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Recognition;
