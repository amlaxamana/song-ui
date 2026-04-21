import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SongGrid } from '../components/SongGrid';
import { VideoPlayer } from '../components/VideoPlayer';
import { useSongs } from '../hooks/useSongs';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const { songs, loading, error } = useSongs(searchQuery);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar onSearch={setSearchQuery} />
        <SongGrid
          songs={songs}
          loading={loading}
          error={error}
          onSongSelect={handleSongSelect}
        />
      </main>
      {selectedSong && (
        <VideoPlayer 
          song={selectedSong} 
          onClose={() => setSelectedSong(null)} 
        />
      )}
    </div>
  );
};