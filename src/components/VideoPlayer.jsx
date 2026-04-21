import React, { useRef, useState, useEffect } from 'react';
import {
  PlayArrowOutlined,
  PauseOutlined,
  FullscreenOutlined,
  VolumeUpOutlined,
  VolumeOffOutlined,
  CloseOutlined,
  MusicNoteOutlined,
} from '@mui/icons-material';

const isYouTubeUrl = (url) =>
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(url);

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  const videoId = match ? match[1] : null;
  // Added autoplay=1 parameter
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1` : url;
};

export const VideoPlayer = ({ song, onClose }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const youtubeMode = isYouTubeUrl(song?.url);

  if (!song) return null;

  useEffect(() => {
    if (!youtubeMode && playerRef.current) {
      // Auto-play video/audio
      const playPromise = playerRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [song, youtubeMode]);

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = playerRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Play error:', error);
          });
        }
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (playerRef.current) {
      setCurrentTime(playerRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (playerRef.current) {
      playerRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.volume = volume;
        setIsMuted(false);
      } else {
        playerRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
          >
            <CloseOutlined fontSize="large" />
          </button>
        </div>

        {/* Main Player Card */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl">
          {/* Video player / placeholder */}
          <div className="relative bg-gradient-to-br from-red-600 to-purple-900 aspect-video flex items-center justify-center overflow-hidden">
            {song.url ? (
              youtubeMode ? (
                <iframe
                  title={song.title}
                  src={getYouTubeEmbedUrl(song.url)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  ref={playerRef}
                  src={song.url}
                  poster={song.thumbnail}
                  controls
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover bg-black"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleEnded}
                  crossOrigin="anonymous"
                />
              )
            ) : (
              <div className="text-center text-white p-6">
                <MusicNoteOutlined sx={{ fontSize: 120 }} />
                <p className="mt-4 text-sm text-gray-100">No video URL available.</p>
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="p-6 text-white">
            <h2 className="text-3xl font-bold mb-2 line-clamp-2">{song.title}</h2>
            <p className="text-gray-300 text-lg mb-1">{song.artist || 'Unknown Artist'}</p>
            <p className="text-gray-400 text-sm">{song.album || 'Unknown Album'}</p>
            {song.genre && (
              <p className="text-gray-500 text-sm mt-2">Genre: {song.genre}</p>
            )}
          </div>
        </div>

        {/* Now Playing Text */}
        <div className="text-center mt-4 text-gray-400">
          <p className="text-sm">Now Playing 🎵</p>
        </div>
      </div>
    </div>
  );
};