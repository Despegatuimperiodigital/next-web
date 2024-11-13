import React from 'react'
import Image from 'next/image'
import { Calendar, DollarSign, CheckCircle, AlertTriangle, ChevronRight, Users, Zap, Lock } from 'lucide-react'

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

// Subcomponents
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12 relative">
    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
    <h2 className="text-2xl font-bold mb-6 pl-6" style={{ color: styles.secondary, fontFamily: 'Quicksand' }}>
      {title}
    </h2>
    <div className="pl-6">{children}</div>
  </section>
)

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4" style={{ color: styles.secondary, fontFamily: 'Quicksand' }}>
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

const SprintSection = ({ number, title, items, value }: {
  number: number;
  title: string;
  items: string[];
  value: string;
}) => (
  <div className="mb-6 p-6 rounded-lg shadow-md relative overflow-hidden" style={{ backgroundColor: styles.background }}>
    <div className="absolute top-0 left-0 w-full h-1" style={{ background: styles.gradient }}></div>
    <h4 className="text-xl font-bold mb-4" style={{ color: styles.secondary }}>
      Sprint {number} ({number === 0 ? '1 semana' : '2 semanas'}) - {title}
    </h4>
    <List items={items} />
    <div className="mt-4 font-medium" style={{ color: styles.secondary }}>
      <strong>Valor:</strong> {value}
    </div>
  </div>
)

