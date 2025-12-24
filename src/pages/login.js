import React from "react";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        username: username,
        password: password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", "sampletoken");
        navigate("/");
        alert("Login Successful");
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

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
          Login
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!(username && password)}
            onClick={loginHandler}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/signup")}
          >
            Go to Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
