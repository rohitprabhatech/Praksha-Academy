import { Box, Typography, Paper } from "@mui/material";
import { FaHandHoldingHeart, FaBalanceScale, FaChartLine, FaUsers } from "react-icons/fa";
import { colors } from "../../theme/theme";
import aboutData from "../../data/aboutData";
import AnimatedReveal from "../common/AnimatedReveal";

const icons = [FaHandHoldingHeart, FaBalanceScale, FaChartLine, FaUsers];

const Values = () => {
  return (
    <div className="row g-4">
      {aboutData.values.map((value, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div className="col-sm-6 col-lg-3" key={value.title}>
            <AnimatedReveal delay={index * 80}>
              <Paper
                elevation={0}
                className="pa-value-card"
                sx={{
                  p: 3.5,
                  height: "100%",
                  border: `1px solid ${colors.borderColor}`,
                  backgroundColor: colors.cardBackground,
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                }}
              >
                <Typography
                  aria-hidden="true"
                  sx={{ position: "absolute", top: -6, right: 8, fontSize: "3.2rem", fontWeight: 800, color: colors.sectionBackground, lineHeight: 1 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Box
                  className="pa-value-icon"
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
                    position: "relative",
                    transition: "transform 0.3s ease",
                  }}
                  aria-hidden="true"
                >
                  <Icon />
                </Box>
                <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 700, mb: 1, position: "relative" }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7, position: "relative" }}>
                  {value.description}
                </Typography>
              </Paper>
            </AnimatedReveal>
          </div>
        );
      })}
    </div>
  );
};

export default Values;
