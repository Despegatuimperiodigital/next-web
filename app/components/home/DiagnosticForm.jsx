'use client'

import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from "../ui/button"

const DiagnosticForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    url: '',
    traffic: '',
    mainIssue: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          URL del sitio web
        </label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
          placeholder="https://ejemplo.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
          placeholder="soporte@team.cloudhub.cl"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Tráfico mensual aproximado
        </label>
        <select
          required
          value={formData.traffic}
          onChange={(e) => setFormData({ ...formData, traffic: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
        >
          <option value="">Selecciona un rango</option>
          <option value="0-1000">0 - 1,000 visitas</option>
          <option value="1000-10000">1,000 - 10,000 visitas</option>
          <option value="10000-50000">10,000 - 50,000 visitas</option>
          <option value="50000-100000">50,000 - 100,000 visitas</option>
          <option value="100000+">Más de 100,000 visitas</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Principal problema
        </label>
        <select
          required
          value={formData.mainIssue}
          onChange={(e) => setFormData({ ...formData, mainIssue: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
        >
          <option value="">Selecciona un problema</option>
          <option value="velocidad">Velocidad de carga</option>
          <option value="caidas">Caídas del servidor</option>
          <option value="seguridad">Seguridad</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          'Iniciar Diagnóstico Gratuito'
        )}
      </Button>
    </form>
  )
}

export default DiagnosticForm