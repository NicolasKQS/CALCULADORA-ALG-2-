import React from 'react';

const MethodCard = ({ title, description, icon, onClick }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:bg-gray-700 transform hover:-translate-y-1 hover:scale-105">
      <div className="p-6">
        <div className="text-4xl mb-4 text-purple-400 animate-pulseSlow">{icon}</div>
        <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-gray-300">{description}</p>
        <button 
          onClick={() => onClick(title)}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-purple-500/50"
        >
          Probar método
        </button>
      </div>
    </div>
  );
};

export default MethodCard;