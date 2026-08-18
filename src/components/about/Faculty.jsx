import { Box, Typography, Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import AnimatedReveal from "../common/AnimatedReveal";
import ImagePlaceholder from "../common/ImagePlaceholder";
import aboutData from "../../data/aboutData";

const Faculty = () => {
  const { faculty } = aboutData;

  if (faculty.length === 0) {
    return (
      <AnimatedReveal>
        <Box className="pa-team-empty">
          <Box>
            <Typography className="pa-eyebrow" component="p">THE PEOPLE BEHIND THE LEARNING</Typography>
            <Typography component="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: "1.7rem", md: "2.25rem" }, color: premium.textPrimary, mb: 1.5 }}>
              Meet our teaching community.
            </Typography>
            <Typography sx={{ color: premium.textSecondary, lineHeight: 1.75, maxWidth: 650 }}>
              Our teaching team profiles are being prepared. We keep this space focused on real people and verified information rather than placeholder profiles.
            </Typography>
          </Box>
          <Button href="/contact" variant="outlined" color="primary" endIcon={<FaArrowRight size={12} />} sx={{ flexShrink: 0 }}>
            Connect with us
          </Button>
        </Box>
      </AnimatedReveal>
    );
  }

  return (
    <div className="row g-4">
      {faculty.map((member, index) => (
        <div className="col-sm-6 col-lg-4" key={member.name}>
          <AnimatedReveal delay={index * 80}>
            <Box className="pa-team-member">
              <Box sx={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", borderRadius: "10px", mb: 2 }}>
                <ImagePlaceholder src={member.photo} alt={member.name} aspectRatio="4/3" borderRadius="10px" />
              </Box>
              <Typography sx={{ color: premium.textPrimary, fontWeight: 700, fontSize: "1.05rem" }}>{member.name}</Typography>
              <Typography variant="body2" sx={{ color: premium.blue, fontWeight: 600, mb: 1 }}>{member.role}</Typography>
              <Typography variant="body2" sx={{ color: premium.textSecondary, lineHeight: 1.6 }}>{member.bio}</Typography>
            </Box>
          </AnimatedReveal>
        </div>
      ))}
    </div>
  );
};

export default Faculty;
