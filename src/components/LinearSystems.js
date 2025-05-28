import React, { useState } from 'react';

const LinearSystems = () => {
  const [method, setMethod] = useState('gauss');
  const [matrixSize, setMatrixSize] = useState('3');
  const [matrix, setMatrix] = useState([
    [1, 2, 3, 10],
    [4, 5, 6, 20],
    [7, 8, 9, 30]
  ]);
  const [results, setResults] = useState({
    solution: null,
    steps: [],
    error: null,
    L: null,
    U: null,
    detailedSteps: []
  });

  const handleMatrixSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 5) {
      setMatrixSize(size);
      const newMatrix = Array(size).fill().map(() => Array(size + 1).fill(0));
      setMatrix(newMatrix);
      setResults({
        solution: null,
        steps: [],
        error: null,
        L: null,
        U: null,
        detailedSteps: []
      });
    }
  };

  const handleMatrixChange = (row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
    setResults({
      solution: null,
      steps: [],
      error: null,
      L: null,
      U: null,
      detailedSteps: []
    });
  };

  const solveSystem = () => {
    try {
      let solution;
      const detailedSteps = [];
      
      if (method === 'gauss') {
        solution = gaussianElimination([...matrix], detailedSteps);
      } else if (method === 'gaussJordan') {
        solution = gaussJordanElimination([...matrix], detailedSteps);
      } else {
        solution = luDecomposition([...matrix], detailedSteps);
      }
      
      setResults({
        ...solution,
        detailedSteps
      });
    } catch (error) {
      setResults({
        solution: null,
        steps: [],
        error: error.message,
        L: null,
        U: null,
        detailedSteps: []
      });
    }
  };

  const gaussianElimination = (matrix, detailedSteps) => {
    const n = matrix.length;
    const steps = [];
    
    detailedSteps.push({
      title: "Matriz Inicial",
      description: "Comenzamos con la matriz aumentada del sistema.",
      matrix: JSON.parse(JSON.stringify(matrix))
    });

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
          maxRow = j;
        }
      }

      if (maxRow !== i) {
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
        detailedSteps.push({
          title: `Paso ${i+1}: Pivoteo`,
          description: `Intercambiamos fila ${i+1} con fila ${maxRow+1} para tener el mayor pivote.`,
          matrix: JSON.parse(JSON.stringify(matrix)),
          pivot: { row1: i, row2: maxRow }
        });
      }

      for (let j = i + 1; j < n; j++) {
        const factor = matrix[j][i] / matrix[i][i];
        
        detailedSteps.push({
          title: `Paso ${i+1}.${j}: Cálculo de multiplicador`,
          description: `Calculamos el multiplicador para fila ${j+1}: m = ${matrix[j][i].toFixed(2)} / ${matrix[i][i].toFixed(2)} = ${factor.toFixed(2)}`,
          matrix: JSON.parse(JSON.stringify(matrix)),
          multiplier: { row: j, value: factor, pivotRow: i }
        });

        for (let k = i; k < n + 1; k++) {
          matrix[j][k] -= factor * matrix[i][k];
        }

        detailedSteps.push({
          title: `Paso ${i+1}.${j}: Eliminación`,
          description: `Restamos m × fila ${i+1} a fila ${j+1} para eliminar x${i+1} en esta fila.`,
          matrix: JSON.parse(JSON.stringify(matrix)),
          operation: { targetRow: j, pivotRow: i, multiplier: factor }
        });
      }
    }

    const solution = new Array(n);
    const backSubSteps = [];
    
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = matrix[i][n];
      let stepDescription = `x${i+1} = (${matrix[i][n].toFixed(2)}`;
      
      for (let j = i + 1; j < n; j++) {
        solution[i] -= matrix[i][j] * solution[j];
        stepDescription += ` - ${matrix[i][j].toFixed(2)}×${solution[j].toFixed(2)}`;
      }
      
      solution[i] /= matrix[i][i];
      stepDescription += `) / ${matrix[i][i].toFixed(2)} = ${solution[i].toFixed(2)}`;
      
      backSubSteps.push({
        variable: `x${i+1}`,
        calculation: stepDescription,
        value: solution[i]
      });
    }

    return {
      method: 'Eliminación Gaussiana',
      solution,
      steps,
      matrix: JSON.parse(JSON.stringify(matrix)),
      error: null,
      L: null,
      U: null,
      detailedSteps
    };
  };

  const renderMatrix = (matrix, highlight = {}) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i} className={highlight.row1 === i || highlight.row2 === i ? 'bg-purple-900/30' : ''}>
                {row.map((val, j) => (
                  <td 
                    key={j} 
                    className={`px-3 py-2 text-center 
                      ${j === highlight.pivotCol ? 'bg-purple-500/30' : ''}
                      ${j === matrix[0].length - 1 ? 'border-l-2 border-gray-500' : ''}`}
                  >
                    {typeof val === 'number' ? val.toFixed(4) : val}
                    {i === highlight.pivotRow && j === highlight.targetCol && (
                      <span className="text-xs text-purple-300 block">m = {highlight.multiplier?.toFixed(4)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">Sistemas de Ecuaciones Lineales</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-300 mb-2">Método</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="gauss">Eliminación Gaussiana</option>
            <option value="gaussJordan">Gauss-Jordan</option>
            <option value="lu">Descomposición LU</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Tamaño del sistema (2-5)</label>
          <input
            type="number"
            min="2"
            max="5"
            value={matrixSize}
            onChange={handleMatrixSizeChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Matriz aumentada (A|b)</label>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex} className="px-2 py-2">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                        className="w-16 px-2 py-1 bg-gray-600 border border-gray-500 rounded focus:ring focus:ring-purple-500 focus:border-transparent"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={solveSystem}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Resolver Sistema
      </button>

      {results.error && (
        <div className="mt-4 p-3 bg-red-900 text-white rounded-lg">{results.error}</div>
      )}

      {results.detailedSteps.length > 0 && (
        <div className="mt-8 space-y-8">
          <h4 className="text-xl font-semibold text-purple-400 mb-4">Explicación Detallada:</h4>
          
          {results.detailedSteps.map((step, idx) => (
            <div key={idx} className="bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-lg mb-2">{step.title}</h5>
              <p className="text-gray-300 mb-3">{step.description}</p>
              
              {step.matrix && renderMatrix(step.matrix, {
                row1: step.pivot?.row1,
                row2: step.pivot?.row2,
                pivotCol: step.pivotCol,
                pivotRow: step.operation?.pivotRow,
                targetCol: step.operation?.targetRow,
                multiplier: step.operation?.multiplier
              })}
              
              {step.backSubSteps && (
                <div className="mt-4 space-y-2">
                  {step.backSubSteps.map((subStep, i) => (
                    <div key={i} className="bg-gray-800 p-3 rounded">
                      <p className="font-mono text-purple-300">{subStep.variable}:</p>
                      <p className="font-mono text-sm">{subStep.calculation}</p>
                      <p className="font-bold mt-1">Resultado: {subStep.value.toFixed(6)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinearSystems;

// DONE