import React, { useState, useEffect } from 'react'
import { X, MessageSquare, Camera, User, Calendar, Link, Send, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import html2canvas from 'html2canvas'

const AreaSelector = ({ onSelectArea, onCancel }) => {
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [endPos, setEndPos] = useState({ x: 0, y: 0 })
  const [isSelecting, setIsSelecting] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isSelecting) {
        setEndPos({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseUp = () => {
      if (isSelecting) {
        setIsSelecting(false)
        onSelectArea({
          x: Math.min(startPos.x, endPos.x),
          y: Math.min(startPos.y, endPos.y),
          width: Math.abs(endPos.x - startPos.x),
          height: Math.abs(endPos.y - startPos.y)
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isSelecting, startPos, endPos, onSelectArea])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 cursor-crosshair z-50"
      onMouseDown={(e) => {
        setStartPos({ x: e.clientX, y: e.clientY })
        setEndPos({ x: e.clientX, y: e.clientY })
        setIsSelecting(true)
      }}
    >
      <div
        className="absolute border-2 border-[#F33F31] bg-[#FF8866] bg-opacity-30"
        style={{
          left: Math.min(startPos.x, endPos.x),
          top: Math.min(startPos.y, endPos.y),
          width: Math.abs(endPos.x - startPos.x),
          height: Math.abs(endPos.y - startPos.y)
        }}
      />
      <button
        className="fixed top-4 right-4 bg-[#F33F31] text-[#F7F9F8] p-2 rounded-full transition-colors duration-300 hover:bg-[#E77171]"
        onClick={onCancel}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  )
}

export default function EnhancedFeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [userName, setUserName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [isSelectingArea, setIsSelectingArea] = useState(false)
  const [reports, setReports] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [step, setStep] = useState(1)
  const [isFormVisible, setIsFormVisible] = useState(true)

  useEffect(() => {
    if (isOpen) {
      const now = new Date()
      setDateTime(now.toLocaleString())
      setCurrentUrl(window.location.href)
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newReport = {
      userName,
      dateTime,
      currentUrl,
      feedback,
      screenshot
    }
    setReports([...reports, newReport])
    console.log('Nuevo reporte agregado:', newReport)
    setShowConfirmation(true)
    resetForm()
  }

  const resetForm = () => {
    setFeedback('')
    setUserName('')
    setScreenshot(null)
    setStep(1)
  }

  const handleCaptureClick = () => {
    setIsFormVisible(false)
    setIsSelectingArea(true)
  }

  const captureScreenshot = (area) => {
    html2canvas(document.body).then(canvas => {
      const screenshotCanvas = document.createElement('canvas')
      const ctx = screenshotCanvas.getContext('2d')
      if (ctx) {
        screenshotCanvas.width = area.width
        screenshotCanvas.height = area.height
        ctx.drawImage(canvas, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height)
        const screenshotDataUrl = screenshotCanvas.toDataURL('image/png')
        setScreenshot(screenshotDataUrl)
      }
      setIsSelectingArea(false)
      setIsFormVisible(true)
    })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF8866] focus:border-[#FF8866] bg-gray-700 text-gray-200"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />
              <input
                type="text"
                id="dateTime"
                value={dateTime}
                readOnly
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-200"
              />
            </div>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />
              <input
                type="text"
                id="currentUrl"
                value={currentUrl}
                readOnly
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-600 text-gray-200"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe los cambios que sugieres para esta página..."
              className="w-full p-4 border border-gray-600 rounded-md shadow-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF8866] focus:border-[#FF8866] bg-gray-700 text-gray-200"
              required
            />
            <button
              type="button"
              onClick={handleCaptureClick}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-200 bg-[#FF8866] hover:bg-[#E77171] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8866] transition-colors duration-300"
            >
              <Camera className="w-5 h-5 mr-2" />
              Capturar área de pantalla
            </button>
            {screenshot && (
              <div className="mt-2 border border-gray-600 rounded-md p-2">
                <img src={screenshot} alt="Captura de pantalla" className="w-full h-auto rounded" />
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[#F33F31] text-[#F7F9F8] p-3 rounded-full shadow-lg hover:bg-[#E77171] transition-all duration-300 transform hover:scale-110"
        aria-label="Abrir formulario de feedback"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {isFormVisible && (
            <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl w-full max-w-md relative animate-fadeIn backdrop-blur-sm">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-200 hover:text-[#FF8866] transition-colors duration-300"
                aria-label="Cerrar formulario"
              >
                <X className="w-6 h-6" />
              </button>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Enviar feedback</h2>

                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                  <div className="bg-[#F33F31] h-2.5 rounded-full" style={{ width: `${(step / 2) * 100}%` }}></div>
                </div>

                {renderStep()}

                <div className="flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8866] transition-colors duration-300"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Anterior
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#F7F9F8] bg-[#F33F31] hover:bg-[#E77171] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8866] transition-colors duration-300"
                    >
                      Siguiente
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#F7F9F8] bg-[#F33F31] hover:bg-[#E77171] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8866] transition-colors duration-300"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Enviar reporte
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {isSelectingArea && (
        <AreaSelector
          onSelectArea={captureScreenshot}
          onCancel={() => {
            setIsSelectingArea(false)
            setIsFormVisible(true)
          }}
        />
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl w-full max-w-md p-6 space-y-4 animate-fadeIn backdrop-blur-sm">
            <div className="flex items-center justify-center text-[#F33F31]">
              <Check className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 text-center">Reporte enviado</h2>
            <p className="text-center text-gray-200">
              Tu reporte ha sido enviado con éxito. ¿Deseas agregar otro reporte para esta página?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setShowConfirmation(false)
                  resetForm()
                }}
                className="px-4 py-2 bg-[#F33F31] text-[#F7F9F8] rounded-md hover:bg-[#E77171] transition-colors duration-300"
              >
                Sí, agregar otro
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false)
                  setIsOpen(false)
                }}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-opacity-80 transition-colors duration-300"
              >
                No, cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    
    </>
  )
}