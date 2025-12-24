import React, { useState, useEffect } from "react";
import {
  Button, Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress, Card, CardContent,
  Container, Grid, Chip, AppBar, Toolbar, IconButton, Avatar
} from "@mui/material";
import {
  CardMedia
} from "@mui/material";
import {
  Logout as LogoutIcon,
  AccountBalance as AccountBalanceIcon,

} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import Swal from 'sweetalert2'


const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [clickedItem, setClickedItem] = useState(null)

  const products = [
    { id: 1, name: "Smartphone", price: 14999, image: "https://picsum.photos/id/180/400/400" },
    { id: 2, name: "Running Shoes", price: 2999, image: "https://picsum.photos/id/21/400/400" },
    { id: 3, name: "Smart Watch", price: 1999, image: "https://picsum.photos/id/1062/400/400" },
    { id: 4, name: "Bluetooth Headphones", price: 1599, image: "https://picsum.photos/id/1080/400/400" },
    { id: 5, name: "Laptop Backpack", price: 1299, image: "https://picsum.photos/id/1060/400/400" },
    { id: 6, name: "Wireless Mouse", price: 499, image: "https://picsum.photos/id/1063/400/400" },
    { id: 7, name: "Mechanical Keyboard", price: 2499, image: "https://picsum.photos/id/1/400/400" },
    { id: 8, name: "Power Bank", price: 999, image: "https://picsum.photos/id/82/400/400" },
    { id: 9, name: "USB Type-C Cable", price: 299, image: "https://picsum.photos/id/1069/400/400" },
    { id: 10, name: "Tablet", price: 18999, image: "https://picsum.photos/id/180/400/400" },

    { id: 11, name: "Casual Sneakers", price: 2799, image: "https://picsum.photos/id/21/400/400" },
    { id: 12, name: "Men’s Wrist Watch", price: 2499, image: "https://picsum.photos/id/1062/400/400" },
    { id: 13, name: "Sunglasses", price: 899, image: "https://picsum.photos/id/1084/400/400" },
    { id: 14, name: "Formal Shirt", price: 1199, image: "https://picsum.photos/id/1005/400/400" },
    { id: 15, name: "Jeans", price: 1799, image: "https://picsum.photos/id/1076/400/400" },
    { id: 16, name: "Travel Trolley Bag", price: 4999, image: "https://picsum.photos/id/1044/400/400" },
    { id: 17, name: "Office Chair", price: 6499, image: "https://picsum.photos/id/1027/400/400" },
    { id: 18, name: "Study Table", price: 3999, image: "https://picsum.photos/id/1061/400/400" },
    { id: 19, name: "LED Desk Lamp", price: 799, image: "https://picsum.photos/id/1080/400/400" },
    { id: 20, name: "Water Bottle", price: 399, image: "https://picsum.photos/id/1084/400/400" },

    { id: 21, name: "Mixer Grinder", price: 3499, image: "https://picsum.photos/id/1011/400/400" },
    { id: 22, name: "Electric Kettle", price: 1299, image: "https://picsum.photos/id/1018/400/400" },
    { id: 23, name: "Induction Cooktop", price: 2999, image: "https://picsum.photos/id/83/400/400" },
    { id: 24, name: "Air Fryer", price: 5999, image: "https://picsum.photos/id/1044/400/400" },
    { id: 25, name: "Coffee Mug", price: 249, image: "https://picsum.photos/id/1080/400/400" },
    { id: 26, name: "Bedsheet Set", price: 1599, image: "https://picsum.photos/id/1060/400/400" },
    { id: 27, name: "Wall Clock", price: 999, image: "https://picsum.photos/id/1011/400/400" },
    { id: 28, name: "Room Heater", price: 2199, image: "https://picsum.photos/id/1016/400/400" },
    { id: 29, name: "Yoga Mat", price: 699, image: "https://picsum.photos/id/1084/400/400" },
    { id: 30, name: "Dumbbell Set", price: 2499, image: "https://picsum.photos/id/109/400/400" },
  ];




  // Load Razorpay checkout script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);

    document.body.appendChild(script);
  }, []);

  // Fetch payments data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/payments`);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
        
      } finally {
        setPaymentsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePayment = async (id, price) => {
    setClickedItem(id)
    if (!razorpayLoaded) {

      return;
    }

    try {
      setLoading(true);


      const { data } = await axios.post(`${BASE_URL}/create-order`, {
        amount: price * 100,
      });

      const options = {
        key: "rzp_test_RSczNtmNcTxWr0",
        amount: data.amount,
        currency: "INR",
        name: "My App",
        description: "Test Transaction",
        order_id: data.id,
        handler: async function (response) {

          try {
            await axios.post(`${BASE_URL}/verify-payment`, {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            Swal.fire({
              title: "Success",
              text: "Payment Successful!",
              icon: "success"
            });

            const paymentsResponse = await axios.get(`${BASE_URL}/payments`);
            setPayments(paymentsResponse.data);
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Payment verification failed!",

            });

          }
        },
        theme: { color: "#1976d2" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error && response.error.reason,

        });

      });

      rzp.open();
      setLoading(false);
    } catch (err) {
   
      console.error(err);
    
      setLoading(false);
    }
  };


  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',

    }}>

      <AppBar position="static" sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <Toolbar>
          <AccountBalanceIcon sx={{ mr: 2, color: 'white' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Payment Dashboard
          </Typography>
          <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
            U
          </Avatar>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }} >


        <Container sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#FFFFFF' }}>
              Product Listing
            </Typography>
            <Button variant="outlined" size="small" sx={{
              border: '1px solid white',
              color: "White",
              "&:hover": {
                color: 'blue',
                backgroundColor: "#f0f0f0",
              },
            }} onClick={() => {
              navigate("/payments");
            }}>
              Payments history
            </Button>


          </Box>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  display: "flex",
                }}
              >
                <Card
                  sx={{
                    width: '200px',
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      width: '185px',
                      height: 180,        // 👈 fixed height
                      objectFit: "contain",
                      p: 1,
                    }}
                  />

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      noWrap
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      ₹{product.price}
                    </Typography>
                  </CardContent>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      m: 2,
                      mt: 0,
                      width: "calc(100% - 32px)",
                    }}
                    loading={loading && (product.id == clickedItem)}
                    onClick={() => { handlePayment(product.id, product?.price) }}
                  >
                    Buy
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>


        </Container>


      </Container>
    </Box>
  );
};

export default HomePage;
