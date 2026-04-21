import React from 'react';
import MusicNoteOutlined from '@mui/icons-material/MusicNoteOutlined';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900 to-black border-gray-800' 
        : 'bg-gradient-to-r from-gray-100 to-white border-gray-200'
    } border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 p-2 rounded-full`}>
            <MusicNoteOutlined className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            MusicHub
          </h1>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <LightMode sx={{ fontSize: 24 }} />
          ) : (
            <DarkMode sx={{ fontSize: 24 }} />
          )}
        </button>
      </div>
    </header>
  );
};