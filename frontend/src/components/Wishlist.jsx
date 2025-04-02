import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Navbar from "./Navbar";

const Wishlist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [test, setTest] = useState(true);
  const api_url = import.meta.env.VITE_API_URL;
  const data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const apiUrl = `${api_url}/user/getwishlist/${data._id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);

        setEmpty(response.data.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(products);
  return (
    <div>
      <Navbar />
      {loading ? (
        <center>
          <br />
          <br />
          <br />
          <br />
          Loading...
        </center>
      ) : empty ? (
        <center>
          <Typography style={{ fontSize: 17, marginTop: "50vh" }}>
            Nothing Here
          </Typography>
        </center>
      ) : (
        <List sx={{ marginTop: "7.2vh" }}>
          {products.map((product, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: 1500,
                mx: "auto",
              }}
            >
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "16px",
                  borderBottom: "1px solid gray",
                }}
              >
                <Button
                  key={index}
                  component="div"
                  sx={{
                    all: "inherit",
                    width: "100%",
                    cursor: "pointer",
                    borderRadius: "20px",
                    border: "none",
                    "&:hover .productname": {
                      color: "darkorange",
                    },
                  }}
                  style={{ color: "orange" }}
                  onClick={() => {
                    navigate("/detproduct", { state: product.product });
                  }}
                >
                  <Box>
                    <img
                      src={`${api_url}/${product.product.image}`}
                      alt={product.product.name}
                      style={{
                        width: 150,
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 5, ml: 6 }}>
                    <Typography
                      className="productname"
                      sx={{
                        fontFamily: "fantasy",
                        color: "white",
                        fontSize: 32,
                        mt: -10,
                      }}
                    >
                      {product.product.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#222",
                          color: "white",
                          borderRadius: "8px",
                          padding: "4px 8px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          width: "fit-content",
                        }}
                      >
                        <Typography sx={{ mr: 0.5, color: "#FFAD18" }}>
                          {parseFloat(product.product.rating.toFixed(1)) || 0}{" "}
                          ⭐
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontFamily: "cursive",
                          ml: 1,
                          mt: 0.8,
                        }}
                      >
                        {product.product.reviews.length === 0
                          ? "No Rating"
                          : product.product.reviews.length === 1
                          ? "1 Rating"
                          : `${product.product.reviews.length} Ratings`}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{ mt: 1.5, fontFamily: "cursive", color: "yellow" }}
                    >
                      ₹{product.product.price}
                    </Typography>
                  </Box>
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `${api_url}/user/wishlist/delitem/${data._id}/${product.product._id}`
                      );
                      window.location.reload(true);
                    } catch (error) {
                      console.error(
                        "Error deleting product from wishlist:",
                        error
                      );
                    }
                  }}
                  variant=""
                  sx={{
                    ml: -158.5,
                    mt: 15.5,
                    color: "transparent",
                    "&:hover .remove_cart": {
                      color: "red",
                    },
                  }}
                >
                  <Typography
                    className="remove_cart"
                    color="white"
                    sx={{
                      fontFamily: "fantasy",
                      textTransform: "none",
                    }}
                  >
                    Remove
                  </Typography>
                </Button>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </div>
  );
};

export default Wishlist;
