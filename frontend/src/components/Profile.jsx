import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles";
import Navbar from "./Navbar";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomNotification from "./stock/CustomNotification";

const Profile = () => {
  const [data, setData] = useState({
    username: "",
    age: "",
    place: "",
    _id: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: false,
    age: false,
    place: false,
  });
  const [generalError, setGeneralError] = useState("");
  const api_url = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      setData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);
  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      username: data.username === "",
      place: data.place === "",
      age: data.age === "",
    };
    setErrors(newErrors);
    return !newErrors.username && !newErrors.place && !newErrors.age;
  };
  const submitHandler = async () => {
    if (validateFields()) {
      try {
        const updatedProfile = {
          username: data.username,
          place: data.place,
          age: data.age,
          _id: data._id,
          email: data.email,
          role: data.role,
        };
        await axios.put(`${api_url}/user/edit/`, updatedProfile);
        console.log("Profile Updated");
        localStorage.setItem("userData", JSON.stringify(updatedProfile));
      } catch (error) {
        console.error(error);
        setGeneralError("An error occurred while updating the profile.");
      }
    }
  };

  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("userData");
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "97vh",
          position: "relative",
        }}
      >
        <Box mt={"4.5vh"} sx={styles.box_style}>
          <CustomNotification
            severity={"success"}
            sx={{ mt: 7, mr: -1 }}
            message="Profile Updated"
            open={open}
            onClose={handleClose}
          />
          <IconButton
            sx={{ position: "fixed", ml: "16vw", mt: "-3vh", color: "white" }}
            onClick={logoutHandler}
          >
            <LogoutIcon />
          </IconButton>
          <img
            src="/defaultprofile.png"
            alt="Profile Icon"
            style={{ width: "150px", marginBottom: "1rem", marginTop: "0rem" }}
          />
          <Typography
            fontFamily={"fantasy"}
            variant="h3"
            color="white"
            gutterBottom
          >
            PROFILE BIO
          </Typography>
          <TextField
            required
            fullWidth
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={data.username}
            onChange={inputHandler}
            error={errors.username}
            helperText={errors.username ? "Username is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="place"
            label="Place"
            variant="outlined"
            margin="normal"
            value={data.place}
            onChange={inputHandler}
            error={errors.place}
            helperText={errors.place ? "Place is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="age"
            label="Age"
            type="number"
            variant="outlined"
            margin="normal"
            value={data.age}
            onChange={inputHandler}
            error={errors.age}
            helperText={errors.age ? "Age is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          {generalError && (
            <Typography color="error">{generalError}</Typography>
          )}
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "orange",
              "&:hover": { backgroundColor: "orange" },
            }}
            onClick={async () => {
              setSeverity("success");
              setMessage("Profile Updated");
              setOpen(true);
              submitHandler();
            }}
          >
            Save Changes
          </Button>
          <br />
          <Button
            variant="text"
            sx={{ mt: 2 }}
            onClick={async () => {
              await axios.delete(`${api_url}/user/delete/`, {
                data: data,
              });
              navigate("/");
              localStorage.removeItem("userData");
              console.log("Profile Successfully Deleted");
            }}
          >
            <Typography style={{ color: "red" }}>Delete my Account</Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
