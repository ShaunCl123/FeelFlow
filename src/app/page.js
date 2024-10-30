'use client';
import React from 'react';
import { Box, Button, CssBaseline, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function LoginPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Set primary color to black
      },
      background: {
        default: '#1DB954', // Set background color to green
      },
    },
  });

  // Redirect to home page when the user clicks the button
  const handleRedirect = () => {
    window.location.href = '/home';
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1, // Allow this box to grow and push footer down
          }}
        >
          <Container component="main" maxWidth="xs">
            <Typography variant="body1" align="center" color="white" sx={{ mb: 2 }}>
              FeelFlow is your go-to platform for discovering music that matches your mood. 
              Explore playlists created just for you, and find the perfect soundtrack for 
              your day. Let the music flow!
            </Typography>
            <Typography component="h1" variant="h5" align="center" color="white">
              Explore Your Music
            </Typography>
            <Box component="div" sx={{ mt: 1, textAlign: 'center' }}>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
                onClick={handleRedirect}
              >
                Go to Home
              </Button>
            </Box>
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
