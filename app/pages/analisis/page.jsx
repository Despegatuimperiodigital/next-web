'use client'


import React, { useState, useCallback } from 'react';
import { Calculator, AlertTriangle, TrendingUp, AlertCircle } from 'lucide-react';

const IMPACT_FACTORS = {
  VISIBILITY_LOSS_PER_SECOND: 0.0832, // 8.32% loss per second after 2.5s
  CONVERSION_IMPACT: 0.07, // 7% conversion loss per second
  AD_QUALITY_IMPACT: 0.12, // 12% quality score reduction
};

const CoreWebVitalsCalculator = () => {
  const [inputs, setInputs] = useState({
    url: '',
    loadTime: '',
    monthlyTraffic: '',
    adSpend: '',
    monthlyRevenue: ''
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const validateInputs = useCallback(() => {
    const newErrors = {};
    if (!inputs.url) newErrors.url = 'URL es requerida';
    if (!inputs.loadTime || inputs.loadTime <= 0) newErrors.loadTime = 'Tiempo de carga inválido';
    if (!inputs.monthlyTraffic || inputs.monthlyTraffic <= 0) newErrors.monthlyTraffic = 'Tráfico inválido';
    return newErrors;
  }, [inputs]);

  const analyzeUrl = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputs.url }),
      });

      if (!response.ok) throw new Error('Error en el análisis');
      
      const data = await response.json();
      setAnalysisResults(data);
      
      // Actualizar tiempo de carga si no fue ingresado manualmente
      if (!inputs.loadTime && data.metrics?.core?.lcp) {
        setInputs(prev => ({
          ...prev,
          loadTime: (data.metrics.core.lcp / 1000).toFixed(1)
        }));
      }

    } catch (error) {
      console.error('Error:', error);
      setErrors(prev => ({ ...prev, analysis: 'Error al analizar la URL' }));
    } finally {
      setLoading(false);
    }
  };

  const calculateImpact = useCallback(async () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Primero analizar la URL si no tenemos resultados
    if (!analysisResults) {
      await analyzeUrl();
    }

    const loadTime = parseFloat(inputs.loadTime);
    const traffic = parseInt(inputs.monthlyTraffic);
    const adSpend = parseFloat(inputs.adSpend) || 0;
    const revenue = parseFloat(inputs.monthlyRevenue) || 0;

    const excessTime = Math.max(0, loadTime - 2.5);
    
    const visibilityLoss = excessTime * IMPACT_FACTORS.VISIBILITY_LOSS_PER_SECOND;
    const trafficLoss = Math.floor(traffic * visibilityLoss);
    
    const conversionLoss = excessTime * IMPACT_FACTORS.CONVERSION_IMPACT;
    const potentialRevenueLoss = revenue * conversionLoss;
    
    const adEfficiencyLoss = adSpend * (excessTime * IMPACT_FACTORS.AD_QUALITY_IMPACT);
    
    const currentScore = Math.max(0, Math.min(100, 100 - (excessTime * 20)));

    setResults({
      monthlyLosses: {
        traffic: trafficLoss,
        revenue: potentialRevenueLoss,
        adWaste: adEfficiencyLoss,
        total: potentialRevenueLoss + adEfficiencyLoss
      },
      annualProjection: {
        traffic: trafficLoss * 12,
        revenue: potentialRevenueLoss * 12,
        adWaste: adEfficiencyLoss * 12,
        total: (potentialRevenueLoss + adEfficiencyLoss) * 12
      },
      scores: {
        current: currentScore,
        potential: 100,
        improvement: 100 - currentScore
      }
    });
  }, [inputs, validateInputs, analysisResults]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('es-CL').format(value);
  };
// ... (código anterior sin cambios hasta la función de formatNumber)

