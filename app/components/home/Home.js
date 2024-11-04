'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Send, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const businessChallenges = [
  { icon: "📊", title: "Optimizar procesos" },
  { icon: "🤝", title: "Experiencia del cliente" },
  { icon: "🔒", title: "Seguridad de datos" },
  { icon: "🚀", title: "Escalar infraestructura" },
  { icon: "🧠", title: "Soluciones de IA" },
  { icon: "💡", title: "Innovación de productos" }
]

const trustedCompanies = [
  { name: "TechNova", logo: "/placeholder.svg?height=30&width=100", industry: "Tecnología" },
  { name: "FinEdge", logo: "/placeholder.svg?height=30&width=100", industry: "Finanzas" },
  { name: "EcoSmart", logo: "/placeholder.svg?height=30&width=100", industry: "Sostenibilidad" },
  { name: "Decohaus", logo: "/placeholder.svg?height=30&width=100", industry: "Comercio" },
  { name: "Cruzeiro", logo: "https://images.jumpseller.com/store/cruzeiro-gomas/store/logo/Captura_de_pantalla_2024-08-20_a_la_s__10.02.46.png", industry: "Comercio" },
  { name: "CISS", logo: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_300/https://ciss.cl/wp-content/uploads/2021/12/Logo-CISS-1.png", industry: "Inmobiliaria" }
]

export default function ElegantHeroSection() {
  const [userQuery, setUserQuery] = useState("")
  const [conversation, setConversation] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  const handleChallengeSelect = (challenge) => {
    setShowChat(true)
    handleSubmit(challenge)
  }

  const handleSubmit = async (query) => {
    if (query.trim()) {
      setConversation(prev => [...prev, { type: 'user', content: query }])
      setIsLoading(true)
      setUserQuery("")

      try {
        const response = await fetch('https://api.cloudhub.cl/api/despega-ai/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ searchText: query })
        })

        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor')
        }

        const data = await response.json()
        setConversation(prev => [...prev, { type: 'bot', content: data.message }])
      } catch (error) {
        console.error('Error:', error)
        setConversation(prev => [...prev, { 
          type: 'bot', 
          content: 'Hubo un error al procesar su consulta. Intente nuevamente más tarde.' 
        }])
      }

      setIsLoading(false)
    }
  }

  const titleWords = "Eleve su Visión Empresarial con CloudHub".split(" ")

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/document-pveiX76s4q42lmGwQ2odGa3He7XWwQ.jpeg"
          alt="Cityscape with cloud technology"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-nunito mt-14">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ 
                  opacity: 1, 
                  filter: "blur(0px)",
                  y: [0, -4, 0]
                }}
                transition={{
                  opacity: { duration: 1, delay: i * 0.2 },
                  filter: { duration: 1, delay: i * 0.2 },
                  y: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: titleWords.length * 0.2 }}
          >
            Descubra soluciones cloud vanguardistas para potenciar la innovación y el crecimiento sostenible.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-3xl mx-auto shadow-2xl"
        >
          {!showChat ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white text-center font-nunito">
                ¿Qué desafío empresarial le gustaría abordar?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {businessChallenges.map((challenge, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleChallengeSelect(challenge.title)}
                    className="flex justify-between items-center bg-white/10 hover:bg-white/20 text-white rounded-lg p-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <span>{challenge.icon}</span>
                      <span>{challenge.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-300 mb-3">
                  ¿No encuentra su desafío específico? Descríbalo aquí:
                </p>
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault()
                    handleSubmit(userQuery)
                    setShowChat(true)
                  }} 
                  className="flex gap-2 max-w-md mx-auto"
                >
                  <Input
                    type="text"
                    placeholder="Describa su desafío empresarial..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-[#F33F31] to-[#E77171] hover:from-[#E02D1F] hover:to-[#D55F5F]">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar mensaje</span>
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-[350px] overflow-y-auto pr-4 space-y-4">
                <AnimatePresence>
                  {conversation.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 rounded-lg max-w-[80%] ${
                        message.type === 'user' 
                          ? 'ml-auto bg-gradient-to-r from-[#F33F31] to-[#E77171] text-white' 
                          : 'bg-white/30 text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/30 text-white p-3 rounded-lg max-w-[80%]"
                  >
                    <p>Analizando su consulta...</p>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form 
                onSubmit={(e) => { 
                  e.preventDefault()
                  handleSubmit(userQuery)
                }} 
                className="flex gap-2"
              >
                <Input
                  type="text"
                  placeholder="Haga una pregunta o describa otro desafío..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#F33F31] to-[#E77171] hover:from-[#E02D1F] hover:to-[#D55F5F]"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar mensaje</span>
                </Button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}