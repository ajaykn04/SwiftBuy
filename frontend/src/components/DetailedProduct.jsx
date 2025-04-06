import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Container,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { matchRoutes, useLocation } from "react-router-dom";
import axios from "axios";
import CustomNotification from "./stock/CustomNotification";
const DetailedProduct = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const data = JSON.parse(localStorage.getItem("userData"));
  const { state } = useLocation();
  const [productData, setProductData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    userId: "",
    username: "",
    rating: 0,
    comment: "",
  });
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (state?._id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `${api_url}/product/view/${state._id}`
          );
          setProductData(response.data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      fetchProduct();
    }
  }, [state?._id]);

  useEffect(() => {
    if (productData?._id) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `${api_url}/product/getreviews/${productData._id}`
          );
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
      fetchReviews();
    }
  }, [productData?._id]);

  const inputHandler = (e, newValue) => {
    const { name, value } = e.target || {};
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value || newValue,
    }));
  };

  const submitHandler = async () => {
    try {
      const updatedReview = {
        ...review,
        userId: data._id,
        username: data.username,
      };
      await axios.post(
        `${api_url}/product/addreview/${productData._id}`,
        updatedReview
      );
      setReviews((prevReviews) => [updatedReview, ...prevReviews]);
      setReview({
        userId: "",
        username: "",
        rating: 0,
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {!productData ? (
        <center>
          <br />
          <br />
          <br />
          <br />
          Loading...
        </center>
      ) : (
        <div>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "5vh",
            }}
          >
            <CustomNotification
              mt={-1.3}
              mb={-1}
              sx={{ mt: 7, mr: -1 }}
              severity={severity}
              message={message}
              open={open}
              onClose={handleClose}
              image={`${api_url}/${productData.image}`}
            />
            <Box
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginRight: "5vw",
                marginLeft: "2vw",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  fontFamily: "cursive",
                  fontWeight: "bold",
                  marginTop: 80,
                }}
              >
                {productData.name}
              </Typography>
              <Rating
                name="rating"
                value={productData.rating || 0}
                readOnly
                precision={0.1}
                sx={{
                  fontSize: 20,
                  mb: 1,
                  mt: 1,
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
              <Typography
                variant="body2"
                style={{
                  fontFamily: "cursive",
                  fontWeight: "bold",
                }}
              >
                {productData.category}
              </Typography>
              <img
                src={`${api_url}/${productData.image}`}
                alt={productData.name}
                style={{
                  border: "4px solid white",
                  borderRadius: "15px",
                  marginTop: 20,
                  width: "400px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              <Container sx={{ width: 535 }}>
                <Button
                  variant="contained"
                  style={{ marginTop: 20, marginLeft: -21 }}
                  sx={{
                    fontSize: "18px",
                    padding: "15px 30px",
                    maxWidth: "200px",
                    backgroundColor: "orange",
                    maxHeight: "50px",
                  }}
                  onClick={async () => {
                    setSeverity("success");
                    setMessage("Added to MyCart");
                    setOpen(true);
                    try {
                      await axios.post(
                        `${api_url}/product/addtocart/${data._id}/${productData._id}`
                      );
                    } catch (error) {
                      console.error("Error adding product to cart:", error);
                    }
                  }}
                >
                  ADD TO CART
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: 20, marginLeft: 30 }}
                  sx={{
                    fontSize: "18px",
                    padding: "15px 30px",
                    minWidth: "200px",
                    backgroundColor: "orangered",
                    maxHeight: "50px",
                  }}
                  onClick={async () => {
                    setSeverity("success");
                    setMessage("Product Ordered");
                    setOpen(true);
                    try {
                      await axios.post(
                        `${api_url}/product/buy/${data._id}/${productData._id}/1`
                      );
                      console.log("order confirmed");
                    } catch (error) {
                      console.error("Error ordering product :", error);
                    }
                  }}
                >
                  BUY NOW
                </Button>
              </Container>

              <Container
                style={{
                  border: "2px solid white",
                  borderRadius: "15px",
                  backgroundColor: "black",
                  marginTop: 21,
                  width: "77%",
                  marginLeft: 1,
                  padding: "20px",
                }}
              >
                <Typography style={{ marginTop: "1vh" }}>
                  Write a Review?
                </Typography>
                <Rating
                  name="rating"
                  precision={1}
                  value={review.rating}
                  sx={{
                    mb: 1,
                    mt: 1,
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
                  onChange={(e, newValue) => inputHandler(e, newValue)}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="comment"
                  label="Leave a Comment"
                  variant="outlined"
                  margin="normal"
                  value={review.comment}
                  onChange={inputHandler}
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{
                    style: { color: "white" },
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(247, 193, 128)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "orange",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "orange",
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  style={{ marginTop: 10 }}
                  sx={{
                    backgroundColor: "orange",
                    "&:hover": { backgroundColor: "darkorange" },
                  }}
                  onClick={submitHandler}
                >
                  POST
                </Button>
              </Container>
            </Box>
            <Box
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: 210,
                marginLeft: "-7vw",
                overflowY: "auto",
                overflowX: "hidden",
                maxHeight: 800,
                minWidth: 650,
                scrollbarWidth: "thin",
              }}
            >
              <Box
                style={{
                  marginBottom: "2vh",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "cursive",
                    fontWeight: "bold",
                  }}
                >
                  Description
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    marginTop: 10,
                    fontFamily: "cursive",
                    whiteSpace: "pre-line",
                    maxWidth: 500,
                  }}
                >
                  {productData.description}
                </Typography>
              </Box>
              <Box sx={{ mt: 10, ml: 5 }}>
                {reviews.map((comment, index) => (
                  <Box key={index}>
                    <Divider
                      sx={{
                        border: "1px solid #1b1b1b",
                        width: 600,
                        ml: -5,
                        marginTop: -2,
                        mb: 5,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ marginBottom: "0px", mt: -2 }}
                    >
                      @{comment.username}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={comment.rating}
                      readOnly
                      sx={{
                        mb: 2,
                        mt: 1,
                        fontSize: 20,
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
                    <Typography
                      variant="body2"
                      sx={{
                        marginBottom: 5,
                        mt: -1,
                        width: 520,
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {comment.comment}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
};

export default DetailedProduct;
