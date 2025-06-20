import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounceSlow"></div>
      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounceSlow" style={{animationDelay: '0.2s'}}></div>
      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounceSlow" style={{animationDelay: '0.4s'}}></div>
    </div>
  );
};

export default LoadingSpinner;