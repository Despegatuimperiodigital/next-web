'use client'

import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const loadingTips = [
  "¿Sabías que el 53% de los usuarios abandonan un sitio si tarda más de 3 segundos en cargar?",
  "Una mejora de 0.1s en la velocidad de carga puede aumentar las conversiones hasta un 8%.",
  "Google considera la velocidad de carga como un factor de ranking en sus resultados de búsqueda.",
  "Las imágenes no optimizadas son una de las principales causas de lentitud en los sitios web.",
  "Un CDN puede reducir significativamente los tiempos de carga para usuarios geográficamente dispersos.",
  "La caché del navegador puede mejorar drásticamente los tiempos de carga para visitantes recurrentes."
];

const getScoreColor = (score) => {
  if (score >= 90) return 'from-green-50 to-green-100';
  if (score >= 70) return 'from-yellow-50 to-yellow-100';
  return 'from-red-50 to-red-100';
};

const getMetricStatus = (metric, thresholds) => {
  if (metric <= thresholds.good) return { status: 'good', color: 'text-green-600' };
  if (metric <= thresholds.medium) return { status: 'medium', color: 'text-yellow-600' };
  return { status: 'poor', color: 'text-red-600' };
};


const formatMetricValue = (value, decimals = 2) => {
    if (value === undefined || value === null) return 'N/A';
    return typeof value === 'number' ? value.toFixed(decimals) : value.toString();
  };

export default function PerformanceAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const analyzePositives = (results) => {
    const positives = [];
    
    if (results.summary.performanceScore >= 90) {
      positives.push({
        title: "Excelente Performance Score",
        description: "Tu sitio tiene un rendimiento excepcional",
        metric: `${results.summary.performanceScore}%`
      });
    }
    
    if (results.metrics.core.fcp < 1800) {
      positives.push({
        title: "First Contentful Paint Óptimo",
        description: "El contenido se muestra rápidamente a los usuarios",
        metric: `${results.metrics.core.fcp.toFixed(1)}ms`
      });
    }
    
    if (results.metrics.core.lcp < 2500) {
      positives.push({
        title: "Largest Contentful Paint Eficiente",
        description: "El contenido principal carga de manera veloz",
        metric: `${results.metrics.core.lcp.toFixed(1)}ms`
      });
    }
    
    if (results.metrics.core.cls < 0.1) {
      positives.push({
        title: "Excelente Estabilidad Visual",
        description: "Tu sitio mantiene una experiencia visual estable",
        metric: results.metrics.core.cls.toFixed(3)
      });
    }

    return positives;
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setCurrentTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error en el análisis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex gap-4 mb-6">
          <input
            type="url"
            placeholder="Ingrese URL para analizar"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleAnalyze}
            disabled={loading || !url}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? 'Analizando...' : 'Analizar'}
          </button>
        </div>

        {loading && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <p className="text-blue-700">{currentTip}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {results && (
          <div className="space-y-6 animate-fadeIn">
            {/* Performance Score Card */}
            <div className={`p-6 bg-gradient-to-br ${getScoreColor(results.summary.performanceScore)} rounded-lg shadow-sm`}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Performance Score</h2>
                  <p className="text-gray-600">Evaluación general del rendimiento</p>
                </div>
                <div className="text-5xl font-bold text-gray-800">
                  {results.summary.performanceScore}%
                </div>
              </div>
            </div>

            {/* Aspectos Positivos */}
            {analyzePositives(results).length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={24} />
                  Aspectos Destacados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analyzePositives(results).map((positive, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-green-800">{positive.title}</h4>
                          <p className="text-green-600 text-sm">{positive.description}</p>
                        </div>
                        <span className="text-green-700 font-bold">{positive.metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Web Vitals */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Core Web Vitals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  key: 'LCP',
                  label: 'Largest Contentful Paint',
                  value: results.metrics?.core?.lcp,
                  thresholds: { good: 2500, medium: 4000 },
                  unit: 'ms'
                },
                {
                  key: 'FID/TTI',
                  label: 'Time to Interactive',
                  value: results.metrics?.core?.tti,
                  thresholds: { good: 3800, medium: 7500 },
                  unit: 'ms'
                },
                {
                  key: 'CLS',
                  label: 'Cumulative Layout Shift',
                  value: results.metrics?.core?.cls,
                  thresholds: { good: 0.1, medium: 0.25 },
                  unit: ''
                }
              ].map((metric) => {
                const status = metric.value != null ? getMetricStatus(metric.value, metric.thresholds) : { color: 'text-gray-400' };
                return (
                  <div key={metric.key} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">{metric.key}</h4>
                      <span className={`${status.color} font-bold`}>
                        {formatMetricValue(metric.value)}{metric.unit}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
            {/* Recomendaciones */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={24} />
                Oportunidades de Mejora
              </h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg ${
                      rec.priority === 'alta' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-yellow-50 border-yellow-200'
                    } border`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          rec.priority === 'alta' 
                            ? 'bg-red-200 text-red-800' 
                            : 'bg-yellow-200 text-yellow-800'
                        }`}>
                          {rec.priority.toUpperCase()}
                        </span>
                        <h4 className="font-semibold text-lg">{rec.issue}</h4>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{rec.description}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-700"><span className="font-medium">Solución:</span> {rec.solution}</p>
                      <p className="text-gray-700"><span className="font-medium">Impacto:</span> {rec.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}