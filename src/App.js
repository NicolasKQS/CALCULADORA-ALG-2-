import React, { useState } from 'react';
import MathHeader from './components/MathHeader';
import MathDashboard from './components/MathDashboard';
import ErrorTheoryForm from './components/ErrorTheoryForm';
import NonLinearEquations from './components/NonLinearEquations';
import LinearSystems from './components/LinearSystems';
import Interpolation from './components/Interpolation';
import Optimization from './components/Optimization';
import AboutSection from './components/AboutSection';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  const handleMethodSelect = (method) => {
    switch(method) {
      case 'Teoría de Errores':
        setCurrentView('error');
        break;
      case 'Ecuaciones No Lineales':
        setCurrentView('nonlinear');
        break;
      case 'Sistemas Lineales':
        setCurrentView('linear');
        break;
      case 'Interpolación':
        setCurrentView('interpolation');
        break;
      case 'Optimización':
        setCurrentView('optimization');
        break;
      default:
        setCurrentView('dashboard');
    }
  };

  const renderView = () => {
    switch(currentView) {
      case 'error':
        return <ErrorTheoryForm />;
      case 'nonlinear':
        return <NonLinearEquations />;
      case 'linear':
        return <LinearSystems />;
      case 'interpolation':
        return <Interpolation />;
      case 'optimization':
        return <Optimization />;
      case 'about':
        return <AboutSection />;
      default:
        return <MathDashboard onMethodSelect={handleMethodSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Fondo matemático animado */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const animationDuration = `${20 + Math.random() * 30}s`;
          const delay = `${Math.random() * 5}s`;
          const size = `${Math.random() * 2 + 1}rem`;
          
          return (
            <div 
              key={i} 
              className="absolute text-purple-400 text-xl animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: size,
                animationDuration,
                animationDelay: delay,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {['f(x)', '∫', '∑', '∂', '∇', '∏', '√', '±', 'α', 'β', 'γ', 'π', 'θ', 'σ', '≈', '∞'][Math.floor(Math.random() * 16)]}
            </div>
          );
        })}
      </div>

      <div className="relative z-10">
        <MathHeader onNavClick={handleNavClick} />
        <main className="container mx-auto p-6 transition-all duration-300 transform">
          <div className="animate-fadeIn">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;