 import React from 'react'
 import {
    Typography,
    Avatar,
    Grid,
    Box

 } from "@material-ui/core";
 import FirstPic from "../Pictures/image1.jpg";
 import Typed from "react-typed";

 const HeaderFixed = () => {
     return (
         <Box>
             {/* <Avatar src={FirstPic} alt="Header"/> */}
             <Typography variant="h4">
                 <Typed strings={["UBC Explorer"]} typeSpeed={40} /> 
             </Typography>
         </Box>
     );
 };

  
 export default HeaderFixed
 