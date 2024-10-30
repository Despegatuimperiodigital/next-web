'use client'

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Beneficios", href: "#benefits" },
  { name: "Ventajas", href: "#advantages" },
  { name: "Contacto", href: "#" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-7xl">
      <nav 
        className={`
          bg-background/80 backdrop-blur-md rounded-2xl px-6 
          transition-all duration-300 
          ${isScrolled ? 'shadow-lg' : ''}
        `}
      >
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%201-TYs9KHCsk5IX62o8pZCEAMpt8rguHH.png"
              alt="cloudHUB Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <ul className="hidden md:flex space-x-8" ref={dropdownRef}>
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <Link 
                  href={item.href} 
                  className="text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex space-x-4">
            <Button variant="outline">Iniciar sesión</Button>
            <Button>Empezar ahora</Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden mt-2 bg-background/95 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-6 py-3 text-foreground hover:bg-muted transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="p-4 space-y-2 border-t border-border/50">
            <Button variant="outline" className="w-full">
              Iniciar sesión
            </Button>
            <Button className="w-full">
              Empezar ahora
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}