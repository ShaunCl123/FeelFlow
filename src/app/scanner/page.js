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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#E4C59E', textAlign: 'center' }}>
      <AppBar position="static" sx={{ backgroundColor: '#AF8260', color: 'white' }}>
        <Toolbar>
          {/* Logo */}
          <img src="/logo/logo.jpg" alt="Logo of Something" style={{ marginRight: '55px', height: '55px' }} />
          <Typography variant="h6">My App</Typography>
          <Button color="inherit" href="/home">Home</Button>
          <Button color="inherit" href="/chart">Chart</Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" style={{ textAlign: 'center', margin: 'auto' }}>
        <div id="reader" style={{ width: '100%' }}></div>
        {/* Display or handle dbData as needed */}
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center', margin: 'auto' }}>
          Content:
        </Typography>
        <Box border={0} p={2} mt={2} style={{ textAlign: 'center', margin: 'auto' }}>
          <Typography variant="body1">{JSON.stringify(dbData)}</Typography>
        </Box>
      </Container>
      {/* Grid Bars */}
      <Grid container spacing={2} style={{ textAlign: 'center', margin: 'auto' }}>
        <Grid item xs={12} sm={6}>
          <Box p={2} mt={2} sx={{ backgroundColor: '#AF8260', height: '100%' }}>
            <Typography variant="body1" sx={{ color: 'black' }}>
              The scanner component presented here is a part of a React application that utilizes the Html5QrcodeScanner library for QR code scanning functionality. It renders a UI with an AppBar containing navigation buttons, a main content area with a QR code scanner, and a section to display data fetched from an API based on the scanned QR code. Additionally, it includes explanatory Grid Bars and a Footer for user guidance and copyright information.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={2} mt={2} sx={{ backgroundColor: '#AF8260', height: '100%' }}>
            <Typography variant="body1" sx={{ color: 'black' }}>
              Functionally, the scanner component initiates a QR code scanner upon component mounting, allowing users to scan QR codes with their device's camera. Upon successful scanning, it fetches relevant data from an API based on the decoded text of the QR code. This data is then displayed within the component, providing users with information associated with the scanned QR code. Additionally, it features navigation buttons for easy access to other parts of the application and provides instructional messages through the Grid Bars for guiding users on using the scanner and understanding the displayed data. Finally, the Footer section provides copyright information for the application.
            </Typography>
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
          marginTop: 'auto',
        }}
      >
        <Typography variant="body1" color="primary">© 2024 All rights reserved.</Typography>
      </Box>
    </div>
  );
}
