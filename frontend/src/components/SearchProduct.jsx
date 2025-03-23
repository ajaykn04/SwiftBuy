import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Rating,
  Typography,
  IconButton,
} from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

import Navbar from "./Navbar";

const SearchProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [test, setTest] = useState(true);
  const searchvalue = useLocation();
  const api_url = import.meta.env.VITE_API_URL;
  const data = JSON.parse(localStorage.getItem("userData"));
  const [wishlist, setWishlist] = useState([]);
  var [wish, setWish] = useState([]);

  useEffect(() => {
    // if (data._id) {
    const apiUrl = `${api_url}/product/search/${searchvalue.state.query}`;
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
    // }
  }, []);

  useEffect(() => {
    const apiUrl = `${api_url}/user/getwishlist/${data._id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setWish(wishlist.map((product) => product.product._id));
  }, [wishlist]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <center>
          <br />
          <br />
          <br />
          <br />
          Searching for {searchvalue.state.query}
        </center>
      ) : empty ? (
        <center>
          <Typography style={{ fontSize: 17, marginTop: "50vh" }}>
            No results found🫠
            {/* No results found😓<br />
            No results found😰<br />
            No results found🥺<br />
            No results found🥹 */}
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
                    navigate("/detproduct", { state: product });
                  }}
                >
                  <Box>
                    <img
                      src={`${api_url}/${product.image}`}
                      alt={product.name}
                      style={{
                        width: 150,
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 8, ml: 10 }}>
                    <Typography
                      className="productname"
                      sx={{
                        fontFamily: "fantasy",
                        color: "white",
                        fontSize: 32,
                        mt: -10,
                      }}
                    >
                      {product.name}
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
                          {parseFloat(product.rating.toFixed(1)) || 0} ⭐
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
                        {product.reviews.length === 0
                          ? "No Rating"
                          : product.reviews.length === 1
                          ? "1 Rating"
                          : `${product.reviews.length} Ratings`}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{ mt: 1.5, fontFamily: "cursive", color: "yellow" }}
                    >
                      ₹{product.price}
                    </Typography>
                  </Box>
                </Button>
                <IconButton
                  sx={{ ml: -163, mt: -20 }}
                  onClick={async () => {
                    if (wish.includes(String(product._id))) {
                      try {
                        const res = await axios.delete(
                          `${api_url}/user/wishlist/delitem/${data._id}/${product._id}`
                        );
                        setWish(wish.filter((id) => id !== product._id));
                      } catch (error) {
                        console.error(
                          "Error deleting product from wishlist:",
                          error
                        );
                      }
                    } else {
                      try {
                        await axios.post(
                          `${api_url}/product/addtowishlist/${data._id}/${product._id}`
                        );
                        setWish([...wish, product._id]);
                      } catch (error) {
                        console.error(
                          "Error adding product to wishlist:",
                          error
                        );
                      }
                    }
                  }}
                  color="error"
                >
                  {wish.includes(String(product._id)) ? (
                    <img
                      style={{ width: 30, marginLeft: 2 }}
                      alt="Wishlist"
                      src="/heart.png"
                    />
                  ) : (
                    <FavoriteBorder fontSize="large" />
                  )}
                </IconButton>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchProduct;
