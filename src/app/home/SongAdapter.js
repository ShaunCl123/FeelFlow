import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

const SongAdapter = ({ songs }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <List>
        {songs.map((song, index) => (
          <ListItem key={index}>
            <ListItemText primary={song.name} secondary={song.artists} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SongAdapter;