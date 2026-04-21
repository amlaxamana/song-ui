import React from 'react';
import { PlayCircleOutlined } from '@mui/icons-material';
import MusicNoteOutlined from '@mui/icons-material/MusicNoteOutlined';
import { CircularProgress, Alert } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

// Generate a gradient background based on song title
const generateGradientColor = (title) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    'from-red-600 to-red-900',
    'from-blue-600 to-blue-900',
    'from-purple-600 to-purple-900',
    'from-pink-600 to-pink-900',
    'from-orange-600 to-orange-900',
    'from-green-600 to-green-900',
    'from-indigo-600 to-indigo-900',
    'from-yellow-600 to-yellow-900',
  ];
  return colors[Math.abs(hash) % colors.length];
};

// Extract YouTube video ID
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return match ? match[1] : null;
};

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (url) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Check if URL is YouTube
const isYouTubeUrl = (url) =>
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(url);

const PlaceholderThumbnail = ({ song }) => {
  const gradient = generateGradientColor(song?.title || 'Song');
  
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
      <div className="text-center">
        <MusicNoteOutlined sx={{ fontSize: 40, color: 'white', opacity: 0.8 }} />
        <p className="text-white text-xs font-semibold px-2 line-clamp-1 mt-1">
          {song?.title || 'Song'}
        </p>
      </div>
    </div>
  );
};

export const RightSidebar = ({ recommendedSongs, loading, error, onSongSelect }) => {
  const { theme } = useTheme();

  return (
    <aside className={`hidden lg:block w-80 flex-shrink-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-lg p-4 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <span className="text-red-500">✨</span> Recommended
        </h2>
        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Videos just for you</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <CircularProgress sx={{ color: '#dc2626' }} size={32} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" className={`${theme === 'dark' ? 'bg-red-900/20 border-red-500' : 'bg-red-50 border-red-300'} border rounded-lg text-xs mb-4`}>
          {error}
        </Alert>
      )}

      {/* Recommended Videos List */}
      {!loading && recommendedSongs.length > 0 ? (
        <div className="space-y-4">
          {recommendedSongs.map((song) => {
            const [thumbnailError, setThumbnailError] = React.useState(false);
            let thumbnailUrl = song?.thumbnail;
            if (!thumbnailUrl && isYouTubeUrl(song?.url)) {
              thumbnailUrl = getYouTubeThumbnail(song?.url);
            }

            return (
              <div
                key={song.id}
                onClick={() => onSongSelect(song)}
                className={`group ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 hover:shadow-red-500/20' : 'bg-gray-100 hover:bg-gray-200 hover:shadow-red-300/30'} rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105`}
              >
                {/* Thumbnail */}
                <div className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} aspect-video flex items-center justify-center`}>
                  {thumbnailUrl && !thumbnailError ? (
                    <img
                      src={thumbnailUrl}
                      alt={song?.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={() => {
                        console.log('Thumbnail failed to load:', thumbnailUrl);
                        setThumbnailError(true);
                      }}
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <PlaceholderThumbnail song={song} />
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/60">
                    <PlayCircleOutlined 
                      className="text-white text-4xl drop-shadow-lg"
                      sx={{
                        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                      }}
                    />
                  </div>

                  {isYouTubeUrl(song?.url) && (
                    <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <span>▶</span> YT
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-2">
                  <h3 className={`text-xs font-semibold truncate group-hover:text-red-500 transition-colors line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {song?.title}
                  </h3>
                  <p className={`text-xs truncate mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {song?.artist || 'Unknown Artist'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-8">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>No recommendations available</p>
          </div>
        )
      )}

      {/* Scrollbar Styling */}
      <style>{`
        aside::-webkit-scrollbar {
          width: 6px;
        }
        aside::-webkit-scrollbar-track {
          background: transparent;
        }
        aside::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 3px;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: #606060;
        }
      `}</style>
    </aside>
  );
};