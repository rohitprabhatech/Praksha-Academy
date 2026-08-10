import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, MenuItem } from "@mui/material";
import { FaPaperPlane } from "react-icons/fa";
import { colors } from "../../theme/theme";

const subjects = [
  "Course Inquiry",
  "Admission Support",
  "Technical Issue",
  "Feedback",
  "Other",
];

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) errors.name = "Name is required";
  else if (values.name.trim().length < 2) errors.name = "Name is too short";

  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email";

  if (values.phone && !/^[0-9]{10}$/.test(values.phone)) errors.phone = "Enter a valid 10-digit number";

  if (!values.subject) errors.subject = "Please select a subject";

  if (!values.message.trim()) errors.message = "Message is required";
  else if (values.message.trim().length < 10) errors.message = "Message should be at least 10 characters";

  return errors;
};

const ContactForm = () => {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      setStatus(null);
      return;
    }

    // TODO: wire up to backend API endpoint
    console.log("Contact form submitted:", values);
    setStatus("success");
    setValues(initialForm);
    setTouched({});
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: "12px",
        p: { xs: 3, md: 4 },
      }}
    >
      <Typography variant="h5" sx={{ color: colors.textPrimary, mb: 1 }}>
        Send Us a Message
      </Typography>
      <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 3 }}>
        We usually reply within one business day.
      </Typography>

      {status === "success" && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Thanks! Your message has been sent — we'll get back to you soon.
        </Alert>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
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
          />
        </div>
        <div className="col-md-6">
          <TextField
            select
            fullWidth
            label="Subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subject && Boolean(errors.subject)}
            helperText={touched.subject && errors.subject}
          >
            {subjects.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-12">
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.message && Boolean(errors.message)}
            helperText={touched.message && errors.message}
          />
        </div>
        <div className="col-12">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<FaPaperPlane />}
            sx={{ px: 4, py: 1.5 }}
          >
            Send Message
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default ContactForm;
