import { Snackbar, Slide, Alert, Box } from "@mui/material";

const CustomNotification = ({
  severity,
  mt,
  mb,
  sx,
  image,
  message,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={(props) => <Slide {...props} direction="left" />}
      sx={{ ...sx }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          bgcolor: "black",
          color: "white",
          border: "1px solid white",
          borderRadius: "8px",
          fontWeight: "bold",
          boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
          transform: "scale(1.05)",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <Box
          sx={{
            mt: mt || 0,
            mb: mb || 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {image && (
            <img
              src={image}
              style={{ marginRight: 20, height: 50, width: 50 }}
              alt=""
            />
          )}
          {message}
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default CustomNotification;
