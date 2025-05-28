import React, { useState } from 'react';

const ErrorTheoryForm = () => {
  const [exactValue, setExactValue] = useState('');
  const [approximateValue, setApproximateValue] = useState('');
  const [results, setResults] = useState(null);

  const calculateErrors = () => {
    const exact = parseFloat(exactValue);
    const approx = parseFloat(approximateValue);
    
    if (isNaN(exact) || isNaN(approx)) {
      alert('Por favor ingresa valores numéricos válidos');
      return;
    }

    const absoluteError = Math.abs(exact - approx);
    const relativeError = (absoluteError / Math.abs(exact)) * 100;

    setResults({
      absoluteError: absoluteError.toFixed(6),
      relativeError: relativeError.toFixed(6) + '%'
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white transform transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">Teoría de Errores</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-300 mb-2">Valor Exacto</label>
          <input
            type="number"
            value={exactValue}
            onChange={(e) => setExactValue(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Valor Aproximado</label>
          <input
            type="number"
            value={approximateValue}
            onChange={(e) => setApproximateValue(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      <button
        onClick={calculateErrors}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-purple-500/50"
      >
        Calcular Errores
      </button>

      {results && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg animate-fadeIn">
          <h4 className="font-medium text-white mb-2">Resultados:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg transform transition-all duration-300 hover:scale-105">
              <p className="text-purple-400">Error Absoluto:</p>
              <p className="text-xl">{results.absoluteError}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg transform transition-all duration-300 hover:scale-105">
              <p className="text-purple-400">Error Relativo:</p>
              <p className="text-xl">{results.relativeError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-600">
        <h4 className="font-medium text-purple-400 mb-2">Explicación del Método</h4>
        <p className="text-gray-300">
          El error absoluto mide la diferencia entre el valor exacto y el aproximado. 
          El error relativo expresa esta diferencia como porcentaje del valor exacto, 
          lo que permite comparar la precisión de diferentes mediciones.
        </p>
      </div>
    </div>
  );
};

export default ErrorTheoryForm;

// DONE