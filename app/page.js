'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "./components/ui/button"
import { ArrowRight, CheckCircle, Clock, LayoutDashboard, PhoneCall, Menu, X } from "lucide-react"
import ContactForm from './components/ContactForm'
import Navbar from './components/navbar'
import { motion } from 'framer-motion'
import ElegantHeroSection from './components/home/Home'
import ServicesSection from './components/home/Servicios'
import BlogSection from './components/home/BlogSection'
import Contacto from './components/home/Contact'
import Footer from './components/home/Footer'
import EnhancedFeedbackButton from './components/suportchat/Supportchat.jsx'


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main>
        <Navbar />
        <ElegantHeroSection />
        <ServicesSection />
        <BlogSection />
        <Contacto/>
        <Footer/>
        <EnhancedFeedbackButton/>
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
        {isContactFormOpen && <ContactForm onClose={() => setIsContactFormOpen(false)} />}
      </main>
    </div>
  )
}