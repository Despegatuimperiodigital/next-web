import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0D2940] to-[#182633] text-[#F7F9F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cloudhub%20(1)-wlyADOyAl7oDNS7UzM3u3CumiqqVww.png"
              alt="Logo de CloudHUB"
              width={120}
              height={40}
              className="w-auto h-8"
            />
            <div className="h-8 w-px bg-[#F33F31] mx-2" />
            <div className="text-sm">
              <p>+56 9 9171 1474</p>
              <p>team@cloudhub.cl</p>
            </div>
          </div>
          <nav className="flex space-x-6">
            <Link href="/" className="hover:text-[#F33F31] transition duration-300">Inicio</Link>
            <Link href="/servicios" className="hover:text-[#F33F31] transition duration-300">Servicios</Link>
            <Link href="/nosotros" className="hover:text-[#F33F31] transition duration-300">Nosotros</Link>
            <Link href="/contacto" className="hover:text-[#F33F31] transition duration-300">Contacto</Link>
          </nav>
          <div className="flex space-x-4">
            {['facebook', 'twitter', 'linkedin'].map((social) => (
              <a key={social} href={`https://${social}.com`} target="_blank" rel="noopener noreferrer" aria-label={social} className="group">
                <div className="w-10 h-10 rounded-full bg-[#F7F9F8] bg-opacity-10 flex items-center justify-center group-hover:bg-[#F33F31] transition duration-300">
                  <svg className="w-5 h-5 fill-current group-hover:text-[#F7F9F8]" viewBox="0 0 24 24">
                    {social === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
                    {social === 'twitter' && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>}
                    {social === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 text-xs text-center text-[#F7F9F8] text-opacity-60">
          <p>&copy; {new Date().getFullYear()} CloudHUB. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}