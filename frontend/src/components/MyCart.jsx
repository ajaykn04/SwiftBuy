import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  List,
  ListItem,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import CustomNotification from "./stock/CustomNotification";

const MyCart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [empty, setEmpty] = useState(true);
  const api_url = import.meta.env.VITE_API_URL;
  const data = JSON.parse(localStorage.getItem("userData"));
  const [checkout, setCheckout] = useState(true);
  var Price = 0;
  var Index = 1;
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    const apiUrl = `${api_url}/user/getcart/${data._id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        setEmpty(response.data.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      if (product.product.stock < product.quantity) {
        setCheckout(false);
      }
    });
  }, [products]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <center>
          <br />
          <br />
          <br />
          <br />
          loading...
        </center>
      ) : empty ? (
        <center>
          <Typography style={{ fontSize: 17, marginTop: "50vh" }}>
            Your cart is empty
          </Typography>
        </center>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            marginTop: "9vh",
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <CustomNotification
            severity={severity}
            sx={{ mt: 7, mr: -1 }}
            message={message}
            open={open}
            onClose={handleClose}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontFamily: "fantasy",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "3vh",
                      width: "600px",
                    }}
                  >
                    ITEM
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "fantasy",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    PRICE
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "fantasy",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    QUANTITY
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "fantasy",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    TOTAL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        fontFamily: "cursive",
                        color: "white",
                        display: "flex",
                        alignItems: "flex-start",
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
                          onClick={() => {
                            navigate("/detproduct", { state: product.product });
                          }}
                        />
                      </Box>
                      <Box sx={{ mt: 11.8, ml: 6 }}>
                        <Typography
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
                              {parseFloat(product.product.rating.toFixed(1)) ||
                                0}{" "}
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
                        <Button
                          onClick={async () => {
                            try {
                              await axios.delete(
                                `${api_url}/user/cart/delitem/${data._id}/${product.product._id}`
                              );
                              window.location.reload(true);
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                          variant=""
                          sx={{
                            ml: -2,
                            mt: 1,
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
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          mt: 1.5,
                          fontFamily: "cursive",
                          color: "yellow",
                        }}
                      >
                        ₹{product.product.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "2px solid white",
                          borderRadius: "8px",
                          width: "100px",
                          height: "25px",
                          overflow: "hidden",
                        }}
                      >
                        <Button
                          sx={{
                            minWidth: "30px",
                            fontSize: "20px",
                            borderRight: "2px solid white",
                            borderRadius: "0",
                            color: "white",
                          }}
                          onClick={async () => {
                            if (product.quantity === 1) {
                              try {
                                await axios.delete(
                                  `${api_url}/user/cart/delitem/${data._id}/${product.product._id}`
                                );
                                window.location.reload(true);
                              } catch (error) {
                                console.error(error);
                              }
                            } else {
                              try {
                                setProducts((prevProducts) =>
                                  prevProducts.map((p) =>
                                    p.product._id === product.product._id
                                      ? { ...p, quantity: p.quantity - 1 }
                                      : p
                                  )
                                );
                                product.quantity -= 1;
                                await axios.post(
                                  `${api_url}/user/cart/updateitemquantity/${data._id}/${product.product._id}/${product.quantity}`
                                );
                                if (checkout === false) {
                                  window.location.reload(true);
                                }
                              } catch (error) {
                                console.error(error);
                              }
                            }
                          }}
                        >
                          -
                        </Button>

                        <Typography
                          type="text"
                          sx={{
                            width: "40px",
                            textAlign: "center",
                            fontSize: "16px",
                            background: "transparent",
                            color: "white",
                          }}
                        >
                          {product.quantity}
                        </Typography>

                        <Button
                          sx={{
                            minWidth: "30px",
                            fontSize: "20px",
                            borderLeft: "2px solid white",
                            borderRadius: "0",
                            color: "white",
                          }}
                          onClick={async () => {
                            setProducts((prevProducts) =>
                              prevProducts.map((p) =>
                                p.product._id === product.product._id
                                  ? p.quantity >= p.product.stock
                                    ? { ...p, available: "Not available" }
                                    : {
                                        ...p,
                                        quantity: p.quantity + 1,
                                        available: "",
                                      }
                                  : p
                              )
                            );

                            if (product.quantity < product.product.stock) {
                              try {
                                await axios.post(
                                  `${api_url}/user/cart/updateitemquantity/${
                                    data._id
                                  }/${product.product._id}/${
                                    product.quantity + 1
                                  }`
                                );
                              } catch (error) {
                                console.error(error);
                              }
                            }
                          }}
                        >
                          +
                        </Button>
                      </Box>
                      <Typography
                        sx={{
                          color: "red",
                          minHeight: "25px",
                          mb: -4.5,
                          mt: 0.5,
                          ml: 0.5,
                        }}
                      >
                        {product.available}
                      </Typography>
                      {product.product.stock < product.quantity && (
                        <Typography
                          sx={{
                            color: "red",
                            minHeight: "25px",
                            mb: -4.5,
                            mt: 1,
                            ml: 0.5,
                          }}
                        >
                          Not available
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          mt: 1.5,
                          fontFamily: "cursive",
                          color: "yellow",
                        }}
                      >
                        ₹{`${product.product.price * product.quantity}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              width: "18%",
              height: "89vh",
              mt: "1vh",
              position: "sticky",
              top: "10vh",
              borderLeft: "1px solid white",
            }}
          >
            <Box
              sx={{
                borderBottom: "1px solid white",
                width: "25.65vw",
              }}
            >
              <Typography
                sx={{
                  ml: 3,
                  mb: 1.4,
                  mt: 0.25,
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                  width: "300px",
                }}
              >
                SUMMARY
              </Typography>
            </Box>

            {products.forEach((product, index) => {
              Price += product.product.price * product.quantity;
              Index += index;
              console.log(product);
            })}
            <Box
              sx={{
                minWidth: 350,
                mt: 2,
                ml: 3,
              }}
            >
              <Typography
                sx={{ fontFamily: "cursive", fontWeight: "bold", fontSize: 23 }}
              >
                Total Items :<span style={{ color: "orange" }}> {Index}</span>
                <br />
                <br />
                Delivery : Free
                <br />
                <br />
                Payment : Cash On Delivery
                <br />
                <br />
                Tax Payable :<span style={{ color: "orange" }}> ₹0</span>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                &nbsp;Estimated Total :
                <span style={{ color: "darkorange" }}> ₹{Price}</span>
                <br />
                {checkout ? (
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      ml: 1,
                      fontSize: "20px",
                      padding: "15px 30px",
                      minWidth: "350px",
                      backgroundColor: "orangered",
                    }}
                    onClick={async () => {
                      setSeverity("success");
                      setMessage(`${Index} items Ordered`);
                      setOpen(true);
                      try {
                        for (const product of products) {
                          await axios.post(
                            `${api_url}/product/buy/${data._id}/${product.product._id}/${product.quantity}`
                          );
                        }

                        for (const product of products) {
                          await axios.delete(
                            `${api_url}/user/cart/delitem/${data._id}/${product.product._id}`
                          );
                        }

                        window.location.reload(true);

                        setSeverity("success");
                        setMessage(`${Index} items Ordered`);
                        setOpen(true);
                        console.log("Order confirmed");
                      } catch (error) {
                        console.error("Error ordering product:", error);
                      }
                    }}
                  >
                    CheckOut
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      ml: 1,
                      fontSize: "20px",
                      padding: "15px 30px",
                      minWidth: "350px",
                      backgroundColor: "gray",
                      cursor: "not-allowed",
                    }}
                  >
                    CheckOut
                  </Button>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default MyCart;
