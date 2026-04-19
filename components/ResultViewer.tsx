import React, { useState, useEffect } from 'react';
import { IRCResult } from '../types';
import { downloadFile } from '../utils/fileHelpers';

interface ResultViewerProps {
  result: IRCResult;
  onReset: () => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ result, onReset }) => {
  const [content, setContent] = useState(result.content);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setContent(result.content);
  }, [result]);

  const handleDownload = () => {
    downloadFile(content, result.filename);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full max-h-[600px]">
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <h3 className="font-semibold text-slate-800">Conversion Complete</h3>
                <p className="text-xs text-slate-500">{result.filename}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={onReset}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            >
                New File
            </button>
        </div>
      </div>

      <div className="flex-1 p-0 relative group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-6 font-mono text-sm leading-relaxed text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/20 bg-slate-50/50"
          spellCheck={false}
        />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={handleCopy}
                className="p-2 bg-white shadow-sm border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                title="Copy to clipboard"
            >
                {copied ? (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                   </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                )}
            </button>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
        <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m0 0l3-3m-3 3h7.5" />
            </svg>
            Download .irc
        </button>
      </div>
    </div>
  );
};