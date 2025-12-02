import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/router';

interface TimerProps {
  initialMinutes: number;
  initialSeconds: number;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  const tick = useCallback(() => {
    if (isActive && !isPaused) {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setIsActive(false);
      }
    }
  }, [isActive, isPaused, minutes, seconds]);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  const handleStartPause = () => {
    setIsActive(!isActive);
    setIsPaused(isActive && !isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="text-6xl font-bold mb-4" aria-live="polite">
        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleStartPause}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={isActive ? 'Pause timer' : 'Start timer'}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Reset timer"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default Timer;