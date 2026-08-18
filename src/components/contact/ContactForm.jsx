import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, MenuItem, CircularProgress } from "@mui/material";
// Text-only form — no adornment icons, per design direction.
import { premium } from "../../theme/premiumPalette";
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
const fieldSx = {
  "& .MuiInputBase-root": { color: premium.textPrimary },
  "& .MuiInputLabel-root": { color: premium.textSecondary },
  "& .MuiInputLabel-root.Mui-focused": { color: premium.blue },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: premium.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(37,99,235,0.4)" },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: premium.blue },
  "& .MuiFormHelperText-root": { color: premium.red },
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
      <Box sx={{ p: { xs: 3, md: 4.5 }, backgroundColor: premium.cardBg, borderRadius: "20px", boxShadow: "0 20px 50px rgba(15,23,42,0.15)", border: `1px solid ${premium.border}` }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Thanks, {submittedName || "there"}. We've received your message.
        </Alert>
        <Typography variant="body2" sx={{ color: premium.textSecondary, mb: 2 }}>
          A team member will review it and get back to you. In the meantime,
          you're welcome to keep browsing.
        </Typography>
        <Button variant="outlined" href="/courses" sx={{ color: premium.blue, borderColor: premium.blue }}>
          Browse Courses
        </Button>
        <Button variant="text" onClick={() => setStatus("idle")} sx={{ ml: 2, color: premium.textSecondary }}>
          Send another message
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 3, md: 4.5 }, backgroundColor: premium.cardBg, borderRadius: "20px", boxShadow: "0 20px 50px rgba(15,23,42,0.15)", border: `1px solid ${premium.border}` }}>
      <Typography variant="h5" component="h2" sx={{ color: premium.textPrimary, fontWeight: 700, mb: 1 }}>
        Quick Inquiry Form
      </Typography>
      <Typography variant="body2" sx={{ color: premium.textSecondary, mb: 3 }}>
        Your form submission is confidential — we'll respond as soon as
        possible.
      </Typography>

      <Typography variant="caption" sx={{ color: premium.textLight, fontWeight: 700, letterSpacing: 1, display: "block", mb: 1.5 }}>
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
              sx={fieldSx}
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
              sx={fieldSx}
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
              sx={fieldSx}
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
              sx={fieldSx}
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
              sx={fieldSx}
            />
          </div>
          <div className="col-12">
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={status === "submitting"}
              startIcon={status === "submitting" ? <CircularProgress size={16} color="inherit" /> : undefined}
              sx={{
                py: 1.6,
                borderRadius: "999px",
                fontWeight: 700,
                backgroundColor: premium.blue,
                boxShadow: `0 8px 20px ${premium.blue}44`,
                "&:hover": { backgroundColor: premium.blueHover },
              }}
            >
              {status === "submitting" ? "Sending..." : "Send Inquiry"}
            </Button>

            <Typography variant="caption" sx={{ color: premium.textLight, display: "block", mt: 2 }}>
              Your information is safe with us. We never share your details.
            </Typography>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ContactForm;
