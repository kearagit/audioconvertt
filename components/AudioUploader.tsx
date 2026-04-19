import React, { useState, useRef } from 'react';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileSelect, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const validateAndPassFile = (file: File) => {
    if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
      onFileSelect(file);
    } else {
      alert("Please upload a valid audio or video file.");
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div 
      className={`relative w-full p-8 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out text-center cursor-pointer
        ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-slate-400 bg-white'}
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="audio/*,video/*"
        onChange={handleChange}
      />
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`p-4 rounded-full ${dragActive ? 'bg-indigo-100' : 'bg-slate-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {isLoading ? 'Processing...' : 'Upload Audio File'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Drag & drop or click to select (MP3, WAV, M4A, MP4)
          </p>
        </div>
      </div>
    </div>
  );
};