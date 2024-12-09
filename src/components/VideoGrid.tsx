import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface Video {
  id: string;
  filename: string;
  url: string;
  title: string;
  author: string;
  views: string;
}

export function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/videos.php`)
      .then(response => response.json())
      .then(data => setVideos(data.videos))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="font-comfortaa font-bold text-2xl mb-6">Your Videos</h2>
      {videos.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No videos uploaded yet. Click the Upload button to add some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative group">
                <video
                  className="w-full aspect-video object-cover"
                  poster={`${API_BASE_URL}${video.url}#t=0.1`}
                >
                  <source src={`${API_BASE_URL}${video.url}`} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-comfortaa font-bold text-lg mb-1 truncate">{video.title}</h3>
                <p className="text-gray-600 text-sm">{video.author}</p>
                <p className="text-gray-500 text-sm mt-1">{video.views}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}