'use client'

import { useState, useCallback } from 'react'
import { Home, Building2, Store, MapPin, Briefcase, Plus, X, Upload, File, Image as ImageIcon, ChevronRight, Check } from 'lucide-react'

const propertyTypes = [
  { icon: Home, label: 'Casa' },
  { icon: Building2, label: 'Apartamento' },
  { icon: Store, label: 'Local Comercial' },
  { icon: MapPin, label: 'Terreno' },
  { icon: Briefcase, label: 'Oficina' },
]

const statusOptions = [
  { value: 'available', label: 'Disponible', color: 'bg-green-500' },
  { value: 'reserved', label: 'Reservada', color: 'bg-yellow-500' },
  { value: 'sold', label: 'Vendida', color: 'bg-gray-500' },
  { value: 'maintenance', label: 'En mantenimiento', color: 'bg-orange-500' },
]

const amenities = [
  'Piscina', 'Jardín', 'Terraza', 'Estacionamiento', 'Seguridad 24/7', 'Área común'
]

const formSections = [
  { id: 'basic', label: 'Información Básica' },
  { id: 'characteristics', label: 'Características' },
  { id: 'location', label: 'Ubicación' },
  { id: 'multimedia', label: 'Multimedia' },
]

export default function PropertyForm({ isEditing = false }) {
  const [currentSection, setCurrentSection] = useState('basic')
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    price: '',
    status: '',
    area: '',
    bedrooms: 0,
    bathrooms: 0,
    amenities: [],
    constructionYear: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: 0,
    longitude: 0,
    photos: [],
    documents: [],
    certificates: [],
    additionalFields: {},
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'basic':
        return <BasicInfoStep formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />
      case 'characteristics':
        return <CharacteristicsStep formData={formData} handleInputChange={handleInputChange} />
      case 'location':
        return <LocationStep formData={formData} handleInputChange={handleInputChange} />
      case 'multimedia':
        return <MultimediaStep formData={formData} handleInputChange={handleInputChange} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <h1 className="text-2xl font-bold">{isEditing ? 'Editar Propiedad' : 'Nueva Propiedad'}</h1>
      </header>

      <div className="flex-grow flex">
        <nav className="w-64 bg-card shadow-md p-6 space-y-4">
          {formSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                currentSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/10'
              }`}
            >
              <span className="flex items-center">
                {currentSection === section.id && <Check className="mr-2 h-4 w-4" />}
                {section.label}
              </span>
            </button>
          ))}
        </nav>

        <main className="flex-grow p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">{formSections.find(s => s.id === currentSection)?.label}</h2>
              {renderSectionContent()}
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-card shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
            onClick={() => {
              const currentIndex = formSections.findIndex(s => s.id === currentSection);
              if (currentIndex > 0) {
                setCurrentSection(formSections[currentIndex - 1].id);
              }
            }}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            onClick={() => {
              const currentIndex = formSections.findIndex(s => s.id === currentSection);
              if (currentIndex < formSections.length - 1) {
                setCurrentSection(formSections[currentIndex + 1].id);
              } else {
                // Aquí iría la lógica para enviar el formulario
                console.log('Formulario enviado', formData);
              }
            }}
          >
            {currentSection === 'multimedia' ? 'Guardar' : 'Siguiente'}
          </button>
        </div>
      </footer>
    </div>
  )
}

function BasicInfoStep({ formData, handleInputChange, handleSelectChange }) {
  const [additionalFields, setAdditionalFields] = useState([])

  const addField = () => {
    setAdditionalFields([...additionalFields, { key: '', value: '' }])
  }

  const removeField = (index) => {
    const newFields = [...additionalFields]
    newFields.splice(index, 1)
    setAdditionalFields(newFields)
  }

  const handleAdditionalFieldChange = (index, field, value) => {
    const newFields = [...additionalFields]
    newFields[index][field] = value
    setAdditionalFields(newFields)
    handleInputChange({ target: { name: 'additionalFields', value: Object.fromEntries(newFields.map(f => [f.key, f.value])) } })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de propiedad</label>
        <div className="grid grid-cols-3 gap-4">
          {propertyTypes.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className={`px-4 py-2 flex flex-col items-center justify-center h-24 ${
                formData.type === label ? 'bg-primary text-primary-foreground' : 'bg-secondary/10 text-gray-700'
              } rounded-md hover:bg-primary/20 transition-colors`}
              onClick={() => handleInputChange({ target: { name: 'type', value: label } })}
            >
              <Icon className="h-8 w-8 mb-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Título de la propiedad"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
          <input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            type="number"
            placeholder="Precio"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Descripción de la propiedad"
          className="w-full h-32 px-3 py-2 border border-input rounded-md bg-background"
        ></textarea>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={(e) => handleSelectChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        >
          <option value="" disabled>Seleccione un estado</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Campos adicionales</label>
        <div className="space-y-4">
          {additionalFields.map((field, index) => (
            <div key={index} className="flex gap-2">
              <input
                placeholder="Nombre del campo"
                value={field.key}
                onChange={(e) => handleAdditionalFieldChange(index, 'key', e.target.value)}
                className="w-1/3 px-3 py-2 border border-input rounded-md bg-background"
              />
              <input
                placeholder="Valor"
                value={field.value}
                onChange={(e) => handleAdditionalFieldChange(index, 'value', e.target.value)}
                className="w-1/3 px-3 py-2 border border-input rounded-md bg-background"
              />
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                onClick={() => removeField(index)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors w-full flex items-center justify-center"
            onClick={addField}
          >
            <Plus className="h-4 w-4 mr-2" /> Agregar campo adicional
          </button>
        </div>
      </div>
    </div>
  )
}

function CharacteristicsStep({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
          <input
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            type="number"
            placeholder="Metros cuadrados"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
        <div>
          <label htmlFor="constructionYear" className="block text-sm font-medium text-gray-700 mb-1">Año de construcción</label>
          <input
            id="constructionYear"
            name="constructionYear"
            value={formData.constructionYear}
            onChange={handleInputChange}
            type="number"
            placeholder="Año de construcción"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
          <input
            id="bedrooms"
            type="range"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={(e) => handleInputChange({ target: { name: 'bedrooms', value: parseInt(e.target.value, 10) } })}
            className="w-full"
            min="0"
            max="10"
            step="1"
          />
          <div className="mt-2 text-center">{formData.bedrooms}</div>
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
          <input
            id="bathrooms"
            type="range"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={(e) => handleInputChange({ target: { name: 'bathrooms', value: parseFloat(e.target.value) } })}
            className="w-full"
            min="0"
            max="5"
            step="0.5"
          />
          <div className="mt-2 text-center">{formData.bathrooms}</div>
        </div>
      </div>
      <div>
        <label  className="block text-sm font-medium text-gray-700 mb-2">Amenidades</label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={amenity}
                checked={formData.amenities.includes(amenity)}
                onChange={(e) => {
                  const newAmenities = e.target.checked
                    ? [...formData.amenities, amenity]
                    : formData.amenities.filter(a => a !== amenity)
                  handleInputChange({ target: { name: 'amenities', value: newAmenities } })
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={amenity} className="text-sm">{amenity}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LocationStep({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Dirección completa"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Ciudad"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Estado/Provincia</label>
          <input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Estado/Provincia"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Código postal</label>
          <input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="Código postal"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
      </div>
      <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Mapa interactivo (implementación pendiente)</span>
      </div>
    </div>
  )
}

function MultimediaStep({ formData, handleInputChange }) {
  const [previewImages, setPreviewImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const handleFileUpload = useCallback((e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'photos') {
      setPreviewImages(prevImages => [
        ...prevImages,
        ...files.map(file => ({ file, preview: URL.createObjectURL(file) }))
      ]);
      handleInputChange({ target: { name: 'photos', value: [...formData.photos, ...files] } });
    } else if (type === 'documents') {
      setDocuments(prevDocs => [...prevDocs, ...files]);
      handleInputChange({ target: { name: 'documents', value: [...formData.documents, ...files] } });
    } else if (type === 'certificates') {
      setCertificates(prevCerts => [...prevCerts, ...files]);
      handleInputChange({ target: { name: 'certificates', value: [...formData.certificates, ...files] } });
    }
  }, [formData, handleInputChange]);

  const removeFile = useCallback((index, type) => {
    if (type === 'photos') {
      setPreviewImages(prevImages => {
        const newImages = [...prevImages];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        return newImages;
      });
      handleInputChange({ target: { name: 'photos', value: formData.photos.filter((_, i) => i !== index) } });
    } else if (type === 'documents') {
      setDocuments(prevDocs => {
        const newDocs = [...prevDocs];
        newDocs.splice(index, 1);
        return newDocs;
      });
      handleInputChange({ target: { name: 'documents', value: formData.documents.filter((_, i) => i !== index) } });
    } else if (type === 'certificates') {
      setCertificates(prevCerts => {
        const newCerts = [...prevCerts];
        newCerts.splice(index, 1);
        return newCerts;
      });
      handleInputChange({ target: { name: 'certificates', value: formData.certificates.filter((_, i) => i !== index) } });
    }
  }, [formData, handleInputChange]);

  const renderUploadSection = (type, files, icon) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <div className="border-2 border-dashed border-input rounded-lg p-6 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary/5">
        <input
          type="file"
          multiple
          onChange={(e) => handleFileUpload(e, type)}
          className="hidden"
          id={`${type}-upload`}
          accept={type === 'photos' ? "image/*" : type === 'documents' ? ".pdf,.doc,.docx" : ".pdf"}
        />
        <label htmlFor={`${type}-upload`} className="cursor-pointer flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-primary mb-4" />
          <span className="text-sm text-gray-600">Arrastra y suelta o haz clic para seleccionar</span>
        </label>
      </div>
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {type === 'photos' ? (
                <img src={file.preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
              ) : (
                <div className="w-full h-32 bg-secondary/10 rounded-md flex items-center justify-center">
                  {icon}
                  <span className="ml-2 text-sm">{file.name || `${type} ${index + 1}`}</span>
                </div>
              )}
              <button
                onClick={() => removeFile(index, type)}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={`Eliminar ${type}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {renderUploadSection('photos', previewImages, <ImageIcon className="w-8 h-8 text-primary" />)}
      {renderUploadSection('documents', documents, <File className="w-8 h-8 text-primary" />)}
      {renderUploadSection('certificates', certificates, <File className="w-8 h-8 text-primary" />)}
    </div>
  );
}