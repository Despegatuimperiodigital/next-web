import React from 'react';
import { Frame } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Frame className="w-8 h-8 text-primary mr-2" />
          <span className="text-xl font-bold text-primary">CloudHub</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#features" className="text-gray-600 hover:text-primary">Características</a></li>
            <li><a href="#pricing" className="text-gray-600 hover:text-primary">Precios</a></li>
            <li><a href="#contact" className="text-gray-600 hover:text-primary">Contacto</a></li>
          </ul>
        </nav>
        <a href="#analyze" className="btn btn-primary">Analizar Mi Sitio</a>
      </div>
    </header>
  );
}