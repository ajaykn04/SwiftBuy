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

const MyOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [test, setTest] = useState(true);
  const searchvalue = useLocation();
  const api_url = import.meta.env.VITE_API_URL;
  const data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const apiUrl = `${api_url}/user/orders/${data._id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setOrders(response.data);
        setEmpty(response.data.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          loading
        </center>
      ) : empty ? (
        <center>
          <Typography style={{ fontSize: 17, marginTop: "50vh" }}>
            No current orders
          </Typography>
        </center>
      ) : (
        <List sx={{ marginTop: "10vh" }}>
          {orders.map((order, index) => (
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
                    "&:hover .ordername": {
                      color: "darkorange",
                    },
                  }}
                  style={{ color: "orange" }}
                  onClick={() => {
                    const a={_id:order.product}
                    navigate("/detproduct", { state: a });
                  }}
                >
                  <Box>
                    <img
                      src={`${api_url}/${order.image}`}
                      alt={order.name}
                      style={{
                        width: 150,
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 8, ml: 6 }}>
                    <Typography
                      className="ordername"
                      sx={{
                        fontFamily: "fantasy",
                        color: "white",
                        fontSize: 32,
                        mt: -10,
                      }}
                    >
                      {order.name}
                    </Typography>

                    <Typography
                      sx={{ mt: 1.5, fontFamily: "cursive", color: "yellow" }}
                    >
                      ₹{order.amount}
                    </Typography>
                  </Box>
                </Button>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyOrder;
