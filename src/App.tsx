import React, { useState } from 'react';
import { Header } from './components/Header';
import { VideoUploader } from './components/VideoUploader';
import { VideoGrid } from './components/VideoGrid';

function App() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onUploadClick={() => setIsUploading(true)} />
      {isUploading ? (
        <VideoUploader />
      ) : (
        <VideoGrid />
      )}
    </div>
  );
}

export default App;