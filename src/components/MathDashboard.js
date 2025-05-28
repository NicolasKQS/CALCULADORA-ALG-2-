import React from 'react';
import MethodCard from './MethodCard';

const MathDashboard = ({ onMethodSelect }) => {
  const methods = [
    {
      title: 'Teoría de Errores',
      description: 'Calcula error absoluto y relativo de tus mediciones',
      icon: '±'
    },
    {
      title: 'Ecuaciones No Lineales',
      description: 'Resuelve usando Bisección o Newton-Raphson',
      icon: 'ƒ'
    },
    {
      title: 'Sistemas Lineales',
      description: 'Eliminación Gaussiana, Gauss-Jordan o LU',
      icon: '∑'
    },
    {
      title: 'Interpolación',
      description: 'Diferencias divididas o Mínimos Cuadrados',
      icon: '↔'
    },
    {
      title: 'Optimización',
      description: 'Métodos unidimensionales y multidimensionales',
      icon: '↯'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Selecciona un método</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map((method, index) => (
          <MethodCard 
            key={index} 
            {...method} 
            onClick={onMethodSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default MathDashboard;

// DONE