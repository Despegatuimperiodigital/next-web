'use client'

import { motion, Variants } from 'framer-motion'  // Añadido Variants aquí
import { BarChart3, ChevronRight, DollarSign, LineChart, Smartphone, ShoppingCart, Target, TrendingUp, Users, Search } from 'lucide-react'
import Image from 'next/image'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

const getLogoUrl = (bgColor: string) => {
  switch(bgColor) {
    case 'primary':
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%20blanco-lvbncSaPsAisEdkd5nV4FqBziS0Q4x.svg"
    case 'secondary':
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%20blanco-lvbncSaPsAisEdkd5nV4FqBziS0Q4x.svg"
    default:
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%201-3vL5NtsNlM7b8O2PzsVVsabzQJrewl.svg"
  }
}

export default function Component() {
    const fadeIn: Variants = {
      initial: { 
        opacity: 0, 
        y: 20 
      },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5 
        }
      }
    }
  
    const containerVariants: Variants = {
      initial: { 
        opacity: 0 
      },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }
  

  return (
    <div className={`min-h-screen bg-background py-12 ${nunito.className}`}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeIn} className="bg-card rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-primary text-card p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl text-white font-bold">INFORME DE OPORTUNIDADES EN GOOGLE ADS</h1>
              <Image 
                src={getLogoUrl('primary')}
                alt="Cruzeiro Gomas Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-xl">Cruzeiro Gomas - Noviembre 2024</p>
          </div>

          <div className="p-8">
            <motion.section variants={fadeIn} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">SITUACIÓN ACTUAL DE SU INVERSIÓN PUBLICITARIA</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  variants={fadeIn}
                  className="bg-card/5 p-6 rounded-xl border border-border"
                >
                  <Search className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Anuncios en Búsqueda de Google</h3>
                  <p className="text-2xl font-bold text-primary">65%</p>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  className="bg-card/5 p-6 rounded-xl border border-border"
                >
                  <ShoppingCart className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Anuncios de Productos</h3>
                  <p className="text-2xl font-bold text-primary">34%</p>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  className="bg-card/5 p-6 rounded-xl border border-border"
                >
                  <BarChart3 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Otros tipos de anuncios</h3>
                  <p className="text-2xl font-bold text-primary">1%</p>
                </motion.div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">¿QUÉ ESTÁ FUNCIONANDO BIEN?</h2>
              <div className="space-y-4">
                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Marca bien posicionada en búsquedas directas</h3>
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <Smartphone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Buenos resultados en ventas por celular</h3>
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <ShoppingCart className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Anuncios de productos con buen rendimiento</h3>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">OPORTUNIDADES DE MEJORA</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={fadeIn} className="bg-card/5 p-6 rounded-xl border border-border">
                  <DollarSign className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-4">Optimización de Presupuesto</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Redistribuir inversión hacia días rentables
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Mejorar presencia en horarios clave
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Ajustar inversión según dispositivo
                    </li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeIn} className="bg-card/5 p-6 rounded-xl border border-border">
                  <Target className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-4">Mejora en Visibilidad</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Aumentar presencia competitiva
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Mejorar posiciones en búsquedas
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Expandir en productos rentables
                    </li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeIn} className="bg-card/5 p-6 rounded-xl border border-border">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-4">Segmentación de Clientes</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Enfoque en público masculino 35-54
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Mejorar llegada a corporativos
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Optimizar horarios de compra
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">RESULTADOS ESPERADOS</h2>
              <div className="bg-card/5 p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-4">En 6 Meses:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div variants={fadeIn} className="text-center">
                    <LineChart className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">30%</p>
                    <p className="text-sm">Reducción en costo por venta</p>
                  </motion.div>
                  <motion.div variants={fadeIn} className="text-center">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">40%</p>
                    <p className="text-sm">Aumento en ventas</p>
                  </motion.div>
                  <motion.div variants={fadeIn} className="text-center">
                    <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">↑</p>
                    <p className="text-sm">Mejor posicionamiento competitivo</p>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeIn}>
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">PRÓXIMOS PASOS</h2>
              <div className="bg-secondary text-white text-card p-6 rounded-xl">
                <h3 className="font-semibold mb-4">Sugerimos una reunión para:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Revisar sus objetivos comerciales
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Ajustar este plan a sus necesidades
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Definir prioridades de implementación
                  </li>
                </ul>
                <Image 
                  src={getLogoUrl('secondary')}
                  alt="Cruzeiro Gomas Logo"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
            </motion.section>

            <motion.section variants={fadeIn} className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">INFORMES DISPONIBLES</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-card/5 rounded-xl border border-border">
                  <thead>
                    <tr className="bg-primary text-card text-white">
                      <th className="p-3 text-left">Nombre del Informe</th>
                      <th className="p-3 text-left">Fecha</th>
                      <th className="p-3 text-left">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3"> Vision General de dominio</td>
                      <td className="p-3">22/11/2024</td>
                      <td className="p-3">
                        <a href="https://team.cloudhub.cl/wp-content/uploads/2024/11/Semrush-Visión_general_de_dominio_Desktop-cruzeirogomas_cl-22nd_Nov_2024-1.pdf" className="text-primary hover:underline">Descargar</a>
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Brecha de palabras clave</td>
                      <td className="p-3">22/11/2024</td>
                      <td className="p-3">
                        <a href="https://team.cloudhub.cl/wp-content/uploads/2024/11/Semrush-Brecha_de_palabras_clave_Desktop-cruzeirogomas_cl_saveline_cl_qrubber_cl_lorenzini_-22nd_Nov_2024.pdf" className="text-primary hover:underline">Descargar</a>
                      </td>
                    </tr>
                  
                  </tbody>
                </table>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}