'use client';
import React, { useState } from 'react';
import { Box, Button, CssBaseline, Typography, Container, Paper, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function LoginPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Set primary color to black
      },
    },
  });

  // State to manage form inputs and states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track if the user is registering or logging in
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // API Request to register or login
    const res = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, isRegistering }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message); // Handle success
      // Redirect after successful login or registration
      window.location.href = '/home';
    } else {
      setError(data.error); // Handle errors
    }
  };

  // Handle browsing as guest
  const handleBrowseAsGuest = () => {
    window.location.href = '/home'; // Redirect to home page without login
  };

  // Toggle between Login and Register forms
  const toggleForm = () => {
    setIsRegistering((prevState) => !prevState);
    setError(null); // Reset error when toggling
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#000000', // Set header background color to black
            width: '100%',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="white">
            Welcome to FeelFlow
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(/images/start.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            padding: '20px',
          }}
        >
          <Container component="main" maxWidth="xs">
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                backgroundColor: '#000000',
                textAlign: 'center',
                color: 'white',
                opacity: 0.9,
              }}
            >
              <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                FeelFlow is your go-to platform for discovering music that matches your mood.
                Explore playlists created just for you, and find the perfect soundtrack for your day. Let the music flow!
              </Typography>
              <Typography component="h1" variant="h5" align="center">
                {isRegistering ? 'Register Your Account' : 'Login to Explore'}
              </Typography>

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                {isRegistering && (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                )}
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                {message && <Typography color="primary" variant="body2">{message}</Typography>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isRegistering ? 'Register' : 'Login'}
                </Button>
              </Box>

              {/* Toggle between Login and Register */}
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={toggleForm}
              >
                {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
              </Button>

              {/* Browse as guest */}
              <Button
                fullWidth
                variant="text"
                sx={{ mt: 2 }}
                onClick={handleBrowseAsGuest}
              >
                Browse as Guest
              </Button>
            </Paper>
          </Container>
        </Box>

        <Box
          sx={{
            backgroundColor: '#000000', // Set footer background color to black
            width: '100%',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" color="white">
            © 2024 All rights reserved.
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
}
