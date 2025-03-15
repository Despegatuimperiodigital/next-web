'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from "../ui/button"

const SuccessMessage = ({ onClose }) => {
  return (
    <div className="text-center p-6">
      <CheckCircle className="mx-auto h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-bold text-foreground mb-2">
        ¡Diagnóstico en Proceso!
      </h3>
      <p className="text-foreground/80 mb-6">
        Estamos analizando tu sitio web. En breve recibirás un correo con los resultados y los siguientes pasos.
      </p>
      <Button
        onClick={onClose}
        className="bg-primary hover:bg-primary/90"
      >
        Entendido
      </Button>
    </div>
  )
}

export default SuccessMessage