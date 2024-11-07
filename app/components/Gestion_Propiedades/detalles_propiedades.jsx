'use client'

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
    available: 'bg-green-500',
    reserved: 'bg-yellow-500',
    sold: 'bg-gray-500',
  }

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{mockProperty.title}</h1>
            <p className="text-gray-500">ID: {mockProperty.id}</p>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <span className={`${statusColors[mockProperty.status]} text-white px-2 py-1 rounded-full text-sm mr-2`}>
              {mockProperty.status === 'available' ? 'Disponible' : 
               mockProperty.status === 'reserved' ? 'Reservada' : 'Vendida'}
            </span>
            <button className="p-2 border rounded-full mr-2">
              <Pencil className="h-4 w-4" />
            </button>
            <button className="p-2 border rounded-full mr-2">
              <Trash2 className="h-4 w-4" />
            </button>
            <button className="p-2 border rounded-full">
              <CheckCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <PhotoGallery photos={mockProperty.photos} currentPhoto={currentPhoto} setCurrentPhoto={setCurrentPhoto} setIsGalleryOpen={setIsGalleryOpen} />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-3xl font-bold mb-4">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(mockProperty.price)}
              </h2>
              <p className="text-gray-700 mb-4">{mockProperty.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{mockProperty.area} m²</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{mockProperty.bedrooms} Habitaciones</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{mockProperty.bathrooms} Baños</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Construido en {mockProperty.yearBuilt}</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Amenidades</h3>
              <div className="flex flex-wrap gap-2">
                {mockProperty.amenities.map((amenity, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">{amenity}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Ubicación</h2>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{mockProperty.address}</span>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Mapa (implementación pendiente)</span>
              </div>
            </div>

            <ChangeHistory changes={mockProperty.changeHistory} />
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Información de Contacto</h2>
              <p className="font-semibold">{mockProperty.agent.name}</p>
              <p>{mockProperty.agent.phone}</p>
              <p>{mockProperty.agent.email}</p>
              <div className="mt-4 space-y-2">
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir Propiedad
                </button>
                <button className="w-full border border-gray-300 py-2 px-4 rounded flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Generar Reporte PDF
                </button>
              </div>
            </div>

            <DocumentList documents={mockProperty.documents} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </main>

      <GalleryModal isOpen={isGalleryOpen} setIsOpen={setIsGalleryOpen} photos={mockProperty.photos} currentPhoto={currentPhoto} setCurrentPhoto={setCurrentPhoto} />
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
          className="rounded-lg object-cover w-full h-[400px]"
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
            className={`rounded-lg object-cover w-full h-[92px] cursor-pointer ${index === currentPhoto ? 'ring-2 ring-[#F33F31]' : ''}`}
            onClick={() => setCurrentPhoto(index)}
          />
        ))}
      </div>
      <div className="col-span-3 mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{currentPhoto + 1} de {photos.length} fotos</span>
        <button onClick={() => setIsGalleryOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded">
          Ver todas las fotos
        </button>
      </div>
    </div>
  )
}

function GalleryModal({ isOpen, setIsOpen, photos, currentPhoto, setCurrentPhoto }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
        <div className="relative h-[60vh]">
          <Image
            src={photos[currentPhoto]}
            alt={`Foto ${currentPhoto + 1}`}
            layout="fill"
            objectFit="contain"
          />
          <button
            className="absolute top-2 left-2 bg-white rounded-full p-2"
            onClick={() => setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)}
          >
            &lt;
          </button>
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-2"
            onClick={() => setCurrentPhoto((prev) => (prev + 1) % photos.length)}
          >
            &gt;
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === currentPhoto ? 'bg-[#F33F31]' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentPhoto(index)}
            />
          ))}
        </div>
        <button
          className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded"
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Historial de Cambios</h2>
      <div className="h-[300px] overflow-y-auto pr-4">
        {changes.map((change, index) => (
          <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{change.type}</p>
                <p className="text-sm text-gray-500">{change.date}</p>
              </div>
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">{change.user}</span>
            </div>
            <p className="mt-2 text-sm">{change.details}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocumentList({ documents, activeTab, setActiveTab }) {
  const categories = ['legal', 'certification', 'contracts', 'other'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Documentos</h2>
      <div className="flex mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-2 ${activeTab === category ? 'bg-gray-200' : ''}`}
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
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.date} - {doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{doc.status}</span>
                  <button className="p-1">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-1">
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