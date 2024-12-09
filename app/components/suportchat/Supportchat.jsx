'use client';
import React, { useState, useEffect,useCallback ,useRef} from 'react'
import { X, MessageSquare, Camera, User, Calendar, Link, Send, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import html2canvas from 'html2canvas'


const AreaSelector = ({ onSelectArea, onCancel }) => {
  const containerRef = useRef(null);
  const [startPos, setStartPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Función mejorada para obtener la posición correcta
  const getScaledPosition = useCallback((clientX, clientY) => {
    const dpr = window.devicePixelRatio || 1;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    return {
      x: clientX + scrollX,
      y: clientY + scrollY,
      screenX: clientX,
      screenY: clientY,
      dpr
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const pos = getScaledPosition(e.clientX, e.clientY);
    setStartPos(pos);
    setCurrentPos(pos);
    setIsSelecting(true);
  }, [getScaledPosition]);

  const handleMouseMove = useCallback((e) => {
    if (isSelecting) {
      const pos = getScaledPosition(e.clientX, e.clientY);
      setCurrentPos(pos);
    }
  }, [isSelecting, getScaledPosition]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting && startPos && currentPos) {
      setIsSelecting(false);
      
      const dpr = window.devicePixelRatio || 1;
      const area = {
        // Coordenadas absolutas para la captura
        x: Math.min(startPos.x, currentPos.x),
        y: Math.min(startPos.y, currentPos.y),
        width: Math.abs(currentPos.x - startPos.x),
        height: Math.abs(currentPos.y - startPos.y),
        // Información adicional
        devicePixelRatio: dpr,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY
      };

      // Validar que el área seleccionada está dentro de los límites
      if (area.width > 10 && area.height > 10) {
        onSelectArea(area);
      }
    }
  }, [isSelecting, startPos, currentPos, onSelectArea]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  }, [onCancel]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMouseMove, handleMouseUp, handleKeyDown]);

  // Calcular el estilo visual de la selección
  const getSelectionStyle = () => {
    if (!startPos || !currentPos) return null;

    return {
      position: 'absolute',
      left: Math.min(startPos.screenX, currentPos.screenX),
      top: Math.min(startPos.screenY, currentPos.screenY),
      width: Math.abs(currentPos.screenX - startPos.screenX),
      height: Math.abs(currentPos.screenY - startPos.screenY)
    };
  };

  const selectionStyle = getSelectionStyle();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 select-none"
      style={{
        cursor: 'crosshair',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute inset-0 pointer-events-none" />

      {selectionStyle && (
        <div
          className="absolute border-2 border-primary bg-primary/30 pointer-events-none"
          style={selectionStyle}
        >
          {isSelecting && (
            <div className="absolute -bottom-6 left-0 bg-background text-foreground px-2 py-1 text-xs rounded shadow">
              {Math.round(selectionStyle.width)} x {Math.round(selectionStyle.height)}
              <span className="ml-2 text-foreground/60">
                DPR: {window.devicePixelRatio.toFixed(2)}x
              </span>
            </div>
          )}
        </div>
      )}

      <button
        className="fixed top-4 right-4 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full shadow-lg transition-colors duration-200"
        onClick={onCancel}
        title="Cancelar selección (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background text-foreground px-4 py-2 rounded-full shadow-lg">
        Haz clic y arrastra para seleccionar un área • Scroll permitido
      </div>
    </div>
  );
};



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
  const [showImagePreview, setShowImagePreview] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const now = new Date()
      setDateTime(now.toLocaleString())
      setCurrentUrl(window.location.href)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formData = new FormData();
    formData.append('nombre', userName);       
    formData.append('descripcion', feedback);  
    formData.append('link', currentUrl);   
    
    if(screenshot) {
      formData.append('screenshot', screenshot);
    }
    
    
    
    try {
      // Enviar el formulario al back
      const response = await fetch('/api/feedback', {
        method: 'POST',
        body: formData, 
      });
  
      // Verificar que la respuesta sea exitosa
      if (!response.ok) {
        throw new Error('Error al enviar el feedback');
      }
  
      const result = await response.json();
      console.log('Feedback enviado correctamente:', result);
  
      setShowConfirmation(true);
      resetForm(); 
    } catch (error) {
      console.error('Error al enviar feedback:', error);
    }
  };

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


  const captureScreenshot = async (area) => {
    try {
      console.log('Área seleccionada para la captura:', area);
      
      
      
      // Configurar opciones de html2canvas
      const options = {
        scale: window.devicePixelRatio, // Usar el DPR actual
        logging: false,
        useCORS: true,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        x: area.x,
        y: area.y,
        width: area.width,
        height: area.height,
      };
      
   
      // Capturar el área específica
      const canvas = await html2canvas(document.body, options);
      console.log('Canvas capturado:', canvas);
      // Crear un canvas del tamaño exacto del área seleccionada
      const croppedCanvas = document.createElement('canvas');
      const ctx = croppedCanvas.getContext('2d');
      
      if (ctx) {
        // Establecer las dimensiones del canvas de recorte
        croppedCanvas.width = area.width;
        croppedCanvas.height = area.height;
        
        // Dibujar solo el área seleccionada
        ctx.drawImage(
          canvas,
          area.x * window.devicePixelRatio,
          area.y * window.devicePixelRatio,
          area.width * window.devicePixelRatio,
          area.height * window.devicePixelRatio,
          0,
          0,
          area.width,
          area.height
        );

         // Convertir a data URL
        const screenshotDataUrl = croppedCanvas.toDataURL('image/png');
         setScreenshot(screenshotDataUrl);
         console.log('Captura de pantalla (Data URL):', screenshotDataUrl);
         
      } 
      
      setIsSelectingArea(false);
      setIsFormVisible(true);
    } catch (error) {
      console.error('Error al capturar la pantalla:', error);
      setIsSelectingArea(false);
      setIsFormVisible(true);
    }
  };

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
              <div className="mt-2 space-y-2">
                <div className="border border-[#182633] rounded-md p-2 h-32 overflow-hidden">
                  <img src={screenshot} alt="Captura de pantalla" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowImagePreview(true)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-[#182633] rounded-md shadow-sm text-sm font-medium text-[#182633] bg-[#F7F9F8] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8866] transition-colors duration-300"
                >
                  Previsualizar imagen
                </button>
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
                      onClick={handleSubmit}
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
      {showImagePreview && screenshot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#F7F9F8] rounded-lg shadow-xl w-full max-w-4xl p-4 relative animate-fadeIn">
            <button
              onClick={() => setShowImagePreview(false)}
              className="absolute top-2 right-2 text-[#182633] hover:text-[#FF8866] transition-colors duration-300"
              aria-label="Cerrar previsualización"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={screenshot} alt="Previsualización de captura de pantalla" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </>
  )
}