'use client'

import { useState } from 'react'
import { Button } from "./components/ui/button"
import { ArrowRight, CheckCircle, Clock, LayoutDashboard, PhoneCall, Menu, X } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F7F9F8] to-[#E0E5E9] text-[#182633]">
      <header className="bg-transparent py-6 fixed w-full z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudhub%20(1)-wlyADOyAl7oDNS7UzM3u3CumiqqVww.png" alt="cloudHUB Logo" width={32} height={32} className="mr-2" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#benefits" className="text-[#182633] hover:text-[#F33F31] transition-colors duration-300">Beneficios</Link>
            <Link href="#advantages" className="text-[#182633] hover:text-[#F33F31] transition-colors duration-300">Ventajas</Link>
            <Link href="#cta" className="text-[#182633] hover:text-[#F33F31] transition-colors duration-300">Contacto</Link>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link href="#benefits" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Beneficios</Link>
            <Link href="#advantages" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Ventajas</Link>
            <Link href="#cta" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
          </div>
        </div>
      )}

      <main className="flex-grow pt-24">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F33F31] to-[#FF8866]">Toma decisiones informadas con datos reales</h1>
            <p className="text-xl md:text-2xl mb-8 text-[#182633]/80">Integra Google Analytics, GTM y Ads con nuestros dashboards personalizados</p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">Aumenta la eficiencia y productividad de tus campañas publicitarias con nuestra solución de integración de datos en tiempo real</p>
            <Button className="bg-[#F33F31] text-white hover:bg-[#E77171] transition-colors duration-300 text-lg py-6 px-8 rounded-full">
              Prueba Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="py-20 md:py-32" id="benefits">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Beneficios</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-[#F33F31]">Beneficios Lógicos</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-[#FF8866] mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Aumenta la eficiencia y productividad de tus campañas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#FF8866] mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Mejora la experiencia del usuario</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#FF8866] mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Reduce el desperdicio de dinero</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-[#F33F31]">Beneficios Irracionales</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-[#FF8866] mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Sentirse más confiado en tus decisiones</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#FF8866] mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Reducir el estrés y la ansiedad</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#FF8866] mr-4 mt-1 flex-shrink-0 h-6 w-6" />
                    <span>Sentirse más conectado con tus clientes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-br from-[#182633] to-[#2C3E50] text-white" id="advantages">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Ventajas</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-colors duration-300">
                <Clock className="mx-auto mb-6 text-[#FF8866] h-16 w-16" />
                <h3 className="text-xl font-semibold mb-4">Integración en tiempo real</h3>
                <p className="text-white/80">¡No más tardanzas ni retrasos en la integración de tus datos!</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-colors duration-300">
                <LayoutDashboard className="mx-auto mb-6 text-[#FF8866] h-16 w-16" />
                <h3 className="text-xl font-semibold mb-4">Dashboards personalizados</h3>
                <p className="text-white/80">Personaliza tus dashboards y analiza tus datos de la manera que más te convenga.</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-colors duration-300">
                <PhoneCall className="mx-auto mb-6 text-[#FF8866] h-16 w-16" />
                <h3 className="text-xl font-semibold mb-4">Soporte técnico 24/7</h3>
                <p className="text-white/80">Nuestro equipo de soporte técnico está aquí para ayudarte en todo momento.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32" id="cta">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#182633]">¿Listo para mejorar tus campañas?</h2>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button className="bg-[#F33F31] text-white hover:bg-[#E77171] transition-colors duration-300 text-lg py-6 px-8 rounded-full">
                Prueba nuestra solución
              </Button>
              <Button variant="outline" className="border-[#F33F31] text-[#F33F31] hover:bg-[#F33F31] hover:text-white transition-colors duration-300 text-lg py-6 px-8 rounded-full">
                Contacta con nosotros
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#182633] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 cloudHUB. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}