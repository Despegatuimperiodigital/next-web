
import React from 'react'
import Image from 'next/image'
import { Calendar, Users, Target, CheckCircle, AlertTriangle, ChevronRight, Zap, Phone, Mail, MessageSquare } from 'lucide-react'

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

const ConceptCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-4">
    <h4 className="text-lg font-semibold mb-2" style={{ color: styles.secondary }}>{title}</h4>
    <p style={{ color: styles.text }}>{description}</p>
  </div>
)

// Main component
export default function ClientConceptGuide() {
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
          Guía de Conceptos para el Cliente
        </h1>
        <h2 className="text-2xl font-semibold" style={{ color: styles.primary, fontFamily: 'Quicksand' }}>
          Proyecto Sistema Integral Inmobiliario CISS
        </h2>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1" style={{ background: styles.gradient }}></div>
      </header>

      <Section title="1. Introducción a la Metodología Ágil">
        <SubSection title="¿Qué es Scrum y por qué lo usamos?">
          <p className="mb-4">
            Scrum es una metodología ágil que nos permite desarrollar su proyecto de forma iterativa y flexible. Las ventajas principales para CISS son:
          </p>
          <List items={[
            "Visibilidad constante del avance",
            "Capacidad de ajustar prioridades",
            "Entregas regulares de valor",
            "Detección temprana de problemas",
            "Mayor colaboración equipo-cliente"
          ]} />
        </SubSection>
        <SubSection title="Analogía Simple">
          <p className="mb-2">Imagine que está construyendo una casa:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConceptCard 
              title="Método Tradicional" 
              description="Esperar 6 meses para ver la casa terminada." 
            />
            <ConceptCard 
              title="Método Ágil" 
              description="Cada 2 semanas ve una parte funcional (primero cimientos, luego paredes, etc.)." 
            />
          </div>
        </SubSection>
      </Section>

      <Section title="2. Conceptos Clave">
        <SubSection title="Sprint">
          <List items={[
            "Es un período de 2 semanas",
            "Al final de cada sprint, tendrá funcionalidades nuevas utilizables",
            "En su proyecto tendremos 3 sprints principales"
          ]} />
        </SubSection>
        <SubSection title="Roles Importantes">
          <div className="space-y-4">
            <ConceptCard 
              title="1. Product Owner (Su representante)" 
              description="Define prioridades, toma decisiones de negocio, aprueba entregables" 
            />
            <ConceptCard 
              title="2. Scrum Master (Nuestro líder de proyecto)" 
              description="Facilita el proceso, resuelve obstáculos, garantiza la comunicación efectiva" 
            />
            <ConceptCard 
              title="3. Equipo de Desarrollo" 
              description="Construye el producto, asegura la calidad, cumple objetivos técnicos" 
            />
          </div>
        </SubSection>
      </Section>

      <Section title="3. Reuniones Importantes">
        <SubSection title="Demo de Sprint (Sprint Review)">
          <List items={[
            "Cuándo: Cada 2 semanas",
            "Duración: 1 hora",
            "Objetivo: Mostrarle las nuevas funcionalidades",
            "Su rol: Ver el avance y dar feedback"
          ]} />
        </SubSection>
        <SubSection title="Daily Scrum">
          <List items={[
            "Reunión diaria del equipo",
            "No requiere su presencia",
            "Asegura el avance constante"
          ]} />
        </SubSection>
      </Section>

      <Section title="4. Entregables por Fase">
        <div className="space-y-6">
          <ConceptCard 
            title="Fase 1 (Sprint 1) - Fundamentos" 
            description="Lo que verá: Diseños iniciales, Estructura base del sistema, Primer prototipo de landing page" 
          />
          <ConceptCard 
            title="Fase 2 (Sprint 2) - Funcionalidades Core" 
            description="Lo que verá: Sistema de gestión funcionando, Landing pages navegables, Panel de administración" 
          />
          <ConceptCard 
            title="Fase 3 (Sprint 3) - Optimización" 
            description="Lo que verá: Sistema completo integrado, Rendimiento optimizado, SEO implementado" 
          />
        </div>
      </Section>

      <Section title="5. Métricas que Debe Conocer">
        <SubSection title="PageSpeed Score">
          <List items={[
            "Medida de Google sobre velocidad del sitio",
            "Objetivo: >80 puntos",
            "Impacta en SEO y experiencia de usuario"
          ]} />
        </SubSection>
        <SubSection title="Tasas de Conversión">
          <List items={[
            "Mide efectividad de landing pages",
            "Se optimiza constantemente",
            "Afecta directamente sus ventas"
          ]} />
        </SubSection>
      </Section>

      <Section title="6. Su Participación es Clave">
        <SubSection title="Como Cliente Usted Debe:">
          <div className="space-y-4">
            <ConceptCard 
              title="1. Proporcionar Feedback Regular" 
              description="En demos de sprint, por canal de comunicación acordado, sobre funcionalidades entregadas" 
            />
            <ConceptCard 
              title="2. Tomar Decisiones Oportunas" 
              description="Aprobar diseños, definir prioridades, validar funcionalidades" 
            />
            <ConceptCard 
              title="3. Estar Disponible Para" 
              description="Reuniones programadas, consultas importantes, aprobaciones necesarias" 
            />
          </div>
        </SubSection>
      </Section>

      <Section title="7. Canales de Comunicación">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: styles.secondary }}>
              <AlertTriangle className="w-6 h-6 mr-3" style={{ color: styles.primary }} />
              Para Asuntos Urgentes
            </h4>
            <List items={[
              "WhatsApp de Gerente de Proyecto",
              "Teléfono directo: [Número]"
            ]} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: styles.secondary }}>
              <MessageSquare className="w-6 h-6 mr-3" style={{ color: styles.primary }} />
              Para Seguimiento Regular
            </h4>
            <List items={[
              "Email del proyecto",
              "Plataforma de gestión",
              "Reuniones programadas"
            ]} />
          </div>
        </div>
      </Section>

      <Section title="8. Garantías y Soporte">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard 
            title="Durante el Desarrollo" 
            description="Ambiente de pruebas disponible, Feedback inmediato, Ajustes según necesidades" 
          />
          <ConceptCard 
            title="Post-Implementación" 
            description="3 meses de garantía, Soporte técnico, Documentación completa" 
          />
        </div>
      </Section>

      <Section title="9. Calendario Importante">
        <SubSection title="Fechas Clave">
          <div className="space-y-2">
            <p><strong>Kick-off:</strong> [Fecha]</p>
            <p><strong>Demo Sprint 1:</strong> [Fecha]</p>
            <p><strong>Demo Sprint 2:</strong> [Fecha]</p>
            <p><strong>Demo Sprint 3:</strong> [Fecha]</p>
            <p><strong>Entrega Final:</strong> [Fecha]</p>
          </div>
        </SubSection>
      </Section>

      <Section title="10. Resolución de Dudas">
        <SubSection title="¿Qué hacer si...?">
          <div className="space-y-4">
            <ConceptCard 
              title="...necesito un cambio urgente?" 
              description="Contactar al Scrum Master, Se evalúa impacto, Se ajusta planificación" 
            />
            <ConceptCard 
              title="...tengo dudas técnicas?" 
              description="Consultar en reuniones de demo, Usar canal de comunicación establecido, Solicitar aclaración al equipo" 
            />
            <ConceptCard 
              title="...quiero agregar funcionalidades?" 
              description="Informar al Product Owner, Se evalúa alcance y tiempo, Se ajusta si es viable" 
            />
          </div>
        </SubSection>
      </Section>

      <footer className="mt-12 text-center relative">
        <div className="mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20v1-eXdopmoWlMlRNvOfRaMQ2dMW4azh0V.png"
            alt="cloudHUB Icon"
            width={60}
            height={60}
            className="mx-auto"
          />
        </div>
        <p className="text-sm italic" style={{ color: styles.secondary }}>
          Esta guía está diseñada para facilitar su comprensión del proceso y maximizar el valor de su inversión. Manténgala como referencia durante el proyecto.
        </p>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1" style={{ background: styles.gradient }}></div>
      </footer>
    </div>
  )
}