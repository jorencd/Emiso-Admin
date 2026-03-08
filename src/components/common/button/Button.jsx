import React from 'react';

const Button = ({ text, onClick, type = 'button', color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-500 hover:bg-blue-700 text-white',
    red: 'bg-red-500 hover:bg-red-700 text-white',
    green: 'bg-[#134E5E] hover:bg-[#0f3a4a] text-white',
    gray: 'bg-gray-500 hover:bg-gray-700 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colors[color]} px-4 w-35 py-2 rounded-md font-semibold transition-colors duration-300`}
    >
      {text}
    </button>
  );
};

export default Button;