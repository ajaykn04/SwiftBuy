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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EngineeringIcon from "@mui/icons-material/Engineering";

const StyledToolbar = styled(Toolbar)`
  background-color: black;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
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
            alt="SwiftBuy"
            src="/logo1.png"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 1,
            }}
          >
            <Typography
              style={{
                marginBottom: -15,
                fontSize: "20px",
                fontFamily: "fantasy",
                color: "white",
              }}
            >
              Admin
            </Typography>
            <Typography
              style={{
                fontSize: "30px",
                fontFamily: "fantasy",
                color: "white",
              }}
            >
              SwiftBuy
            </Typography>
          </div>
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
                ml: 10,
                display: "flex",
                justifyContent: "flex-start",
                gap: "2rem",
                flex: 1,
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  navigate("/dashboard");
                }}
                style={{
                  marginLeft: -40,
                  marginRight: 0,
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
                    textDecoration:
                      location.pathname === "/dashboard" ? "underline" : "none",
                  }}
                >
                  HOME
                </Typography>
              </Button>

              <Button
                variant="text"
                onClick={() => {
                  navigate("/product/add");
                }}
                style={{
                  marginLeft: 0,
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
                    textDecoration:
                      location.pathname === "/product/add"
                        ? "underline"
                        : "none",
                  }}
                >
                  ADD PRODUCT
                </Typography>
              </Button>
            </Container>

            <Container
              sx={{
                ml: -16,
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
                  handleKeyDown(event);
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
                gap: "2rem",
                flex: 1,
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  navigate("/merchant/products");
                }}
                style={{
                  marginLeft: -50,
                  marginRight: 25,
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
                    textDecoration:
                      location.pathname === "/merchant/products"
                        ? "underline"
                        : "none",
                  }}
                >
                  MY PRODUCTS
                </Typography>
              </Button>

              <Button
                variant="text"
                onClick={() => {
                  navigate("/user/orders");
                }}
                style={{
                  marginLeft: -25,
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
                    textDecoration:
                      location.pathname === "/user/orders"
                        ? "underline"
                        : "none",
                  }}
                >
                  MY ORDERS
                </Typography>
              </Button>
            </Container>
          </Container>

          <IconButton
            onClick={() => {
              navigate("/admintools");
            }}
            sx={{ mr: 0.8 }}
            color="inherit"
          >
            🛠️
          </IconButton>
          <IconButton
            sx={{ mr: 1.2 }}
            color="inherit"
            onClick={() => {
              navigate("/mycart");
            }}
          >
            <ShoppingCartIcon
              style={{ color: "white" }}
              sx={{ fontSize: 28 }}
              alt="mycart"
            />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => {
              navigate("/user/wishlist");
            }}
          >
            <img style={{ width: 27 }} alt="Wishlist" src="/heart.png" />
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar alt="Profile" src="/defaultlogin.png" />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
