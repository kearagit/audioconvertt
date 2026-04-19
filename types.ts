export interface ProcessingState {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  message?: string;
}

export interface IRCResult {
  content: string;
  filename: string;
}
