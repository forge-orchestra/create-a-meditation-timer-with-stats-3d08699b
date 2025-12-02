"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import { Loader, AlertCircle } from 'lucide-react';
import 'tailwindcss/tailwind.css';

interface MeditationSession {
  id: number;
  duration: number;
  date: string;
}

const DashboardPage = () => {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions');
        if (!response.ok) throw new Error('Failed to fetch sessions');
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <AlertCircle className="inline mr-2" />
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  const data = {
    labels: sessions.map(session => new Date(session.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Meditation Duration (minutes)',
        data: sessions.map(session => session.duration),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meditation Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <Line data={data} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Meditation History</h2>
        <ul>
          {sessions.map(session => (
            <li key={session.id} className="border-b border-gray-200 py-2">
              <span className="font-medium">{new Date(session.date).toLocaleDateString()}</span>: {session.duration} minutes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;