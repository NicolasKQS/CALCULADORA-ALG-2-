import React from 'react';

const MathHeader = ({ onNavClick }) => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 shadow-lg sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-3xl font-bold cursor-pointer transition-all duration-300 hover:text-purple-400"
          onClick={() => onNavClick('dashboard')}
        >
          MathSolver Pro
        </h1>
        <nav className="flex space-x-4">
          <button 
            onClick={() => onNavClick('dashboard')} 
            className="px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Inicio
          </button>
          <button 
            onClick={() => onNavClick('dashboard')}
            className="px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Métodos
          </button>
          <button 
            onClick={() => onNavClick('about')}
            className="px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Acerca de
          </button>
        </nav>
      </div>
    </header>
  );
};

export default MathHeader;