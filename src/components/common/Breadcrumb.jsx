import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Breadcrumb = ({ labelOverrides = {} }) => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <Box
      sx={{
        paddingY: "14px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Breadcrumbs
        separator="›"
        sx={{
          color: "#94A3B8",
          "& .MuiBreadcrumbs-separator": {
            color: "#CBD5E1",
            marginX: "8px",
          },
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#64748B",
            fontWeight: 700,
            fontSize: "0.9rem",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#2563EB",
            },
          }}
        >
          <FaHome size={14} /> Home
        </Link>

        {segments.map((seg, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label =
            labelOverrides[seg] ||
            seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");

          return isLast ? (
            <Typography
              key={path}
              sx={{
                color: "#2563EB",
                fontWeight: 800,
                fontSize: "0.9rem",
              }}
            >
              {label}
            </Typography>
          ) : (
            <Link
              key={path}
              component={RouterLink}
              to={path}
              underline="hover"
              sx={{
                color: "#64748B",
                fontWeight: 700,
                fontSize: "0.9rem",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#2563EB",
                },
              }}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
