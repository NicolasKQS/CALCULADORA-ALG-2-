import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-48 p-2 mt-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg transform -translate-x-1/2 left-1/2">
          {text}
          <div className="absolute w-3 h-3 -mt-1 transform rotate-45 bg-gray-800 left-1/2 -translate-x-1/2 -top-1"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;