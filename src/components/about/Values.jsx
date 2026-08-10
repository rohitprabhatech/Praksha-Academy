import { Box, Typography, Paper } from "@mui/material";
import { FaHandHoldingHeart, FaBalanceScale, FaChartLine, FaUsers } from "react-icons/fa";
import { colors } from "../../theme/theme";

const values = [
  {
    icon: <FaHandHoldingHeart />,
    title: "Student First",
    description:
      "Every decision — from batch sizes to pricing — starts with what actually helps a student learn, not what's easiest for us to run.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Honest Progress",
    description:
      "We report real performance, not inflated results. Parents and students see exactly where they stand, every step of the way.",
  },
  {
    icon: <FaChartLine />,
    title: "Always Improving",
    description:
      "Curriculum, teaching methods, and platform features are revised every term based on what's working and what isn't.",
  },
  {
    icon: <FaUsers />,
    title: "Access For All",
    description:
      "Scholarships and flexible plans exist so that cost is never the reason a capable student doesn't get to learn.",
  },
];

const Values = () => {
  return (
    <div className="row g-4">
      {values.map((value, index) => (
        <div className="col-sm-6 col-lg-3" key={value.title}>
          <Paper
            elevation={0}
            className={`pa-hover-card pa-fade-up pa-delay-${index + 1}`}
            sx={{
              p: 3.5,
              height: "100%",
              border: `1px solid ${colors.borderColor}`,
              backgroundColor: colors.cardBackground,
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                color: colors.primaryBlue,
                mb: 2.5,
                fontSize: 22,
              }}
            >
              {value.icon}
            </Box>
            <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 600, mb: 1 }}>
              {value.title}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7 }}>
              {value.description}
            </Typography>
          </Paper>
        </div>
      ))}
    </div>
  );
};

export default Values;
