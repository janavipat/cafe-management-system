"use client";
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid, Alert, Divider } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import { useRouter } from 'next/navigation';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("New password and confirmation password do not match.");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:5000/user/changepassword",
                { oldPassword, newPassword, confirmPassword },
                { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } } // Assuming you have a stored access token
            );
            setSuccess(response.data.message);
            setError('');
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password changed successfully'
            });
        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong. Please try again.');
            setSuccess('');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.error || 'Something went wrong. Please try again.'
            });
        }
    };

    const handleBackToLogin = () => {
        router.push("/login");
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={5}>
                    <img src={"https://cdni.iconscout.com/illustration/premium/thumb/password-recovery-9065842-7343064.png?f=webp"} alt="Change Password" style={{ width: '800px', height: '600px', marginTop: "100px", marginLeft: "-40px" }} />
                </Grid>
                <div style={{ width: '1px', backgroundColor: 'black', height: '500px', margin: '0 50px', marginLeft: "80px", marginTop:"60px" }}></div>
                <Grid item xs={12} md={5}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "100px", width: "400px", marginTop:"100px" }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "orange" }}>
                            Change Password
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontWeight: "700" }}>
                            Please enter your current password and your new password.
                        </Typography>
                        <TextField
                            label="Old Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={oldPassword}
                            onChange={(event) => setOldPassword(event.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            sx={{ mb: 2 }}
                        />
                       
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{color:"white", backgroundColor:"orange", marginTop:"30px"}}
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </Button>
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
                        <Button
                            variant="text"
                            color="secondary"
                            onClick={handleBackToLogin}
                            sx={{ mt: 2 }}
                        >
                            <img src="../../assets/img/back.svg" alt="Back to Login" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                            <span style={{ color: "orange", fontWeight: "700", fontSize: "15px" }}>Back to Login</span>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ChangePassword;
