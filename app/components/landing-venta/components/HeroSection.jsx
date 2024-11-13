`useState`

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../../ui/button'

export default function HeroSection() {
  const [sitesAnalyzed, setSitesAnalyzed] = useState(324);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSitesAnalyzed(prev => prev + 1);
    }, 30000); // Incrementa cada 30 segundos

    setIsVisible(true);

    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative bg-gradient-to-b from-primary to-secondary py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Fondo 2.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-foreground">
            Acelera tu Sitio Web y Aumenta tus Conversiones hasta un 40%
          </h1>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Optimización profesional y monitoreo 24/7 para empresas que no pueden permitirse caídas ni sitios lentos
          </p>
          <Button
            size="lg"
            className="mb-8 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 ease-in-out"
          >
            ANALIZAR MI SITIO GRATIS <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
        <div className="trust-elements">
          <motion.p
            className="text-lg mb-4 text-primary-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="font-bold text-2xl">{sitesAnalyzed}</span> sitios analizados esta semana
          </motion.p>
          <motion.p
            className="text-lg mb-8 text-primary-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <CheckCircle className="inline-block mr-2 text-accent" /> Diagnóstico completado en 45 segundos
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=64&width=64`}
                  alt={`Cliente ${index + 1}`}
                  width={48}
                  height={48}
                />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[1, 2].map((_, index) => (
              <div key={index} className="w-20 h-10 bg-primary-foreground/10 rounded flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=40&width=80`}
                  alt={`Certificación ${index + 1}`}
                  width={64}
                  height={32}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}