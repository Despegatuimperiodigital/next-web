// app/components/BlogSection.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/posts?_embed&per_page=6`)
        if (!response.ok) {
          throw new Error('Error al obtener los posts')
        }
        const data = await response.json()
        setBlogPosts(data)
        setLoading(false)
      } catch (err) {
        console.error('Error al obtener los posts:', err)
        setError('No se pudieron cargar los posts')
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Funciones helper
  const getImageUrl = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'
  }

  const getTitle = (post) => {
    return post.title?.rendered || ''
  }

  const getExcerpt = (post) => {
    return post.excerpt?.rendered || ''
  }

  const getAuthor = (post) => {
    return post._embedded?.author?.[0]?.name
  }

  const getCategory = (post) => {
    return post._embedded?.['wp:term']?.[0]?.[0]?.name
  }

  if (loading) {
    return (
      <div className="container mx-auto py-24">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-24">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl font-light text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Nuestro Blog
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-muted-foreground">
          Explore nuestros últimos artículos sobre tecnología, innovación y estrategias empresariales.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="rounded-lg overflow-hidden bg-card shadow-lg transition-shadow hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48">
                  <Image
                    src={getImageUrl(post)}
                    alt={getTitle(post)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </div>
                <div className="p-6">
                  <h3 
                    className="text-xl font-semibold mb-2 text-foreground"
                    dangerouslySetInnerHTML={{ __html: getTitle(post) }}
                  />
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </span>
                    {getAuthor(post) && (
                      <span className="flex items-center">
                        <User size={14} className="mr-1" />
                        {getAuthor(post)}
                      </span>
                    )}
                    {getCategory(post) && (
                      <span className="flex items-center">
                        <Tag size={14} className="mr-1" />
                        {getCategory(post)}
                      </span>
                    )}
                  </div>
                  <div
                    className="text-sm text-muted-foreground mb-4"
                    dangerouslySetInnerHTML={{ __html: getExcerpt(post) }}
                  />
                  <Button variant="link" className="text-primary p-0">
                    Leer más
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}