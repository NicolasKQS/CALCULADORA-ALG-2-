import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Acerca del Equipo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Kevin Quisbert</h3>
          <p className="text-gray-300">Especialista en métodos numéricos y optimización</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">David Uruchi</h3>
          <p className="text-gray-300">Experto en álgebra lineal y sistemas de ecuaciones</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Emanuel Quispe</h3>
          <p className="text-gray-300">Especialista en interpolación y teoría de errores</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Takeshi Carvajal</h3>
          <p className="text-gray-300">Experto en visualización de datos y UX</p>
        </div>
      </div>

      <div className="mt-6 bg-gray-700 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">MathSolver Pro</h3>
        <p className="text-gray-300">
          Una herramienta completa para análisis numérico desarrollada como proyecto académico.
          Combina métodos matemáticos avanzados con una interfaz intuitiva.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;