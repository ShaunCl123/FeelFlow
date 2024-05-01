'use client';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/?email=${email}&pass=${pass}`);

      if (response.ok) {
        console.log('Login successful');
        // Redirect to the home page
        window.location.href = '/home';
      } else {
        console.log('Login failed');
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred while processing your request.');
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
      <div style={{ minHeight: '100vh', backgroundColor: '#E4C59E', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#AF8260', // Set background color to navbar color
            width: '100%',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="black">
            Welcome to Caffeine Companion
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container component="main" maxWidth="xs">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          {/* Logo */}
          <img src="/logo/logo.jpg" alt="Logo of Something" style={{ height: '55px' }} />
          </Box>
            <Typography component="h1" variant="h5" align="center">
              Sign in
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
                name="pass"
                label="Password"
                type="password"
                id="pass"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {error && <Typography variant="body2" color="error">{error}</Typography>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: '#000000', // Set background color to black
            width: '100%',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" color="primary">
            © 2024 All rights reserved.
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
}
