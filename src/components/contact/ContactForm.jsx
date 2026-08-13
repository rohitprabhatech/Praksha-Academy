import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, MenuItem, CircularProgress, InputAdornment } from "@mui/material";
import { FaPaperPlane, FaBook, FaUser, FaEnvelope, FaPhone, FaShieldAlt } from "react-icons/fa";
import { premium } from "../../theme/premiumPalette";
import GlassCard from "../common/GlassCard";
import contactData from "../../data/contactData";
import InquiryCards from "./InquiryCards";

const initialForm = { name: "", email: "", phone: "", program: "", message: "" };

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name";
  else if (values.name.trim().length < 2) errors.name = "Name looks too short";

  if (!values.email.trim()) errors.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address";

  if (values.phone && !/^[0-9]{10}$/.test(values.phone)) errors.phone = "Enter a valid 10-digit number";

  if (!values.message.trim()) errors.message = "Please add a short message";
  else if (values.message.trim().length < 10) errors.message = "A few more details would help (10+ characters)";

  return errors;
};

/**
 * TODO: replace this with a real API call once a backend endpoint exists,
 * e.g.:
 *   const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
 *   if (!res.ok) throw new Error("Failed to submit");
 */
const submitContactForm = async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.log("Contact form submitted (no backend wired up yet):", values);
  return { ok: true };
};

// Dark-glass styling for MUI inputs — kept in one place so every field matches.
const darkFieldSx = {
  "& .MuiInputBase-root": { color: premium.white },
  "& .MuiInputLabel-root": { color: premium.gray },
  "& .MuiInputLabel-root.Mui-focused": { color: premium.cyan },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: premium.glassBorder },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(34,211,238,0.5)" },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: premium.cyan },
  "& .MuiFormHelperText-root": { color: "#F87171" },
};

const ContactForm = () => {
  const [values, setValues] = useState(initialForm);
  const [inquiryType, setInquiryType] = useState("general");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitContactForm({ ...values, inquiryType });
      setSubmittedName(values.name.trim());
      setStatus("success");
      setValues(initialForm);
      setTouched({});
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <GlassCard tone="dark" hoverLift={false} sx={{ p: { xs: 3, md: 4 } }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Thanks, {submittedName || "there"}. We've received your message.
        </Alert>
        <Typography variant="body2" sx={{ color: premium.grayLight, mb: 2 }}>
          A team member will review it and get back to you. In the meantime,
          you're welcome to keep browsing.
        </Typography>
        <Button variant="outlined" startIcon={<FaBook />} href="/courses" sx={{ color: premium.cyan, borderColor: premium.cyan }}>
          Browse Courses
        </Button>
        <Button variant="text" onClick={() => setStatus("idle")} sx={{ ml: 2, color: premium.grayLight }}>
          Send another message
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard tone="dark" hoverLift={false} sx={{ p: { xs: 3, md: 4.5 } }}>
      <Typography variant="h5" component="h2" sx={{ color: premium.white, fontWeight: 700, mb: 1 }}>
        Tell us what you're looking for.
      </Typography>
      <Typography variant="body2" sx={{ color: premium.grayLight, mb: 3 }}>
        Our team will get back to you as soon as possible.
      </Typography>

      <Typography variant="caption" sx={{ color: premium.gray, fontWeight: 700, letterSpacing: 1, display: "block", mb: 1.5 }}>
        WHAT'S THIS ABOUT?
      </Typography>
      <Box sx={{ mb: 3.5 }}>
        <InquiryCards selected={inquiryType} onSelect={setInquiryType} />
      </Box>

      {status === "error" && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Something went wrong sending your message. Please try again.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <TextField
              fullWidth
              required
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              disabled={status === "submitting"}
              sx={darkFieldSx}
              InputProps={{ startAdornment: <InputAdornment position="start"><FaUser size={14} color={premium.gray} /></InputAdornment> }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              required
              label="Email Address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              disabled={status === "submitting"}
              sx={darkFieldSx}
              InputProps={{ startAdornment: <InputAdornment position="start"><FaEnvelope size={14} color={premium.gray} /></InputAdornment> }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              fullWidth
              label="Phone Number (optional)"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              disabled={status === "submitting"}
              sx={darkFieldSx}
              InputProps={{ startAdornment: <InputAdornment position="start"><FaPhone size={14} color={premium.gray} /></InputAdornment> }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              select
              fullWidth
              label="Interested Program (optional)"
              name="program"
              value={values.program}
              onChange={handleChange}
              disabled={status === "submitting"}
              sx={darkFieldSx}
            >
              {contactData.programInterests.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-12">
            <TextField
              fullWidth
              required
              multiline
              rows={5}
              label="Message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.message && Boolean(errors.message)}
              helperText={touched.message && errors.message}
              disabled={status === "submitting"}
              sx={darkFieldSx}
            />
          </div>
          <div className="col-12">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={status === "submitting"}
              startIcon={status === "submitting" ? <CircularProgress size={16} color="inherit" /> : <FaPaperPlane />}
              sx={{
                px: 4,
                py: 1.5,
                background: `linear-gradient(90deg, ${premium.blue}, ${premium.purple})`,
                boxShadow: `0 8px 24px ${premium.blue}55`,
              }}
            >
              {status === "submitting" ? "Sending..." : "Send Enquiry →"}
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <FaShieldAlt size={12} color={premium.gray} />
              <Typography variant="caption" sx={{ color: premium.gray }}>
                Your information is safe with us. We never share your details.
              </Typography>
            </Box>
          </div>
        </div>
      </Box>
    </GlassCard>
  );
};

export default ContactForm;
