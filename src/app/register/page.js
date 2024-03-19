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
import { green } from '@mui/material/colors';

// Define the Register component
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
        // Redirect to the login page upon successful registration
        window.location.href = '/login'; // Adjust the path as needed
      } else {
        console.error('Error during registration:', res.status, await res.text());
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: '#333',
              width: '100%',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <Typography variant="h4" color="primary">
              User Registration
            </Typography>
          </Box>

          {/* Form */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            User Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            {/* Footer */}
            <Box
              sx={{
                backgroundColor: '#333',
                width: '100%',
                padding: '20px',
                textAlign: 'center',
                marginTop: '20px',
              }}
            >
              <Typography variant="body1" color="primary">
                © 2024 All rights reserved.
              </Typography>
            </Box>

            {/* Links */}
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}