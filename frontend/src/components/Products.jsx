import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import axios from "axios";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  var [featured, setFeatured] = useState([]);
  const [featuredlist, setFeaturedlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const api_url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${api_url}/product/viewall`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const apiUrl = `${api_url}/product/getfeatured`;
    axios
      .get(apiUrl)
      .then((response) => {
        setFeaturedlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFeatured(featuredlist.map((product) => product._id));
  }, [featuredlist]);

  return (
    <div>
      <Navbar />
      <TableContainer style={{ marginTop: "10vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                IMG
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                NAME
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
                OWNER
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                CATEGORY
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                FEATURED
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                  <Button
                    style={{
                      color: "black",
                      marginTop: -10,
                      marginBottom: -10,
                      marginLeft: -15,
                    }}
                    onClick={() => {
                      navigate("/detproduct", { state: product });
                    }}
                  >
                    <img
                      src={`${api_url}/${product.image}`}
                      alt={product.name}
                      style={{
                        width: "auto",
                        height: 65,
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                </TableCell>
                <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ fontFamily: "cursive", color: "yellow" }}>
                  ₹{product.price}
                </TableCell>
                <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                  {product.merchant_name}
                </TableCell>
                <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                  {product.category}
                </TableCell>
                <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                  <IconButton
                    sx={{ ml: 2.3, mt: 0 }}
                    onClick={async () => {
                      if (featured.includes(String(product._id))) {
                        try {
                          await axios.post(
                            `${api_url}/product/removefeatured/${product._id}`
                          );
                          setFeatured(
                            featured.filter((id) => id !== product._id)
                          );
                        } catch (error) {
                          console.error(
                            "Error deleting product from featured:",
                            error
                          );
                        }
                      } else {
                        try {
                          await axios.post(
                            `${api_url}/product/makefeatured/${product._id}`
                          );
                          setFeatured([...featured, product._id]);
                        } catch (error) {
                          console.error(
                            "Error adding product to featured:",
                            error
                          );
                        }
                      }
                    }}
                    color="warning"
                  >
                    {featured.includes(String(product._id)) ? (
                      <Star fontSize="large" />
                    ) : (
                      <StarBorder fontSize="large" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    onClick={async () => {
                      await axios.delete(
                        `${api_url}/product/delete/${product._id}`
                      );
                      window.location.reload(true);
                      console.log("Product Successfully Deleted");
                    }}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
