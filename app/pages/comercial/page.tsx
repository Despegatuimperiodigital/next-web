'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, Save, CheckCircle, PlusCircle, Trash2, ChevronDown } from 'lucide-react'

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

// Custom Button component
const Button = ({ children, onClick, className = '', variant = 'primary' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors duration-200 ${className}`}
    style={{
      backgroundColor: variant === 'primary' ? styles.primary : 'transparent',
      color: variant === 'primary' ? 'white' : styles.primary,
      border: variant === 'primary' ? 'none' : `1px solid ${styles.primary}`,
    }}
  >
    {children}
  </button>
)

// Custom Input component
const Input = ({ label, id, name, value, onChange, type = 'text' }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-1" style={{ color: styles.secondary }}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-md"
      style={{ borderColor: styles.accent1, color: styles.text }}
    />
  </div>
)

// Custom Textarea component
const Textarea = ({ label, id, name, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-1" style={{ color: styles.secondary }}>
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full p-2 border rounded-md"
      style={{ borderColor: styles.accent1, color: styles.text }}
    ></textarea>
  </div>
)

// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex justify-between items-center mb-8">
    {[...Array(totalSteps)].map((_, index) => (
      <div key={index} className="flex items-center">
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300`}
          style={{ 
            backgroundColor: index < currentStep ? styles.primary : (index === currentStep ? 'transparent' : '#E5E7EB'),
            borderColor: index === currentStep ? styles.primary : 'transparent',
            borderWidth: '2px',
            color: index < currentStep ? 'white' : (index === currentStep ? styles.primary : '#4B5563')
          }}
        >
          {index < currentStep ? <CheckCircle size={20} /> : index + 1}
        </div>
        {index < totalSteps - 1 && (
          <div 
            className={`w-20 h-1 mx-2 transition-all duration-300`}
            style={{ 
              backgroundColor: index < currentStep ? styles.primary : '#E5E7EB'
            }}
          ></div>
        )}
      </div>
    ))}
  </div>
)

// Sprint input component
const SprintInput = ({ sprint, onChange, onRemove }) => (
  <div className="mb-6 p-4 border rounded-lg shadow-sm" style={{ borderColor: styles.accent1 }}>
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-lg font-semibold" style={{ color: styles.secondary }}>Sprint {sprint.number}</h4>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Input
        label="Duration (weeks)"
        id={`sprint-${sprint.number}-duration`}
        name={`sprint-${sprint.number}-duration`}
        type="number"
        value={sprint.duration}
        onChange={(e) => onChange(sprint.number, 'duration', e.target.value)}
      />
      <Input
        label="Sprint Value"
        id={`sprint-${sprint.number}-value`}
        name={`sprint-${sprint.number}-value`}
        value={sprint.value}
        onChange={(e) => onChange(sprint.number, 'value', e.target.value)}
      />
    </div>
    <Textarea
      label="Sprint Goals"
      id={`sprint-${sprint.number}-goals`}
      name={`sprint-${sprint.number}-goals`}
      value={sprint.goals}
      onChange={(e) => onChange(sprint.number, 'goals', e.target.value)}
    />
    <Textarea
      label="User Stories"
      id={`sprint-${sprint.number}-stories`}
      name={`sprint-${sprint.number}-stories`}
      value={sprint.stories}
      onChange={(e) => onChange(sprint.number, 'stories', e.target.value)}
    />
  </div>
)

// Accordion component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium" style={{ color: styles.secondary }}>{title}</span>
        <ChevronDown
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  )
}

