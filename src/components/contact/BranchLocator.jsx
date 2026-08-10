import { Box, Typography, Paper, Chip } from "@mui/material";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { colors } from "../../theme/theme";

const branches = [
  { city: "Pune (HQ)", address: "2nd Floor, Fountain Chowk, Pune, MH 411001", phone: "+91 98765 43210", flagship: true },
  { city: "Mumbai", address: "Unit 4B, Andheri East, Mumbai, MH 400069", phone: "+91 98765 43211" },
  { city: "Nagpur", address: "Civil Lines, Nagpur, MH 440001", phone: "+91 98765 43212" },
  { city: "Nashik", address: "College Road, Nashik, MH 422005", phone: "+91 98765 43213" },
];

const BranchLocator = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ color: colors.textPrimary, mb: 0.5 }}>
        Our Centers
      </Typography>
      <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 3 }}>
        Online classes are available everywhere — these are our offline support centers.
      </Typography>

      <div className="row g-3">
        {branches.map((branch) => (
          <div className="col-sm-6" key={branch.city}>
            <Paper
              elevation={0}
              className="pa-hover-card"
              sx={{
                p: 2.5,
                height: "100%",
                border: `1px solid ${colors.borderColor}`,
                backgroundColor: colors.cardBackground,
                position: "relative",
              }}
            >
              {branch.flagship && (
                <Chip
                  label="Head Office"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "rgba(37,99,235,0.1)",
                    color: colors.primaryBlue,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              )}
              <Typography variant="subtitle1" sx={{ color: colors.textPrimary, fontWeight: 700, mb: 1 }}>
                {branch.city}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <FaMapMarkerAlt size={13} color={colors.textSecondary} style={{ marginTop: 3, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                  {branch.address}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <FaPhoneAlt size={12} color={colors.textSecondary} style={{ flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                  {branch.phone}
                </Typography>
              </Box>
            </Paper>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default BranchLocator;
