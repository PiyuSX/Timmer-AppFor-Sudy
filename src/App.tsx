import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { SessionMenu } from './components/SessionMenu';
import { SessionList } from './components/SessionList';
import type { Session } from './types/session';

export default function App() {
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('study-sessions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('study-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleSessionEnd = (session: Session) => {
    setSessions((prev) => [...prev, session]);
  };

  const handleExport = () => {
    const csvContent = [
      ['Start Time', 'End Time', 'Duration (seconds)'],
      ...sessions.map((session) => [
        new Date(session.startTime).toLocaleString(),
        new Date(session.endTime).toLocaleString(),
        session.duration,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'study-sessions.csv';
    link.click();
  };

  const handleClearSessions = () => {
    setSessions([]);
  };

  const handleDeleteSession = (index: number) => {
    setSessions(prev => prev.filter((_, i) => i !== index));
  };

  const latestSession = sessions[sessions.length - 1];

  return (
    <div className="min-h-screen bg-black text-white relative">
      <SessionMenu
        sessions={sessions}
        onExport={handleExport}
        onClearSessions={handleClearSessions}
        onDeleteSession={handleDeleteSession}
      />
      
      <div className="flex items-center justify-center min-h-screen">
        <Timer onSessionEnd={handleSessionEnd} />
      </div>
      
      {latestSession && (
        <div className="fixed bottom-0 left-0 right-0 pb-[10px] px-8">
          <div className="max-w-4xl mx-auto">
            <SessionList
              sessions={[latestSession]}
              onExport={handleExport}
              onClearSessions={handleClearSessions}
              onDeleteSession={(index) => handleDeleteSession(sessions.length - 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
}