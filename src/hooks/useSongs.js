import { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Kunin ang base URL mula sa environment variable
const BASE = import.meta.env.VITE_API_URL || '';

// 2. Dito natin ididikit ang '/laxamana/songs' dahil ito ang mapping sa Java Controller mo
// Sa Local: Magiging "/laxamana/songs" (Vite proxy ang bahala)
// Sa Deploy: Magiging "https://song-api-6fpu.onrender.com/laxamana/songs"
const API_BASE_URL = `${BASE}/laxamana/songs`;

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
        
        // Kung may search, magiging ".../laxamana/songs/search/{query}"
        if (searchQuery) {
          url = `${API_BASE_URL}/search/${encodeURIComponent(searchQuery)}`;
        }
        
        const response = await axios.get(url);
        
        // Handle Spring Boot response: 
        // Kung walang nahanap, ang backend mo ay nagbabalik ng String "[]" 
        // o List. Kailangan nating siguraduhin na array ang mase-set.
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        setSongs(data);
        
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