const generateDetailedReport = (results, analysisResults) => {
  // Crear objeto con todos los datos del reporte
  const reportData = {
    timestamp: new Date().toLocaleString('es-CL'),
    url: analysisResults?.url || 'No disponible',
    generalMetrics: {
      performanceScore: results.scores.current,
      potentialImprovement: results.scores.improvement,
      loadTime: inputs.loadTime,
    },
    coreWebVitals: {
      lcp: analysisResults?.metrics?.core?.lcp,
      cls: analysisResults?.metrics?.core?.cls,
      tti: analysisResults?.metrics?.core?.tti,
    },
    impactoFinanciero: {
      mensual: {
        trafico: results.monthlyLosses.traffic,
        ingresos: results.monthlyLosses.revenue,
        ads: results.monthlyLosses.adWaste,
        total: results.monthlyLosses.total
      },
      anual: {
        trafico: results.annualProjection.traffic,
        ingresos: results.annualProjection.revenue,
        ads: results.annualProjection.adWaste,
        total: results.annualProjection.total
      }
    },
    recomendaciones: analysisResults?.recommendations || [],
    recursosAnalisis: analysisResults?.metrics?.resources,
    servidorMetricas: analysisResults?.metrics?.server
  };

  // Convertir a formato CSV para descarga
  const generateCSV = (data) => {
    const rows = [
      ['REPORTE DE IMPACTO CORE WEB VITALS', ''],
      ['Generado:', data.timestamp],
      ['URL Analizada:', data.url],
      [''],
      ['MÉTRICAS GENERALES', ''],
      ['Performance Score:', `${data.generalMetrics.performanceScore}%`],
      ['Mejora Potencial:', `${data.generalMetrics.potentialImprovement}%`],
      ['Tiempo de Carga:', `${data.generalMetrics.loadTime}s`],
      [''],
      ['CORE WEB VITALS', ''],
      ['LCP (Largest Contentful Paint):', `${(data.coreWebVitals.lcp/1000).toFixed(2)}s`],
      ['CLS (Cumulative Layout Shift):', data.coreWebVitals.cls],
      ['TTI (Time to Interactive):', `${(data.coreWebVitals.tti/1000).toFixed(2)}s`],
      [''],
      ['IMPACTO FINANCIERO MENSUAL', ''],
      ['Pérdida de Tráfico:', data.impactoFinanciero.mensual.trafico],
      ['Pérdida de Ingresos:', formatCurrency(data.impactoFinanciero.mensual.ingresos)],
      ['Desperdicio en Ads:', formatCurrency(data.impactoFinanciero.mensual.ads)],
      ['Total Mensual:', formatCurrency(data.impactoFinanciero.mensual.total)],
      [''],
      ['IMPACTO FINANCIERO ANUAL', ''],
      ['Pérdida de Tráfico:', data.impactoFinanciero.anual.trafico],
      ['Pérdida de Ingresos:', formatCurrency(data.impactoFinanciero.anual.ingresos)],
      ['Desperdicio en Ads:', formatCurrency(data.impactoFinanciero.anual.ads)],
      ['Total Anual:', formatCurrency(data.impactoFinanciero.anual.total)],
      [''],
      ['RECOMENDACIONES PRIORITARIAS', '']
    ];

    // Agregar recomendaciones
    data.recomendaciones.forEach((rec, index) => {
      rows.push([`${index + 1}. ${rec.issue}`, '']);
      rows.push(['Prioridad:', rec.priority]);
      rows.push(['Descripción:', rec.description]);
      rows.push(['Solución:', rec.solution]);
      rows.push(['Impacto:', rec.impact]);
      rows.push(['', '']);
    });

    // Convertir a CSV
    return rows.map(row => row.join(',')).join('\n');
  };

  // Crear y descargar el archivo
  const csv = generateCSV(reportData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `reporte-web-vitals-${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6 font-['Nunito']">
      {/* Header Section */}
      <div className="bg-card rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-card-foreground">
            Calcula el Impacto de la Velocidad Web en tu Negocio
          </h1>
        </div>
        <p className="text-muted-foreground">
          Basado en los nuevos estándares de Google 2024
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-card rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground">URL del sitio *</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-input bg-background text-card-foreground shadow-sm focus:border-primary focus:ring-primary p-2"
              value={inputs.url}
              onChange={(e) => setInputs(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://ejemplo.com"
            />
            {errors.url && <p className="mt-1 text-sm text-destructive">{errors.url}</p>}
          </div>
          
          {/* Load Time Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground flex items-center gap-1">
              Tiempo de carga actual (segundos) *
              <AlertCircle className="h-4 w-4 text-muted-foreground" title="Según Google, el tiempo ideal de carga es 2.5s o menos" />
            </label>
            <input
              type="number"
              step="0.1"
              className="mt-1 block w-full rounded-md border-input bg-background text-card-foreground shadow-sm focus:border-primary focus:ring-primary p-2"
              value={inputs.loadTime}
              onChange={(e) => setInputs(prev => ({ ...prev, loadTime: e.target.value }))}
              placeholder="4.5"
            />
            {errors.loadTime && <p className="mt-1 text-sm text-destructive">{errors.loadTime}</p>}
          </div>

          {/* Monthly Traffic Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground">Tráfico mensual *</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-input bg-background text-card-foreground shadow-sm focus:border-primary focus:ring-primary p-2"
              value={inputs.monthlyTraffic}
              onChange={(e) => setInputs(prev => ({ ...prev, monthlyTraffic: e.target.value }))}
              placeholder="10000"
            />
            {errors.monthlyTraffic && <p className="mt-1 text-sm text-destructive">{errors.monthlyTraffic}</p>}
          </div>

          {/* Ad Spend Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground">Inversión mensual en ads</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-input bg-background text-card-foreground shadow-sm focus:border-primary focus:ring-primary p-2"
              value={inputs.adSpend}
              onChange={(e) => setInputs(prev => ({ ...prev, adSpend: e.target.value }))}
              placeholder="500000"
            />
          </div>

          {/* Monthly Revenue Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground">Ventas mensuales</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-input bg-background text-card-foreground shadow-sm focus:border-primary focus:ring-primary p-2"
              value={inputs.monthlyRevenue}
              onChange={(e) => setInputs(prev => ({ ...prev, monthlyRevenue: e.target.value }))}
              placeholder="1000000"
            />
          </div>
        </div>

        <button
          onClick={calculateImpact}
          disabled={loading}
          className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors disabled:opacity-50"
        >
          {loading ? 'Analizando...' : 'Calcular Impacto'}
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Monthly Losses Alert */}
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-md">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Pérdidas Mensuales Estimadas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-destructive">Tráfico Perdido</p>
                <p className="text-2xl font-bold text-destructive">{formatNumber(results.monthlyLosses.traffic)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-destructive">Ingresos No Percibidos</p>
                <p className="text-2xl font-bold text-destructive">{formatCurrency(results.monthlyLosses.revenue)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-destructive">Desperdicio en Ads</p>
                <p className="text-2xl font-bold text-destructive">{formatCurrency(results.monthlyLosses.adWaste)}</p>
              </div>
            </div>
          </div>

          {/* Annual Projection */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg text-card-foreground">Proyección Anual</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-card-foreground">Pérdidas Proyectadas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-card-foreground">
                    <span>Tráfico Total</span>
                    <span className="font-bold">{formatNumber(results.annualProjection.traffic)}</span>
                  </div>
                  <div className="flex justify-between text-card-foreground">
                    <span>Ingresos</span>
                    <span className="font-bold">{formatCurrency(results.annualProjection.revenue)}</span>
                  </div>
                  <div className="flex justify-between text-card-foreground">
                    <span>Inversión en Ads</span>
                    <span className="font-bold">{formatCurrency(results.annualProjection.adWaste)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-card-foreground">Total</span>
                    <span className="font-bold text-destructive">{formatCurrency(results.annualProjection.total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-card-foreground">Score de Rendimiento</h4>
                <div className="space-y-4">
                  {/* Current Score */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-card-foreground">Actual</span>
                      <span className="text-sm font-semibold text-card-foreground">{results.scores.current.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${results.scores.current}%` }}
                      />
                    </div>
                  </div>

                  {/* Potential Score */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-card-foreground">Potencial</span>
                      <span className="text-sm font-semibold text-card-foreground">{results.scores.potential}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Improvement Score */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-card-foreground">Mejora Posible</span>
                      <span className="text-sm font-semibold text-card-foreground">{results.scores.improvement.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary rounded-full h-2"
                        style={{ width: `${results.scores.improvement}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          {analysisResults && (
            <div className="bg-card rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4 text-card-foreground">Análisis de Performance</h3>
              
              {/* Core Web Vitals */}
              <div className="mb-6">
                <h4 className="font-medium text-card-foreground mb-3">Core Web Vitals</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* LCP */}
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-card-foreground">LCP</span>
                      <span className={`font-bold ${
                        analysisResults.metrics?.core?.lcp <= 2500 ? 'text-accent' :
                        analysisResults.metrics?.core?.lcp <= 4000 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {(analysisResults.metrics?.core?.lcp / 1000).toFixed(2)}s
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Largest Contentful Paint</p>
                  </div>

                  {/* CLS */}
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-card-foreground">CLS</span>
                      <span className={`font-bold ${
                        analysisResults.metrics?.core?.cls <= 0.1 ? 'text-accent' :
                        analysisResults.metrics?.core?.cls <= 0.25 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {analysisResults.metrics?.core?.cls?.toFixed(3)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cumulative Layout Shift</p>
                  </div>

                  {/* TTI */}
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-card-foreground">TTI</span>
                      <span className={`font-bold ${
                        analysisResults.metrics?.core?.tti <= 3800 ? 'text-accent' :
                        analysisResults.metrics?.core?.tti <= 7500 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {(analysisResults.metrics?.core?.tti / 1000).toFixed(2)}s
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Time to Interactive</p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {analysisResults.recommendations?.length > 0 && (
                <div>
                  <h4 className="font-medium text-card-foreground mb-3">Recomendaciones</h4>
                  <div className="space-y-4">
                    {analysisResults.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          rec.priority === 'alta' 
                            ? 'bg-destructive/10 border border-destructive/20'
                            : 'bg-primary/10 border border-primary/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            rec.priority === 'alta'
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-primary/20 text-primary'
                          }`}>
                            {rec.priority.toUpperCase()}
                          </span>
                          <span className="font-medium text-card-foreground">{rec.category}</span>
                        </div>
                        <h5 className="font-semibold mb-2 text-card-foreground">{rec.issue}</h5>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="text-sm">
                          <p className="text-card-foreground"><strong>Solución:</strong> {rec.solution}</p>
                          <p className="text-card-foreground"><strong>Impacto:</strong> {rec.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center space-y-4">
            <button 
              onClick={() => generateDetailedReport(results, analysisResults)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-colors"
            >
              Descargar Reporte Completo
            </button>
            <p className="text-sm text-muted-foreground">
              Recibe un análisis completo con recomendaciones personalizadas
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoreWebVitalsCalculator;