`useState`

import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [sitesAnalyzed, setSitesAnalyzed] = useState(324);

  useEffect(() => {
    const interval = setInterval(() => {
      setSitesAnalyzed(prev => prev + 1);
    }, 30000); // Incrementa cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          Acelera tu Sitio Web y Aumenta tus Conversiones hasta un 40%
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Optimización profesional y monitoreo 24/7 para empresas que no pueden permitirse caídas ni sitios lentos
        </p>
        <a href="#analyze" className="btn btn-primary btn-large mb-8">ANALIZAR MI SITIO GRATIS</a>
        <div className="trust-elements">
          <p className="text-lg mb-4">{sitesAnalyzed} sitios analizados esta semana</p>
          <p className="text-lg mb-8">Diagnóstico completado en 45 segundos</p>
          <div className="flex justify-center space-x-4 mb-8">
            {/* Placeholder para logos de clientes */}
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex justify-center space-x-4">
            {/* Placeholder para certificaciones */}
            <div className="w-20 h-10 bg-gray-300 rounded"></div>
            <div className="w-20 h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
