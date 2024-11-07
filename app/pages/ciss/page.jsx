'use client'

import { useState } from 'react'

import { Building, Search, TrendingUp, Users, ChevronRight, Menu, X, MapPin, Home, DollarSign, Bath, BedDouble, Calendar, Star } from "lucide-react"


// UI Components
const Button = ({ children, className, variant, ...props }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
    const variantStyles = {
      default: "bg-[rgb(253,74,92)] text-white hover:bg-[rgb(253,74,92)]/90 focus:ring-[rgb(253,74,92)]",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-[rgb(253,74,92)]",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-[rgb(253,74,92)]"
    }
    const style = `${baseStyle} ${variantStyles[variant || 'default']} ${className}`
    return <button className={style} {...props}>{children}</button>
  }
  
  const Input = ({ className, ...props }) => {
    return <input className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[rgb(253,74,92)] focus:border-[rgb(253,74,92)] ${className}`} {...props} />
  }
  
  const Card = ({ children, className, ...props }) => {
    return <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`} {...props}>{children}</div>
  }
  
  const CardContent = ({ children, className, ...props }) => {
    return <div className={`p-6 ${className}`} {...props}>{children}</div>
  }

  
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="flex items-center">
                <span className="sr-only">CISS Inmobiliaria</span>
                <Building className="h-8 w-auto sm:h-10 text-[rgb(253,74,92)]" />
                <span className="ml-2 text-xl font-bold text-gray-900">CISS Inmobiliaria</span>
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[rgb(253,74,92)]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Abrir menú</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Propiedades
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Proyectos
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Inversiones
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Sobre Nosotros
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contacto
              </a>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Button variant="ghost" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Iniciar sesión
              </Button>
              <Button className="ml-8 bg-[rgb(253,74,92)] hover:bg-[rgb(253,74,92)]/90 text-white">
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Construyendo el futuro de</span>
                <span className="block text-[rgb(253,74,92)]">Concepción y alrededores</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Descubre nuestros proyectos inmobiliarios y oportunidades de inversión en las mejores ubicaciones de la región.
              </p>
              <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
                <div className="relative rounded-md shadow-sm w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Buscar proyectos o propiedades..."
                    className="pl-10 pr-4 py-3 w-full sm:w-96 focus:ring-[rgb(253,74,92)] focus:border-[rgb(253,74,92)]"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button className="w-full bg-[rgb(253,74,92)] hover:bg-[rgb(253,74,92)]/90 text-white py-3 px-6">
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Nuestros Proyectos Destacados
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Edificios modernos y sostenibles en las mejores ubicaciones de Concepción y alrededores.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Torre Bicentenario",
                  location: "Concepción Centro",
                  description: "Apartamentos de lujo con vistas panorámicas al río Biobío.",
                  image: "/placeholder.svg?height=400&width=600&text=Torre+Bicentenario",
                },
                {
                  title: "Condominio Los Aromos",
                  location: "San Pedro de la Paz",
                  description: "Casas familiares en un entorno natural y seguro.",
                  image: "/placeholder.svg?height=400&width=600&text=Condominio+Los+Aromos",
                },
                {
                  title: "Edificio Smart Living",
                  location: "Talcahuano",
                  description: "Apartamentos inteligentes con tecnología de punta y eficiencia energética.",
                  image: "/placeholder.svg?height=400&width=600&text=Edificio+Smart+Living",
                },
              ].map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-[rgb(253,74,92)]" />
                      {project.location}
                    </p>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <Button variant="outline" className="w-full">
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button className="bg-[rgb(253,74,92)] hover:bg-[rgb(253,74,92)]/90 text-white">
                Ver todos los proyectos
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Oportunidades de Inversión
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Descubre nuestros proyectos inmobiliarios y oportunidades de inversión en las mejores ubicaciones de la región.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Fuentes de Porvenir 2",
                  location: "Chiguayante",
                  price: "Desde 2.400 UF",
                  bedrooms: "3 Dorms",
                  bathrooms: "1 a 2 Baños",
                  area: "66,6 m2 Totales",
                  status: ["Nuevo Proyecto", "En verde"],
                  image: "/placeholder.svg?height=200&width=300&text=Fuentes+de+Porvenir+2"
                },
                {
                  title: "Fuentes de Aeroparque",
                  location: "Concepción",
                  price: "Desde 3799 UF",
                  bedrooms: "3 Dorms",
                  bathrooms: "2 Baños",
                  area: "73 Totales",
                  status: ["Nuevo proyecto", "Inversión"],
                  image: "/placeholder.svg?height=200&width=300&text=Fuentes+de+Aeroparque"
                },
                {
                  title: "Parque Huertos",
                  location: "Huertos Familiares",
                  price: "Desde 3.009 UF",
                  bedrooms: "1 a 3 Dorms",
                  bathrooms: "1 a 2 Baños",
                  area: "42.91 a 112.76 Totales",
                  status: ["Venta en Verde", "Inversión"],
                  image: "/placeholder.svg?height=200&width=300&text=Parque+Huertos"
                },
              ].map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-[rgb(253,74,92)]" />
                      {project.location}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-600 mr-1" />
                        <span className="font-semibold text-gray-900">{project.price}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center">
                        <BedDouble className="h-4 w-4 mr-1 text-gray-400" />
                        {project.bedrooms}
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-gray-400" />
                        {project.bathrooms}
                      </div>
                      <div className="flex items-center col-span-2">
                        <Home className="h-4 w-4 mr-1 text-gray-400" />
                        {project.area}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.status.map((status, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {status}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      Conocer más
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button className="bg-[rgb(253,74,92)] hover:bg-[rgb(253,74,92)]/90 text-white">
                Explorar más oportunidades
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                ¿Por qué elegir CISS Inmobiliaria?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 lg:mx-auto">
                Nuestra experiencia y compromiso nos distinguen en el mercado inmobiliario de Concepción y alrededores.
              </p>
            </div>

            <div className="mt-20">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    name: 'Experiencia Local',
                    description: 'Más de 20 años construyendo el futuro de Concepción y sus alrededores.',
                    icon: Building,
                  },
                  {
                    name: 'Calidad Constructiva',
                    description: 'Utilizamos los mejores materiales y técnicas de construcción para garantizar la durabilidad de nuestros proyectos.',
                    icon: Home,
                  },
                  {
                    name: 'Inversiones Seguras',
                    description: 'Ofrecemos oportunidades de inversión con retornos atractivos y riesgo controlado.',
                    icon: TrendingUp,
                  },
                  {
                    name: 'Atención Personalizada',
                    description: 'Nuestro equipo de expertos te acompaña en cada paso del proceso de compra o inversión.',
                    icon: Users,
                  },
                ].map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[rgb(253,74,92)] text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Descubre por qué nuestros clientes confían en CISS Inmobiliaria para sus inversiones y hogares.
              </p>
            </div>
            <div className="mt-20 grid gap-8 lg:grid-cols-3">
              {[
                {
                  name: "María González",
                  role: "Propietaria en Torre Bicentenario",
                  image: "/placeholder.svg?height=100&width=100&text=MG",
                  quote: "CISS Inmobiliaria hizo realidad nuestro sueño de tener un hogar con vista al mar. Su atención y profesionalismo son incomparables.",
                },
                {
                  name: "Carlos Mendoza",
                  role: "Inversionista",
                  image: "/placeholder.svg?height=100&width=100&text=CM",
                  quote: "He invertido en varios proyectos de CISS y siempre han superado mis expectativas. Su conocimiento del mercado local es invaluable.",
                },
                {
                  name: "Ana Soto",
                  role: "Propietaria en Condominio Los Aromos",
                  image: "/placeholder.svg?height=100&width=100&text=AS",
                  quote: "La calidad de construcción y el servicio post-venta de CISS son excepcionales. Recomiendo totalmente trabajar con ellos.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="flex flex-col justify-between">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        className="h-12 w-12 rounded-full mr-4"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">{'"' + testimonial.quote + '"'}</p>
                    <div className="mt-4 flex text-[rgb(253,74,92)]">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Nuestro Blog
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Mantente informado sobre las últimas tendencias del mercado inmobiliario y consejos de inversión.
              </p>
            </div>
            <div className="mt-20 grid gap-8 lg:grid-cols-3">
              {[
                {
                  title: "5 razones para invertir en Concepción en 2023",
                  excerpt: "Descubre por qué Concepción se está convirtiendo en un punto focal para inversores inmobiliarios...",
                  image: "/placeholder.svg?height=200&width=400&text=Inversión+en+Concepción",
                  date: "15 de Junio, 2023",
                },
                {
                  title: "Guía para compradores primerizos",
                  excerpt: "Todo lo que necesitas saber antes de comprar tu primera propiedad en Concepción y alrededores...",
                  image: "/placeholder.svg?height=200&width=400&text=Guía+Compradores",
                  date: "2 de Junio, 2023",
                },
                {
                  title: "Tendencias de diseño en edificios modernos",
                  excerpt: "Explora las últimas innovaciones en arquitectura y diseño que están dando forma a nuestros proyectos...",
                  image: "/placeholder.svg?height=200&width=400&text=Tendencias+Diseño",
                  date: "20 de Mayo, 2023",
                },
              ].map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button className="bg-[rgb(253,74,92)] hover:bg-[rgb(253,74,92)]/90 text-white">
                Ver todos los artículos
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-[rgb(253,74,92)] rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">¿Listo para invertir en tu futuro?</span>
                    <span className="block">Contáctanos hoy mismo.</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-white">
                    Nuestro equipo de expertos está listo para ayudarte a encontrar la propiedad perfecta o la mejor oportunidad de inversión en Concepción y sus alrededores.
                  </p>
                  <a
                    href="#"
                    className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-[rgb(253,74,92)] hover:bg-gray-50"
                  >
                    Contactar ahora
                  </a>
                </div>
              </div>
              <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                <img
                  className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                  src="/placeholder.svg?height=600&width=800&text=CISS+Inmobiliaria+Concepción"
                  alt="CISS Inmobiliaria en Concepción"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <Building className="h-10 w-auto text-[rgb(253,74,92)]" />
                <span className="ml-2 text-xl font-bold text-gray-900">CISS Inmobiliaria</span>
              </div>
              <p className="text-gray-500 text-base">
                Construyendo el futuro de Concepción y sus alrededores desde 2003.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Proyectos</h3>
                  <ul className="mt-4 space-y-4">
                    {['Residenciales', 'Comerciales', 'Oficinas', 'Industriales'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Servicios</h3>
                  <ul className="mt-4 space-y-4">
                    {['Compra', 'Venta', 'Arriendo', 'Inversiones'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Empresa</h3>
                  <ul className="mt-4 space-y-4">
                    {['Sobre Nosotros', 'Equipo', 'Carreras', 'Contacto'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    {['Privacidad', 'Términos', 'Cookies'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2023 CISS Inmobiliaria. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}