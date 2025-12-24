import { useState, useEffect } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, CircularProgress, Card, CardContent,
    Container, Grid, Chip, AppBar, Toolbar, IconButton, Avatar
} from "@mui/material";
import {
    Payment as PaymentIcon,
    Logout as LogoutIcon,
    AccountBalance as AccountBalanceIcon,
    TrendingUp as TrendingUpIcon,
    Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { BASE_URL } from "../config";

const PaymentDetails = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [paymentsLoading, setPaymentsLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/payments`);
                setPayments(response.data);
            } catch (error) {
                console.error("Error fetching payments:", error);
                alert("Failed to fetch payments");
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

    const totalAmount = payments.reduce((sum, payment) => sum + (payment.net_amount || payment.amount), 0);
    const totalTransactions = payments.length;

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            pb: 4
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

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)'
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                            Total Amount
                                        </Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            ₹{totalAmount}
                                        </Typography>
                                    </Box>
                                    <TrendingUpIcon sx={{ fontSize: 48, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(250, 112, 154, 0.3)'
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                            Total Transactions
                                        </Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            {totalTransactions}
                                        </Typography>
                                    </Box>
                                    <ReceiptIcon sx={{ fontSize: 48, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Card sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <ReceiptIcon sx={{ mr: 1 }} />
                            Payment History
                        </Typography>

                        {paymentsLoading ? (
                            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                                <CircularProgress size={60} sx={{ color: '#667eea' }} />
                            </Box>
                        ) : payments.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <PaymentIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    No payments found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Make your first payment to see transaction history
                                </Typography>
                            </Box>
                        ) : (
                            <TableContainer sx={{ borderRadius: 2, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f8f9ff' }}>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#667eea' }}>Order ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#667eea' }}>Payment ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#667eea' }}>Amount</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#667eea' }}>Refund Amount</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#667eea' }}>Net Amount</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#667eea' }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#667eea' }}>Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {payments.map((payment, index) => (
                                            <TableRow
                                                key={payment._id}
                                                sx={{
                                                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                                    '&:hover': { backgroundColor: '#f0f4ff' },
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                            >
                                                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                                    {payment.order_id}
                                                </TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                                    {payment.payment_id}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                                    ₹{payment.amount}
                                                </TableCell>
                                                <TableCell sx={{ color: payment.refund_amount > 0 ? '#f57c00' : '#999' }}>
                                                    ₹{payment.refund_amount || 0}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                                    ₹{payment.net_amount || payment.amount}
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                        <Chip
                                                            label={payment.status?.toUpperCase()}
                                                            color={payment.status === 'paid' ? 'success' : 'warning'}
                                                            size="small"
                                                            sx={{ fontWeight: 'bold' }}
                                                        />
                                                        {payment.refund_status && (
                                                            <Chip
                                                                label={`Refund: ${payment.refund_status.toUpperCase()}`}
                                                                color={payment.refund_status === 'processed' ? 'success' :
                                                                    payment.refund_status === 'failed' ? 'error' : 'warning'}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ color: '#666' }}>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                            {new Date(payment.createdAt).toLocaleDateString('en-IN')}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {new Date(payment.createdAt).toLocaleTimeString('en-IN')}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </CardContent>
                </Card>
            </Container>

        </Box>
    )
}

export default PaymentDetails