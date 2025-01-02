import { useEffect, useState } from 'react';
import './AnimatedDigit.css';

interface AnimatedDigitProps {
  value: string;
  paused: boolean;
}

export function AnimatedDigit({ value, paused }: AnimatedDigitProps) {
  const [flip, setFlip] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (displayValue !== value) {
      setFlip(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setFlip(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  return (
    <div className={`flip-card ${flip ? 'flip' : ''}`}>
      <div className="card-face card-face-front">
        {displayValue}
      </div>
      <div className="card-face card-face-back">
        {value}
      </div>
    </div>
  );
}