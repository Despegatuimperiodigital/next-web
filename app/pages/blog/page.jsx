'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Tag } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function BlogSection() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp/v2/posts?_embed&per_page=12`)
        if (!response.ok) {
          throw new Error('Error al obtener los posts')
        }
        const data = await response.json()
        setPosts(data)
        setLoading(false)
      } catch (err) {
        console.error('Error al obtener los posts:', err)
        setError('No se pudieron cargar los posts')
        setLoading(false)
      }
    }

    fetchPosts()
  }, [WORDPRESS_API_URL])

  const handlePostClick = (id) => {
    router.push(`blog/${id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 flex items-center justify-center">
        <p>Cargando posts... fsdmfjs</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 flex items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section className="py-24 px-4 md:px-8 bg-[#0a0a0a] text-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-4 bg-gradient-to-r from-[#F33F31] to-[#E77171] bg-clip-text text-transparent">
          Nuestro Blog
        </h2>
        
        <p className="text-lg md:text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
          Explore nuestros últimos artículos sobre tecnología, innovación y estrategias empresariales.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const author = post._embedded?.['author']?.[0]?.name
            const categories = post._embedded?.['wp:term']?.[0]

            return (
              <motion.div 
                key={post.id}
                className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10 cursor-pointer
                         hover:bg-white/[0.05] transition-all duration-300 hover:shadow-xl
                         hover:shadow-[#F33F31]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePostClick(post.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  {featuredImage && (
                    <Image
                      src={featuredImage}
                      alt={post.title.rendered}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 
                    className="text-xl text-white font-semibold mb-4"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />

                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    {author && (
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {author}
                      </span>
                    )}
                    {categories && categories.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag size={14} />
                        {categories[0].name}
                      </span>
                    )}
                  </div>

                  <div 
                    className="mt-4 text-gray-400 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}