'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { green, yellow, red, blue } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

export default function Page() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const [coffeeIntake, setCoffeeIntake] = useState(0);

  // Use a ref to hold the chart instance
  const chartRef = useRef(null);

  const handleCoffeeInputChange = (event) => {
    let cups = parseInt(event.target.value, 10) || 0;

    // Ensure the user cannot exceed counting to 3
    cups = Math.min(cups, 3);

    setCoffeeIntake(cups);

    if (cups === 3) {
      alert('You have reached the maximum coffee intake for the day!');
    }
  };

  // create and update the chart
  const renderChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');

    // chart instance already exists, destroy it
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const scale = 3; // Adjust the scale based on how close the values should be to the limit

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Coffee', 'Prime', 'Supplements'],
        datasets: [
          {
            label: 'Coffee Intake',
            data: [
              coffeeIntake,
              Math.min(coffeeIntake + 1, 3) * scale, // Adjust based on the limit
              Math.min(coffeeIntake + 2, 3) * scale, // Adjust based on the limit
            ],
            backgroundColor: [
              coffeeIntake === 1 ? green[500] : 'rgba(75, 192, 192, 0.2)',
              coffeeIntake === 2 ? yellow[500] : 'rgba(75, 192, 192, 0.2)',
              coffeeIntake === 3 ? red[500] : 'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  };

  // Call function
  useEffect(() => {
    renderChart();
  }, [coffeeIntake]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
          <Button color="inherit" href="/home">
            Home
          </Button>
          <Button color="inherit" href="/scanner">
            Scanner
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
          <div>
            <canvas id="myChart"></canvas>
          </div>
          <TextField
            label="Enter number of cups"
            variant="outlined"
            type="number"
            onChange={handleCoffeeInputChange}
            value={coffeeIntake}
            inputProps={{ max: 3, min: 0 }}
          />
          <LinearProgress
            variant="determinate"
            value={(coffeeIntake / 3) * 100}
            sx={{ width: '80%', marginTop: 2, height: 20 }}
            color={
              coffeeIntake === 1 ? 'success' : coffeeIntake === 2 ? 'warning' : 'error'
            }
          />
          {coffeeIntake === 3 && (
            <Alert severity="warning" sx={{ marginTop: 2 }}>
              You have reached the maximum coffee intake for the day!
            </Alert>
          )}
        </Box>
      </Container>
    </div>
  );
}

async function runDBCallAsync(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}