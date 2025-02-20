import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarMerchant from "./NavbarMerchant";
import NavbarDeliveryagent from "./NavbarDeliveryagent";
import { AppContext } from "../AppContext";
import LogoutIcon from "@mui/icons-material/Logout";

const Profile = () => {
  const { data, setData } = useContext(AppContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: false,
    age: false,
    place: false,
  });
  const [generalError, setGeneralError] = useState("");
  const [whoami, setWhoami] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setData(savedData);
    }
  }, [setData]);
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
        await axios.put(`http://localhost:3000/user/edit/`, updatedProfile);
        console.log("Profile Updated");
        localStorage.setItem("userData", JSON.stringify(updatedProfile));
        navigate("/userdash");
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
      {data.role === "admin" ? (
        <NavbarAdmin />
      ) : data.role === "merchant" ? (
        <NavbarMerchant />
      ) : data.role === "deliveryagent" ? (
        <NavbarDeliveryagent />
      ) : (
        <Navbar />
      )}

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
            onClick={submitHandler}
          >
            Save Changes
          </Button>
          <br />
          <Button
            variant="text"
            sx={{ mt: 2 }}
            onClick={async () => {
              await axios.delete(`http://localhost:3000/user/delete/`, {
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
