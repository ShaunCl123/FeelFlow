'use client';
import * as React from 'react';
import { Box, Button, Container, Paper, CssBaseline, Typography, ThemeProvider, Avatar, IconButton } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';

export default function CallPage() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  const [isCalling, setIsCalling] = React.useState(false);
  const [audio, setAudio] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const startCall = () => {
    const newAudio = new Audio('/audio/Pieta.mp3');
    newAudio.play();
    setAudio(newAudio);
    setIsCalling(true);

    newAudio.onended = () => {
      setIsCalling(false);
    };
  };

  const endCall = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsCalling(false);
    if (mounted) {
      router.push('/');
    }
  };

  if (!mounted) return null;

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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />

        <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Avatar
            src="/images/profile.jpg"
            sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
          />
          <Typography variant="h5" color="white" gutterBottom>
            Calling...
          </Typography>

          {isCalling ? (
            <Typography variant="subtitle1" color="white" gutterBottom>
              In Call
            </Typography>
          ) : (
            <Typography variant="subtitle1" color="white" gutterBottom>
              Tap to start the call
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
            {!isCalling ? (
              <IconButton onClick={startCall} sx={{ backgroundColor: green[500], color: 'white' }}>
                <CallIcon fontSize="large" />
              </IconButton>
            ) : (
              <IconButton onClick={endCall} sx={{ backgroundColor: red[500], color: 'white' }}>
                <CallEndIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
