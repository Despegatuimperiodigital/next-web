'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ submitting: true, submitted: false, error: null })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje')
      }

      setStatus({ 
        submitting: false, 
        submitted: true, 
        error: null 
      })
      // Reiniciar formulario
      setFormData({ nombre: '', email: '', mensaje: '' })

    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message
      })
    }
  }

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-card shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="bg-primary text-primary-foreground p-8 md:w-1/3 flex flex-col justify-between">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudhub%20(1)-wlyADOyAl7oDNS7UzM3u3CumiqqVww.png"
                alt="Logo de CloudHUB"
                width={150}
                height={50}
                className="mb-8"
              />
              <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
              <p className="mb-4">Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.</p>
            </div>
            <div>
              <p className="text-sm">soporte@team.cloudhub.cl</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:w-2/3">
            {status.submitted && (
              <div className="mb-4 p-4 bg-primary/10 text-primary rounded">
                ¡Mensaje enviado correctamente! Te responderemos pronto.
              </div>
            )}
            
            {status.error && (
              <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded">
                {status.error}
              </div>
            )}

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
                disabled={status.submitting}
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
                disabled={status.submitting}
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
                disabled={status.submitting}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary-light transition duration-300 disabled:opacity-50"
            >
              {status.submitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}