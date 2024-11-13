import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Startup',
    price: '4 UF',
    features: [
      'Para sitios hasta 25k visitas',
      'Optimización básica',
      'Monitoreo diario',
      'Soporte por email'
    ],
    cta: 'Comenzar Ahora',
    highlighted: false
  },
  {
    name: 'Growth',
    price: '7 UF',
    features: [
      'Para sitios hasta 100k visitas',
      'Optimización avanzada',
      'Monitoreo 24/7',
      'Soporte prioritario',
      'CDN incluido'
    ],
    cta: 'Plan Recomendado',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Desde 12 UF',
    features: [
      'Para alto tráfico',
      'Optimización personalizada',
      'Monitoreo en tiempo real',
      'Soporte dedicado 24/7',
      'CDN global',
      'Auditorías de seguridad'
    ],
    cta: 'Contactar',
    highlighted: false
  }
];

export default function PlansSection() {
  return (
    <section className="bg-background py-20" id="plans">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary">Planes Diseñados para tu Crecimiento</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:-translate-y-2 ${plan.highlighted ? 'border-2 border-primary' : ''}`}>
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-primary mb-6">{plan.price}</p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} w-full`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}