import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // example: remove token/session
    localStorage.removeItem("token"); 
    navigate("/login"); // redirect to login after logout
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>

       
      </Box>
    </Box>
  );
};

export default HomePage;
