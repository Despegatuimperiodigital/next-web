'use client'

import React from 'react'  // En lugar de import { React } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, CheckCircle, Home, Bed, Bath, Calendar, MapPin, Share2, FileText, Eye, Download, X } from 'lucide-react'

const mockProperty = {
  id: 'PROP123',
  title: 'Hermosa Casa en el Centro',
  status: 'available',
  price: 250000,
  description: 'Esta hermosa casa en el centro de la ciudad ofrece una combinación perfecta de estilo moderno y comodidad...',
  area: 150,
  bedrooms: 3,
  bathrooms: 2,
  yearBuilt: 2015,
  amenities: ['Piscina', 'Jardín', 'Garaje', 'Seguridad 24/7'],
  address: 'Calle Principal 123, Ciudad',
  agent: {
    name: 'Ana García',
    phone: '+34 123 456 789',
    email: 'ana.garcia@cloudhub.com'
  },
  photos: [
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
  ],
  changeHistory: [
    { date: '2023-05-15', user: 'Ana García', type: 'Creación', details: 'Propiedad añadida al sistema' },
    { date: '2023-06-01', user: 'Carlos López', type: 'Actualización', details: 'Precio actualizado de 240000 a 250000' },
    { date: '2023-06-15', user: 'Ana García', type: 'Documento', details: 'Certificado energético añadido' },
  ],
  documents: [
    { name: 'Escritura.pdf', type: 'legal', date: '2023-05-15', size: '2.5 MB', status: 'Válido' },
    { name: 'Certificado_Energetico.pdf', type: 'certification', date: '2023-06-15', size: '1.2 MB', status: 'Válido' },
    { name: 'Planos.pdf', type: 'other', date: '2023-05-20', size: '3.7 MB', status: 'Válido' },
  ]
}

