import React from 'react';
import classNames from 'classnames';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
};

export const Button: React.FC<ButtonProps> = ({ children, size = 'md', className, ...props }) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={classNames(
        'bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition font-medium',
        sizeClasses[size],
        className
      )}
      {...props}>
      {children}
    </button>
  );
};
