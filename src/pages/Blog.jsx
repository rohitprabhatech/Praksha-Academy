import { useMemo, useState } from "react";
import {
  Box,
  Container,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { FiFilter, FiSearch, FiTrendingUp } from "react-icons/fi";
import SectionHeader from "../components/common/SectionHeader";
import BlogCard from "../components/blog/BlogCard";
import { blogs } from "../constants/blogData";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((blog) => blog.category))],
    []
  );

  const filteredBlogs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        blog.title.toLowerCase().includes(normalizedSearch) ||
        blog.excerpt.toLowerCase().includes(normalizedSearch) ||
        blog.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <Box sx={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ paddingY: { xs: "32px", md: "48px" } }}>
        <SectionHeader
          title="Blog"
          subtitle="Insights, guides, and updates from Praksha Academy."
        />

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: { xs: "18px", md: "24px" },
            marginBottom: { xs: "28px", md: "36px" },
            backgroundColor: "#FFFFFF",
          }}
        >
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-8">
              <TextField
                fullWidth
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search blogs"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiSearch color="#94A3B8" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "#F8FAFC",
                    transition: "background-color 0.3s ease",
                    "& fieldset": {
                      borderColor: "#E2E8F0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#CBD5E1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563EB",
                    },
                  },
                }}
              />
            </div>

            <div className="col-12 col-md-4">
              <TextField
                select
                fullWidth
                label="Filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiFilter color="#94A3B8" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "#F8FAFC",
                    transition: "background-color 0.3s ease",
                    "& fieldset": {
                      borderColor: "#E2E8F0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#CBD5E1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563EB",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2563EB",
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </Paper>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
          sx={{ marginBottom: "24px" }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: "#1E293B", fontWeight: 800 }}>
              Latest Articles
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              {filteredBlogs.length} article{filteredBlogs.length === 1 ? "" : "s"} found
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FiTrendingUp size={18} color="#22C55E" />
            <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 600 }}>
              Updated weekly
            </Typography>
          </Stack>
        </Stack>

        {filteredBlogs.length > 0 ? (
          <div className="row g-4">
            {filteredBlogs.map((blog, index) => (
              <div className="col-12 col-md-6 d-flex" key={blog.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  style={{ width: "100%" }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: { xs: "32px 20px", md: "48px" },
              textAlign: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#1E293B", fontWeight: 700, marginBottom: "8px" }}
            >
              No articles found
            </Typography>
            <Typography sx={{ color: "#64748B" }}>
              Try a different topic or search keyword.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Blog;
