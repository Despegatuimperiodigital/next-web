import React, { useState } from 'react';

export default function PainSection() {
  const [siteUrl, setSiteUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysis = (e) => {
    e.preventDefault();
    // Simulación de análisis
    setAnalysisResult({
      loadSpeed: '3.5s',
      performanceScore: 65,
      issues: ['Imágenes sin optimizar', 'JavaScript bloqueante', 'Caché ineficiente'],
      competitorComparison: 'Tu sitio es 25% más lento que el promedio de tu industria'
    });
  };

  return (
    <section className="bg-white py-20" id="pain">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary">¿Tu Sitio Web Está Perdiendo Ventas?</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">53%</h3>
            <p>de usuarios abandonan sitios que tardan más de 3 segundos en cargar</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">7%</h3>
            <p>de reducción en conversiones por cada segundo adicional de carga</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">SEO</h3>
            <p>Los sitios lentos penalizan tu ranking en Google</p>
          </div>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Analiza tu sitio en tiempo real</h3>
          <form onSubmit={handleAnalysis} className="mb-6">
            <div className="flex">
              <input 
                type="url" 
                value={siteUrl} 
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="Ingresa la URL de tu sitio"
                required
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="btn btn-primary rounded-l-none">Analizar</button>
            </div>
          </form>
          {analysisResult && (
            <div className="bg-white p-6 rounded-md shadow">
              <h4 className="font-bold mb-4">Resultados del análisis:</h4>
              <p>Velocidad de carga: {analysisResult.loadSpeed}</p>
              <p>Score de rendimiento: {analysisResult.performanceScore}/100</p>
              <h5 className="font-bold mt-4 mb-2">Problemas detectados:</h5>
              <ul className="list-disc pl-5 mb-4">
                {analysisResult.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
              <p className="font-bold">{analysisResult.competitorComparison}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}