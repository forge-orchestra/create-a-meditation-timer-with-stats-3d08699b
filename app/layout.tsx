import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LucideIcon } from 'lucide-react';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Forge-app - Meditation Timer',
  description: 'A meditation timer application to enhance mindfulness practice with customizable timers and progress tracking.',
  keywords: ['meditation', 'timer', 'mindfulness', 'progress tracking'],
  author: 'Your Name',
};

const GlobalProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={inter.className}>{children}</div>;
};

const Navigation: React.FC = () => (
  <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <div className="text-xl font-bold">Forge-app</div>
    <div className="flex space-x-4">
      <a href="/" className="hover:text-gray-400">Home</a>
      <a href="/history" className="hover:text-gray-400">History</a>
      <a href="/stats" className="hover:text-gray-400">Stats</a>
    </div>
  </nav>
);

const Footer: React.FC = () => (
  <footer className="p-4 bg-gray-800 text-white text-center">
    <p>&copy; {new Date().getFullYear()} Forge-app. All rights reserved.</p>
  </footer>
);

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col min-h-screen">
        <GlobalProviders>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
};

export default RootLayout;