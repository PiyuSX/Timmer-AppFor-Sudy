import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { AnimatedDigit } from './AnimatedDigit';
import type { Session } from '../types/session';

interface TimerProps {
  onSessionEnd: (session: Session) => void;
}

export function Timer({ onSessionEnd }: TimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTimeDigits = (seconds: number) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return { hours, minutes, secs };
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(new Date());
    }
  };

  const handlePause = () => {
    if (isRunning && startTime) {
      setIsRunning(false);
      const endTime = new Date();
      onSessionEnd({
        startTime,
        endTime,
        duration: time,
      });
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setStartTime(null);
  };

  const { hours, minutes, secs } = formatTimeDigits(time);

  return (
    <div className="flex flex-col items-center space-y-16">
      <div className="flex items-center space-x-6">
        <AnimatedDigit value={hours[0]} />
        <AnimatedDigit value={hours[1]} />
        <div className="text-8xl font-bold">:</div>
        <AnimatedDigit value={minutes[0]} />
        <AnimatedDigit value={minutes[1]} />
        <div className="text-8xl font-bold">:</div>
        <AnimatedDigit value={secs[0]} />
        <AnimatedDigit value={secs[1]} />
      </div>
      <div className="flex space-x-8">
        <button
          onClick={isRunning ? handlePause : handleStart}
          className="p-6 rounded-full hover:bg-white/10 transition-colors"
        >
          {isRunning ? (
            <Pause className="w-10 h-10" />
          ) : (
            <Play className="w-10 h-10" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="p-6 rounded-full hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}