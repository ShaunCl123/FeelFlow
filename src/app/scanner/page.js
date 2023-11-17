'use client';
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';




export default function Page() {
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

        Content:
        {JSON.stringify(dbData)}
      </Container>
    </div>
  );
}