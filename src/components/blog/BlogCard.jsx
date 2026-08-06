import { Card, CardMedia, CardContent, Typography, Chip, Box } from "@mui/material";
import { motion } from "framer-motion";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/Button";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { id, title, category, author, date, image, excerpt } = blog;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) => theme.palette.background.paper,
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(30, 41, 59, 0.06)",
          overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            borderColor: "#CBD5E1",
            boxShadow: "0 18px 40px rgba(30, 41, 59, 0.12)",
          },
          "&:hover .blog-card-image": {
            transform: "scale(1.04)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: { xs: 210, md: 230 },
            overflow: "hidden",
            backgroundColor: "#F1F5F9",
          }}
        >
          <CardMedia
            className="blog-card-image"
            component="img"
            image={image}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
          <Chip
            label={category}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontWeight: 700,
              borderRadius: "8px",
            }}
          />
        </Box>
        <CardContent
          sx={{
            padding: { xs: "20px", md: "24px" },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 18px",
              marginBottom: "12px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FaRegUser size={12} color="#94A3B8" />
              <Typography variant="caption" sx={{ color: (theme) => theme.palette.text.secondary }}>
                {author}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FaRegCalendarAlt size={12} color="#94A3B8" />
              <Typography variant="caption" sx={{ color: (theme) => theme.palette.text.secondary }}>
                {date}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "#1E293B",
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: "10px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              lineHeight: 1.7,
              marginBottom: "20px",
            }}
          >
            {excerpt}
          </Typography>

          <Box sx={{ marginTop: "auto" }}>
            <PrimaryButton
              title="Read More"
              onClick={() => navigate(`/blog/${id}`)}
              endIcon={<FiArrowRight />}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                padding: "10px 18px",
                "&:hover": {
                  backgroundColor: "#1D4ED8",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
