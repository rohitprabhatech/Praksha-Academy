import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Stack } from "@mui/material";
import { FaPhoneVolume } from "react-icons/fa";
import { colors } from "../../theme/theme";

/**
 * Short 2-field lead-capture widget for people who don't want to fill the
 * full contact form — just leave a name + number and get called back.
 * Common on Indian coaching-site contact pages (quick admissions leads).
 */
const RequestCallback = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    // TODO: wire up to backend/CRM lead endpoint
    console.log("Callback requested:", { name, phone });
    setError("");
    setSubmitted(true);
    setName("");
    setPhone("");
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.secondaryOrange} 0%, ${colors.secondaryOrangeHover} 100%)`,
        borderRadius: "14px",
        p: { xs: 3, md: 3.5 },
        color: colors.textWhite,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <FaPhoneVolume size={18} />
        <Typography variant="h6" sx={{ color: colors.textWhite }}>
          Request a Callback
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", mb: 2.5 }}>
        Leave your number — our counselor will call within the hour.
      </Typography>

      {submitted ? (
        <Alert severity="success" sx={{ backgroundColor: "rgba(255,255,255,0.95)" }}>
          Got it! We'll call you shortly.
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={1.5}>
            <TextField
              size="small"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                backgroundColor: colors.cardBackground,
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />
            <TextField
              size="small"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{
                backgroundColor: colors.cardBackground,
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />
            {error && (
              <Typography variant="caption" sx={{ color: colors.textWhite, fontWeight: 600 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: colors.textPrimary,
                "&:hover": { backgroundColor: "#0F172A" },
              }}
            >
              Request Callback
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default RequestCallback;
