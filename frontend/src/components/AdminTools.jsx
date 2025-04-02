import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { Box, IconButton, TextField, MenuItem, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const AdminTools = () => {
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
  const [inputValue, setInputValue] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = categories.filter((category) =>
      category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = (event) => {
    if (!dropdownRef.current.contains(event.relatedTarget)) {
      setShowDropdown(false);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* category Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            padding: 3,
            border: "2px solid gray",
            borderRadius: "12px",
            backgroundColor: "#f8f9fa",
            width: 780,
            height: 25,
          }}
        >
          <IconButton
            onClick={async () => {
              try {
                await axios.post(
                  `${api_url}/misc/categories/add/${inputValue}`
                );
                window.location.reload(true);
              } catch (error) {
                console.error(error);
              }
            }}
            sx={{
              mt: -1,
              backgroundColor: "orange",
              width: 40,
              height: 40,
              borderRadius: 1,
              "&:hover": { backgroundColor: "#ff9800" },
            }}
          >
            <AddIcon />
          </IconButton>

          {/* Wrapper for TextField & Dropdown */}
          <Box sx={{ position: "relative", width: "100%" }} ref={dropdownRef}>
            <TextField
              variant="outlined"
              label="Enter category"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              fullWidth
              sx={{ mt: -1.5 }}
              InputProps={{
                sx: { height: 50 },
              }}
            />

            {/* Dropdown List */}
            {showDropdown && (
              <Box
                sx={{
                  position: "absolute",
                  top: "145%",
                  left: 0,
                  width: "100%",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                  zIndex: 10,
                  mt: "4px",
                  maxHeight: 200,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "white",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "gray",
                    borderRadius: "10px",
                  },
                }}
              >
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <div>
                      <MenuItem
                        style={{ color: "black" }}
                        key={index}
                        onClick={() => {
                          setInputValue(category);
                          setShowDropdown(false);
                        }}
                        sx={{ padding: "0px 12px", cursor: "pointer" }}
                      >
                        {category}
                        <IconButton
                          sx={{
                            ml: "auto",
                            mt: "auto",
                            color: "black",
                          }}
                          onClick={async () => {
                            try {
                              await axios.delete(
                                `${api_url}/misc/categories/delete/${category}`
                              );
                              window.location.reload(true);
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </MenuItem>
                    </div>
                  ))
                ) : (
                  <MenuItem
                    style={{ color: "black" }}
                    sx={{ padding: "8px 12px" }}
                  >
                    No results found
                  </MenuItem>
                )}
              </Box>
            )}
          </Box>
        </Box>
        <Box
              sx={{
                ml:7,
                mt:5,
                display: "flex",
                justifyContent: "flex-start",
                gap: "7rem",
                flex: 1,
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  navigate("/admin/users");
                }}
                style={{
                  marginLeft: -50,
                  marginRight: 25,
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "black",
                  backgroundColor:"darkorange",
                  minWidth:100,
                }}
              >
                <Typography
                  style={{
                    fontFamily: "fantasy",
                    fontSize: "20px",
                    color: "#472B00 ",
                  }}
                >
                  USERS
                </Typography>
              </Button>

              <Button
                variant="text"
                onClick={() => {
                  navigate("/admin/products");
                }}
                style={{
                  marginLeft: -25,
                  fontSize: "20px",
                  fontFamily: "fantasy",
                  color: "black",
                  backgroundColor:"darkorange"
                }}
              >
                <Typography
                  style={{
                    fontFamily: "fantasy",
                    fontSize: "20px",
                    color: "#472B00 ",
                  }}
                >
                  PRODUCTS
                </Typography>
              </Button>
            </Box>
      </Box>
    </div>
  );
};

export default AdminTools;
