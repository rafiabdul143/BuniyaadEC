import React from 'react';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
className?: string;
}


export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
return (
<input
{...props}
className={`px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500 ${className}`}
/>
);
};