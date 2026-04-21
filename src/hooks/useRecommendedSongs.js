import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://song-api-6fpu.onrender.com/laxamana/songs';

export const useRecommendedSongs = (currentSong = null) => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_BASE_URL);
        let songs = response.data;

        // Filter out current song if provided
        if (currentSong) {
          songs = songs.filter(song => song.id !== currentSong.id);
        }

        // Shuffle and get random 8 songs
        const shuffled = songs.sort(() => Math.random() - 0.5).slice(0, 8);
        setRecommendedSongs(shuffled);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message || 'Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentSong]);

  return { recommendedSongs, loading, error };
};