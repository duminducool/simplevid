import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export function VideoUploader() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadStatus('uploading');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload.php`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setUploadStatus('success');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    disabled: uploadStatus === 'uploading'
  });

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-500'}
          ${uploadStatus === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {uploadStatus === 'success' ? (
          <div className="text-green-500">
            <CheckCircle className="mx-auto h-12 w-12" />
            <p className="mt-4 font-comfortaa font-bold text-lg">Upload successful!</p>
          </div>
        ) : uploadStatus === 'error' ? (
          <div className="text-red-500">
            <AlertCircle className="mx-auto h-12 w-12" />
            <p className="mt-4 font-comfortaa font-bold text-lg">Upload failed</p>
            <p className="mt-2 text-sm">{errorMessage}</p>
          </div>
        ) : (
          <>
            <Upload className={`mx-auto h-12 w-12 ${uploadStatus === 'uploading' ? 'animate-bounce' : 'text-gray-400'}`} />
            <p className="mt-4 font-comfortaa font-bold text-lg text-gray-700">
              {uploadStatus === 'uploading' ? 'Uploading...' : isDragActive ? 'Drop your video here' : 'Drag & drop your video here'}
            </p>
            <p className="mt-2 text-gray-500">or click to select a file</p>
            <p className="mt-2 text-sm text-gray-400">Supported formats: MP4, WebM, OGG</p>
          </>
        )}
      </div>
    </div>
  );
}