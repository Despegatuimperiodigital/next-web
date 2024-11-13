import React from 'react';

const caseStudies = [
  {
    logo: '/placeholder.svg?height=100&width=100',
    company: 'TechCorp',
    improvement: '45%',
    quote: 'CloudHub transformó nuestro rendimiento web y aumentó nuestras conversiones significativamente.',
    metrics: 'Tiempo de carga reducido de 5s a 1.5s'
  },
  {
    logo: '/placeholder.svg?height=100&width=100',
    company: 'E-commerce Giant',
    improvement: '38%',
    quote: 'Desde que implementamos CloudHub, nuestras ventas en línea han crecido mes tras mes.',
    metrics: 'Tasa de rebote reducida en un 25%'
  },
  {
    logo: '/placeholder.svg?height=100&width=100',
    company: 'Media Streaming',
    improvement: '52%',
    quote: 'La optimización de CloudHub nos permitió escalar sin problemas durante los picos de tráfico.',
    metrics: 'Capacidad de servir 3x más usuarios concurrentes'
  }
];

const clients = [
  { logo: '/placeholder.svg?height=50&width=50', name: 'Client 1', improvement: '30%', time: '2 años', testimonial: 'Excelente servicio' },
  { logo: '/placeholder.svg?height=50&width=50', name: 'Client 2', improvement: '25%', time: '1 año', testimonial: 'Resultados increíbles' },
  { logo: '/placeholder.svg?height=50&width=50', name: 'Client 3', improvement: '40%', time: '3 años', testimonial: 'Altamente recomendado' },
  { logo: '/placeholder.svg?height=50&width=50', name: 'Client 4', improvement: '35%', time: '2 años', testimonial: 'Muy satisfechos' },
  { logo: '/placeholder.svg?height=50&width=50', name: 'Client 5', improvement: '28%', time: '1 año', testimonial: 'Gran soporte' },
  { logo: '/placeholder.svg?height=50&width=50', name: 'Client 6', improvement: '45%', time: '3 años', testimonial: 'Impresionante mejora' },
];

export default function SocialProofSection() {
  return (
    <section className="bg-white py-20" id="social-proof">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary">Casos de Éxito</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-background p-6 rounded-lg shadow-md text-center">
              <img src={study.logo} alt={study.company} className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{study.company}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{study.improvement} de mejora</p>
              <blockquote className="italic mb-4">"{study.quote}"</blockquote>
              <p className="text-sm">{study.metrics}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-8 text-center">Nuestros Clientes Satisfechos</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <div key={index} className="relative group">
              <img src={client.logo} alt={client.name} className="w-full transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary bg-opacity-90 flex flex-col items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-bold mb-1">Mejora: {client.improvement}</p>
                <p className="text-sm mb-1">{client.time}</p>
                <p className="text-xs italic">"{client.testimonial}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}