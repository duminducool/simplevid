import React from 'react';
import { Video, Upload, Search } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
}

export function Header({ onUploadClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Video className="h-8 w-8 text-red-500" />
            <h1 className="ml-2 text-2xl font-bold font-comfortaa text-gray-900">SimpleVid</h1>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button 
            onClick={onUploadClick}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-comfortaa"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload
          </button>
        </div>
      </div>
    </header>
  );
}