import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { AppContext } from "../AppContext";
import NavbarMerchant from "./NavbarMerchant";
import NavbarAdmin from "./NavbarAdmin";
import NavbarDeliveryagent from "./NavbarDeliveryagent";
import Navbar from "./Navbar";

const SearchProduct = () => {
  const { data, setData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [empty, setEmpty] = useState(true);
  const searchvalue = useLocation();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setData(savedData);
    }
  }, [setData]);

  useEffect(() => {
    if (data._id) {
      console.log(searchvalue.state.query);
      const apiUrl = `http://localhost:3000/product/search/${searchvalue.state.query}`;
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
  }, [data, setData]);

  return (
    <div>
      {data.role === "admin" ? (
        <NavbarAdmin />
      ) : data.role === "merchant" ? (
        <NavbarMerchant />
      ) : data.role === "deliveryagent" ? (
        <NavbarDeliveryagent />
      ) : (
        <Navbar />
      )}
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
                    //navigate("/detproduct", { state: product });
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
                      src={`http://localhost:3000/${product.image}`}
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
                        mt: -3.4,
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
