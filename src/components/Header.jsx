import React from 'react';
import MusicNoteOutlined from '@mui/icons-material/MusicNoteOutlined';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 p-2 rounded-full">
          <MusicNoteOutlined className="text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          MusicHub
        </h1>
      </div>
    </header>
  );
};