import React from 'react';

const LoadingScreen = ({ size }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 bg-black bg-opacity-70 backdrop-blur-sm" style={{ height: '100%' }}>
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="animate-spin"
      >
        <div className="h-full w-full border-4 border-t-purple-500 border-b-purple-700 rounded-full">
        </div>
      </div>
    </div>
  );
};


export default LoadingScreen;