'use client';
import React, { useState } from 'react';
import { Box, Button, CssBaseline, Typography, Container, Paper, TextField } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

export default function LoginPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Set primary color to black
      },
    },
  });

  const themeContext = useTheme();
  const isDark = themeContext.palette.mode === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setTimeout(() => {
      setMessage(isRegistering ? 'Registered successfully!' : 'Logged in successfully!');
      localStorage.setItem('feelflow-user', JSON.stringify({ email }));
      window.location.href = '/home';
    }, 500);
  };

  const handleBrowseAsGuest = () => {
    window.location.href = '/home';
  };

  const toggleForm = () => {
    setIsRegistering((prevState) => !prevState);
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#000000',
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
                  sx={{
                    mb: 2,
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff',
                      },
                    },
                    input: { color: '#000000' },
                  }}
                  InputLabelProps={{
                    style: { color: '#000000' },
                  }}
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
                  sx={{
                    mb: 2,
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff',
                      },
                    },
                    input: { color: '#000000' },
                  }}
                  InputLabelProps={{
                    style: { color: '#000000' },
                  }}
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
                    sx={{
                      mb: 2,
                      backgroundColor: 'white',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ffffff',
                        },
                        '&:hover fieldset': {
                          borderColor: '#ffffff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ffffff',
                        },
                      },
                      input: { color: '#000000' },
                    }}
                    InputLabelProps={{
                      style: { color: '#000000' },
                    }}
                  />
                )}
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                {message && <Typography color="primary" variant="body2">{message}</Typography>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  {isRegistering ? 'Register' : 'Login'}
                </Button>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: '#333',
                    borderColor: 'white',
                  },
                }}
                onClick={toggleForm}
              >
                {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
              </Button>

              <Button
                fullWidth
                variant="text"
                sx={{
                  mt: 2,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
                onClick={handleBrowseAsGuest}
              >
                Browse as Guest
              </Button>
            </Paper>
          </Container>
        </Box>

        <Box
          sx={{
            backgroundColor: '#000000',
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
