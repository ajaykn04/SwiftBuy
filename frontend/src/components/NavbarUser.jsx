import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconImage from "/logo1.png";
import profileImage from "/defaultlogin.png";
import wishlistImage from "/heart.png";

const StyledToolbar = styled(Toolbar)`
  background-color: black;
`;
const NavbarUser = () => {
  const navigate = useNavigate();
  const api_url=import.meta.env.VITE_API_URL;
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate("/search/products", { state: { query: searchQuery } });
      window.location.reload(true);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div>
      <AppBar position="fixed" style={{ borderBottom: "2px solid #181818" }}>
        <StyledToolbar>
          <Avatar
            sx={{ width: 55, height: 55, mr: 3, mt: -4, mb: -4 }}
            alt="OSP"
            src={iconImage}
          />
          <Typography
            style={{
              fontSize: "30px",
              fontFamily: "fantasy",
              color: "white",
              marginLeft: -12,
            }}
          >
            OSP
          </Typography>
          <Typography
            style={{
              width: "150px",
              fontSize: "13px",
              fontFamily: "fantasy",
              color: "white",
              textAlign: "center",
              display: "flex",
              lineHeight: "1.2",
            }}
          >
            Shop with us <br />
            save your time
          </Typography>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Container
              sx={{
                ml: 10, //comon 1
                display: "flex",
                justifyContent: "flex-start",
                gap: "3rem",
                flex: 1,
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  navigate("/dashboard");
                }}
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "black"
                }}
              >
                <Typography
                  style={{
                    fontFamily: "fantasy",
                    fontSize: "20px",
                    color: "orange",
                    textDecoration: location.pathname === "/dashboard" ? "underline" : "none"
                  }}
                >
                  HOME
                </Typography>
              </Button>
            </Container>

            <Container
              sx={{
                ml: -25, //comon 1
                mr: -2,
                display: "flex",
                justifyContent: "center",
                flex: 2,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.trimStart())}
                onKeyDown={() => {
                  if (searchQuery.trim() !== "") {
                    handleKeyDown(event);
                  }
                }}
                sx={{
                  maxWidth: "400px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "25px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "none",
                    },
                    "&:hover fieldset": {
                      borderColor: "none",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "none",
                      borderWidth: "0px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-input": {
                      color: "black",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "12px 20px",
                  },
                }}
              />
            </Container>

            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "3rem",
                flex: 1,
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  //navigate("/user/orders");
                }}
                style={{
                  marginLeft: -50,
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "black",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "fantasy",
                    fontSize: "20px",
                    color: "orange",
                    //textDecoration: location.pathname === "" ? "underline" : "none"
                  }}
                >
                  My Orders
                </Typography>
              </Button>
              <Button
                variant="text"
                onClick={() => {}}
                style={{
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "black",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "fantasy",
                    fontSize: "20px",
                    color: "orange",
                    //textDecoration: location.pathname === "" ? "underline" : "none"
                  }}
                >
                  My Cart
                </Typography>
              </Button>
            </Container>
          </Container>

          <IconButton>
            <Avatar
              sx={{ width: "25px", height: "25px" }}
              alt="Profile"
              src={wishlistImage}
            />
          </IconButton>
          <IconButton onClick={handleProfileClick}>
            <Avatar alt="Profile" src={profileImage} />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </div>
  );
};

export default NavbarUser;
