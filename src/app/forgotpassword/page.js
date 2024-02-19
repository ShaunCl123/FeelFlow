'use client';
import * as React from 'react';
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
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function Page() {
  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === 'valid') {
      console.log('New Password had been created');
    } else {
      console.log('Please type a new Password');
    }
  }

  const handleSubmit = (event) => {
    console.log('handling submit');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    let pass = data.get('newpass'); // Adjusted to 'newpass' as per your form fields
    console.log('Sent email:' + email);
    console.log('Sent pass:' + pass);
    let url = `http://localhost:3000/api/login?email=${email}&pass=${pass}`;
    console.log(url);
    runDBCallAsync(url);
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
              Reset Your Password
            </Typography>
          </Box>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newpass"
              label="New Password"
              type="password" // Corrected to 'password' for security reasons
              id="newpass"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="renewpass"
              label="Retype New Password"
              type="password" // Corrected to 'password' for security reasons
              id="renewpass"
              autoComplete="retype-new-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            {/* Grid Boxes */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box border={1} p={2}>
                  <Typography variant="body1">Please Proceed to Reset your Password above.</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box border={1} p={2}>
                  <Typography variant="body1">Enter your email and new password, then click 'Sign In'.</Typography>
                </Box>
              </Grid>
            </Grid>

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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}