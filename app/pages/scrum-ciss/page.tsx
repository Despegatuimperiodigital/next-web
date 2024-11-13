import React from 'react'
import Image from 'next/image'
import { Calendar, Users, Target, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react'

// Styles
const styles = {
  primary: '#F04132',
  secondary: '#0D2940',
  accent1: '#363439',
  accent2: '#006699',
  accent3: '#0D2940',
  background: '#FDFAFA',
  text: '#1A1B1C',
  gradient: 'linear-gradient(135deg, #F04132 0%, #0D2940 100%)',
}

// Subcomponents with updated styling
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16 relative">
    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
    <h2 className="text-3xl font-bold mb-8 pl-6" style={{ color: styles.secondary, fontFamily: 'Quicksand' }}>
      {title}
    </h2>
    <div className="pl-6">{children}</div>
  </section>
)

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-semibold mb-4" style={{ color: styles.secondary, fontFamily: 'Quicksand' }}>
      {title}
    </h3>
    {children}
  </div>
)

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
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

const SprintSection = ({ number, meta, stories, dod, points, value }: {
  number: number;
  meta: string;
  stories: string[];
  dod: string[];
  points: number;
  value: string;
}) => (
  <div className="mb-8 p-6 rounded-lg shadow-md relative overflow-hidden" style={{ backgroundColor: styles.background }}>
    <div className="absolute top-0 left-0 w-2 h-full" style={{ background: styles.gradient }}></div>
    <h3 className="text-2xl font-bold mb-4 pl-4" style={{ color: styles.secondary }}>
      Sprint {number} ({number === 0 ? '1 semana' : '2 semanas'}) - {meta}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SubSection title="Historias de Usuario Principales">
        <List items={stories} />
      </SubSection>
      <SubSection title="Definition of Done (DoD)">
        <List items={dod} />
      </SubSection>
    </div>
    <div className="mt-4 flex justify-between items-center text-sm font-medium" style={{ color: styles.secondary }}>
      <span>Puntos de Historia Estimados: {points}</span>
      <span>Valor del Sprint: {value}</span>
    </div>
  </div>
)