// Main component
export default function CommercialProposal() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2" style={{ background: styles.gradient }}></div>
      
      <header className="mb-12 text-center relative">
        <div className="flex justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20v1-eXdopmoWlMlRNvOfRaMQ2dMW4azh0V.png"
            alt="cloudHUB Logo"
            width={350}
            height={117}
            className="h-auto"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: styles.secondary, fontFamily: 'Quicksand' }}>
          Propuesta Comercial
        </h1>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: styles.primary, fontFamily: 'Quicksand' }}>
          Sistema Integral de Gestión Inmobiliaria CISS
        </h2>
        <div className="text-lg mb-2">
          <strong>Cotización N°:</strong> CIS-2024-001
        </div>
        <div className="text-lg mb-2">
          <strong>Fecha:</strong> 6-11-2024
        </div>
        <div className="text-lg mb-2">
          <strong>Validez:</strong> 15 días
        </div>
        <div className="text-lg mb-2">
          <strong>Para:</strong> Inmobiliaria CISS
        </div>
        <div className="text-lg">
          <strong>De:</strong> Felipe Ignacio Correa K.
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1" style={{ background: styles.gradient }}></div>
      </header>

      <Section title="Resumen Ejecutivo">
        <p className="text-lg">
          Nos complace presentar nuestra propuesta para el desarrollo e implementación de un Sistema Integral de Gestión Inmobiliaria, diseñado específicamente para optimizar las operaciones de Inmobiliaria CISS.
        </p>
      </Section>

      <Section title="1. Alcance del Proyecto">
        <SubSection title="Desarrollo Integral que Incluye:">
          <List items={[
            "Sistema de gestión de propiedades",
            "Landing pages optimizadas",
            "Integración con buscador existente",
            "Optimización SEO y rendimiento",
            "Panel de administración personalizado"
          ]} />
        </SubSection>
      </Section>

      <Section title="2. Plan de Implementación Ágil">
        <div className="space-y-6">
          <SprintSection
            number={0}
            title="Fase de Preparación"
            items={[
              "Configuración inicial",
              "Planificación detallada",
              "Kick-off del proyecto"
            ]}
            value="Incluido en Sprint 1"
          />
          <SprintSection
            number={1}
            title="Fundamentos"
            items={[
              "Arquitectura base",
              "Diseño UX/UI core",
              "Base de datos",
              "Landing page prototipo"
            ]}
            value="7.5 UF + IVA"
          />
          <SprintSection
            number={2}
            title="Funcionalidades Core"
            items={[
              "Sistema CRUD completo",
              "Panel administrativo",
              "Landing pages responsivas",
              "SEO básico"
            ]}
            value="14 UF + IVA"
          />
          <SprintSection
            number={3}
            title="Optimización"
            items={[
              "Performance",
              "SEO avanzado",
              "Integración buscador",
              "Sistema de caché"
            ]}
            value="6 UF + IVA"
          />
        </div>
      </Section>

      <Section title="3. Equipo Dedicado">
        <List items={[
          "Scrum Master",
          "Desarrollador Full-Stack Senior",
          "Especialista UX/UI",
          "Especialista SEO/Performance"
        ]} />
      </Section>

      <Section title="4. Garantías Técnicas">
        <List items={[
          "PageSpeed score >80",
          "Responsive design",
          "Zero bugs críticos",
          "Documentación completa"
        ]} />
      </Section>

      <Section title="5. Entregables Garantizados">
        <List items={[
          "Sistema de gestión completo",
          "Landing pages optimizadas",
          "Panel de administración",
          "Documentación técnica",
          "Capacitación de personal"
        ]} />
      </Section>

      <Section title="6. Inversión Total">
        <div className="text-2xl font-bold mb-4" style={{ color: styles.primary }}>
          Valor Total: 27.5 UF + IVA
        </div>
        <SubSection title="Desglose por Sprint:">
          <Table
            headers={['Sprint', 'Valor']}
            rows={[
              ['Sprint 1', '7.5 UF + IVA'],
              ['Sprint 2', '14 UF + IVA'],
              ['Sprint 3', '6 UF + IVA']
            ]}
          />
        </SubSection>
      </Section>

      <Section title="7. Condiciones Comerciales">
        <SubSection title="Plan de Pagos:">
          <List items={[
            "Inicio del Proyecto: 13.75 UF + IVA",
            "Entrega de proyecto: 13.75 UF + IVA"
          ]} />
        </SubSection>
        <SubSection title="Incluye:">
          <List items={[
            "Garantía de 3 meses",
            "Soporte durante implementación",
            "Capacitación del personal",
            "Documentación completa"
          ]} />
        </SubSection>
      </Section>

      <Section title="8. Plazos de Entrega">
        <List items={[
          "Duración Total: 6-8 semanas",
          "Inicio: Inmediato post aprobación",
          "Buffer: 1 semana adicional prevista"
        ]} />
      </Section>

      <Section title="9. Soporte y Garantía">
        <List items={[
          "3 meses de garantía post-implementación",
          "Soporte técnico durante desarrollo",
          "Mantenimiento correctivo incluido",
          "Documentación actualizada"
        ]} />
      </Section>

      <Section title="10. Beneficios Clave">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Zap, text: "Sistema centralizado de gestión" },
            { icon: Users, text: "Optimización de procesos" },
            { icon: DollarSign, text: "Mejora en conversión digital" },
            { icon: CheckCircle, text: "ROI medible y trackeable" },
            { icon: AlertTriangle, text: "Escalabilidad garantizada" }
          ].map((benefit, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <benefit.icon className="w-6 h-6 mr-3" style={{ color: styles.primary }} />
              <span className="text-sm font-medium" style={{ color: styles.secondary }}>{benefit.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="11. Próximos Pasos">
        <List items={[
          "Aprobación de propuesta",
          "Firma de contrato",
          "Reunión de kick-off",
          "Inicio de Sprint 0"
        ]} />
      </Section>

      <Section title="Forma de Pago">
        <List items={[
          "Transferencia Bancaria",
          "Datos bancarios se proporcionarán en factura"
        ]} />
      </Section>

      <Section title="Aceptación">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-2">Por Inmobiliaria CISS:</h4>
            <div className="space-y-2">
              <p><strong>Nombre:</strong> ________________</p>
              <p><strong>Cargo:</strong> _________________</p>
              <p><strong>Fecha:</strong> _________________</p>
              <p><strong>Firma:</strong> _________________</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Por Proveedor:</h4>
            <div className="space-y-2">
              <p><strong>Nombre:</strong> Felipe Ignacio Correa K.</p>
              <p><strong>Cargo:</strong> Desarrollador Full Stack </p>
              <p><strong>Fecha:</strong> 6-11-2024</p>
            </div>
          </div>
        </div>
      </Section>

      <footer className="mt-12 text-center relative">
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
          Esta propuesta es confidencial y está diseñada específicamente para Inmobiliaria CISS. Los valores están expresados en UF para mantener el valor real del proyecto en el tiempo.
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