import React from 'react';
import { IRCResult } from '../types';

interface Props {
  result: IRCResult;
  onReset: () => void;
}

export const ResultViewer: React.FC<Props> = ({ result, onReset }) => {
  const downloadFile = () => {
    const blob = new Blob([result.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.content);
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
                <h3 className="font-bold text-slate-800">Generated Lyrics</h3>
                <p className="text-xs text-slate-500">{result.filename}</p>
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    Copy
                </button>
                <button 
                    onClick={downloadFile}
                    className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download .irc
                </button>
            </div>
        </div>
        <div className="p-6 max-h-96 overflow-y-auto bg-slate-900 text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {result.content}
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button 
                onClick={onReset}
                className="text-sm font-medium text-slate-500 hover:text-indigo-600"
            >
                Convert another file
            </button>
        </div>
    </div>
  );
};
