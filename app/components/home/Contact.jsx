import Image from 'next/image'
import { useState } from 'react'
import { Metadata } from 'next'



export const metadata = {
    title: 'Contacto | CloudHub - Expertos en Servicios Cloud',
    description: 'Contáctanos para conocer más sobre nuestros servicios de cloud computing. En CloudHub estamos listos para ayudarte con tus necesidades tecnológicas.',
    keywords: 'contacto cloudhub, servicios cloud, cloud computing, soporte tecnológico',
    openGraph: {
      title: 'Contacto | CloudHub - Expertos en Servicios Cloud',
      description: 'Contáctanos para conocer más sobre nuestros servicios de cloud computing. En CloudHub estamos listos para ayudarte.',
      images: [
        {
          url: 'https://team.cloudhub.cl/wp-content/uploads/2024/11/Leonardo_Phoenix_Modern_server_room_transforming_into_a_dynami_0.jpg',
          width: 1200,
          height: 630,
          alt: 'CloudHub - Centro de datos moderno',
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
  }

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí normalmente enviarías los datos del formulario a tu backend
    console.log('Formulario enviado:', formData)
    // Reiniciar formulario después del envío
    setFormData({ nombre: '', email: '', mensaje: '' })
  }

    return (
      <>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'CloudHub Contacto',
              description: 'Página de contacto de CloudHub para servicios de cloud computing',
              provider: {
                '@type': 'Organization',
                name: 'CloudHub',
                logo: 'https://team.cloudhub.cl/wp-content/uploads/2024/11/Logo-simple-blanco.png',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Calle Nube 123',
                  addressLocality: 'Ciudad del Cielo',
                  postalCode: '90210',
                  addressCountry: 'CL'
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '',
                  email: 'contacto@cloudhub.com',
                  contactType: 'customer service'
                }
              }
            })
          }}
        />
  
        <main 
          className="bg-background min-h-screen flex flex-col justify-center items-center p-4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://team.cloudhub.cl/wp-content/uploads/2024/11/Leonardo_Phoenix_Modern_server_room_transforming_into_a_dynami_0.jpg')"
          }}
        >
          <div 
            className="max-w-4xl w-full bg-card/90 shadow-lg rounded-lg overflow-hidden backdrop-blur-sm"
            itemScope 
            itemType="https://schema.org/Organization"
          >
            <div className="flex flex-col md:flex-row">
              <div className="bg-primary/90 text-primary-foreground p-8 md:w-1/3 flex flex-col justify-between backdrop-blur-sm">
                <div>
                  <Image
                    src="https://team.cloudhub.cl/wp-content/uploads/2024/11/Logo-simple-blanco.png"
                    alt="Logo de CloudHub"
                    width={150}
                    height={50}
                    className="mb-8"
                    itemProp="logo"
                  />
                  <h1 className="text-2xl font-bold mb-4" itemProp="name">Contáctanos</h1>
                  <p className="mb-4" itemProp="description">
                    Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.
                  </p>
                </div>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <p className="text-sm">
                    <span itemProp="streetAddress">Calle Nube 123</span>,{' '}
                    <span itemProp="addressLocality">Ciudad del Cielo</span>,{' '}
                    <span itemProp="postalCode">90210</span>
                  </p>
                  <p className="text-sm" itemProp="email">contacto@cloudhub.com</p>
                </div>
              </div>
  
              <form 
                onSubmit={handleSubmit} 
                className="p-8 md:w-2/3"
                itemProp="potentialAction"
                itemScope
                itemType="https://schema.org/CommunicateAction"
              >
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-secondary-dark text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-secondary-dark border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    aria-required="true"
                    itemProp="name"
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="email" className="block text-secondary-dark text-sm font-bold mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-secondary-dark border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    aria-required="true"
                    itemProp="email"
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="mensaje" className="block text-secondary-dark text-sm font-bold mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 text-secondary-dark border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    aria-required="true"
                    itemProp="description"
                  ></textarea>
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary-light transition duration-300"
                  aria-label="Enviar formulario de contacto"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </main>
      </>
    )
  }