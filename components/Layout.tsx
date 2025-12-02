import { ReactNode } from 'react';
import { Home, BarChart2 } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Forge-app</h1>
        <nav aria-label="Main Navigation">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="flex items-center space-x-1" aria-label="Home">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/stats" className="flex items-center space-x-1" aria-label="Stats">
                <BarChart2 className="w-5 h-5" />
                <span>Stats</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2023 Forge-app. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;