import { Typography } from "@mui/material";
import { premium } from "../../theme/premiumPalette";

/**
 * Shared section heading used across About + Contact. Centered by
 * default; pass align="left" for editorial sections that sit next to an
 * image or list.
 */
const SectionHeading = ({ eyebrow, title, subtitle, align = "center", component = "h2" }) => (
  <div className={`row ${align === "center" ? "justify-content-center text-center" : ""} mb-5`}>
    <div className={align === "center" ? "col-lg-7" : "col-12"}>
      {eyebrow && (
        <Typography variant="overline" sx={{ color: premium.blue, fontWeight: 700, letterSpacing: 1.5, fontSize: "0.8rem" }}>
          {eyebrow}
        </Typography>
      )}
      <Typography
        variant="h2"
        component={component}
        sx={{ color: premium.textPrimary, mt: 1, mb: subtitle ? 2 : 0, fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.2, fontWeight: 700 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: premium.textSecondary, fontSize: "1.05rem" }}>
          {subtitle}
        </Typography>
      )}
    </div>
  </div>
);

export default SectionHeading;
