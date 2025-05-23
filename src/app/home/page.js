'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid'; // Added for responsive design
import Link from 'next/link'; // <-- Make sure you import Link from next/link

const emotionLinks = {
  Happy: [
    { text: "Visit a Holiday Planning Site.", url: "https://www.tuiholidays.ie/f/holidays" },
    { text: "Find Fun Activities to fulfill your day.", url: "https://www.getirelandactive.ie" },
  ],
  Sad: [
    { text: "Mental Health Support - HSE", url: "https://www2.hse.ie/mental-health/" },
    { text: "Helpline Services - Pieta House", url: "https://www.pieta.ie" },
    { text: "Call if any help is required", url: "/call" },
  ],
  Active: [
    { text: "Visit an Active Lifestyle Site", url: "https://www.getactive.ie" },
    { text: "Join a Fitness Program", url: "https://www.fitnessblender.com" },
  ],
  Focused: [
    { text: "Study Tips - Study Smarter", url: "https://www.studysmarter.co.uk" },
    { text: "Pomodoro Timer - Stay Focused", url: "https://pomofocus.io" },
  ],
};

export default function Page() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  const [emotion, setEmotion] = React.useState('');
  const [tracks, setTracks] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [audio, setAudio] = React.useState(null);
  const [selectedFullTrack, setSelectedFullTrack] = React.useState('');
  const [songCount, setSongCount] = React.useState(5);
  const [manualBgColor, setManualBgColor] = React.useState('transparent');

  const emotionBgColors = {
    Happy: 'rgba(255, 223, 0, 0.3)',
    Sad: 'rgba(0, 0, 255, 0.2)',
    Active: 'rgba(0, 255, 0, 0.3)',
    Focused: 'rgba(128, 0, 128, 0.3)',
  };

  const fetchPlaylistTracks = async () => {
    if (!emotion) {
      setError("Please select an emotion.");
      return;
    }
    try {
      const response = await fetch(`/api/fetch-playlist-tracks?emotion=${emotion}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();

      const shuffledTracks = data.items.sort(() => 0.5 - Math.random());
      const selectedTracks = shuffledTracks.slice(0, songCount).map(item => ({
        name: item.track.name,
        artists: item.track.artists.map(artist => artist.name).join(", "),
        previewUrl: item.track.preview_url,
        fullUrl: item.track.external_urls.spotify
      }));

      setTracks(selectedTracks);
      setError(null);
      setManualBgColor(emotionBgColors[emotion]);
    } catch (error) {
      setError(`There was an issue fetching the playlist. Please try again later.`);
      setTracks([]);
    }
  };

  const playTrack = (index) => {
    if (tracks[index] && tracks[index].previewUrl) {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(tracks[index].previewUrl);
      newAudio.play();
      setAudio(newAudio);

      newAudio.onended = () => {
        if (index + 1 < tracks.length) {
          playTrack(index + 1);
        }
      };
    }
  };

  const stopTrack = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
  };

  const playFullTrack = () => {
    const track = tracks.find(t => t.name === selectedFullTrack);
    if (track && track.fullUrl) {
      window.open(track.fullUrl, '_blank');
    }
  };

  const changeBgColor = () => {
    const colors = ['rgba(255, 223, 0, 0.3)', 'rgba(0, 0, 255, 0.2)', 'rgba(0, 255, 0, 0.3)', 'rgba(128, 0, 128, 0.3)', 'transparent'];
    const currentIndex = colors.indexOf(manualBgColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setManualBgColor(colors[nextIndex]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'url(/images/main.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: manualBgColor,
            zIndex: 1,
          }}
        />
        <Container
          component="main"
          maxWidth="md"
          sx={{
            flexGrow: 1,
            padding: '20px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h1 style={{ color: 'white', fontFamily: 'Cascadia Mono, sans-serif', fontSize: '3em' }}>
              FeelFlow
            </h1>

            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#000000', marginTop: '20px' }}>
              <Typography variant="h5" mt={2} mb={4} color="white">
                Welcome to the Playlist Fetcher!
              </Typography>
              <Typography variant="body1" align="left" color="white">
                Choose an emotion and fetch a playlist to match your mood!
              </Typography>

              <FormControl fullWidth sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <Select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  displayEmpty
                  sx={{ backgroundColor: '#FFFFFF', width: '100%' }}
                >
                  <MenuItem value="" disabled>Select emotion (e.g., Happy 😊)</MenuItem>
                  <MenuItem value="Happy">Happy 😊</MenuItem>
                  <MenuItem value="Sad">Sad 😢</MenuItem>
                  <MenuItem value="Active">Active 💪</MenuItem>
                  <MenuItem value="Focused">Focused 🎯</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="body1" align="left" color="white" sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                Number of Songs
              </Typography>

              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <Select
                  value={songCount}
                  onChange={(e) => setSongCount(e.target.value)}
                  sx={{ backgroundColor: '#FFFFFF', width: '60%' }}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(count => (
                    <MenuItem key={count} value={count}>{count}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={fetchPlaylistTracks}
                sx={{
                  marginTop: '1rem',
                  ':hover': { backgroundColor: green[700] }
                }}
              >
                Fetch Playlist
              </Button>
            </Paper>

            {error && (
              <Typography color="error" sx={{ marginTop: '20px' }}>
                {error}
              </Typography>
            )}

            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#000000', marginTop: '20px' }}>
              <Typography variant="h6" color="white">Fetched Tracks: {tracks.length} Songs</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tracks.map((track, index) => (
                  <li key={index} style={{ marginBottom: '10px', color: 'white' }}>
                    <strong>{track.name}</strong> by {track.artists}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => playTrack(index)}
                      sx={{ marginLeft: '10px', ':hover': { backgroundColor: green[700] } }}
                    >
                      Play
                    </Button>
                  </li>
                ))}
              </ul>

              <Box sx={{ marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={stopTrack}
                  sx={{ marginRight: '10px', ':hover': { backgroundColor: green[700] } }}
                >
                  Stop
                </Button>
              </Box>

              <Box sx={{ marginTop: '20px' }}>
                <Typography variant="body1" color="white">Select a song to play in full on Spotify:</Typography>
                <Select
                  value={selectedFullTrack}
                  onChange={(e) => setSelectedFullTrack(e.target.value)}
                  displayEmpty
                  sx={{ width: '100%', marginTop: '10px', backgroundColor: '#FFFFFF' }}
                >
                  <MenuItem value="" disabled>Select a track</MenuItem>
                  {tracks.map((track, index) => (
                    <MenuItem key={index} value={track.name}>
                      {track.name} - {track.artists}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={playFullTrack}
                  sx={{ marginTop: '10px', ':hover': { backgroundColor: green[700] } }}
                >
                  Play Full
                </Button>
              </Box>
            </Paper>

            {emotion && (
              <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#000000', marginTop: '20px' }}>
                <Typography variant="body1" color="white" sx={{ marginTop: '1rem' }}>
                  Based on your mood, here are some helpful resources you might find useful:
                </Typography>
                <Typography variant="h6" color="white">Helpful Links</Typography>
                <ul style={{ listStyleType: 'none', padding: 0, color: 'white' }}>
                  {emotionLinks[emotion].map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'cyan' }}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </Paper>
            )}
          </Box>
        </Container>

        <Box
          sx={{
            backgroundColor: '#000000',
            width: '100%',
            padding: '20px',
            textAlign: 'center',
            marginTop: 'auto',
            zIndex: 3,
            position: 'relative',
          }}
        >
          {/* New link to /calendar */}
          <Link href="/calendar" style={{ color: 'cyan', textDecoration: 'underline' }}>
            View your reminders here
          </Link>

          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto', ':hover': { backgroundColor: green[700] } }}
            onClick={changeBgColor}
          >
            Change Background Color
          </Button>
          <Typography variant="body1" color="primary" sx={{ marginTop: '10px' }}>
            © 2024 All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