// Main component
export default function FuturisticAgileImplementationPlan() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2" style={{ background: styles.gradient }}></div>
      <header className="mb-16 text-center relative">
        <div className="flex justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20v1-eXdopmoWlMlRNvOfRaMQ2dMW4azh0V.png"
            alt="cloudHUB Logo"
            width={350}
            height={117}
            className="h-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4" style={{ color: styles.secondary, fontFamily: 'Quicksand' }}>
          Plan de Implementación Ágil
        </h1>
        <h2 className="text-3xl font-semibold" style={{ color: styles.primary, fontFamily: 'Quicksand' }}>
          Sistema Integral de Gestión Inmobiliaria CISS
        </h2>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1" style={{ background: styles.gradient }}></div>
      </header>

      <Section title="Información General">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div className="space-y-2">
            <p><strong>Proyecto:</strong> Sistema Integral de Gestión Inmobiliaria y Marketing Digital</p>
            <p><strong>Cliente:</strong> Inmobiliaria CISS</p>
          </div>
          <div className="space-y-2">
            <p><strong>Duración Total:</strong> 6-8 semanas (3-4 Sprints)</p>
            <p><strong>Tamaño de Sprint:</strong> 2 semanas</p>
            <p><strong>Inversión Total:</strong> 27.5 UF + IVA</p>
          </div>
        </div>
      </Section>

      <Section title="Estructura del Equipo Scrum">
        <div className="flex items-center space-x-4 mb-6">
          <Users className="w-8 h-8" style={{ color: styles.primary }} />
          <span className="text-xl font-semibold" style={{ color: styles.secondary }}>Roles y Responsabilidades</span>
        </div>
        <Table
          headers={['Rol', 'Asignado a']}
          rows={[
            ['Product Owner', '[Representante CISS]'],
            ['Scrum Master', 'Felipe Ignacio Correa K.'],
            ['Equipo de Desarrollo', 'Desarrollador Full-Stack Senior, Especialista UX/UI, Especialista SEO/Performance']
          ]}
        />
      </Section>

      <Section title="Cronograma de Sprints">
        <div className="space-y-8">
          <SprintSection
            number={0}
            meta="Preparación"
            stories={[
              "Kick-off del proyecto",
              "Refinamiento del Product Backlog",
              "Configuración de ambientes",
              "Definición de Definition of Done (DoD)"
            ]}
            dod={[
              "Product Backlog priorizado",
              "Ambientes de desarrollo configurados",
              "Plan de comunicación establecido"
            ]}
            points={0}
            value="N/A"
          />
          <SprintSection
            number={1}
            meta="Fundamentos"
            stories={[
              "Arquitectura base del sistema",
              "Diseño UX/UI de componentes core",
              "Estructura de base de datos",
              "Prototipo de landing page principal"
            ]}
            dod={[
              "Código revisado y testeado",
              "Documentación técnica básica",
              "Aprobación de diseños por stakeholders"
            ]}
            points={13}
            value="7.5 UF"
          />
          <SprintSection
            number={2}
            meta="Core Features"
            stories={[
              "CRUD de propiedades",
              "Panel de administración",
              "Landing pages responsivas",
              "Implementación SEO básica"
            ]}
            dod={[
              "Tests unitarios completados",
              "Responsive design verificado",
              "PageSpeed score >75"
            ]}
            points={21}
            value="14 UF"
          />
          <SprintSection
            number={3}
            meta="Optimización"
            stories={[
              "Optimización de rendimiento",
              "Integración con buscador",
              "SEO avanzado",
              "Sistema de caché"
            ]}
            dod={[
              "PageSpeed score >80",
              "Tests de integración completados",
              "Documentación final actualizada"
            ]}
            points={13}
            value="6 UF"
          />
        </div>
      </Section>

      <Section title="Ceremonias Scrum">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Calendar, title: "Daily Scrum", items: ["Frecuencia: Diaria", "Duración: 15 minutos", "Formato: Virtual", "Horario: 9:30 AM"] },
            { icon: Target, title: "Sprint Planning", items: ["Frecuencia: Cada 2 semanas", "Duración: 2 horas", "Participantes: Equipo completo"] },
            { icon: CheckCircle, title: "Sprint Review", items: ["Frecuencia: Fin de cada sprint", "Duración: 1 hora", "Participantes: Equipo + Stakeholders"] },
            { icon: Users, title: "Sprint Retrospective", items: ["Frecuencia: Fin de cada sprint", "Duración: 45 minutos", "Participantes: Equipo de desarrollo"] }
          ].map((ceremony, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md relative overflow-hidden" style={{ backgroundColor: styles.background }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: styles.gradient }}></div>
              <h4 className="text-xl font-semibold mb-4 flex items-center" style={{ color: styles.secondary }}>
                <ceremony.icon className="w-6 h-6 mr-3" style={{ color: styles.primary }} />
                {ceremony.title}
              </h4>
              <div className="space-y-2 text-sm">
                {ceremony.items.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Gestión de Riesgos">
        <div className="p-6 rounded-lg shadow-md relative overflow-hidden" style={{ backgroundColor: styles.background }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: styles.gradient }}></div>
          <h4 className="text-xl font-semibold mb-4 flex items-center" style={{ color: styles.secondary }}>
            <AlertTriangle className="w-6 h-6 mr-3" style={{ color: styles.primary }} />
            Estrategias de Mitigación
          </h4>
          <List items={[
            "Buffer de Tiempo: 1 semana adicional prevista",
            "Priorización Ágil: Features críticos primero",
            "Comunicación Continua: Dailies y canal de Slack",
            "Revisiones Tempranas: Feedback constante del cliente"
          ]} />
        </div>
      </Section>

      <Section title="Plan de Pagos">
        <Table
          headers={['Etapa', 'Monto']}
          rows={[
            ['Inicio del Proyecto', '13.75 UF + IVA'],
            ['30 días', '13.75 UF + IVA']
          ]}
        />
      </Section>

      <footer className="mt-16 text-center relative">
        <div className="mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recurso%201-zv3qtMFHyfQhEnacOYUNmDzYF8gwai.png"
            alt="cloudHUB Icon"
            width={60}
            height={60}
            className="mx-auto"
          />
        </div>
        <p className="text-sm" style={{ color: styles.secondary }}>
          Este documento es un plan de trabajo vivo que puede ajustarse según las necesidades del proyecto y feedback del equipo.
        </p>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1" style={{ background: styles.gradient }}></div>
      </footer>
    </div>
  )
}