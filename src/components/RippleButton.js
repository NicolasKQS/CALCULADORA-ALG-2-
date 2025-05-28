import React, { useState } from 'react';

const RippleButton = ({ children, onClick, className = '' }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 300);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {isRippling && (
        <span
          className="absolute bg-white opacity-40 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
            width: '8px',
            height: '8px',
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default RippleButton;