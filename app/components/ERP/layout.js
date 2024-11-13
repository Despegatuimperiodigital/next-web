import React, { useState } from 'react';
import { Bell, Search, Menu, X, Home, Briefcase, Users, Settings, LogOut } from 'lucide-react';

const Layout = ({ children, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="flex justify-between items-center mb-6">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudhub%20(1)-wlyADOyAl7oDNS7UzM3u3CumiqqVww.png" alt="CloudHub Logo" className="h-8" />
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav>
          <NavItem icon={<Home size={20} />} label="Dashboard" active />
          <NavItem icon={<Briefcase size={20} />} label="Tareas" />
          <NavItem icon={<Users size={20} />} label="Clientes" />
          <NavItem icon={<Settings size={20} />} label="Configuración" />
        </nav>
        <div className="mt-auto pt-4 border-t">
          <NavItem icon={<LogOut size={20} />} label="Cerrar sesión" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="mr-4 md:hidden">
              <Menu size={24} />
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full md:w-64 bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <UserProfile userType={userType} />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active }) => {
  return (
    <a
      href="#"
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm ${
        active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

const NotificationCenter = () => {
  return (
    <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
      <Bell size={20} />
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        3
      </span>
    </button>
  );
};

const UserProfile = ({ userType }) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="/placeholder.svg?height=32&width=32"
        alt="User Avatar"
        className="rounded-full h-8 w-8"
      />
      <div className="hidden md:block">
        <p className="text-sm font-medium text-gray-700">John Doe</p>
        <p className="text-xs text-gray-500">{userType}</p>
      </div>
    </div>
  );
};

export default Layout;