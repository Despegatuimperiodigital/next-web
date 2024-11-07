'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Clock, LayoutDashboard, Settings, FileDown, MousePointer, Play, FileText, ArrowDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from '../../components/navbar'
import { Button } from "../../components/ui/button"
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F7F9F8] to-[#E0E5E9] text-[#182633]">
      <Navbar />

      <main className="flex-grow">  {/* Removido el pt-32 */}
        <HeroSection />
        <BenefitsSection />
        <WhyGTMSection />
        <BeyondAdsSection />
        <OurServiceSection />
        <CTASection />
      </main>

      <footer className="bg-[#182633] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 cloudHUB. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="min-h-screen relative -mt-[80px]"> {/* Ajustado para compensar el navbar */}
      <div className="absolute inset-0">
        <Image
          src="https://team.cloudhub.cl/wp-content/uploads/2024/10/document.jpeg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative h-screen flex flex-col justify-center items-center pt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F33F31] to-[#FF8866] md:from-[#F33F31] md:to-[#FF8866]">
          ¿Tus datos de Google Analytics son confiables?
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white">
          Optimiza tus campañas de Google Ads con GTM
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-white">
          En el mundo del marketing digital, la precisión lo es todo. Cada clic, cada conversión, cada interacción con tu sitio web o aplicación es una pieza clave para entender a tu audiencia y optimizar tus campañas de Google Ads.
        </p>
        <Button className="bg-[#F33F31] text-white hover:bg-[#E77171] transition-colors duration-300 text-lg py-6 px-8 rounded-full">
          Descubre GTM
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
function WhyGTMSection() {
  return (
    <section className="py-20 md:py-32" id="advantages">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">¿Por qué GTM es esencial para tus campañas de Google Ads?</h2>
        <p className="text-lg mb-8 text-center max-w-3xl mx-auto">GTM te permite implementar un seguimiento preciso y flexible de las interacciones de los usuarios en tu sitio web o aplicación. Imagina poder rastrear con exactitud eventos como:</p>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={FileDown} title="Descargas de archivos" description="¿Qué documentos generan mayor interés?" />
          <FeatureCard icon={MousePointer} title="Clics en botones específicos" description="¿Qué llamadas a la acción son más efectivas?" />
          <FeatureCard icon={Play} title="Reproducciones de video" description="¿Cuánto tiempo dedican los usuarios a tu contenido audiovisual?" />
          <FeatureCard icon={FileText} title="Envío de formularios" description="¿En qué punto del proceso de compra abandonan los usuarios el formulario?" />
          <FeatureCard icon={ArrowDown} title="Scroll depth" description="¿Qué porcentaje de la página leen tus visitantes?" />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Icon className="text-[#FF8866] mb-4 h-8 w-8" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[#182633] to-[#2C3E50] text-white" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Beneficios para tus campañas de Google Ads</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <BenefitCard title="Segmentación precisa" description="Crea audiencias altamente segmentadas basadas en interacciones específicas con tu sitio web o aplicación, lo que te permite dirigir tus anuncios a las personas correctas." />
          <BenefitCard title="Optimización de pujas" description="Ajusta tus pujas en función del comportamiento real de los usuarios, maximizando tu retorno de la inversión en publicidad." />
          <BenefitCard title="Mejora en la atribución" description="Comprende qué canales y campañas generan las conversiones más valiosas." />
          <BenefitCard title="Toma de decisiones informadas" description="Accede a datos confiables para optimizar tus campañas y estrategias de marketing." />
        </div>
      </div>
    </section>
  )
}

function BenefitCard({ title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function BeyondAdsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Más allá de Google Ads</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Settings}
            title="Simplifica la implementación"
            description="Gestiona fácilmente otras etiquetas de marketing como Facebook Pixel, LinkedIn Insight Tag, etc."
          />
          <FeatureCard
            icon={LayoutDashboard}
            title="Autonomía del equipo de marketing"
            description="Reduce la dependencia del equipo de desarrollo y gestiona las etiquetas de forma autónoma y ágil."
          />
          <FeatureCard
            icon={Clock}
            title="Pruebas A/B"
            description="Experimenta con diferentes versiones de tu sitio web para optimizar la experiencia del usuario."
          />
        </div>
      </div>
    </section>
  )
}

function OurServiceSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[#F33F31] to-[#FF8866] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Nuestro servicio de integración de GTM</h2>
        <p className="text-lg mb-12 text-center max-w-3xl mx-auto">Te ofrecemos una integración segura y sin problemas de Google Tag Manager en tu sitio web o aplicación. Nuestro equipo de expertos se encargará de:</p>
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceFeature description="Configurar GTM de acuerdo a tus necesidades específicas." />
          <ServiceFeature description="Implementar el seguimiento de eventos clave para tu negocio." />
          <ServiceFeature description="Integrar GTM con Google Analytics y otras plataformas de marketing." />
          <ServiceFeature description="Brindarte soporte continuo y asesoría para que puedas aprovechar al máximo las ventajas de GTM." />
        </div>
      </div>
    </section>
  )
}

function ServiceFeature({ description }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-colors duration-300">
      <CheckCircle className="text-white mb-4 h-8 w-8" />
      <p>{description}</p>
    </div>
  )
}

function CTASection() {
  return (
    <section className="py-20 md:py-32" id="cta">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#182633]">¿Estás listo para optimizar tus campañas de Google Ads?</h2>
        <p className="text-xl mb-12">Toma decisiones de marketing más inteligentes con GTM</p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="bg-[#F33F31] text-white hover:bg-[#E77171] transition-colors duration-300 text-lg py-6 px-8 rounded-full">
            Solicitar cotización
          </Button>
          <Button variant="outline" className="border-[#F33F31] text-[#F33F31] hover:bg-[#F33F31] hover:text-white transition-colors duration-300 text-lg py-6 px-8 rounded-full">
            Solicitar demostración
          </Button>
        </div>
      </div>
    </section>
  )
}