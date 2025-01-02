import React from 'react';
import { Menu } from 'lucide-react';
import { SessionList } from './SessionList';
import type { Session } from '../types/session';

interface SessionMenuProps {
  sessions: Session[];
  onExport: () => void;
  onClearSessions: () => void;
  onDeleteSession: (index: number) => void;
}

export function SessionMenu({ sessions, onExport, onClearSessions, onDeleteSession }: SessionMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 left-8 p-4 rounded-full hover:bg-white/10 transition-colors z-10"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 w-96 h-full bg-zinc-900 transform transition-transform duration-300 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8">
          <SessionList
            sessions={sessions}
            onExport={onExport}
            onClearSessions={onClearSessions}
            onDeleteSession={onDeleteSession}
            showTitle
          />
        </div>
      </div>
    </>
  );
}