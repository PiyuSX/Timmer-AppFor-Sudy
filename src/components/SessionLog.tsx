import React from 'react';
import { Download, Trash2 } from 'lucide-react';

interface Session {
  startTime: Date;
  endTime: Date;
  duration: number;
}

interface SessionLogProps {
  sessions: Session[];
  onExport: () => void;
  onClearSessions: () => void;
}

export function SessionLog({ sessions, onExport, onClearSessions }: SessionLogProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString();
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const getTotalDuration = () => {
    return sessions.reduce((acc, session) => acc + session.duration, 0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-mono">Study Sessions</h2>
        <div className="flex space-x-4">
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-white/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={onClearSessions}
            className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-white/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>
      
      {sessions.length > 0 && (
        <div className="mb-6">
          <p className="text-lg font-mono">
            Total Study Time: {formatDuration(getTotalDuration())}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="bg-white/5 p-4 rounded-lg font-mono"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-white/60">
                  {formatDate(session.startTime)} - {formatDate(session.endTime)}
                </p>
                <p className="text-lg">{formatDuration(session.duration)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}