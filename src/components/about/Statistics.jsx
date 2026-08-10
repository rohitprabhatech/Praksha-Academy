import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaStar, FaCity } from "react-icons/fa";
import { colors } from "../../theme/theme";

const stats = [
  { icon: <FaUserGraduate />, value: 12000, suffix: "+", label: "Students Taught" },
  { icon: <FaCity />, value: 120, suffix: "+", label: "Cities Reached" },
  { icon: <FaChalkboardTeacher />, value: 85, suffix: "+", label: "Expert Teachers" },
  { icon: <FaBookOpen />, value: 40, suffix: "+", label: "Courses Offered" },
  { icon: <FaStar />, value: 4.8, suffix: "/5", label: "Average Rating", decimals: 1 },
];

const useCountUp = (target, isVisible, decimals = 0, duration = 1400) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    let frameId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = progress * target;
      setValue(decimals ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, target, decimals, duration]);

  return value;
};

const StatItem = ({ icon, value, suffix, label, decimals, isVisible }) => {
  const count = useCountUp(value, isVisible, decimals);
  return (
    <div className="col-6 col-md text-center mb-4 mb-md-0">
      <Box sx={{ fontSize: 32, color: colors.secondaryOrange, mb: 1.5 }}>{icon}</Box>
      <Typography variant="h3" sx={{ color: colors.textWhite, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
        {decimals ? count.toFixed(decimals) : count}
        {suffix}
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
        {label}
      </Typography>
    </div>
  );
};

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        background: `linear-gradient(135deg, ${colors.primaryBlue} 0%, #1E40AF 100%)`,
        py: { xs: 6, md: 8 },
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Statistics;
