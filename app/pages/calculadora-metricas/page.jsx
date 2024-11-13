'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'

const icons = {
  money: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  clock: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ads: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

const tooltips = {
  monthlyRevenue: "Ingresa el promedio de ventas de los últimos 3 meses para un cálculo más preciso",
  loadTime: "Puedes obtener este valor desde Google Analytics o herramientas como GTmetrix",
  adSpend: "Incluye gastos en Google Ads, Facebook Ads y otras plataformas publicitarias"
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const formatNumber = (value) => {
    return new Intl.NumberFormat('es-CL').format(value)
  }
  
  const validateLeadForm = () => {
    const errors = {};
  
    return errors;
  };

  export default function Calculator() {
    // Estados principales
    const [inputs, setInputs] = useState({
      monthlyRevenue: '',
      loadTime: '',
      adSpend: '',
      bounceRate: ''
    })
    const [results, setResults] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [leadData, setLeadData] = useState({
      name: '',
      email: '',
      company: '',
      website: ''
    })
  
    // Estados de UI
    const [loadingStates, setLoadingStates] = useState({
      calculating: false,
      submitting: false
    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  



  const validateInputs = () => {
    const errors = {}
      
    if (!inputs.monthlyRevenue) {
      errors.monthlyRevenue = 'Ingresa tus ventas mensuales'
    } else if (inputs.monthlyRevenue <= 0) {
      errors.monthlyRevenue = 'Las ventas deben ser mayores a 0'
    }
  
    if (!inputs.loadTime) {
      errors.loadTime = 'Ingresa el tiempo de carga'
    } else if (inputs.loadTime < 0 || inputs.loadTime > 20) {
      errors.loadTime = 'El tiempo debe estar entre 0 y 20 segundos'
    }
  
    return errors
  }
  
  
    // Handlers y efectos
    const handleCalculate = async () => {
      const validationErrors = validateInputs()
      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors)
        return
      }
  
      setLoadingStates(prev => ({ ...prev, calculating: true }))
      setError(null)
  
      try {
        // Simular cálculo para mejor UX
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputs)
        })
  
        const data = await response.json()
        
        if (response.ok) {
          setResults(data)
          setShowModal(true)
        } else {
          throw new Error(data.error)
        }
      } catch (error) {
        setError('Error al calcular. Intenta nuevamente.')
      } finally {
        setLoadingStates(prev => ({ ...prev, calculating: false }))
      }
    }
  
    const handleLeadCapture = async (e) => {
      e.preventDefault()
      const formErrors = validateLeadForm()
      if (Object.keys(formErrors).length > 0) {
        setError(formErrors)
        return
      }
  
      setLoadingStates(prev => ({ ...prev, submitting: true }))
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadData,
            results
          })
        })
  
        if (response.ok) {
          setShowModal(false)
          setSuccess(true)
          // Ocultar mensaje de éxito después de 5 segundos
          setTimeout(() => setSuccess(false), 5000)
        } else {
          throw new Error('Error al enviar datos')
        }
      } catch (error) {
        setError('Error al procesar tu solicitud')
      } finally {
        setLoadingStates(prev => ({ ...prev, submitting: false }))
      }
    }
  
    // Tracking effect
    useEffect(() => {
      if (results) {
        try {
          fetch('/api/track', {
            method: 'POST',
            body: JSON.stringify({
              event: 'calculation_complete',
              data: { results }
            })
          })
        } catch (error) {
          console.error('Error tracking:', error)
        }
      }
    }, [results])

    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary-foreground font-nunito">
          <Head>
            <title>Calculadora de Impacto Web | CloudHub</title>
            <meta name="description" content="Calcula cuánto dinero estás perdiendo por tu sitio web lento y descubre oportunidades de mejora." />
            <meta property="og:title" content="Calculadora de Impacto Web" />
            <meta property="og:description" content="Calcula tus pérdidas por velocidad web" />
          </Head>
    
          {/* Header */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%201-TYs9KHCsk5IX62o8pZCEAMpt8rguHH.png" 
                alt="CloudHub" 
                width={150} 
                height={40}
                className="hover:opacity-90 transition-opacity"
              />
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  <li>
                    <a href="#" className="text-secondary hover:text-primary transition-colors duration-200 font-medium">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-secondary hover:text-primary transition-colors duration-200 font-medium">
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-secondary hover:text-primary transition-colors duration-200 font-medium">
                      Contacto
                    </a>
                  </li>
                </ul>
              </nav>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
    
            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
                <nav className="px-4 py-2">
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="block py-2 text-secondary hover:text-primary transition-colors duration-200">
                        Inicio
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 text-secondary hover:text-primary transition-colors duration-200">
                        Servicios
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 text-secondary hover:text-primary transition-colors duration-200">
                        Contacto
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </header>

          <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12 space-y-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Descubre el Impacto de la
            <span className="text-primary"> Velocidad Web </span>
            en tus Ingresos
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Calcula en segundos cuánto dinero estás perdiendo por tu sitio web lento
            y descubre oportunidades de mejora.
          </motion.p>
        </div>

        {/* Calculadora */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <h2 className="text-2xl font-semibold text-secondary mb-6">
            Calculadora de Impacto Financiero
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Input Ventas con Tooltip */}
            <div className="group relative">
              <label className="block text-sm font-semibold text-secondary mb-2 flex items-center">
                Ventas Mensuales (CLP)
                <span className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                  {icons.money}
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  placeholder={`Ej: ${formatNumber(1000000)}`}
                  value={inputs.monthlyRevenue}
                  onChange={(e) => setInputs({
                    ...inputs,
                    monthlyRevenue: e.target.value
                  })}
                />
                {error?.monthlyRevenue && (
                  <p className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {error.monthlyRevenue}
                  </p>
                )}
              </div>
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 -top-12 left-0 right-0 bg-secondary text-white p-2 rounded-lg text-sm">
                {tooltips.monthlyRevenue}
              </div>
            </div>

            {/* Input Tiempo de Carga */}
            <div className="group relative">
              <label className="block text-sm font-semibold text-secondary mb-2 flex items-center">
                Tiempo de Carga (segundos)
                <span className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                  {icons.clock}
                </span>
              </label>
              <input
                type="number"
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                placeholder="Ej: 5"
                value={inputs.loadTime}
                onChange={(e) => setInputs({
                  ...inputs,
                  loadTime: e.target.value
                })}
              />
              {error?.loadTime && (
                <p className="absolute -bottom-6 left-0 text-sm text-red-500">
                  {error.loadTime}
                </p>
              )}
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 -top-12 left-0 right-0 bg-secondary text-white p-2 rounded-lg text-sm">
                {tooltips.loadTime}
              </div>
            </div>

            {/* Input Ads */}
            <div className="group relative">
              <label className="block text-sm font-semibold text-secondary mb-2 flex items-center">
                Inversión en Ads Mensual
                <span className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                  {icons.ads}
                </span>
              </label>
              <input
                type="number"
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                placeholder={`Ej: ${formatNumber(500000)}`}
                value={inputs.adSpend}
                onChange={(e) => setInputs({
                  ...inputs,
                  adSpend: e.target.value
                })}
              />
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 -top-12 left-0 right-0 bg-secondary text-white p-2 rounded-lg text-sm">
                {tooltips.adSpend}
              </div>
            </div>
          </div>

          {/* Botón Calcular */}
          <button
            onClick={handleCalculate}
            disabled={loadingStates.calculating}
            className="w-full mt-8 px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {loadingStates.calculating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculando...
              </span>
            ) : (
              'Calcular Impacto Financiero'
            )}
          </button>
        </div>
{/* Resultados */}
<AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-secondary mb-6">
                Resultados del Análisis
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div 
                  className="bg-red-50 p-6 rounded-xl transform hover:-translate-y-1 transition-all duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm font-medium text-red-600 mb-2">Pérdidas Mensuales</p>
                  <p className="text-3xl font-bold text-red-700">
                    {formatCurrency(results.revenueLoss)}
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-orange-50 p-6 rounded-xl transform hover:-translate-y-1 transition-all duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm font-medium text-orange-600 mb-2">Desperdicio en Ads</p>
                  <p className="text-3xl font-bold text-orange-700">
                    {formatCurrency(results.adWaste)}
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-red-100 p-6 rounded-xl transform hover:-translate-y-1 transition-all duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm font-medium text-red-700 mb-2">Pérdida Anual</p>
                  <p className="text-4xl font-bold text-red-800">
                    {formatCurrency(results.yearlyTotal)}
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-green-50 p-6 rounded-xl transform hover:-translate-y-1 transition-all duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm font-medium text-green-600 mb-2">Mejora Potencial</p>
                  <p className="text-4xl font-bold text-green-700">
                    {formatCurrency(results.potentialGain)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Captura */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full p-8 transform transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">
                Obtén el reporte completo
              </h2>
              <form onSubmit={handleLeadCapture} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    value={leadData.name}
                    onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Corporativo"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    value={leadData.email}
                    onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                    required
                  />
                  {error?.email && (
                    <p className="mt-1 text-sm text-red-500">{error.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Empresa"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    value={leadData.company}
                    onChange={(e) => setLeadData({...leadData, company: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="Sitio Web"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    value={leadData.website}
                    onChange={(e) => setLeadData({...leadData, website: e.target.value})}
                    required
                  />
                  {error?.website && (
                    <p className="mt-1 text-sm text-red-500">{error.website}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loadingStates.submitting}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                  >
                    {loadingStates.submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Obtener Reporte Detallado'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Mensaje de Éxito */}
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r shadow-lg"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    ¡Reporte enviado con éxito! Revisa tu email.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sección de Confianza */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-8">
            Empresas que confían en nosotros
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-75">
            <motion.div 
              className="h-12 bg-white/10 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div 
              className="h-12 bg-white/10 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div 
              className="h-12 bg-white/10 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div 
              className="h-12 bg-white/10 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Preguntas Frecuentes
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div 
              className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                ¿Cómo se calculan las pérdidas?
              </h4>
              <p className="text-white/80">
                Utilizamos métricas basadas en estudios de Google y otros referentes de la industria que demuestran que cada segundo adicional de carga representa una pérdida del 7% en conversiones.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                ¿Qué incluye el reporte detallado?
              </h4>
              <p className="text-white/80">
                Recibirás un análisis completo con recomendaciones específicas para tu sitio, comparativas con tu industria y un plan de acción personalizado.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                ¿Cuánto tiempo toma implementar las mejoras?
              </h4>
              <p className="text-white/80">
                El tiempo de implementación varía según la complejidad de tu sitio, pero típicamente vemos mejoras significativas en 2-4 semanas.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                ¿Hay garantía de resultados?
              </h4>
              <p className="text-white/80">
                Sí, garantizamos una mejora mínima del 40% en la velocidad de carga o te devolvemos tu inversión.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%201-TYs9KHCsk5IX62o8pZCEAMpt8rguHH.png" 
                alt="CloudHub" 
                width={150} 
                height={40}
                className="mb-4"
              />
              <p className="text-white/70">
                Optimizando la velocidad de tu sitio web para impulsar tus resultados.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Optimización Web
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Monitoreo 24/7
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Consultoría Técnica
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Guías
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Casos de Éxito
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="text-white/70">
                  <span className="text-primary">Email:</span> info@cloudhub.com
                </li>
                <li className="text-white/70">
                  <span className="text-primary">Teléfono:</span> 
                </li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50">
            <p>&copy; 2024 CloudHub. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
