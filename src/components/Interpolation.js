import React, { useState } from 'react';

const Interpolation = () => {
  const [method, setMethod] = useState('newton');
  const [points, setPoints] = useState([
    {x: 0, y: 1}, 
    {x: 1, y: 4}, 
    {x: 2, y: 9}
  ]);
  const [result, setResult] = useState(null);

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index][field] = parseFloat(value) || 0;
    setPoints(newPoints);
  };

  const addPoint = () => {
    setPoints([...points, {x: 0, y: 0}]);
  };

  const removePoint = (index) => {
    if (points.length > 2) {
      const newPoints = points.filter((_, i) => i !== index);
      setPoints(newPoints);
    }
  };

  const calculateInterpolation = () => {
    try {
      if (method === 'newton') {
        setResult(newtonDividedDifferences());
      } else {
        setResult(leastSquares());
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const newtonDividedDifferences = () => {
    const n = points.length;
    const dividedDiff = [...Array(n)].map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
      dividedDiff[i][0] = points[i].y;
    }
    
    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        dividedDiff[i][j] = (dividedDiff[i+1][j-1] - dividedDiff[i][j-1]) / 
                          (points[i+j].x - points[i].x);
      }
    }
    
    let polynomial = dividedDiff[0][0].toString();
    let term = '';
    
    for (let i = 1; i < n; i++) {
      term += `(x - ${points[i-1].x})`;
      polynomial += ` + ${dividedDiff[0][i]}${term}`;
    }
    
    return {
      method: 'Diferencias Divididas de Newton',
      polynomial,
      coefficients: dividedDiff[0],
      points: [...points]
    };
  };

  const leastSquares = () => {
    const n = points.length;
    const degree = Math.min(3, n - 1);
    
    const X = points.map(p => {
      const row = [];
      for (let i = 0; i <= degree; i++) {
        row.push(Math.pow(p.x, i));
      }
      return row;
    });
    
    const y = points.map(p => p.y);
    
    const XtX = [...Array(degree + 1)].map(() => Array(degree + 1).fill(0));
    const Xty = Array(degree + 1).fill(0);
    
    for (let i = 0; i <= degree; i++) {
      for (let j = 0; j <= degree; j++) {
        XtX[i][j] = points.reduce((sum, p, k) => sum + X[k][i] * X[k][j], 0);
      }
      Xty[i] = points.reduce((sum, p, k) => sum + X[k][i] * y[k], 0);
    }
    
    const coefficients = gaussianElimination(XtX, Xty);
    
    let polynomial = coefficients.map((c, i) => {
      return `${c.toFixed(4)}${i > 0 ? `x^${i}` : ''}`;
    }).join(' + ');
    
    return {
      method: 'Mínimos Cuadrados',
      polynomial,
      coefficients,
      points: [...points],
      degree
    };
  };

  const gaussianElimination = (matrix, vector) => {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
          maxRow = j;
        }
      }
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
      [vector[i], vector[maxRow]] = [vector[maxRow], vector[i]];
      
      for (let j = i + 1; j < n; j++) {
        const factor = matrix[j][i] / matrix[i][i];
        for (let k = i; k < n; k++) {
          matrix[j][k] -= factor * matrix[i][k];
        }
        vector[j] -= factor * vector[i];
      }
    }
    
    const solution = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = vector[i];
      for (let j = i + 1; j < n; j++) {
        solution[i] -= matrix[i][j] * solution[j];
      }
      solution[i] /= matrix[i][i];
    }
    
    return solution;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white relative z-10">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">Interpolación Polinomial</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-300 mb-2">Método</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="newton">Diferencias Divididas (Newton)</option>
            <option value="leastSquares">Mínimos Cuadrados</option>
          </select>
        </div>
        <div>
          <button
            onClick={addPoint}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Añadir Punto
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Puntos (x, y)</label>
        <div className="space-y-2">
          {points.map((point, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="number"
                value={point.x}
                onChange={(e) => handlePointChange(index, 'x', e.target.value)}
                className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded"
              />
              <input
                type="number"
                value={point.y}
                onChange={(e) => handlePointChange(index, 'y', e.target.value)}
                className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded"
              />
              <button
                onClick={() => removePoint(index)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={calculateInterpolation}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Calcular Interpolación
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-lg font-semibold mb-2 text-purple-400">Resultados:</h4>
          <p className="mb-2">Método: {result.method}</p>
          <p className="mb-2">Polinomio: {result.polynomial}</p>
          
          {result.coefficients && (
            <div className="mt-2">
              <p className="font-medium mb-1">Coeficientes:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {result.coefficients.map((coef, i) => (
                  <div key={i} className="bg-gray-800 p-2 rounded">
                    a<sub>{i}</sub> = {coef.toFixed(6)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="font-medium text-purple-400 mb-2">Explicación del Método</h4>
        <p className="text-gray-300">
          {method === 'newton' ? (
            <>
              El método de diferencias divididas de Newton construye un polinomio que pasa exactamente
              por todos los puntos dados. Es útil cuando se tienen pocos puntos y se requiere precisión.
            </>
          ) : (
            <>
              El método de mínimos cuadrados encuentra el polinomio que mejor ajusta a los puntos en el
              sentido de minimizar la suma de los cuadrados de los errores. Ideal para datos con ruido.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Interpolation;