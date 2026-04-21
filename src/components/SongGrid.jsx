import React from 'react';
import { SongCard } from './SongCard';
import { CircularProgress, Alert } from '@mui/material';

export const SongGrid = ({ songs, loading, error, onSongSelect }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <CircularProgress sx={{ color: '#dc2626' }} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="bg-red-900/20 border border-red-500 rounded-lg">
        {error}. Please try again later.
      </Alert>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No songs found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          onClick={() => onSongSelect(song)}
        />
      ))}
    </div>
  );
};