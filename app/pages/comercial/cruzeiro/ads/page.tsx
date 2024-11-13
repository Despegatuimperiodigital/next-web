import React from 'react'
import Image from 'next/image'
import { Calendar, DollarSign, CheckCircle, AlertTriangle, ChevronRight, Users, Zap, Lock, BarChart, Search, Target, PieChart, Briefcase } from 'lucide-react'

// Styles
const styles = {
  primary: '#F04132', // cloudHUB Red
  secondary: '#0D2940', // cloudHUB Navy
  accent1: '#363439', // Dark Gray
  accent2: '#006699', // Blue
  accent3: '#0D2940', // Secondary Navy
  background: '#FDFAFA', // White
  text: '#1A1B1C', // Black
  gradient: 'linear-gradient(135deg, #F04132 0%, #0D2940 100%)',
}

// Subcomponents
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12 relative">
    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#F04132] to-[#0D2940]"></div>
    <h2 className="text-2xl font-bold mb-6 pl-6" style={{ color: styles.secondary }}>
      {title}
    </h2>
    <div className="pl-6">{children}</div>
  </section>
)

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4" style={{ color: styles.secondary }}>
      {title}
    </h3>
    {children}
  </div>
)

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        <ChevronRight className="mr-2 mt-1" style={{ color: styles.primary }} />
        <span style={{ color: styles.text }}>{item}</span>
      </li>
    ))}
  </ul>
)

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto shadow-lg rounded-lg">
    <table className="min-w-full bg-white">
      <thead>
        <tr style={{ background: styles.gradient }}>
          {headers.map((header, index) => (
            <th key={index} className="py-3 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-4 px-6 text-sm" style={{ color: styles.text }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const WeekSection = ({ number, items }: { number: number; items: string[] }) => (
  <div className="mb-6 p-6 rounded-lg shadow-md relative overflow-hidden" style={{ backgroundColor: styles.background }}>
    <div className="absolute top-0 left-0 w-full h-1" style={{ background: styles.gradient }}></div>
    <h4 className="text-xl font-bold mb-4" style={{ color: styles.secondary }}>
      Semana {number}
    </h4>
    <List items={items} />
  </div>
)

// Main component
export default function GoogleAdsProposal() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2" style={{ background: styles.gradient }}></div>
      
      <header className="mb-12 text-center relative">
        <div className="flex justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%201-xOsEoefi6REL0U8Y9lRMbQ1aRZwkNZ.png"
            alt="cloudHUB Logo"
            width={350}
            height={117}
            className="h-auto"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: styles.secondary }}>
          Propuesta de Servicios Google Ads
        </h1>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: styles.primary }}>
          Optimización y Gestión de Campañas Digitales
        </h2>
        <div className="text-lg mb-2">
          <strong>Fecha:</strong> 07-11-2024
        </div>
        <div className="text-lg mb-2">
          <strong>Validez:</strong> 15 días
        </div>
        <div className="text-lg">
          <strong>Inversión:</strong> 10 UF + IVA mensual
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1" style={{ background: styles.gradient }}></div>
      </header>

      <Section title="Resumen Ejecutivo">
        <p className="text-lg">
          Presentamos nuestra propuesta de servicios profesionales para la gestión y optimización de sus campañas en Google Ads, diseñada para maximizar el retorno de su inversión publicitaria.
        </p>
      </Section>

      <Section title="Servicios Incluidos">
        <SubSection title="1. Reuniones y Asesorías Mensuales">
          <List items={[
            "2-4 reuniones mensuales en total",
            "Hasta 2 reuniones presenciales",
            "Reuniones adicionales vía Meet",
            "Duración: 1 hora por reunión",
            "Agenda y minutas incluidas"
          ]} />
        </SubSection>

        <SubSection title="2. Gestión Estratégica de Campañas">
          <List items={[
            "Optimización de 2 campañas existentes",
            "Pruebas A/B continuas",
            "Ajustes basados en rendimiento",
            "Monitoreo diario de métricas clave",
            "Respuesta a ajustes urgentes en 24 horas hábiles"
          ]} />
        </SubSection>

        <SubSection title="3. Análisis y Reporting">
          <List items={[
            "Reportes mensuales detallados",
            "Dashboard en tiempo real",
            "Análisis de métricas clave",
            "Seguimiento de KPIs",
            "Recomendaciones de optimización"
          ]} />
        </SubSection>

        <SubSection title="4. Implementación Técnica">
          <List items={[
            "Configuración de Google Tag Manager",
            "Implementación de pixel de conversión",
            "Configuración de eventos",
            "Verificación de tracking",
            "Pruebas de funcionamiento"
          ]} />
        </SubSection>

        <SubSection title="5. Optimización Continua">
          <List items={[
            "Ajuste de pujas",
            "Optimización de anuncios",
            "Refinamiento de segmentación",
            "Mejora de calidad de tráfico",
            "Recomendaciones de keywords"
          ]} />
        </SubSection>
      </Section>

      <Section title="Calendario Mensual">
        <div className="space-y-6">
          <WeekSection
            number={1}
            items={[
              "Reunión inicial de mes (presencial opcional)",
              "Definición de objetivos mensuales",
              "Implementación de optimizaciones"
            ]}
          />
          <WeekSection
            number={2}
            items={[
              "Reunión de seguimiento (virtual)",
              "Ajustes según resultados iniciales",
              "Inicio de pruebas A/B"
            ]}
          />
          <WeekSection
            number={3}
            items={[
              "Reunión de optimización (virtual)",
              "Análisis de pruebas A/B",
              "Ajustes de estrategia"
            ]}
          />
          <WeekSection
            number={4}
            items={[
              "Reunión de cierre mensual (presencial opcional)",
              "Presentación de resultados",
              "Planificación mes siguiente"
            ]}
          />
        </div>
      </Section>

      <Section title="Herramientas Profesionales Incluidas">
        <List items={[
          "Herramientas premium de análisis",
          "Software de optimización",
          "Plataformas de tracking avanzado",
          "Herramientas de reporting",
          "Dashboard personalizado"
        ]} />
      </Section>

      <Section title="Entregables Mensuales">
        <List items={[
          "Reporte de rendimiento",
          "Análisis de métricas",
          "Recomendaciones de mejora",
          "Plan de optimización",
          "Minutas de reuniones"
        ]} />
      </Section>

      <Section title="Inversión">
        <div className="text-2xl font-bold mb-4" style={{ color: styles.primary }}>
          Valor Mensual: 10 UF + IVA
        </div>
        <SubSection title="Incluye:">
          <List items={[
            "2-4 reuniones mensuales (hasta 2 presenciales)",
            "Gestión profesional de campañas",
            "Herramientas premium",
            "Asesoría estratégica",
            "Reporting mensual",
            "Soporte por email y WhatsApp"
          ]} />
        </SubSection>
        <SubSection title="No Incluye:">
          <List items={[
            "Presupuesto de medios (inversión en Google Ads)",
            "Desarrollo de creatividades",
            "Análisis inicial de palabras clave",
            "Investigación de mercado inicial",
            "Reuniones adicionales fuera del plan"
          ]} />
        </SubSection>
      </Section>

      <Section title="Condiciones Comerciales">
        <List items={[
          "Contrato mínimo: 3 meses",
          "Pago mensual anticipado",
          "Facturación: Primeros 5 días del mes",
          "Reuniones adicionales: 1 UF + IVA c/u"
        ]} />
      </Section>

      <Section title="Beneficios Principales">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Zap, text: "Optimización profesional continua", color: styles.primary },
            { icon: Users, text: "Flexibilidad en formato de reuniones", color: styles.secondary },
            { icon: CheckCircle, text: "Soporte constante", color: styles.accent1 },
            { icon: BarChart, text: "Mejora en calidad de tráfico", color: styles.accent2 },
            { icon: DollarSign, text: "Reducción de costos por click", color: styles.primary },
            { icon: Target, text: "Incremento en conversiones", color: styles.secondary }
          ].map((benefit, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <benefit.icon className="w-6 h-6 mr-3" style={{ color: benefit.color }} />
              <span className="text-sm font-medium" style={{ color: styles.text }}>{benefit.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Garantías">
        <List items={[
          "Transparencia total en gestión",
          "Acceso a reportes en tiempo real",
          "Optimización continua",
          "Soporte dedicado",
          "Respuesta en 24 horas hábiles"
        ]} />
      </Section>

      <Section title="Aceptación">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-2" style={{ color: styles.primary }}>Por Cliente:</h4>
            <div className="space-y-2">
              <p><strong>Nombre:</strong> ________________</p>
              <p><strong>Cargo:</strong> _________________</p>
              <p><strong>Fecha:</strong> _________________</p>
              <p><strong>Firma:</strong> _________________</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2" style={{ color: styles.primary }}>Por cloudHUB:</h4>
            <div className="space-y-2">
              <p><strong>Nombre:</strong> ________________</p>
              <p><strong>Cargo:</strong> _________________</p>
              <p><strong>Fecha:</strong> _________________</p>
              <p><strong>Firma:</strong> _________________</p>
            </div>
          </div>
        </div>
      </Section>

      <footer className="mt-12 text-center relative">
        <div className="mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recurso%201-uhY7hLkbsJIa6i34gbeVlfLzIN6pXc.png"
            alt="cloudHUB Icon"
            width={60}
            height={60}
            className="mx-auto"
          />
        </div>
        <p className="text-sm" style={{ color: styles.text }}>
          Esta propuesta es confidencial y está diseñada específicamente para su empresa. Los valores están expresados en UF para mantener el valor real del servicio en el tiempo.
        </p>
        <div className="flex justify-center items-center mt-4">
          <Lock className="w-4 h-4 mr-2" style={{ color: styles.primary }} />
          <span className="text-xs font-medium" style={{ color: styles.secondary }}>Documento Confidencial</span>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1" style={{ background: styles.gradient }}></div>
      </footer>
    </div>
  )
}