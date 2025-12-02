import React from 'react';
import { LucideProps, Icon as LucideIcon } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor', className = '', ...props }) => {
  return (
    <LucideIcon
      icon={name}
      size={size}
      color={color}
      className={`w-${size} h-${size} ${className}`}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
};

export default Icon;