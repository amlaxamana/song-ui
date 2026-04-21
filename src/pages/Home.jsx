import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SongGrid } from '../components/SongGrid';
import { VideoPlayer } from '../components/VideoPlayer';
import { RightSidebar } from '../components/RightSidebar';
import { useSongs } from '../hooks/useSongs';
import { useTheme } from '../context/ThemeContext';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const { songs, loading, error } = useSongs(searchQuery);
  const { songs: allSongs } = useSongs('');
  const { theme } = useTheme();

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const recommendedVideos = allSongs
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  const displaySongs = searchQuery && songs.length > 0 ? songs : allSongs;

  return (
    <div className={theme === 'dark' ? 'bg-gray-950 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <Header />
      
      <div className={`flex max-w-7xl mx-auto px-4 py-8 ${searchQuery ? 'gap-0' : 'gap-6'}`}>
        {/* Main Content */}
        <div className={searchQuery ? 'w-full' : 'flex-1 min-w-0'}>
          <SearchBar onSearch={setSearchQuery} />

          {searchQuery ? (
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
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
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
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

        {/* Right Sidebar - Recommended Videos (only show when NOT searching) */}
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