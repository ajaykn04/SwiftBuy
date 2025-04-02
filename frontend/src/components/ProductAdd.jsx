import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../styles";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    keywords: "",
    price: "",
    category: "",
    image: "",
    stock: 0,
  });
  const api_url = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const apiUrl = `${api_url}/misc/categories/get`;
    axios
      .get(apiUrl)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
    // }
  }, []);
  const toeditproduct = useLocation();
  useEffect(() => {
    if (toeditproduct.state != null) {
      setProduct({
        ...product,
        name: toeditproduct.state.value.name,
        description: toeditproduct.state.value.description,
        keywords: toeditproduct.state.value.keywords,
        category: toeditproduct.state.value.category,
        image: toeditproduct.state.value.image,
        price: toeditproduct.state.value.price,
        stock: toeditproduct.state.value.stock,
      });
    }
  }, []);

  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("userData"));

  const [image, setImage] = useState();
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    keywords: false,
    category: false,
    price: false,
    image: false,
    stock: false,
  });
  const [generalError, setGeneralError] = useState("");

  const inputHandler = (e) => {
    if (e.target.type === "file") {
      setImage(e.target.files[0]);
      setProduct({ ...product, image: e.target.files[0].name });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      name: product.name === "",
      description: product.description === "",
      keywords: product.keywords === "",
      category: product.category === "",
      price: product.price === "",
      image: !image,
      stock: null,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const submitHandler = async () => {
    if (validateFields()) {
      const formData = new FormData();
      if (toeditproduct.state != null) {
        try {
          formData.append("file", image);
          for (const key in product) {
            formData.append(key, product[key]);
          }
          formData.append("_id", toeditproduct.state.value._id);
          await axios.put(`${api_url}/product/edit/`, formData);
          navigate("/merchant/products");
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          formData.append("file", image);
          for (const key in product) {
            formData.append(key, product[key]);
          }
          formData.append("merchant_id", data._id);
          formData.append("merchant_name", data.username);

          await axios.post(`${api_url}/product/add/`, formData);
          navigate("/merchant/products");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          mt: 13.7,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box sx={styles.box_style}>
          {/* <img
            src="/logo1.png"
            alt="Login Icon"
            style={{
              width: "100px",
              marginBottom: "-.5rem",
              marginTop: "-2.5rem",
            }}
          /> */}
          <Typography
            fontFamily={"fantasy"}
            variant="h4"
            color="white"
            mb={2}
            mt={-2}
            // gutterBottom
          >
            ADD PRODUCT
          </Typography>
          <TextField
            required
            style={{ marginTop: -7 }}
            fullWidth
            name="name"
            value={product.name}
            label="Name"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3 }}
            fullWidth
            multiline
            rows={4}
            name="description"
            value={product.description}
            label="Description"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.description}
            helperText={
              errors.description ? "Description are required" : generalError
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3, marginBottom: 18 }}
            fullWidth
            multiline
            rows={4}
            name="keywords"
            value={product.keywords}
            label="Keywords"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.keywords}
            helperText={errors.keywords ? "Keywords are required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />

          <TextField
            required
            style={{ marginTop: -7 }}
            fullWidth
            name="price"
            type="number"
            value={product.price}
            label="price"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.price}
            helperText={errors.price ? "Price is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />

          <FormControl
            style={{ marginTop: 3 }}
            variant="outlined"
            required
            fullWidth
            error={errors.category}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.category ? "red" : "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: product.category ? "orange" : "orange",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.category ? "orange" : "orange",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.category ? "white" : "white",
              },
              "&:hover .MuiInputLabel-root": {
                color: errors.category
                  ? "white"
                  : product.category
                  ? "orange"
                  : "white",
              },
            }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              style={{ color: "white", textAlign: "left" }}
              label="Category"
              name="category"
              value={product.category}
              onChange={inputHandler}
              MenuProps={{
                PaperProps: {
                  style: {
                    textAlign: "left",
                  },
                },
              }}
              sx={{
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              {categories.map((category, index) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </Select>
            {errors.category && (
              <FormHelperText sx={{ color: "red" }}>
                Category is required
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            style={{ marginTop: 10 }}
            required
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.stock}
            helperText={errors.stock ? "Stock is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />

          <TextField
            style={{ marginTop: 10 }}
            required
            fullWidth
            name="image"
            type="file"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.image}
            helperText={errors.image ? "Image is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <Button
            variant="contained"
            sx={{
              mt: 0.4,
              mb: -2.5,
              backgroundColor: "orange",
              "&:hover": { backgroundColor: "orange" },
            }}
            onClick={submitHandler}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ProductAdd;
