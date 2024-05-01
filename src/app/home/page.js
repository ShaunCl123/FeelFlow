'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, brown } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// Import DatePicker component and its styles from react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import your logo image


// Main component
export default function Page() {
  // Create a theme
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  // State for the selected date and reminders
  const [date, setDate] = React.useState(new Date());
  const [reminders, setReminders] = React.useState({});

  // Function to handle reminder input change
  const handleReminderChange = (event) => {
    const newReminders = { ...reminders, [date.toDateString()]: event.target.value };
    setReminders(newReminders);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Set background color for the entire page */}
      <Box
        sx={{
          minHeight: '100vh', // Ensure the box stretches to the full height of the viewport
          backgroundColor: '#E4C59E', // Background of the entire page
          padding: '20px', // Add padding for content
        }}
      >
        {/* App bar */}
        <AppBar position="static" sx={{ backgroundColor: '#AF8260' }}> {/* Set background color */}
          <Toolbar>
            {/* Logo */}
            <img src="/logo/logo.jpg" alt="Logo of Something" style={{ marginRight: '55px', height: '55px' }} />
            {/* App title */}
            <Typography variant="h6">My App</Typography>
            <Button color="inherit" href="/scanner">
              Scanner
            </Button>
            <Button color="inherit" href="/chart">
              Chart
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main content container */}
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Custom header */}
            <h1 style={{ color: 'black', fontFamily: 'Cascadia Mono, sans-serif', fontSize: '3em' }}> <br />Homepage</h1>

            {/* About Us */}
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#AF8260', marginTop: '20px' }}>
              <Typography variant="h5" mt={2} mb={4}>
                About Us
              </Typography>
              {/* App description */}
              <Typography variant="body1" align="left">
                This app is designed to help you monitor and improve your health. It provides various tools and features, including a scanner for health-related data and charts to track your progress.
              </Typography>
            </Paper>

            {/* DatePicker and Reminder */}
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#AF8260', marginTop: '20px' }}>
              <DatePicker selected={date} onChange={date => setDate(date)} />
              <input
                type="text"
                placeholder="Add a reminder"
                onChange={handleReminderChange}
                style={{ marginTop: '1rem', width: '100%', padding: '0.5rem' }}
              />

              {/* Display existing reminder for the selected day */}
              {reminders[date.toDateString()] && (
                <Typography variant="body2" mt={2}>
                  Reminder: {reminders[date.toDateString()]}
                </Typography>
              )}
            </Paper>

            {/* Grid Boxes */}
            <Grid container spacing={4} sx={{ marginTop: '20px' }}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#AF8260' }}>
                  <Typography variant="body1">The calendar displayed in this App is an essential tool for managing health-related activities and appointments. It helps users keep track of important dates effortlessly, making it easy to schedule reminders, track progress, and organize healthcare routines efficiently. With its user-friendly interface, individuals can navigate through dates seamlessly, empowering them to stay proactive and committed to their health goals.</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#AF8260' }}>
                  <Typography variant="body1">This feature provides a visual representation of upcoming tasks and events, making it easier for users to plan and prepare. By offering a clear overview of their health-related commitments, the calendar enables individuals to stay on top of their health and make informed decisions about their well-being.</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: '#000000', // Set background color to black
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
      </Box>
    </ThemeProvider>
  );
}
