import React, { useState } from 'react';
import { SearchOutlined, ClearOutlined } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

export const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative max-w-md mx-auto mb-6">
      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} rounded-full px-4 py-2 border focus-within:border-red-500 transition-colors`}>
        <SearchOutlined className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={searchQuery}
          onChange={handleChange}
          className={`bg-transparent outline-none flex-1 text-sm placeholder-${theme === 'dark' ? 'gray-400' : 'gray-400'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        />
        {searchQuery && (
          <button onClick={handleClear} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}>
            <ClearOutlined />
          </button>
        )}
      </div>
    </div>
  );
};