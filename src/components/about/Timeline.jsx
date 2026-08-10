import { Box, Typography } from "@mui/material";
import { colors } from "../../theme/theme";

const milestones = [
  {
    year: "2019",
    title: "Praksha Academy Founded",
    description:
      "Started as a small tutoring initiative for Class 8–10 students in Maharashtra, focused on making core subjects easier to grasp.",
  },
  {
    year: "2021",
    title: "Moved Online",
    description:
      "Launched our first digital classroom, extending reach beyond a single city and adding English Grammar and Spoken English tracks.",
  },
  {
    year: "2023",
    title: "Tech & Career Tracks Added",
    description:
      "Introduced Programming, Web Development, and Data Science courses to help students transition from school into industry-ready skills.",
  },
  {
    year: "2025",
    title: "AI-Powered Learning",
    description:
      "Rolled out adaptive learning tools and an AI curriculum track, and crossed our first major milestone in active learners.",
  },
];

const Timeline = () => {
  return (
    <Box sx={{ position: "relative", pl: { xs: 5, md: 6 } }}>
      <span className="pa-timeline-line" aria-hidden="true" />
      {milestones.map((item, index) => (
        <Box
          key={item.year}
          className={`pa-fade-up pa-delay-${Math.min(index + 1, 4)}`}
          sx={{ position: "relative", pb: index === milestones.length - 1 ? 0 : 5 }}
        >
          <Box
            sx={{
              position: "absolute",
              left: { xs: -33, md: -40 },
              top: 4,
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: colors.primaryBlue,
              border: `3px solid ${colors.cardBackground}`,
              boxShadow: `0 0 0 3px ${colors.primaryBlue}`,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ color: colors.primaryBlue, fontWeight: 700, mb: 0.5 }}
          >
            {item.year}
          </Typography>
          <Typography variant="h6" sx={{ color: colors.textPrimary, mb: 1 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7 }}>
            {item.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Timeline;
