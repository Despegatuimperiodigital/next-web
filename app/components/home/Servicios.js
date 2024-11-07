'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Globe, Layers, Link, ArrowRight } from 'lucide-react'
import { Button } from "../ui/button"

const servicios = [
  { icon: Bot, title: "IA y Automatización", desc: "Soluciones inteligentes que optimizan sus procesos empresariales" },
  { icon: Globe, title: "Entornos Web Avanzados", desc: "Plataformas web de alto rendimiento y máxima seguridad" },
  { icon: Layers, title: "Microservicios Escalables", desc: "Arquitecturas flexibles para un crecimiento sin límites" },
  { icon: Link, title: "Integración Omnicanal", desc: "Conexión perfecta entre CRM, E-commerce, ERP y más" },
  { icon: Bot, title: "Optimización de Procesos", desc: "Mejore la eficiencia operativa con nuestras soluciones de IA" },
  { icon: Globe, title: "Experiencia del Cliente", desc: "Transforme la interacción con sus clientes mediante tecnologías avanzadas" }
]

const integraciones = [
  "Salesforce", "SAP", "Shopify", "Microsoft Dynamics", 
  "HubSpot", "Oracle", "Magento", "Odoo", "Woocommerce", "Wordpress", "Monday", "Google", "Clickup"
]

const gridAreas = {
  0: 'md:col-span-1 md:row-span-2',
  1: 'md:col-span-2 md:row-span-1',
  2: 'md:col-span-1 md:row-span-1',
  3: 'md:col-span-1 md:row-span-2',
  4: 'md:col-span-1 md:row-span-1',
  5: 'md:col-span-1 md:row-span-1',
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 py-24 px-4 md:px-8 font-nunito">
      <section className="max-w-7xl mx-auto mb-32">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-white tracking-wide">
          Nuestros Servicios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div 
              key={index}
              className={`
                bg-white/[0.03] rounded-2xl p-8 flex flex-col items-start cursor-pointer
                border border-white/10 overflow-hidden relative transition-colors duration-300
                hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-black/20
                ${gridAreas[index]}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedService(index === selectedService ? null : index)}
            >
              <motion.div 
                className="w-15 h-15 rounded-full bg-gradient-to-br from-[#F33F31]/10 to-[#E77171]/10 
                          flex items-center justify-center mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <servicio.icon className="w-8 h-8 text-[#F33F31]" strokeWidth={1} />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {servicio.title}
              </h3>

              <AnimatePresence>
                {selectedService === index && (
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {servicio.desc}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-[#F33F31] hover:text-[#E77171] hover:bg-[#F33F31]/10 p-0"
                    >
                      Saber más <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-white tracking-wide">
          Nuestras Integraciones
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {integraciones.map((integracion, index) => (
            <motion.div 
              key={integracion}
              className="bg-white/[0.03] rounded-2xl p-8 flex justify-center items-center
                         border border-white/10 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 8px 30px rgba(243, 63, 49, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <span className="text-lg font-medium text-white">
                {integracion}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}