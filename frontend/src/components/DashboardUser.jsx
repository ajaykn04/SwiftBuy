import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import Navbar from "./Navbar";

const DashboardUser = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [loading, setLoading] = useState(true);  uncommend this to use this function...and mod other neccesseries...(check all commendeds)
  const [loading, setLoading] = useState(false);
  const api_key=import.meta.env.VITE_API_KEY;

  // setLoading(false);

  const handleSlideChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      {loading ? (
        <center>Loading...</center>
      ) : (
        "THIS IS USER DASHBOARD"

        //   <Carousel
        //     autoPlay
        //     interval={2500}
        //     infiniteLoop
        //     showThumbs={false}
        //     showStatus={false}
        //     stopOnHover={false}
        //     showIndicators={true}
        //     swipeable={true}
        //     centerMode={true}
        //     centerSlidePercentage={36.5}
        //     selectedItem={selectedIndex}
        //     onChange={handleSlideChange}
        //   >
        //     {products.map((product, index) => (
        //       <div
        //         key={index}
        //         style={{
        //           padding: "50px",
        //           transform: index === selectedIndex ? "scale(1.1)" : "scale(.9)",
        //           transition: "transform 0.5s ease-in-out",
        //         }}
        //       >
        //         <Grid
        //           item
        //           xs={12}
        //           sm={15}
        //           md={4}
        //           lg={2.3}
        //           sx={{ mt: -4, ml: 1.1 }}
        //         >
        //           <Paper
        //             elevation={3}
        //             sx={{
        //               padding: 1,
        //               backgroundColor: "currentcolor",
        //               display: "flex",
        //               flexDirection: "column",
        //               justifyContent: "space-between",
        //             }}
        //           >
        //             <Container
        //               style={{
        //                 backgroundColor: "currentcolor",
        //                 flex: 1,
        //                 display: "flex",
        //                 flexDirection: "column",
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //               }}
        //             >
        //               <Box
        //                 sx={{
        //                   backgroundColor: "black",
        //                   height: "40vh",
        //                   borderRadius: "2.5vw",
        //                   width: "35vw",
        //                   boxShadow: "4px 4px 4px rgb(47, 37, 25)",
        //                   display: "flex",
        //                   alignItems: "center",
        //                   justifyContent: "center",
        //                   overflow: "hidden",
        //                 }}
        //               >
        //                 <Box
        //                   className="carousel-item"
        //                   sx={{
        //                     height: "100%",
        //                     width: "100%",
        //                     display: "flex",
        //                     alignItems: "center",
        //                     justifyContent: "center",
        //                   }}
        //                 >
        //                   <Button
        //                     onClick={() => {

        //                     }}
        //                     variant="outlined"
        //                     style={{
        //                       padding: 0,
        //                       border: "none",
        //                       background: "transparent",
        //                       color: "black",
        //                     }}
        //                   >
        //                     <img
        //                       src={`${api_key}/${product.image}`}
        //                       style={{
        //                         height: "auto",
        //                         width: "100%",
        //                         objectFit: "cover",
        //                       }}
        //                     />
        //                   </Button>
        //                 </Box>
        //               </Box>
        //             </Container>
        //           </Paper>
        //         </Grid>
        //       </div>
        //     ))}
        //   </Carousel>
      )}
    </div>
  );
};

export default DashboardUser;
