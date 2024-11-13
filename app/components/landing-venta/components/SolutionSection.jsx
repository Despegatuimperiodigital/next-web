import React from 'react';
import { Zap, Activity, Headphones } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section className="bg-background py-20" id="solution">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary">Optimización Continua que Genera Resultados</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Zap className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-4">Rendimiento Superior</h3>
            <ul className="text-left">
              <li className="mb-2">✓ Mejora de velocidad garantizada</li>
              <li className="mb-2">✓ Optimización continua</li>
              <li>✓ Infraestructura premium</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Activity className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-4">Monitoreo Proactivo</h3>
            <ul className="text-left">
              <li className="mb-2">✓ Supervisión 24/7</li>
              <li className="mb-2">✓ Alertas en tiempo real</li>
              <li>✓ Resolución preventiva</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Headphones className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-4">Soporte Especializado</h3>
            <ul className="text-left">
              <li className="mb-2">✓ Equipo técnico experto</li>
              <li className="mb-2">✓ Respuesta garantizada</li>
              <li>✓ Mejora continua</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}