// Main component
export default function DocumentGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    totalDuration: '',
    totalInvestment: '',
    productOwner: '',
    scrumMaster: '',
    developmentTeam: '',
    sprints: [
      { number: 1, duration: 2, goals: '', stories: '', value: '' },
      { number: 2, duration: 2, goals: '', stories: '', value: '' },
    ],
    quotationNumber: '',
    proposalDate: '',
    validityPeriod: '',
    projectScope: '',
    technicalGuarantees: '',
    deliverables: '',
    commercialConditions: '',
    supportAndWarranty: '',
    keyBenefits: '',
    nextSteps: '',
    paymentMethod: '',
    agileBenefits: '',
    sprintExplanation: '',
    keyRoles: '',
    importantMeetings: '',
    deliverablesByPhase: '',
    keyMetrics: '',
    clientParticipation: '',
    communicationChannels: '',
    guaranteesAndSupport: '',
    importantDates: '',
    faqQuestions: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSprintChange = (sprintNumber, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      sprints: prevData.sprints.map(sprint =>
        sprint.number === sprintNumber ? { ...sprint, [field]: value } : sprint
      )
    }))
  }

  const addSprint = () => {
    setFormData(prevData => ({
      ...prevData,
      sprints: [
        ...prevData.sprints,
        { number: prevData.sprints.length + 1, duration: 2, goals: '', stories: '', value: '' }
      ]
    }))
  }

  const removeSprint = (sprintNumber) => {
    setFormData(prevData => ({
      ...prevData,
      sprints: prevData.sprints
        .filter(sprint => sprint.number !== sprintNumber)
        .map((sprint, index) => ({ ...sprint, number: index + 1 }))
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to a server or generate the documents
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: styles.secondary }}>Agile Implementation Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Project Name" id="projectName" name="projectName" value={formData.projectName} onChange={handleInputChange} />
              <Input label="Client Name" id="clientName" name="clientName" value={formData.clientName} onChange={handleInputChange} />
              <Input label="Total Duration (weeks)" id="totalDuration" name="totalDuration" type="number" value={formData.totalDuration} onChange={handleInputChange} />
              <Input label="Total Investment" id="totalInvestment" name="totalInvestment" value={formData.totalInvestment} onChange={handleInputChange} />
              <Input label="Product Owner" id="productOwner" name="productOwner" value={formData.productOwner} onChange={handleInputChange} />
              <Input label="Scrum Master" id="scrumMaster" name="scrumMaster" value={formData.scrumMaster} onChange={handleInputChange} />
            </div>
            <Textarea label="Development Team" id="developmentTeam" name="developmentTeam" value={formData.developmentTeam} onChange={handleInputChange} />
            
            <Accordion title="Sprints">
              <div className="max-h-[400px] overflow-y-auto pr-4">
                {formData.sprints.map(sprint => (
                  <SprintInput
                    key={sprint.number}
                    sprint={sprint}
                    onChange={handleSprintChange}
                    onRemove={() => removeSprint(sprint.number)}
                  />
                ))}
              </div>
              <Button onClick={addSprint} variant="secondary" className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Sprint
              </Button>
            </Accordion>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: styles.secondary }}>Commercial Proposal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Quotation Number" id="quotationNumber" name="quotationNumber" value={formData.quotationNumber} onChange={handleInputChange} />
              <Input label="Proposal Date" id="proposalDate" name="proposalDate" type="date" value={formData.proposalDate} onChange={handleInputChange} />
              <Input label="Validity Period" id="validityPeriod" name="validityPeriod" value={formData.validityPeriod} onChange={handleInputChange} />
              <Input label="Payment Method" id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} />
            </div>
            <Textarea label="Project Scope" id="projectScope" name="projectScope" value={formData.projectScope} onChange={handleInputChange} />
            <Textarea label="Technical Guarantees" id="technicalGuarantees" name="technicalGuarantees" value={formData.technicalGuarantees} onChange={handleInputChange} />
            <Textarea label="Deliverables" id="deliverables" name="deliverables" value={formData.deliverables} onChange={handleInputChange} />
            <Textarea label="Commercial Conditions" id="commercialConditions" name="commercialConditions" value={formData.commercialConditions} onChange={handleInputChange} />
            <Textarea label="Support and Warranty" id="supportAndWarranty" name="supportAndWarranty" value={formData.supportAndWarranty} onChange={handleInputChange} />
            <Textarea label="Key Benefits" id="keyBenefits" name="keyBenefits" value={formData.keyBenefits} onChange={handleInputChange} />
            <Textarea label="Next Steps" id="nextSteps" name="nextSteps" value={formData.nextSteps} onChange={handleInputChange} />
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: styles.secondary }}>Client Concept Guide</h2>
            <Accordion title="Agile Concepts">
              <Textarea label="Agile Benefits" id="agileBenefits" name="agileBenefits" value={formData.agileBenefits} onChange={handleInputChange} />
              <Textarea label="Sprint Explanation" id="sprintExplanation" name="sprintExplanation" value={formData.sprintExplanation} onChange={handleInputChange} />
              <Textarea label="Key Roles" id="keyRoles" name="keyRoles" value={formData.keyRoles} onChange={handleInputChange} />
              <Textarea label="Important Meetings" id="importantMeetings" name="importantMeetings" value={formData.importantMeetings} onChange={handleInputChange} />
            </Accordion>
            <Accordion title="Project Specifics">
              <Textarea label="Deliverables by Phase" id="deliverablesByPhase" name="deliverablesByPhase" value={formData.deliverablesByPhase} onChange={handleInputChange} />
              <Textarea label="Key Metrics" id="keyMetrics" name="keyMetrics" value={formData.keyMetrics} onChange={handleInputChange} />
              <Textarea label="Client Participation" id="clientParticipation" name="clientParticipation" value={formData.clientParticipation} onChange={handleInputChange} />
              <Textarea label="Communication Channels" id="communicationChannels" name="communicationChannels" value={formData.communicationChannels} onChange={handleInputChange} />
              <Textarea label="Guarantees and Support" id="guaranteesAndSupport" name="guaranteesAndSupport" value={formData.guaranteesAndSupport} onChange={handleInputChange} />
              <Textarea label="Important Dates" id="importantDates" name="importantDates" value={formData.importantDates} onChange={handleInputChange} />
              <Textarea label="FAQ Questions" id="faqQuestions" name="faqQuestions" value={formData.faqQuestions} onChange={handleInputChange} />
            </Accordion>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2" style={{ background: styles.gradient }}></div>
      
      <header className="mb-12 text-center relative">
        <div className="flex justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20v1-eXdopmoWlMlRNvOfRaMQ2dMW4azh0V.png"
            alt="cloudHUB Logo"
            width={250}
            height={84}
            className="h-auto"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: styles.secondary, fontFamily: 'Quicksand' }}>
          CISS Document Generator
        </h1>
        <p className="text-lg" style={{ color: styles.accent1 }}>
          Create customized project documents with ease
        </p>
      </header>

      <StepIndicator currentStep={currentStep} totalSteps={3} />

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {renderStep()}

        <div className="mt-12 flex justify-between">
          {currentStep > 1 && (
            <Button onClick={() => setCurrentStep(currentStep - 1)} variant="secondary">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          {currentStep < 3 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)} className="ml-auto">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Generate Documents
              <Save className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <footer className="mt-12 text-center">
        <p className="text-sm" style={{ color: styles.accent1 }}>
          © 2024 cloudHUB. All rights reserved.
        </p>
      </footer>
    </div>
  )
}