import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

'use client';

const MeditationTimer: React.FC = () => {
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
      setHistory([10, 20, 30]);
    }, 1000);
  }, []);

  const handleStart = () => {
    // Start meditation logic
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Forge-app</h1>
      </header>
      <main className="p-4">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Meditation Timer</h2>
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={duration}
              onChange={handleDurationChange}
              className="border border-gray-300 rounded p-2 mr-4"
              placeholder="Set duration (minutes)"
            />
            <button
              onClick={handleStart}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Start
            </button>
          </div>
          <LucideIcon name="clock" className="text-blue-600" />
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Meditation History</h2>
          <ul>
            {history.map((time, index) => (
              <li key={index} className="mb-2">
                {time} minutes
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2023 Forge-app</p>
      </footer>
    </div>
  );
};

export default MeditationTimer;