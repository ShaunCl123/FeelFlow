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
import InputLabel from '@mui/material/InputLabel';

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

  // State for the chosen emotion, fetched tracks, selected track, error, and number of songs to fetch
  const [emotion, setEmotion] = React.useState('');
  const [tracks, setTracks] = React.useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(-1); // Initialize with -1 (no track selected)
  const [error, setError] = React.useState(null);
  const [audio, setAudio] = React.useState(null); // State for audio object
  const [selectedFullTrack, setSelectedFullTrack] = React.useState(''); // State for the selected full track
  const [songCount, setSongCount] = React.useState(5); // State for number of songs to fetch

  // Function to fetch playlist tracks based on emotion
  const fetchPlaylistTracks = async () => {
    if (!emotion) {
      setError("Please enter an emotion.");
      return; // Exit if no emotion is entered
    }
    try {
      const response = await fetch(`/api/fetch-playlist-tracks?emotion=${emotion}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      
      // Shuffle the tracks and select the specified number of random songs
      const shuffledTracks = data.items.sort(() => 0.5 - Math.random());
      const selectedTracks = shuffledTracks.slice(0, songCount).map(item => ({
        name: item.track.name,
        artists: item.track.artists.map(artist => artist.name).join(", "),
        previewUrl: item.track.preview_url, // Add the preview URL for the track
        fullUrl: item.track.external_urls.spotify // Add the full track URL
      }));

      setTracks(selectedTracks);
      setCurrentTrackIndex(0); // Start from the first track if tracks are fetched
      setError(null);
    } catch (error) {
      setError(`Error fetching tracks: ${error.message}`);
      setTracks([]);
      setCurrentTrackIndex(-1); // Reset current track index on error
    }
  };

  // Function to play the selected track
  const playTrack = (index) => {
    if (tracks[index] && tracks[index].previewUrl) {
      if (audio) {
        audio.pause(); // Stop the current audio if playing
      }
      const newAudio = new Audio(tracks[index].previewUrl);
      newAudio.play();
      setAudio(newAudio); // Store the new audio object
      setCurrentTrackIndex(index); // Update the current track index
    }
  };

  // Function to stop the current track
  const stopTrack = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset to start
      setAudio(null); // Clear audio state
    }
  };

  // Function to play the full track from the dropdown selection
  const playFullTrack = () => {
    const track = tracks.find(t => t.name === selectedFullTrack);
    if (track && track.fullUrl) {
      window.open(track.fullUrl, '_blank'); // Open the full track in a new tab
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#1DB954', // Spotify Green
          padding: '20px',
        }}
      >
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h1 style={{ color: 'white', fontFamily: 'Cascadia Mono, sans-serif', fontSize: '3em' }}>
              Caffeine Companion
            </h1>

            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#191414', marginTop: '20px' }}>
              <Typography variant="h5" mt={2} mb={4} color="white">
                Welcome to the Playlist Fetcher!
              </Typography>
              <Typography variant="body1" align="left" color="white">
                Choose an emotion and fetch a playlist to match your mood!
              </Typography>
              <input
                type="text"
                placeholder="Enter emotion (e.g., Happy)"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                style={{ marginTop: '1rem', width: '100%', padding: '0.5rem' }}
              />

              <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                <InputLabel id="song-count-label" sx={{ color: 'white' }}>Number of Songs</InputLabel>
                <Select
                  labelId="song-count-label"
                  value={songCount}
                  onChange={(e) => setSongCount(e.target.value)}
                  sx={{ backgroundColor: '#FFFFFF' }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(count => (
                    <MenuItem key={count} value={count}>{count}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="contained" onClick={fetchPlaylistTracks} sx={{ marginTop: '1rem' }}>
                Fetch Playlist
              </Button>
            </Paper>

            {error && (
              <Typography color="error" sx={{ marginTop: '20px' }}>
                {error}
              </Typography>
            )}

            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#191414', marginTop: '20px' }}>
              <Typography variant="h6" color="white">Fetched Tracks:</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tracks.map((track, index) => (
                  <li key={index} style={{ marginBottom: '10px', color: 'white' }}>
                    <strong>{track.name}</strong> by {track.artists}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => playTrack(index)}
                      sx={{ marginLeft: '10px' }}
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
                  sx={{ marginRight: '10px' }}
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
                <Button variant="contained" color="secondary" onClick={playFullTrack} sx={{ marginTop: '10px' }}>
                  Play Full
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>

        <Box
          sx={{
            backgroundColor: '#000000',
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
