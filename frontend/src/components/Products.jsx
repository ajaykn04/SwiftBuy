import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const Products = () => {

    const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/product/viewall"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <NavbarAdmin />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    <Button
                    style={{color:"black",marginTop:-10,marginBottom:-10,marginLeft:-15}}
                    onClick={()=>{
                      //navigate("/detproduct", { state: product })
                    }}
                    >
                      <img
                        src={`http://localhost:3000/${product.image}`}
                        alt={product.name}
                        style={{ width: "2vw", height: "6vh", cursor: "pointer" }}
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
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={async () => {
                        await axios.delete(
                          `http://localhost:3000/product/delete/${product._id}`
                        );
                        window.location.reload(true);
                        console.log("Product Successfully Deleted");
                      }}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Products
