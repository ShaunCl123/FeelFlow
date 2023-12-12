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

// Import Calendar component and its styles
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

  // State for the calendar date and reminders
  const [date, setDate] = React.useState(new Date());
  const [reminders, setReminders] = React.useState({});

  // Function to handle reminder input change
  const handleReminderChange = (event) => {
    const newReminders = { ...reminders, [date.toDateString()]: event.target.value };
    setReminders(newReminders);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* App bar */}
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

      {/* Main content container */}
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
          {/* Avatar and header */}
          <Avatar>{/* Your Avatar */}</Avatar>
          <Typography component="h1" variant="h5">
            Welcome to the Health App
          </Typography>

          {/* App description */}
          <Typography variant="body1" align="center">
            This app is designed to help you monitor and improve your health. It provides various tools and features, including a scanner for health-related data and charts to track your progress.
          </Typography>

          {/* Calendar component with reminder input */}
          <Calendar onChange={setDate} value={date} />
          <input
            type="text"
            placeholder="Add a reminder"
            onChange={handleReminderChange}
          />

          {/* Display existing reminder for the selected day */}
          {reminders[date.toDateString()] && (
            <Typography variant="body2" align="center">
              Reminder: {reminders[date.toDateString()]}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}