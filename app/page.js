'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "./components/ui/button"
import { ArrowRight, CheckCircle, Clock, LayoutDashboard, PhoneCall, Menu, X } from "lucide-react"
import ContactForm from './components/ContactForm'
import Navbar from './components/navbar'
import { motion } from 'framer-motion'
import BlogSection from './components/BlogSection'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar/>
    
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-20 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link href="#benefits" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Beneficios</Link>
            <Link href="#advantages" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Ventajas</Link>
            <Button variant="ghost" onClick={() => {
              setIsContactFormOpen(true)
              setIsMenuOpen(false)
            }}>Contacto</Button>
          </div>
        </div>
      )}

      <main className="flex-grow pt-24">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
  {/* Imagen de fondo con overlay */}
  <div className="absolute inset-0 z-0">
    <Image
      src="https://team.cloudhub.cl/wp-content/uploads/2024/10/document.jpeg"
      alt="Analytics Dashboard"
      fill
      className="object-cover"
      priority
      quality={100}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/70" />
  </div>

  {/* Contenido del hero */}
  <div className="container mx-auto px-4 text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary DEFAULT">
        Toma decisiones informadas con datos reales
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-foreground">
        Integra Google Analytics, GTM y Ads con nuestros dashboards personalizados
      </p>
      <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-foreground">
        Aumenta la eficiencia y productividad de tus campañas publicitarias con nuestra solución de integración de datos en tiempo real
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Button size="lg" className="rounded-full bg-primary/90 hover:bg-primary/100 transition-colors duration-300">
          Prueba Ahora
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  </div>

  {/* Decorative elements */}
  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
</section>

        <section className="py-20 md:py-32 bg-muted" id="benefits">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Beneficios</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Beneficios Lógicos</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Aumenta la eficiencia y productividad de tus campañas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Mejora la experiencia del usuario</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Reduce el desperdicio de dinero</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Beneficios Irracionales</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Sentirse más confiado en tus decisiones</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Reducir el estrés y la ansiedad</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Sentirse más conectado con tus clientes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      
        <section className="py-20 md:py-32 bg-secondary text-secondary-foreground" id="advantages">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Ventajas</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center bg-secondary-foreground/10 backdrop-blur-md rounded-2xl p-8 hover:bg-secondary-foreground/20 transition-colors duration-300">
                <Clock className="mx-auto mb-6 text-primary h-16 w-16" />
                <h3 className="text-xl font-semibold mb-4">Integración en tiempo real</h3>
                <p className="text-secondary-foreground/80">¡No más tardanzas ni retrasos en la integración de tus datos!</p>
              </div>
              <div className="text-center bg-secondary-foreground/10 backdrop-blur-md rounded-2xl p-8 hover:bg-secondary-foreground/20 transition-colors duration-300">
                <LayoutDashboard className="mx-auto mb-6 text-primary h-16 w-16" />
                <h3 className="text-xl font-semibold mb-4">Dashboards personalizados</h3>
                <p className="text-secondary-foreground/80">Personaliza tus dashboards y analiza tus datos de la manera que más te convenga.</p>
              </div>
              <div className="text-center bg-secondary-foreground/10 backdrop-blur-md rounded-2xl p-8 hover:bg-secondary-foreground/20 transition-colors duration-300">
                <PhoneCall className="mx-auto mb-6 text-primary h-16 w-16" />
                <h3 className="text-xl font-semibold mb-4">Soporte técnico 24/7</h3>
                <p className="text-secondary-foreground/80">Nuestro equipo de soporte técnico está aquí para ayudarte en todo momento.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10" id="cta">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">¿Listo para mejorar tus campañas?</h2>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button size="lg" className="rounded-full">
                Prueba nuestra solución
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" onClick={() => setIsContactFormOpen(true)}>
                Contacta con nosotros
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; 2024 cloudHUB. Todos los derechos reservados.</p>
        </div>
      </footer>

      {isContactFormOpen && <ContactForm onClose={() => setIsContactFormOpen(false)} />}
    </div>
  )
}