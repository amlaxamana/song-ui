import React, { useState } from 'react';
import { SearchOutlined, ClearOutlined } from '@mui/icons-material';

export const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 border border-gray-700 focus-within:border-red-500 transition-colors">
        <SearchOutlined className="text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={searchQuery}
          onChange={handleChange}
          className="bg-transparent outline-none flex-1 text-sm text-white placeholder-gray-400"
        />
        {searchQuery && (
          <button onClick={handleClear} className="text-gray-400 hover:text-white transition">
            <ClearOutlined />
          </button>
        )}
      </div>
    </div>
  );
};