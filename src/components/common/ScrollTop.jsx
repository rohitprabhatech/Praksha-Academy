import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import { FiArrowUp } from "react-icons/fi";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        size="medium"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          right: { xs: 16, md: 24 },
          bottom: { xs: 16, md: 24 },
          zIndex: 1200,
          width: 48,
          height: 48,
          borderRadius: "12px",
          backgroundColor: "#2563EB",
          color: "#FFFFFF",
          boxShadow: "0 12px 28px rgba(37, 99, 235, 0.28)",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            backgroundColor: "#1D4ED8",
            transform: "translateY(-2px)",
          },
        }}
      >
        <FiArrowUp size={22} />
      </Fab>
    </Zoom>
  );
};

export default ScrollTop;
