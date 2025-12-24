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

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        username: username,
        password: password
      });
      if (res.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Signup Successful",
          icon: "success"
        });

        navigate("/login");
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
          text:err.response?.data?.message || "Something went wrong",

        });
    
      console.log(err);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "15%",
          right: "15%",
          width: "350px",
          height: "350px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          filter: "blur(90px)",
          animation: "float 6s ease-in-out infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "15%",
          left: "15%",
          width: "450px",
          height: "450px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          filter: "blur(90px)",
          animation: "float 6s ease-in-out infinite 3s",
        },
        "@keyframes float": {
          "0%, 100%": {
            opacity: 0.4,
            transform: "scale(1) translateY(0)",
          },
          "50%": {
            opacity: 0.7,
            transform: "scale(1.15) translateY(-20px)",
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
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 3rem",
              boxShadow: "0 10px 30px rgba(245, 87, 108, 0.4)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
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
            Create Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "#666",
              mb: 4,
            }}
          >
            Sign up to get started
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
                    borderColor: "#f5576c",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f5576c",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#f5576c",
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#f5576c",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f5576c",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#f5576c",
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
              color="primary"
              type="submit"
              fullWidth
              disabled={!(username && password)}
              onClick={signupHandler}
              sx={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                padding: "12px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(245, 87, 108, 0.6)",
                },
                "&:disabled": {
                  background: "rgba(0, 0, 0, 0.12)",
                  color: "rgba(0, 0, 0, 0.26)",
                },
              }}
            >
              Sign Up
            </Button>

            <Box
              sx={{
                textAlign: "center",
                mt: 2,
                pt: 2,
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="body2" sx={{ color: "#666" }}>
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#f5576c",
                    fontWeight: 600,
                    textTransform: "none",
                    padding: 0,
                    minWidth: "auto",
                    textDecoration: "underline",
                    "&:hover": {
                      background: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;