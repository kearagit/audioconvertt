import React, { useRef } from 'react';

interface Props {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const AudioUploader: React.FC<Props> = ({ onFileSelect, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
        ${isLoading ? 'border-slate-200 bg-slate-50 cursor-not-allowed' : 'border-indigo-300 bg-white hover:border-indigo-500 hover:shadow-md'}
      `}
      onClick={() => !isLoading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        accept="audio/*,video/*"
      />
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">Upload Audio or Video</h3>
      <p className="text-slate-500 text-sm">Drag and drop or click to browse</p>
      <p className="text-slate-400 text-xs mt-4">Supports MP3, WAV, MP4, etc.</p>
    </div>
  );
};
