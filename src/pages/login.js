import React from "react";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from 'sweetalert2'


const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
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
         Swal.fire({
          title: "Success",
          text: "Login Successful",
          icon: "success"
        });
      
      } else {
         Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.message,

        });
       
      }
    } catch (err) {
       Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message || "Something went wrong",

        });
     
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 4s ease-in-out infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 4s ease-in-out infinite 2s",
        },
        "@keyframes pulse": {
          "0%, 100%": {
            opacity: 0.5,
            transform: "scale(1)",
          },
          "50%": {
            opacity: 0.8,
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            padding: 5,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "24px",
            position: "relative",
            zIndex: 1,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          {/* Logo/Icon */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 3rem",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </Box>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "#666",
              mb: 4,
            }}
          >
            Sign in to continue to your account
          </Typography>

          <Box
            component="div"
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={!(username && password)}
              onClick={loginHandler}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "12px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                },
                "&:disabled": {
                  background: "rgba(0, 0, 0, 0.12)",
                  color: "rgba(0, 0, 0, 0.26)",
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/signup")}
              sx={{
                borderColor: "#667eea",
                color: "#667eea",
                padding: "12px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "12px",
                borderWidth: "2px",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#764ba2",
                  color: "#764ba2",
                  background: "rgba(102, 126, 234, 0.05)",
                  borderWidth: "2px",
                },
              }}
            >
              Go to Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;