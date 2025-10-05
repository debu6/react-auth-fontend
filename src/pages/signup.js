import React from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
        const [username,setUsername]=React.useState("");
        const [password,setPassword]=React.useState("");
        const navigate = useNavigate();

        const signupHandler=async(e)=>{
            e.preventDefault();
            try{
                const res=await axios.post("https://debu-backend.onrender.com/signup",{
                    username:username,
                    password:password
                }); 
                if(res.status===201){
                    alert("Signup Successful");
                    navigate("/login");
                }   else {  
                    alert(res.message);
                    
                }
            }catch(err){
              alert(err.response.data.message);
                console.log(err);
            }
        }
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            onChange={(e)=>setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth disabled={!(username && password)} onClick={signupHandler}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
