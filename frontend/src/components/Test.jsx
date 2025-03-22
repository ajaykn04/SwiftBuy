import React from "react";
import { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Test = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <IconButton color="error">
      {isWishlisted ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default Test;
