import React, { useState } from 'react';
import { PlayCircleOutlined } from '@mui/icons-material';
import MusicNoteOutlined from '@mui/icons-material/MusicNoteOutlined';

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
  // maxresdefault is the highest quality, falls back to others if not available
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
        <MusicNoteOutlined sx={{ fontSize: 60, color: 'white', opacity: 0.8 }} />
        <p className="text-white text-xs font-semibold px-2 line-clamp-2 mt-2">
          {song?.title || 'Song'}
        </p>
      </div>
    </div>
  );
};

export const SongCard = ({ song, onClick }) => {
  const [thumbnailError, setThumbnailError] = useState(false);

  // Determine thumbnail source
  let thumbnailUrl = song?.thumbnail;

  // If URL is YouTube and no custom thumbnail, generate YouTube thumbnail
  if (!thumbnailUrl && isYouTubeUrl(song?.url)) {
    thumbnailUrl = getYouTubeThumbnail(song?.url);
  }

  return (
    <div
      onClick={onClick}
      className="group bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:shadow-red-500/20 transform hover:scale-105"
    >
      {/* Thumbnail Container */}
      <div className="relative overflow-hidden bg-gray-800 aspect-video flex items-center justify-center">
        {/* Display thumbnail as background or fallback */}
        {thumbnailUrl && !thumbnailError ? (
          <img
            src={thumbnailUrl}
            alt={song?.title || "Song thumbnail"}
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

        {/* Play Button Overlay - Shows on Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/60">
          <div className="relative">
            {/* Animated ring effect */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:animate-pulse"></div>
            
            {/* Play button */}
            <PlayCircleOutlined 
              className="text-white text-6xl drop-shadow-lg" 
              sx={{
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
              }}
            />
          </div>
        </div>

        {/* Duration Badge (optional) */}
        {song?.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {song.duration}
          </div>
        )}

        {/* YouTube Badge */}
        {isYouTubeUrl(song?.url) && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <span>▶</span> YouTube
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-red-500">
          {song?.title || "Untitled"}
        </h3>

        <p className="mt-1 truncate text-xs text-gray-400">
          {song?.artist || "Unknown Artist"}
        </p>

        <p className="mt-1 truncate text-xs text-gray-500">
          {song?.album || "Unknown Album"}
        </p>
      </div>
    </div>
  );
};