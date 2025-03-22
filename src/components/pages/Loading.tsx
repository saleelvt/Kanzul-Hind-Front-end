// src/components/pages/Loading.tsx
import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-300 via-gray-100 to-white">
    <div className=" flex items-center flex-col">
      <div className="w-12 h-12 border-5 border-t-4 border-t-gray-600 border-green-900 rounded-full animate-spin"></div>
      
     
    </div>
  </div>
  );
};
