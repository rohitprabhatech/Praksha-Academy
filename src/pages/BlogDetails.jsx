import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { FaRegCalendarAlt, FaRegUser, FaArrowLeft } from "react-icons/fa";
import PageTitle from "../components/common/PageTitle";
import Breadcrumb from "../components/common/Breadcrumb";
import PrimaryButton from "../components/common/Button";
import RelatedPosts from "../components/blog/RelatedPosts";
import { blogs } from "../constants/blogData";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <Container sx={{ paddingY: "80px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: (theme) => theme.palette.text.primary, marginBottom: "16px" }}>
          Blog post not found
        </Typography>
        <PrimaryButton title="Back to Blog" onClick={() => navigate("/blog")} />
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
      <PageTitle title={blog.title} />
      <Breadcrumb labelOverrides={{ [id]: blog.title }} />

      <Container maxWidth="md" sx={{ paddingY: "40px" }}>
        <Box
          component="img"
          src={blog.image}
          alt={blog.title}
          sx={{
            width: "100%",
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            marginBottom: "24px",
            maxHeight: "420px",
            objectFit: "cover",
          }}
        />

        <Box sx={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FaRegUser size={14} color="#94A3B8" />
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.text.secondary }}>
              {blog.author}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FaRegCalendarAlt size={14} color="#94A3B8" />
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.text.secondary }}>
              {blog.date}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.text.primary, marginBottom: "32px" }}
        >
          {blog.content}
        </Typography>

        <PrimaryButton
          title="Back to Blog"
          onClick={() => navigate("/blog")}
          startIcon={<FaArrowLeft size={12} />}
        />

        <RelatedPosts currentId={blog.id} />
      </Container>
    </Box>
  );
};

export default BlogDetails;