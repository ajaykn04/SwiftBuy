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
} from "@mui/material";

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

  useEffect(() => {
    // if (data._id) {
    console.log(searchvalue.state.query);
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
      ) : test ? (
        <List sx={{ marginTop: "10vh" }}>
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
                  <Box sx={{ mt: 8, ml: 6 }}>
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
              </ListItem>
            </Box>
          ))}
        </List>
      ) : (
        <Grid container spacing={2} sx={{ mt: "70px" }}>
          {products.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={15}
              md={3}
              lg={2.3}
              key={index}
              sx={{ ml: "9px", mt: -2 }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: 1,
                  backgroundColor: "currentcolor",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "325px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    borderColor: "white",
                    borderRadius: "15px",
                    width: "255px",
                    height: "325px",
                    "&:hover": {
                      borderColor: "darkorange",
                    },
                  }}
                  onClick={() => {
                    navigate("/detproduct", { state: product });
                  }}
                  style={{
                    fontSize: "20px",
                    fontFamily: "fantasy",
                    color: "black",
                  }}
                >
                  <Container
                    style={{
                      backgroundColor: "currentcolor",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      src={`${api_url}/${product.image}`}
                      alt={product.name}
                      style={{
                        marginLeft: "-39px",
                        marginTop: "-10px",
                        width: "261px",
                        height: "260px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontFamily={"cursive"}
                      sx={{
                        ml: -1.5,
                        mt: 1,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      fontFamily={"cursive"}
                      sx={{
                        ml: 18,
                        mt: 0.5,
                        mb: -2.9,
                        color: "yellow",
                        fontWeight: "bold",
                      }}
                    >
                      ₹{product.price}
                    </Typography>

                    <Rating
                      name={`rating-${index}`}
                      value={product.rating || 0}
                      readOnly
                      precision={0.1}
                      sx={{
                        ml: -2,
                        mb: 1,
                        mt: -0.5,
                        "& .MuiRating-iconFilled": {
                          color: "#FFAD18",
                        },
                        "& .MuiRating-iconEmpty": {
                          color: "grey",
                        },
                        "& .MuiRating-icon:hover": {
                          borderColor: "darkorange",
                        },
                      }}
                    />
                  </Container>
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default SearchProduct;
