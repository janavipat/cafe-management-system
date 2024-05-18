"use client"
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid, Alert,Divider } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccess('');
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/forgot', { email });
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setSuccess('');
    }
  };
  const handleBackToLogin = () => {
    router.push("/login")
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <img src="../../assets/img/forgot.jpg" alt="Forgot Password" style={{ width: '800px', height: '600px', marginTop:"100px", marginLeft:"-40px" }} />
        </Grid>
        <div style={{ width: '1px', backgroundColor: 'black', height: '500px', margin: '0 50px', marginLeft:"80px" }}></div>
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft:"100px", width:"400px" }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{color:"orange"}}>
              Forgot Password
            </Typography>
            <Typography variant="body1" paragraph sx={{fontWeight:"700"}}>
              Enter your email and we will send you a link to reset your password.
            </Typography>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!!error}
              helperText={error || ' '}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!validateEmail(email)}
            >
              Send
            </Button>
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Button
                  variant="text"
                  color="secondary"
                  onClick={handleBackToLogin}
                  sx={{ mt: 2 }}
                >
                  <img src="../../assets/img/back.svg" alt="Back to Login" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                  <span style={{color:"orange", fontWeight:"700", fontSize:"15px"}}>Back to Login</span>
                </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
