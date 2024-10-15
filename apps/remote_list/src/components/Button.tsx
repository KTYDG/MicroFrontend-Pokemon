import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-red-600 disabled:bg-red-900 p-2 rounded-xl min-w-32"
      {...props}
    >
      {children}
    </button>
  );
};
