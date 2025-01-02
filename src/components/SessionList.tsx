import React from 'react';
import { Download, Trash2, X } from 'lucide-react';
import { formatDate, formatDuration } from '../utils/timeFormat';
import type { Session } from '../types/session';

interface SessionListProps {
  sessions: Session[];
  onExport: () => void;
  onClearSessions: () => void;
  onDeleteSession?: (index: number) => void;
  showTitle?: boolean;
}

export function SessionList({ 
  sessions, 
  onExport, 
  onClearSessions, 
  onDeleteSession,
  showTitle = false 
}: SessionListProps) {
  const getTotalDuration = () => {
    return sessions.reduce((acc, session) => acc + session.duration, 0);
  };

  return (
    <div className="w-full">
      {showTitle && (
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
      )}
      
      {sessions.length > 0 && showTitle && (
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
            className="bg-white/5 p-4 rounded-lg font-mono relative group"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-white/60">
                  {formatDate(session.startTime)} - {formatDate(session.endTime)}
                </p>
                <p className="text-lg">{formatDuration(session.duration)}</p>
              </div>
              {onDeleteSession && (
                <button
                  onClick={() => onDeleteSession(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 p-2 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}