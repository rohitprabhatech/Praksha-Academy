import { Box, Typography, Avatar } from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";
import { colors } from "../../theme/theme";

const FounderMessage = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: "16px",
        p: { xs: 3, md: 5 },
      }}
    >
      <div className="row align-items-center g-4">
        <div className="col-md-4 text-center">
          <Avatar
            src="https://i.pravatar.cc/300?img=12"
            alt="Aarav Deshmukh, Founder of Praksha Academy"
            sx={{
              width: { xs: 140, md: 180 },
              height: { xs: 140, md: 180 },
              mx: "auto",
              border: `4px solid ${colors.sectionBackground}`,
            }}
          />
          <Typography variant="h6" sx={{ color: colors.textPrimary, mt: 2 }}>
            Aarav Deshmukh
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            Founder & Director, Praksha Academy
          </Typography>
        </div>

        <div className="col-md-8">
          <Box sx={{ color: colors.primaryBlue, fontSize: 28, mb: 1.5 }}>
            <FaQuoteLeft />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: colors.textPrimary,
              fontWeight: 500,
              lineHeight: 1.6,
              mb: 3,
              fontSize: { xs: "1.15rem", md: "1.4rem" },
            }}
          >
            "I started tutoring six students out of a rented room in 2019
            because I kept seeing the same thing: bright kids falling behind,
            not for lack of ability, but for lack of a teacher who had time
            for their questions. Praksha Academy exists so that every
            student — whether they're prepping for Class 10 boards or
            learning to code for the first time — gets that time."
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.8 }}>
            Today that same idea drives everything we build: small live
            batches, teachers who track individual progress, and a
            curriculum that grows with the student instead of rushing them
            through a syllabus. We're proud of how far we've come — and more
            excited about the students we haven't reached yet.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default FounderMessage;
