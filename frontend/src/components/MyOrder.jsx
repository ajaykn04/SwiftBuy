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
            No current orders☹️
          </Typography>
        </center>
      ) : (
        <List sx={{ marginTop: "7.2vh" }}>
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
                    sx={{ mt: 1, fontFamily: "cursive", color: "yellow" }}
                  >
                    ₹{order.amount}
                  </Typography>
                  <Typography sx={{ mt: -3, ml: 12, fontFamily: "cursive" }}>
                    Quantity : {order.quantity}
                  </Typography>
                  <Typography sx={{ mt: 0.5, ml: 0, fontFamily: "cursive" }}>
                    Place At : {order.placedAt.split("T")[0]}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.9,
                      ml: 0,
                      fontFamily: "cursive",
                      color: "orange",
                    }}
                  >
                    Status : {order.status}
                  </Typography>
                </Box>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyOrder;
