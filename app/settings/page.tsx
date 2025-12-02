'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { Switch } from '@headlessui/react';

type UserSettings = {
  meditationDuration: number;
  notificationsEnabled: boolean;
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    meditationDuration: 10,
    notificationsEnabled: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user settings
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, meditationDuration: parseInt(e.target.value) });
  };

  const handleNotificationToggle = (enabled: boolean) => {
    setSettings({ ...settings, notificationsEnabled: enabled });
  };

  const saveSettings = async () => {
    try {
      setLoading(true);
      // Simulate saving settings
      setTimeout(() => {
        setLoading(false);
        router.push('/');
      }, 1000);
    } catch (err) {
      setError('Failed to save settings');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Settings className="mr-2" /> Settings
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Meditation Duration (minutes)</label>
        <input
          type="number"
          value={settings.meditationDuration}
          onChange={handleDurationChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Switch
          checked={settings.notificationsEnabled}
          onChange={handleNotificationToggle}
          className={`${settings.notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full`}
          />
        </Switch>
        <span className="ml-3 text-sm">Enable Notifications</span>
      </div>
      <button
        onClick={saveSettings}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;