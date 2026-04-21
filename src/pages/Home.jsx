import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SongGrid } from '../components/SongGrid';
import { VideoPlayer } from '../components/VideoPlayer';
import { RightSidebar } from '../components/RightSidebar';
import { useSongs } from '../hooks/useSongs';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const { songs, loading, error } = useSongs(searchQuery);
  const { songs: allSongs } = useSongs(''); // Fetch all songs for recommendations

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  // Get random recommended videos (shuffle and pick 10)
  const recommendedVideos = allSongs
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  // If searching, show search results, otherwise show all songs
  const displaySongs = searchQuery && songs.length > 0 ? songs : allSongs;

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <div className="flex max-w-7xl mx-auto px-4 py-8 gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <SearchBar onSearch={setSearchQuery} />

          {/* Search Results or Main Content */}
          {searchQuery ? (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Search Results for "{searchQuery}"
              </h2>
              <SongGrid
                songs={songs}
                loading={loading}
                error={error}
                onSongSelect={handleSongSelect}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-red-500">▶</span> All Videos
              </h2>
              <SongGrid
                songs={displaySongs}
                loading={loading}
                error={error}
                onSongSelect={handleSongSelect}
              />
            </div>
          )}
        </div>

        {/* Right Sidebar - Recommended Videos */}
        {!searchQuery && (
          <RightSidebar
            recommendedSongs={recommendedVideos}
            loading={loading}
            error={error}
            onSongSelect={handleSongSelect}
          />
        )}
      </div>

      {selectedSong && (
        <VideoPlayer 
          song={selectedSong} 
          onClose={() => setSelectedSong(null)} 
        />
      )}
    </div>
  );
};