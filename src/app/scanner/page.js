'use client';
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function Scanner() {
  const [dbData, setDbData] = useState(null);

  // Function to handle the QR code scan success.
  function onScanSuccess(decodedText, decodedResult) {
    console.log(`Scan result: ${decodedText}`, decodedResult);

    // Fetch data from the API route
    fetch(`/api/scanner?code=${decodedText}`)
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);

        // Handle the data as needed
        setDbData(data);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });

    // If QR code has a valid URL, redirects user to URL.
    // Add your URL handling logic here
  }

  useEffect(() => {
    // Initialize the HTML5 QR code scanner
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    // Render the scanner and attach the onScanSuccess handler
    html5QrcodeScanner.render(onScanSuccess);

    // Cleanup the scanner when the component unmounts
    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
          <Button color="inherit" href="/home">
            Home
          </Button>
          <Button color="inherit" href="/chart">
            Chart
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <div id="reader" style={{ width: '100%' }}></div>
        {/* Display or handle dbData as needed */}
        <Typography variant="h6" gutterBottom>
          Content:
        </Typography>
        <Box border={1} p={2} mt={2}>
          <Typography variant="body1">{JSON.stringify(dbData)}</Typography>
        </Box>
      </Container>
      {/* Grid Bars */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box border={1} p={2} mt={2}>
            <Typography variant="body1">In order to access the scanner you have to allow access to your camera.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box border={1} p={2} mt={2}>
            <Typography variant="body1">The barcodes are read from our database and will display the data on these items.</Typography>
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
    </div>
  );
}