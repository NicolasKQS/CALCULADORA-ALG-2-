import React, { useState } from 'react';

const NonLinearEquations = () => {
  const [functionStr, setFunctionStr] = useState('x^2 - 4');
  const [method, setMethod] = useState('bisection');
  const [a, setA] = useState('1');
  const [b, setB] = useState('3');
  const [x0, setX0] = useState('2');
  const [tolerance, setTolerance] = useState('0.0001');
  const [maxIterations, setMaxIterations] = useState('100');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Función para evaluar expresiones matemáticas simples
  const evaluateFunction = (expr, x) => {
    try {
      // Reemplazar x con el valor numérico
      const expression = expr.replace(/x/g, `(${x})`);
      
      // Manejar exponentes
      const withExponents = expression.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
      
      // Evaluar la expresión de forma segura
      return new Function(`return ${withExponents}`)();
    } catch (err) {
      throw new Error('Expresión inválida');
    }
  };

  // Derivada numérica
  const numericalDerivative = (f, x, h = 0.0001) => {
    return (f(x + h) - f(x)) / h;
  };

  const solveEquation = () => {
    try {
      const f = x => evaluateFunction(functionStr, x);
      let solution;

      if (method === 'bisection') {
        solution = bisectionMethod(
          f,
          parseFloat(a),
          parseFloat(b),
          parseFloat(tolerance),
          parseInt(maxIterations)
        );
      } else {
        solution = newtonRaphsonMethod(
          f,
          x => numericalDerivative(f, x),
          parseFloat(x0),
          parseFloat(tolerance),
          parseInt(maxIterations)
        );
      }
      setResults(solution);
      setError('');
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  };

  // Método de bisección
  const bisectionMethod = (f, a, b, tol, maxIter) => {
    const iterations = [];
    let c;
    
    if (f(a) * f(b) >= 0) {
      throw new Error("La función debe tener signos opuestos en los extremos del intervalo");
    }

    for (let i = 0; i < maxIter; i++) {
      c = (a + b) / 2;
      iterations.push({
        iteration: i + 1,
        a,
        b,
        c,
        f_c: f(c)
      });

      if (Math.abs(f(c)) < tol) break;

      if (f(c) * f(a) < 0) {
        b = c;
      } else {
        a = c;
      }
    }

    return {
      method: 'Bisección',
      root: c,
      iterations,
      message: `Solución encontrada después de ${iterations.length} iteraciones`
    };
  };

  // Método de Newton-Raphson
  const newtonRaphsonMethod = (f, df, x0, tol, maxIter) => {
    const iterations = [];
    let x = x0;
    
    for (let i = 0; i < maxIter; i++) {
      const fx = f(x);
      const dfx = df(x);
      const xNew = x - fx / dfx;
      
      iterations.push({
        iteration: i + 1,
        x,
        fx,
        dfx,
        xNew,
        error: Math.abs(xNew - x)
      });

      if (Math.abs(xNew - x) < tol) {
        x = xNew;
        break;
      }
      
      x = xNew;
    }

    return {
      method: 'Newton-Raphson',
      root: x,
      iterations,
      message: `Solución encontrada después de ${iterations.length} iteraciones`
    };
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">Ecuaciones No Lineales</h3>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Función (usar 'x' como variable)</label>
        <input
          type="text"
          value={functionStr}
          onChange={(e) => setFunctionStr(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-300 mb-2">Método</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="bisection">Bisección</option>
            <option value="newton">Newton-Raphson</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Tolerancia</label>
          <input
            type="number"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {method === 'bisection' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">Intervalo a</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Intervalo b</label>
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
          <label className="block text-gray-300 mb-2">Valor inicial x0</label>
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Máximo de iteraciones</label>
        <input
          type="number"
          value={maxIterations}
          onChange={(e) => setMaxIterations(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={solveEquation}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Resolver Ecuación
      </button>

      {error && <div className="mt-4 p-3 bg-red-900 text-white rounded-lg">{error}</div>}

      {results && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 text-purple-400">Resultados:</h4>
          <p className="mb-2">Método: {results.method}</p>
          <p className="mb-2">Raíz aproximada: {results.root.toFixed(6)}</p>
          <p className="mb-4">{results.message}</p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg">
              <thead>
                <tr>
                  {method === 'bisection' ? (
                    <>
                      <th className="px-4 py-2 text-left">Iteración</th>
                      <th className="px-4 py-2 text-left">a</th>
                      <th className="px-4 py-2 text-left">b</th>
                      <th className="px-4 py-2 text-left">c</th>
                      <th className="px-4 py-2 text-left">f(c)</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-2 text-left">Iteración</th>
                      <th className="px-4 py-2 text-left">x</th>
                      <th className="px-4 py-2 text-left">f(x)</th>
                      <th className="px-4 py-2 text-left">f'(x)</th>
                      <th className="px-4 py-2 text-left">x_new</th>
                      <th className="px-4 py-2 text-left">Error</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {results.iterations.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                    {method === 'bisection' ? (
                      <>
                        <td className="px-4 py-2">{row.iteration}</td>
                        <td className="px-4 py-2">{row.a.toFixed(6)}</td>
                        <td className="px-4 py-2">{row.b.toFixed(6)}</td>
                        <td className="px-4 py-2">{row.c.toFixed(6)}</td>
                        <td className="px-4 py-2">{row.f_c.toFixed(6)}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{row.iteration}</td>
                        <td className="px-4 py-2">{row.x.toFixed(6)}</td>
                        <td className="px-4 py-2">{row.fx.toFixed(6)}</td>
                        <td className="px-4 py-2">{row.dfx.toFixed(6)}</td>
                        <td className="px-4 py-2">{row.xNew.toFixed(6)}</td>
                        <td className="px-4 py-2">{row.error.toFixed(6)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="font-medium text-purple-400 mb-2">Explicación del Método</h4>
        <p className="text-gray-300">
          {method === 'bisection' ? (
            <>
              El método de bisección divide repetidamente el intervalo [a,b] a la mitad y selecciona el subintervalo que contiene la raíz.
              Es robusto pero converge linealmente. Requiere que f(a) y f(b) tengan signos opuestos.
            </>
          ) : (
            <>
              El método de Newton-Raphson usa aproximaciones lineales sucesivas mediante la derivada.
              Converge cuadráticamente cerca de la raíz pero puede divergir si el valor inicial no es adecuado.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default NonLinearEquations;