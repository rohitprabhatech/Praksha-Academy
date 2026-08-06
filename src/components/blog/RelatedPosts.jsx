import { Box, Typography, Grid } from "@mui/material";
import { blogs } from "../../constants/blogData";
import BlogCard from "./BlogCard";

const RelatedPosts = ({ currentId }) => {
  const related = blogs.filter((b) => b.id !== currentId).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <Box sx={{ marginTop: "48px" }}>
      <Typography
        variant="h5"
        sx={{ color: (theme) => theme.palette.text.primary, fontWeight: 700, marginBottom: "24px" }}
      >
        Related Posts
      </Typography>
      <Grid container spacing={3}>
        {related.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedPosts;