'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Paper, TextField, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDay = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];

    const numDays = daysInMonth(year, month);
    const firstDay = startDay(year, month);

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const calendarDays = generateCalendar();

  return (
    <Box sx={{ color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button onClick={handlePrevMonth} sx={{ color: 'white' }}>Prev</Button>
        <Typography variant="h6">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</Typography>
        <Button onClick={handleNextMonth} sx={{ color: 'white' }}>Next</Button>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '5px',
        }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Typography key={day} align="center" sx={{ fontWeight: 'bold' }}>
            {day}
          </Typography>
        ))}
        {calendarDays.map((day, index) => (
          <Box
            key={index}
            sx={{
              height: '40px',
              backgroundColor: day && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() ? '#1976d2' : '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: day ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (day) {
                const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                onDateSelect(selected);
              }
            }}
          >
            {day || ''}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function fetchReminders() {
      try {
        const res = await fetch('/api/reminders');
        const data = await res.json();
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    }
    fetchReminders();
  }, []);

  const handleAddReminder = async () => {
    if (!newReminder.trim()) return;

    const reminder = {
      id: `${Date.now()}`,
      text: newReminder,
      date: selectedDate,
    };

    setReminders((prev) => [...prev, reminder]);
    setNewReminder('');

    try {
      await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reminder),
      });
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  const handleDeleteReminder = async (id) => {
    setReminders((prev) => prev.filter(reminder => reminder.id !== id));

    try {
      await fetch(`/api/reminders/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(reminders);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setReminders(items);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#000000',
            width: '100%',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="white">
            Your Reminders
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(/images/start.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            padding: '20px',
          }}
        >
          <Container component="main" maxWidth="sm">
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                backgroundColor: '#000000',
                textAlign: 'center',
                color: 'white',
                opacity: 0.9,
              }}
            >
              <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                Select a date and add your reminders. Drag and organize them!
              </Typography>

              {/* Original Calendar */}
              <Box sx={{ mb: 3 }}>
                <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </Box>

              {/* Add Reminder Input */}
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter a reminder..."
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  sx={{ backgroundColor: 'white', borderRadius: '4px', mr: 1 }}
                />
                <Button variant="contained" onClick={handleAddReminder}>
                  Add
                </Button>
              </Box>

              {/* Draggable Reminders */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="reminders">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {reminders.map((reminder, index) => (
                        <Draggable key={reminder.id} draggableId={reminder.id} index={index}>
                          {(provided) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              elevation={2}
                              sx={{
                                padding: '10px',
                                marginBottom: '10px',
                                backgroundColor: '#1a1a1a',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Box>
                                <Typography>{reminder.text}</Typography>
                                <Typography variant="caption">
                                  {new Date(reminder.date).toDateString()}
                                </Typography>
                              </Box>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDeleteReminder(reminder.id)}
                              >
                                Delete
                              </Button>
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Paper>
          </Container>
        </Box>

        <Box
          sx={{
            backgroundColor: '#000000',
            width: '100%',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" color="white">
            © 2024 FeelFlow. All rights reserved.
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
}
