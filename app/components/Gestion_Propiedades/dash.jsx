'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Building2, Users, FileText, PieChart, Settings, Search, Bell, Menu, X } from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Building2, label: 'Propiedades', href: '/propiedades' },
  { icon: Users, label: 'Clientes', href: '/clientes' },
  { icon: FileText, label: 'Documentos', href: '/documentos' },
  { icon: PieChart, label: 'Reportes', href: '/reportes' },
  { icon: Settings, label: 'Configuración', href: '/configuracion' },
]

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    toast({
      title: sidebarOpen ? "Sidebar cerrada" : "Sidebar abierta",
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen flex bg-[#F7F9F8]">
      {/* Sidebar */}
      <aside className={`bg-[#182633] text-white transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'} lg:w-64`}>
        <div className="p-4">
          <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudhub%20(1)-wlyADOyAl7oDNS7UzM3u3CumiqqVww.png" alt="cloudHUB Logo" width={120} height={40} className={`mb-8 ${sidebarOpen ? 'block' : 'hidden'} lg:block`} />
        </div>
        <nav>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center px-4 py-2 ${pathname === item.href ? 'bg-[#F33F31] text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                <item.icon className="h-5 w-5 mr-3" />
                <span className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={toggleSidebar}>
                {sidebarOpen ? <X /> : <Menu />}
              </Button>
              <div className="relative w-64">
                <Input type="text" placeholder="Buscar..." className="pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <UserProfile />
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}

function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <nav className="bg-gray-100 px-4 py-2 text-sm">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/" className="text-[#F33F31] hover:underline">Inicio</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">/</span>
              <Link href={href} className="text-[#F33F31] hover:underline capitalize">
                {segment}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const notifications = [
    { id: 1, title: 'Nueva propiedad añadida', message: 'Se ha añadido una nueva propiedad en el centro.', time: '2 min ago' },
    { id: 2, title: 'Actualización de cliente', message: 'El perfil del cliente Juan Pérez ha sido actualizado.', time: '1 hora ago' },
    { id: 3, title: 'Documento expirado', message: 'El certificado energético de la propiedad ID-1234 ha expirado.', time: '2 horas ago' },
  ]

  const handleNotificationClick = (notification) => {
    setIsOpen(false)
    toast({
      title: notification.title,
      description: notification.message,
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} onSelect={() => handleNotificationClick(notification)}>
              <div className="flex flex-col">
                <span className="font-medium">{notification.title}</span>
                <span className="text-sm text-gray-500">{notification.message}</span>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}