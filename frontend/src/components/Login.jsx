import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles";
import { AppContext } from "../AppContext";

const Login = () => {
  const { setData } = useContext(AppContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      email: user.email === "",
      password: user.password === "",
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        const login = await axios.get(
          `${api_url}/user/get/${user.email}/${user.password}`
        );
        const userData = {
          username: login.data.username,
          email: login.data.email,
          place: login.data.place,
          age: login.data.age,
          password: login.data.password,
          role: login.data.role,
          _id: login.data._id,
        };
        setData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/dashboard", { state: login.data });
      } catch (error) {
        console.error(error);
        setGeneralError("Invalid Email or Password");
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
          <img
            src="/logo1.png"
            alt="Login Icon"
            style={{
              width: "180px",
              marginBottom: "-1rem",
              marginTop: "-2.5rem",
            }}
          />
          <Typography
            fontFamily={"fantasy"}
            variant="h3"
            color="white"
            style={{
              marginBottom: "0px",
            }}
            gutterBottom
          >
            LOG-IN
          </Typography>
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
            FormHelperTextProps={{
              sx: { color: errors.email ? "red" : "red" },
            }}
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
            Log-in
          </Button>
          <Box mt={2}>
            <Typography style={{ color: "darkgray" }}>
              Don't have an Account?&nbsp;
              <Link style={styles.link_style} to={"/signin"}>
                SignUp
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
