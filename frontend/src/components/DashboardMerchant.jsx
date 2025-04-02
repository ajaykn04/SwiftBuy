import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import Navbar from "./Navbar";

const DashboardMerchant = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${api_url}/product/getfeatured`)
      .then((res) => {
        setProducts(res.data);

        console.log(res.data, "featured");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleSlideChange = (index) => {
    setSelectedIndex(index);
  };
  const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"];
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      {loading ? (
        <center>Loading...</center>
      ) : (
        <Box>
          {/* <Carousel
                      autoPlay
                      interval={2500}
                      infiniteLoop
                      showThumbs={false}
                      showStatus={false}
                      stopOnHover={false}
                      showIndicators={true}
                      swipeable={true}
                      centerMode={true}
                      centerSlidePercentage={36.5}
                      selectedItem={selectedIndex}
                      onChange={handleSlideChange}
                    >
                      {products.map((product, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "50px",
                            transform:
                              index === selectedIndex ? "scale(1.1)" : "scale(.9)",
                            transition: "transform 0.5s ease-in-out",
                          }}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={15}
                            md={4}
                            lg={2.3}
                            sx={{ mt: -4, ml: 1.1 }}
                          >
                            <Paper
                              elevation={3}
                              sx={{
                                padding: 1,
                                backgroundColor: "currentcolor",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <Container
                                style={{
                                  backgroundColor: "currentcolor",
                                  flex: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: "black",
                                    height: "40vh",
                                    borderRadius: "2.5vw",
                                    width: "35vw",
                                    boxShadow: "4px 4px 4px rgb(47, 37, 25)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                  }}
                                >
                                  <Box
                                    className="carousel-item"
                                    sx={{
                                      height: "100%",
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      onClick={() => {}}
                                      variant="outlined"
                                      style={{
                                        padding: 0,
                                        border: "none",
                                        background: "transparent",
                                        color: "black",
                                      }}
                                    >
                                      <img
                                        src="/loading.jpg"
                                        // src={`${api_url}/${product.image}`}
                                        style={{
                                          height: "auto",
                                          width: "100%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </Button>
                                  </Box>
                                </Box>
                              </Container>
                            </Paper>
                          </Grid>
                        </div>
                      ))}
                    </Carousel> */}
          <Carousel
            autoPlay
            interval={2500}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            stopOnHover={false}
            showIndicators={true}
            swipeable={true}
            centerMode={true}
            centerSlidePercentage={36.5}
            selectedItem={selectedIndex}
            onChange={handleSlideChange}
          >
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  padding: "50px",
                  transform:
                    index === selectedIndex ? "scale(1.1)" : "scale(.9)",
                  transition: "transform 0.5s ease-in-out",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={15}
                  md={4}
                  lg={2.3}
                  sx={{ mt: -4, ml: 1.1 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 1,
                      backgroundColor: "currentcolor",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Container
                      style={{
                        backgroundColor: "currentcolor",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "black",
                          height: "40vh",
                          borderRadius: "2.5vw",
                          width: "35vw",
                          boxShadow: "4px 4px 4px rgb(47, 37, 25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          className="carousel-item"
                          sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            onClick={() => {}}
                            variant="outlined"
                            style={{
                              padding: 0,
                              border: "none",
                              background: "transparent",
                              color: "black",
                            }}
                          >
                            <img
                              src={image}
                              style={{
                                marginTop: 4,
                                height: "auto",
                                width: "110%",
                                objectFit: "cover",
                              }}
                            />
                          </Button>
                        </Box>
                      </Box>
                    </Container>
                  </Paper>
                </Grid>
              </div>
            ))}
          </Carousel>
          <Typography
            fontSize={30}
            sx={{ mb: -8, ml: 2.5 }}
            fontFamily={"fantasy"}
          >
            FEATURED PRODUCTS
          </Typography>
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
        </Box>
      )}
    </div>
  );
};

export default DashboardMerchant;