export default function PropertyDetails() {

    const [currentPhoto, setCurrentPhoto] = useState(0)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('legal')
  
    const statusColors = {
      available: 'bg-primary text-primary-foreground',
      reserved: 'bg-accent text-accent-foreground',
      sold: 'bg-muted text-muted-foreground',
    }
  
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center p-4">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">{mockProperty.title}</h1>
              <p className="text-muted-foreground">ID: {mockProperty.id}</p>
            </div>
            <div className="flex items-center mt-2 md:mt-0 space-x-2">
              <span className={`${statusColors[mockProperty.status]} px-3 py-1 rounded-full text-sm`}>
                {mockProperty.status === 'available' ? 'Disponible' : 
                 mockProperty.status === 'reserved' ? 'Reservada' : 'Vendida'}
              </span>
              <button className="p-2 border rounded-full hover:bg-accent hover:text-accent-foreground">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="p-2 border rounded-full hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
              </button>
              <button className="p-2 border rounded-full hover:bg-primary hover:text-primary-foreground">
                <CheckCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>
  
        <main className="container mx-auto mt-8 px-4">
          <PhotoGallery photos={mockProperty.photos} currentPhoto={currentPhoto} setCurrentPhoto={setCurrentPhoto} setIsGalleryOpen={setIsGalleryOpen} />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-card rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-bold text-card-foreground mb-4">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(mockProperty.price)}
                </h2>
                <p className="text-card-foreground mb-6">{mockProperty.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <PropertyStat icon={<Home />} value={`${mockProperty.area} m²`} />
                  <PropertyStat icon={<Bed />} value={`${mockProperty.bedrooms} Habitaciones`} />
                  <PropertyStat icon={<Bath />} value={`${mockProperty.bathrooms} Baños`} />
                  <PropertyStat icon={<Calendar />} value={`Construido en ${mockProperty.yearBuilt}`} />
                </div>
                <h3 className="font-semibold mb-3 text-card-foreground">Amenidades</h3>
                <div className="flex flex-wrap gap-2">
                  {mockProperty.amenities.map((amenity, index) => (
                    <span key={index} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
  
              <LocationSection address={mockProperty.address} />
              <ChangeHistory changes={mockProperty.changeHistory} />
            </div>
  
            <div className="space-y-8">
              <ContactSection agent={mockProperty.agent} />
              <DocumentList documents={mockProperty.documents} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        </main>
  
        <GalleryModal 
          isOpen={isGalleryOpen} 
          setIsOpen={setIsGalleryOpen} 
          photos={mockProperty.photos} 
          currentPhoto={currentPhoto} 
          setCurrentPhoto={setCurrentPhoto} 
        />
      </div>
    )
  }
  
  function PropertyStat({ icon, value }) {
    return (
      <div className="flex items-center text-card-foreground">
        {React.cloneElement(icon, { className: "h-5 w-5 mr-2 text-primary" })}
        <span>{value}</span>
      </div>
    )
  }
  
  function LocationSection({ address }) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-card-foreground mb-4">Ubicación</h2>
        <div className="flex items-center mb-4 text-card-foreground">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          <span>{address}</span>
        </div>
        <div className="h-64 bg-accent/10 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Mapa (implementación pendiente)</span>
        </div>
      </div>
    )
  }
  
  function ContactSection({ agent }) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-card-foreground mb-4">Información de Contacto</h2>
        <p className="font-semibold text-card-foreground">{agent.name}</p>
        <p className="text-muted-foreground">{agent.phone}</p>
        <p className="text-muted-foreground">{agent.email}</p>
        <div className="mt-4 space-y-2">
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary/90">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir Propiedad
          </button>
          <button className="w-full border border-input bg-card text-card-foreground py-2 px-4 rounded-md flex items-center justify-center hover:bg-accent">
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte PDF
          </button>
        </div>
      </div>
    )
  }

  function PhotoGallery({ photos, currentPhoto, setCurrentPhoto, setIsGalleryOpen }) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Image
            src={photos[currentPhoto]}
            alt={`Foto principal ${currentPhoto + 1}`}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-[400px] border border-border"
          />
        </div>
        <div className="grid grid-rows-4 gap-4">
          {photos.slice(0, 4).map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`Miniatura ${index + 1}`}
              width={200}
              height={100}
              className={`rounded-lg object-cover w-full h-[92px] cursor-pointer border border-border
                ${index === currentPhoto ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'}`}
              onClick={() => setCurrentPhoto(index)}
            />
          ))}
        </div>
        <div className="col-span-3 mt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{currentPhoto + 1} de {photos.length} fotos</span>
          <button 
            onClick={() => setIsGalleryOpen(true)} 
            className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Ver todas las fotos
          </button>
        </div>
      </div>
    )
  }
  
  function GalleryModal({ isOpen, setIsOpen, photos, currentPhoto, setCurrentPhoto }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg max-w-4xl w-full shadow-lg">
          <div className="relative h-[60vh]">
            <Image
              src={photos[currentPhoto]}
              alt={`Foto ${currentPhoto + 1}`}
              layout="fill"
              objectFit="contain"
            />
            <button
              className="absolute top-4 left-4 bg-card hover:bg-accent rounded-full p-2 shadow-md transition-colors"
              onClick={() => setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)}
            >
              <ChevronLeft className="h-4 w-4 text-card-foreground" />
            </button>
            <button
              className="absolute top-4 right-4 bg-card hover:bg-accent rounded-full p-2 shadow-md transition-colors"
              onClick={() => setCurrentPhoto((prev) => (prev + 1) % photos.length)}
            >
              <ChevronRight className="h-4 w-4 text-card-foreground" />
            </button>
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {photos.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors
                  ${index === currentPhoto ? 'bg-primary' : 'bg-accent hover:bg-primary/50'}`}
                onClick={() => setCurrentPhoto(index)}
              />
            ))}
          </div>
          <button
            className="mt-6 w-full bg-card hover:bg-accent text-card-foreground py-2 px-4 rounded-md border border-border transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    )
  }
  
  function ChangeHistory({ changes }) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-card-foreground mb-4">Historial de Cambios</h2>
        <div className="h-[300px] overflow-y-auto pr-4">
          {changes.map((change, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-border last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-card-foreground">{change.type}</p>
                  <p className="text-sm text-muted-foreground">{change.date}</p>
                </div>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                  {change.user}
                </span>
              </div>
              <p className="mt-2 text-sm text-card-foreground">{change.details}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  function DocumentList({ documents, activeTab, setActiveTab }) {
    const categories = ['legal', 'certification', 'contracts', 'other'];
  
    return (
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-card-foreground mb-4">Documentos</h2>
        <div className="flex mb-4 space-x-1">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-2 rounded-md transition-colors
                ${activeTab === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent text-card-foreground'}`}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        {categories.map((category) => (
          activeTab === category && (
            <div key={category}>
              {documents.filter(doc => doc.type === category).map((doc, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="font-semibold text-card-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.date} - {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{doc.status}</span>
                    <button className="p-1 hover:bg-accent rounded-md">
                      <Eye className="h-4 w-4 text-card-foreground" />
                    </button>
                    <button className="p-1 hover:bg-accent rounded-md">
                      <Download className="h-4 w-4 text-card-foreground" />
                    </button>
                    <button className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded-md">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ))}
      </div>
  )
}