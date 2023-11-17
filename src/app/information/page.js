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
            Information page
          </Typography>
          <Typography variant="body1" align="center">
          In this Health Based app it will be able to keep track of your Caffeine intake.  It will do this by asking for input from the user.  There is a navbar for easy functionality and a scanner so that you can access our data on a range of products.  There is also a chart and progress bar that is connected to the coffee intake.  This bar will change color based on how many coffee's were drunk during the day, when this limit is exceeded there is a popup.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}