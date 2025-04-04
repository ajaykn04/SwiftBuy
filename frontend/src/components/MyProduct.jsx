import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "./Navbar";
import CustomNotification from "./stock/CustomNotification";

const MyProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [empty, setEmpty] = useState(true);
  const api_url = import.meta.env.VITE_API_URL;

  const data = JSON.parse(localStorage.getItem("userData"));
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return; // Prevent closing if clicked outside
    setOpen(false); // Close Notification
  };

  useEffect(() => {
    if (data._id) {
      const apiUrl = `${api_url}/merchant/products/${data._id}`;
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
    }
  }, []);

  const updateValue = (value) => {
    navigate("/product/add", { state: { value } });
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${api_url}/product/delete/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((r) => r._id !== productId)
      );
      window.location.reload(true);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
          <Typography style={{ marginTop: "50vh" }}>
            You don't have any Products,&nbsp;
            <Button
              sx={{
                textTransform: "none",
                padding: 0,
              }}
              style={{ color: "transparent" }}
              onClick={() => {
                navigate("/product/add");
              }}
            >
              <Typography style={{ color: "orange" }}>
                Create new Product
              </Typography>
            </Button>
          </Typography>
        </center>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mt: "70px" }}>
            {products.map((product, index) => (
              <>
                <CustomNotification
                  mt={-1.3}
                  mb={-1}
                  severity={severity}
                  sx={{ mt: 7, mr: -1 }}
                  message={message}
                  open={open}
                  onClose={handleClose}
                  image={`${api_url}/${product.image}`}
                />
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
                    <IconButton
                      sx={{
                        position: "fixed",
                        ml: 25.5,
                        mt: 34.5,
                        color: "white",
                        zIndex: 1, //dddddddddddddddddddd
                      }}
                      onClick={async () => {
                        handleDelete(product._id);
                        setSeverity("warning");
                        setMessage("Product Deleted");
                        setOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
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
                        <Box sx={{ minHeight: "200px", maxHeight: "200px" }}>
                          <img
                            src={`${api_url}/${product.image}`}
                            alt={product.name}
                            style={{
                              marginLeft: "-10px",
                              width: "200px",
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="subtitle1"
                          fontFamily={"cursive"}
                          sx={{
                            ml: -1.5,
                            mt: 1,
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Rating
                          name={`rating-${index}`}
                          value={product.rating || 0}
                          readOnly
                          precision={0.1}
                          sx={{
                            ml: -2,
                            mb: 1,
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
                          variant="subtitle1"
                          fontFamily={"cursive"}
                          sx={{
                            //ddddddddddddddddddd
                            ml: -1.5,
                            mt: -1,
                            color: "yellow",
                            fontWeight: "bold",
                          }}
                        >
                          ₹{product.price}
                        </Typography>
                      </Container>
                    </Button>
                  </Paper>
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default MyProduct;
