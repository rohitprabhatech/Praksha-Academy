import { Box, CircularProgress } from "@mui/material";

const Loader = ({ loading = true, size = 40 }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        width: "100%",
      }}
    >
      <CircularProgress size={size} sx={{ color: "#2563EB" }} />
    </Box>
  );
};

export default Loader;