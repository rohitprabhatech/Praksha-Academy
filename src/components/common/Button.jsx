import { Button as MuiButton } from "@mui/material";

const PrimaryButton = ({
  title,
  children,
  onClick,
  color = "primary",
  variant = "contained",
  type = "button",
  fullWidth = false,
  startIcon = null,
  endIcon = null,
  disabled = false,
  size = "medium",
  sx = {},
  ...props
}) => {
  return (
    <MuiButton
      onClick={onClick}
      type={type}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      size={size}
      sx={sx}
      {...props}
    >
      {children || title}
    </MuiButton>
  );
};

export default PrimaryButton;
