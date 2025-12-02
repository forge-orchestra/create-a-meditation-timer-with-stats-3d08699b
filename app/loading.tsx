import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Loading component to display a spinner during asynchronous operations.
 * 
 * @returns {JSX.Element} A loading spinner component.
 */
const Loading: React.FC = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader className="animate-spin text-blue-500" size={48} />
    </div>
  );
};

export default Loading;