import React, { useState } from 'react';

const Optimization = () => {
  const [method, setMethod] = useState('unidimensional');
  const [functionStr, setFunctionStr] = useState('x^2 - 4*x + 4');
  const [a, setA] = useState('0');
  const [b, setB] = useState('4');
  const [x0, setX0] = useState('[1,1]');
  const [result, setResult] = useState(null);

  const calculateOptimization = () => {
    try {
      if (method === 'unidimensional') {
        setResult(goldenSectionSearch());
      } else {
        setResult(gradientDescent());
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const goldenSectionSearch = () => {
    const f = x => evaluateFunction(functionStr, x);
    const phi = (1 + Math.sqrt(5)) / 2;
    const tol = 1e-6;
    let aNum = parseFloat(a);
    let bNum = parseFloat(b);
    let c = bNum - (bNum - aNum) / phi;
    let d = aNum + (bNum - aNum) / phi;
    
    const iterations = [];
    let iterationCount = 0;
    
    while (Math.abs(bNum - aNum) > tol && iterationCount < 100) {
      iterationCount++;
      
      if (f(c) < f(d)) {
        bNum = d;
      } else {
        aNum = c;
      }
      
      c = bNum - (bNum - aNum) / phi;
      d = aNum + (bNum - aNum) / phi;
      
      iterations.push({
        iteration: iterationCount,
        a: aNum,
        b: bNum,
        currentMin: (aNum + bNum) / 2,
        fMin: f((aNum + bNum) / 2)
      });
    }
    
    return {
      method: 'Búsqueda de la Sección Áurea',
      minimum: (aNum + bNum) / 2,
      fMin: f((aNum + bNum) / 2),
      iterations,
      iterationsCount: iterationCount
    };
  };

  const gradientDescent = () => {
    const f = (x, y) => evaluateFunction(functionStr.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`));
    const h = 1e-6;
    const learningRate = 0.1;
    const tol = 1e-6;
    
    const initialPoint = x0.replace(/[\[\]]/g, '').split(',').map(Number);
    if (initialPoint.length !== 2) throw new Error("Formato incorrecto. Usar [x,y]");
    
    let [x, y] = initialPoint;
    let iterations = [];
    let iterationCount = 0;
    let prevValue = f(x, y);
    
    while (iterationCount < 100) {
      iterationCount++;
      
      const dfdx = (f(x + h, y) - f(x, y)) / h;
      const dfdy = (f(x, y + h) - f(x, y)) / h;
      
      x -= learningRate * dfdx;
      y -= learningRate * dfdy;
      
      const currentValue = f(x, y);
      
      iterations.push({
        iteration: iterationCount,
        x,
        y,
        fValue: currentValue,
        gradient: [dfdx, dfdy]
      });
      
      if (Math.abs(currentValue - prevValue) < tol) break;
      prevValue = currentValue;
    }
    
    return {
      method: 'Descenso de Gradiente',
      minimum: [x, y],
      fMin: f(x, y),
      iterations,
      iterationsCount: iterationCount
    };
  };

  const evaluateFunction = (expr, x) => {
    try {
      const expression = expr.replace(/x/g, `(${x})`);
      const withExponents = expression.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
      return new Function(`return ${withExponents}`)();
    } catch (err) {
      throw new Error('Expresión inválida');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white relative z-10">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">Optimización Numérica</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-300 mb-2">Método</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="unidimensional">Unidimensional (Sección Áurea)</option>
            <option value="multidimensional">Multidimensional (Descenso de Gradiente)</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Función (usar 'x' o 'x,y')</label>
          <input
            type="text"
            value={functionStr}
            onChange={(e) => setFunctionStr(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {method === 'unidimensional' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">Límite inferior (a)</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Límite superior (b)</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Punto inicial [x,y]</label>
          <input
            type="text"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      )}

      <button
        onClick={calculateOptimization}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Calcular Optimización
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-lg font-semibold mb-2 text-purple-400">Resultados:</h4>
          <p className="mb-2">Método: {result.method}</p>
          
          {method === 'unidimensional' ? (
            <>
              <p className="mb-2">Mínimo encontrado: x = {result.minimum.toFixed(6)}</p>
              <p className="mb-2">Valor de la función: f(x) = {result.fMin.toFixed(6)}</p>
              <p className="mb-2">Iteraciones: {result.iterationsCount}</p>
            </>
          ) : (
            <>
              <p className="mb-2">Mínimo encontrado: ({result.minimum[0].toFixed(6)}, {result.minimum[1].toFixed(6)})</p>
              <p className="mb-2">Valor de la función: f(x,y) = {result.fMin.toFixed(6)}</p>
              <p className="mb-2">Iteraciones: {result.iterationsCount}</p>
            </>
          )}

          <div className="mt-4">
            <h5 className="font-medium mb-1">Proceso de convergencia:</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Iteración</th>
                    {method === 'unidimensional' ? (
                      <>
                        <th className="px-4 py-2 text-left">a</th>
                        <th className="px-4 py-2 text-left">b</th>
                        <th className="px-4 py-2 text-left">x_min</th>
                        <th className="px-4 py-2 text-left">f(x_min)</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-2 text-left">x</th>
                        <th className="px-4 py-2 text-left">y</th>
                        <th className="px-4 py-2 text-left">f(x,y)</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {result.iterations.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                      <td className="px-4 py-2">{row.iteration}</td>
                      {method === 'unidimensional' ? (
                        <>
                          <td className="px-4 py-2">{row.a.toFixed(6)}</td>
                          <td className="px-4 py-2">{row.b.toFixed(6)}</td>
                          <td className="px-4 py-2">{row.currentMin.toFixed(6)}</td>
                          <td className="px-4 py-2">{row.fMin.toFixed(6)}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-2">{row.x.toFixed(6)}</td>
                          <td className="px-4 py-2">{row.y.toFixed(6)}</td>
                          <td className="px-4 py-2">{row.fValue.toFixed(6)}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="font-medium text-purple-400 mb-2">Explicación del Método</h4>
        <p className="text-gray-300">
          {method === 'unidimensional' ? (
            <>
              La búsqueda de la sección áurea es un método para encontrar el mínimo de una función unimodal.
              Reduce el intervalo de búsqueda usando la proporción áurea (1.618) en cada iteración.
            </>
          ) : (
            <>
              El descenso de gradiente es un método iterativo que sigue la dirección opuesta al gradiente
              (dirección de máximo descenso) para encontrar mínimos locales de funciones multidimensionales.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Optimization;

// DONE