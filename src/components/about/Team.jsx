import { Avatar, Box, Typography, IconButton, Stack } from "@mui/material";
import { FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";
import { colors } from "../../theme/theme";

const leadership = [
  {
    name: "Aarav Deshmukh",
    role: "Founder & Director",
    photo: "https://i.pravatar.cc/300?img=12",
    bio: "Started Praksha Academy in 2019 tutoring six students; now leads curriculum strategy and academic partnerships.",
  },
  {
    name: "Sneha Patil",
    role: "Co-Founder & Head of Academics",
    photo: "https://i.pravatar.cc/300?img=47",
    bio: "Former CBSE school vice-principal; owns teaching quality, batch structure, and student outcomes.",
  },
];

const team = [
  {
    name: "Rohan Kulkarni",
    role: "Lead Programming Instructor",
    photo: "https://i.pravatar.cc/300?img=33",
  },
  {
    name: "Isha Joshi",
    role: "English & Communication Coach",
    photo: "https://i.pravatar.cc/300?img=25",
  },
  {
    name: "Meera Nair",
    role: "Data Science Faculty",
    photo: "https://i.pravatar.cc/300?img=44",
  },
  {
    name: "Vikram Rao",
    role: "Class 8–10 Mathematics Faculty",
    photo: "https://i.pravatar.cc/300?img=51",
  },
];

const LeadershipCard = ({ name, role, photo, bio, delayClass }) => (
  <div className="col-md-6 mb-4">
    <Box
      className={`pa-hover-card ${delayClass}`}
      sx={{
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: "14px",
        p: { xs: 3, md: 4 },
        display: "flex",
        gap: 3,
        alignItems: "flex-start",
      }}
    >
      <Avatar
        src={photo}
        alt={name}
        sx={{ width: 88, height: 88, minWidth: 88, border: `3px solid ${colors.sectionBackground}` }}
      />
      <Box>
        <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 700 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.primaryBlue, fontWeight: 600, mb: 1 }}>
          {role}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7, mb: 1.5 }}>
          {bio}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {[FaLinkedinIn, FaTwitter, FaEnvelope].map((Icon, i) => (
            <IconButton
              key={i}
              size="small"
              sx={{
                color: colors.textSecondary,
                transition: "all 0.3s ease",
                "&:hover": { color: colors.primaryBlue, backgroundColor: "rgba(37,99,235,0.08)" },
              }}
            >
              <Icon size={14} />
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  </div>
);

const TeamMemberCard = ({ name, role, photo, delayClass }) => (
  <div className="col-6 col-md-3 mb-4">
    <Box
      className={`pa-hover-card ${delayClass}`}
      sx={{
        textAlign: "center",
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: "12px",
        p: 3,
      }}
    >
      <Avatar
        src={photo}
        alt={name}
        sx={{ width: 84, height: 84, mx: "auto", mb: 2, border: `3px solid ${colors.sectionBackground}` }}
      />
      <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 600 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1.5 }}>
        {role}
      </Typography>
      <Stack direction="row" spacing={0.5} justifyContent="center">
        {[FaLinkedinIn, FaTwitter, FaEnvelope].map((Icon, i) => (
          <IconButton
            key={i}
            size="small"
            sx={{
              color: colors.textSecondary,
              transition: "all 0.3s ease",
              "&:hover": { color: colors.primaryBlue, backgroundColor: "rgba(37,99,235,0.08)" },
            }}
          >
            <Icon size={14} />
          </IconButton>
        ))}
      </Stack>
    </Box>
  </div>
);

const Team = () => {
  return (
    <Box>
      <div className="row mb-2">
        {leadership.map((member, index) => (
          <LeadershipCard key={member.name} {...member} delayClass={`pa-fade-up pa-delay-${index + 1}`} />
        ))}
      </div>

      <Typography
        variant="subtitle2"
        sx={{ color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 1, mb: 2, mt: 3 }}
      >
        Faculty
      </Typography>
      <div className="row">
        {team.map((member, index) => (
          <TeamMemberCard key={member.name} {...member} delayClass={`pa-fade-up pa-delay-${index + 1}`} />
        ))}
      </div>
    </Box>
  );
};

export default Team;
