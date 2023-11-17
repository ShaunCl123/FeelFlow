'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Page() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
          <Button color="inherit" href="/scanner">
            Scanner
          </Button>
          <Button color="inherit" href="/chart">
            Chart
          </Button>
        </Toolbar>
      </AppBar>
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
          <Avatar>{/* Your Avatar */}</Avatar>
          <Typography component="h1" variant="h5">
            Welcome to the Health App
          </Typography>
          <Typography variant="body1" align="center">
            This app is designed to help you monitor and improve your health. It provides various tools and features, including a scanner for health-related data and charts to track your progress.  This app is now on the web :D
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}