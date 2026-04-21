import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/laxamana/songs';

export const useSongs = (searchQuery = '') => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = API_BASE_URL;
        if (searchQuery) {
          url = `${API_BASE_URL}/search/${encodeURIComponent(searchQuery)}`;
        }
        
        const response = await axios.get(url);
        setSongs(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch songs');
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSongs();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return { songs, loading, error };
};