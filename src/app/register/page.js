'use client';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { email, password };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        console.log('User Registered');
        window.location.href = '/login';
      } else {
        console.error('Error during registration:', res.status, await res.text());
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[50], // Background color
      },
      secondary: {
        main: green[500], // Button color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh', // Ensure the container fills the viewport height
          backgroundColor: '#E4C59E', // Background color
          padding: '20px', // Padding
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: '#AF8260', // Header background color
            padding: '20px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h4" color="primary" sx={{ color: '#000000' }}>
            User Registration
          </Typography>
        </Box>

        {/* Main Content */}
        <Container component="main" maxWidth="xs">
          <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          {/* Logo */}
          <img src="/logo/logo.jpg" alt="Logo of Something" style={{ height: '55px' }} />
          </Box>
          <Typography component="h1" variant="h5" align="center">
              User Registration
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#0000FF', color: '#FFFFFF' }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Links */}
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2" sx={{ color: '#0000FF' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: '#000000', // Footer background color
            padding: '20px',
            textAlign: 'center',
            marginTop: 'auto', // Push the footer to the bottom
          }}
        >
          <Typography variant="body1" color="primary">
            © 2024 All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
