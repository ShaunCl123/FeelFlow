'use client';
import React from 'react';
import { Box, Button, CssBaseline, Typography, Container, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function LoginPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Set primary color to black
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
                opacity: 0.9 
              }}
            >
              <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                FeelFlow is your go-to platform for discovering music that matches your mood. 
                Explore playlists created just for you, and find the perfect soundtrack for 
                your day. Let the music flow!
              </Typography>
              <Typography component="h1" variant="h5" align="center">
                Explore Your Music
              </Typography>
              <Box component="div" sx={{ mt: 1 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  sx={{ mt: 3, mb: 2 }} 
                  onClick={handleRedirect}
                >
                  Go to Home
                </Button>
              </Box>
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
