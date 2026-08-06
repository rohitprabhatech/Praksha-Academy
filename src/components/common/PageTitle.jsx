import { Box, Container, Typography } from "@mui/material";

const PageTitle = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F1F5F9",
        borderBottom: "1px solid #E2E8F0",
        paddingY: { xs: "40px", md: "56px" },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{
            color: "#F59E0B",
            fontWeight: 800,
            letterSpacing: "0.08em",
            marginBottom: "8px",
            display: "inline-block",
          }}
        >
          Praksha Academy
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: "#1E293B",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: subtitle ? "10px" : 0,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: "#64748B",
              lineHeight: 1.7,
              maxWidth: 680,
              marginX: "auto",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PageTitle;
