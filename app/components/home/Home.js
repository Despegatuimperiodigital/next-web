'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Shield, Cog, BarChart } from 'lucide-react'
import { Button } from "../ui/button"
import Image from 'next/image'
import Modal from '../ui/Modal'
import SuccessMessage from '../ui/Confirmacion'


import DiagnosticForm from './DiagnosticForm'

const services = [
  {
    title: "Rendimiento Inquebrantable para tu Sitio Web",
    description: "Mantenemos tu plataforma funcionando a máxima velocidad mientras tú te enfocas en crecer. Optimización continua para sitios que no pueden permitirse caídas.",
    icon: Shield,
    stats: "99.9% de uptime garantizado",
    highlight: "Soporte 24/7 proactivo",
    points: ["Optimización constante de rendimiento", "Monitoreo en tiempo real", "Respaldo automático"],
    cta: "Garantiza la disponibilidad de tu sitio",
    tags: ["Confiabilidad", "Alto Rendimiento"],
    subtext: "Respaldando sitios con millones de visitas mensuales"
  },
  {
    title: "Integración Perfecta de Tus Sistemas Empresariales",
    description: "Conectamos tus herramientas críticas en un ecosistema digital fluido. Automatización inteligente que elimina silos y multiplica la productividad.",
    icon: Cog,
    stats: "Hasta 60% menos tiempo en procesos manuales",
    highlight: "Integración seamless de CRM/ERP",
    points: ["Automatización de procesos clave", "Sistemas personalizados", "Escalabilidad garantizada"],
    cta: "Moderniza tu infraestructura digital",
    tags: ["Personalización", "Escalabilidad"],
    subtext: "Transformando procesos en más de 500 empresas"
  },
  {
    title: "Datos que Impulsan Decisiones Ganadoras",
    description: "Convertimos tus datos en una ventaja competitiva real. Implementación experta de Google Analytics 4, Tag Manager y Google Ads para maximizar cada inversión.",
    icon: BarChart,
    stats: "Mejora del 40% en ROAS promedio",
    highlight: "Seguimiento preciso de conversiones",
    points: ["Atribución multi-canal", "Reportes personalizados", "Optimización de ROI"],
    cta: "Potencia tus decisiones con datos reales",
    tags: ["Precisión", "ROI Maximizado"],
    subtext: "Gestionando datos de conversiones por millones de dólares"
  }
]

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
  
    useEffect(() => {
      const timer = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
      }, 5000)
  
      return () => clearInterval(timer)
    }, [])
  
    const handleDiagnosticSubmit = async (data) => {
      setIsLoading(true)
      try {
        // Aquí iría tu lógica de envío de datos
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSuccess(true)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    const handleModalClose = () => {
      setIsModalOpen(false)
      setTimeout(() => {
        setIsSuccess(false)
      }, 300)
    }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="https://team.cloudhub.cl/wp-content/uploads/2024/11/Leonardo_Phoenix_Futuristic_digital_highway_floating_in_cybers_1.jpg"
        alt="Fondo digital"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide()
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide()
              }
            }}
            className="text-center px-4 md:px-8 max-w-5xl mx-auto absolute w-full"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              {React.createElement(services[currentIndex].icon, { size: 64, className: "mx-auto text-primary" })}
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {services[currentIndex].title}
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-foreground/80">
              {services[currentIndex].description}
            </p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="bg-primary/10 backdrop-blur-md rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-primary">{services[currentIndex].stats}</p>
              </div>
              <div className="bg-secondary/10 backdrop-blur-md rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-secondary">{services[currentIndex].highlight}</p>
              </div>
            </div>
            <ul className="mb-8 space-y-2">
              {services[currentIndex].points.map((point, index) => (
                <li key={index} className="text-foreground/80">{point}</li>
              ))}
            </ul>
            <div className="flex justify-center space-x-4 mb-8">
              {services[currentIndex].tags.map((tag, index) => (
                <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-foreground/60 mb-8">{services[currentIndex].subtext}</p>
            <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setIsModalOpen(true)}
          >
            {services[currentIndex].cta}
          </Button>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {services.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/50'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/50 backdrop-blur-sm rounded-full p-2 text-foreground/80 hover:text-primary transition-colors z-20"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/50 backdrop-blur-sm rounded-full p-2 text-foreground/80 hover:text-primary transition-colors z-20"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="p-6">
          {!isSuccess ? (
            <>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Diagnóstico Gratuito de Rendimiento
              </h3>
              <p className="text-foreground/80 mb-6">
                Obtén un análisis detallado del rendimiento de tu sitio web en menos de 5 minutos.
              </p>
              <DiagnosticForm 
                onSubmit={handleDiagnosticSubmit}
                isLoading={isLoading}
              />
            </>
          ) : (
            <SuccessMessage onClose={handleModalClose} />
          )}
        </div>

        <div className="px-6 py-4 bg-muted/10 rounded-b-lg">
          <p className="text-xs text-foreground/60 text-center">
            Tus datos están seguros. No compartimos tu información con terceros.
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default HeroCarousel