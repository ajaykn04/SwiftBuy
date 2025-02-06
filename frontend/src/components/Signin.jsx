import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles";

const Signin = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    place: "",
    age: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    age: false,
    place: false,
  });
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const cred = {
    username: user.username,
    email: user.email,
    password: user.password,
    place: user.place,
    age: user.age,
  };

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      username: user.username === "",
      email: user.email === "",
      password: user.password === "",
      place: user.place === "",
      age: user.age === "",
    };
    setErrors(newErrors);
    return (
      !newErrors.username &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.place &&
      !newErrors.age
    );
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        await axios.post(`http://localhost:3000/user/register/`, cred);
        console.log("user added");
        navigate("/");
      } catch (error) {
        if (error.response.status == 409) {
          setGeneralError("Email Already Exists");
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "97vh",
        }}
      >
        <Box sx={styles.box_style}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img
            src="/logo1.png"
            alt="Login Icon"
            style={{
              width: "180px",
              marginLeft:'-25px',
              marginBottom: "-1rem",
              marginTop: "-2.5rem",
            }}
          />
          <Typography
            fontFamily={"fantasy"}
            variant="h3"
            color="white"
            style={{
              marginBottom:'0px'
            }}
            gutterBottom
          >
            SIGN-IN
          </Typography>
          <TextField
            required
            fullWidth
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={user.username}
            onChange={inputHandler}
            error={errors.username}
            helperText={errors.username ? "Username is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={user.email}
            onChange={inputHandler}
            error={errors.email}
            helperText={errors.email ? "Email is required" : generalError}
            FormHelperTextProps={{ sx: { color: "red" } }}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="place"
            label="place"
            variant="outlined"
            margin="normal"
            value={user.place}
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
            label="age"
            type="number"
            variant="outlined"
            margin="normal"
            value={user.age}
            onChange={inputHandler}
            error={errors.age}
            helperText={errors.age ? "Age is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={user.password}
            onChange={inputHandler}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "orange",
              "&:hover": { backgroundColor: "orange" },
            }}
            onClick={submitHandler}
          >
            Sign-up
          </Button>
          <Box mt={2}>
            <Typography style={{ color: "darkgray" }}>
              Already have an Account?&nbsp;
              <Link style={styles.link_style} to={"/"}>
                LogIn
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Signin;
