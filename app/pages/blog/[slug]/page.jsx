'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Script from 'next/script'


export default function BlogPostPage({ params: paramsPromise }) {
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const WORDPRESS_API_URL = 'https://team.cloudhub.cl/wp-json'

  const params = use(paramsPromise)
  const { slug } = params

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log( `${WORDPRESS_API_URL}/wp/v2/posts?${slug}&_embed=true`)
        setIsLoading(true)
        setError(null)
        
        // Verificar que tenemos un slug válido
        if (!slug) {
          throw new Error('Slug no encontrado')
        }

        const response = await fetch(
          `${WORDPRESS_API_URL}/wp/v2/posts?${slug}&_embed=true`
        )

        if (!response.ok) {
          throw new Error(`Error al obtener el post: ${response.status}`)
        }

        const data = await response.json()

        if (data && data.length > 0) {
          setPost(data[0])
        } else {
          throw new Error('Post no encontrado')
        }
      } catch (error) {
        console.error('Error al cargar el post:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug, WORDPRESS_API_URL])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Extraer metadatos para SEO
  const featuredImage = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const author = post?._embedded?.['author']?.[0]
  const categories = post?._embedded?.['wp:term']?.[0]
  const postExcerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, '') || ''
  const postTitle = post?.title?.rendered?.replace(/<[^>]+>/g, '') || ''

  // Manejo de estados de carga y error
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 pt-24 flex items-center justify-center">
        <p>Cargando post...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 pt-24 flex flex-col items-center justify-center">
        <p className="text-[#F33F31] mb-4">Error: {error}</p>
        <button 
          onClick={() => router.back()}
          className="text-white hover:text-[#F33F31] transition-colors"
        >
          Volver al Blog
        </button>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 pt-24 flex items-center justify-center">
        <p>Post no encontrado</p>
      </div>
    )
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postTitle,
    image: featuredImage,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Person',
      name: author?.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'CloudHub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://team.cloudhub.cl/logo.png'
      }
    },
    description: postExcerpt,
    articleBody: post.content.rendered.replace(/<[^>]+>/g, '')
  }

  return (
    <>
      <Head>
        <title>{postTitle} | CloudHub Blog</title>
        <meta name="description" content={postExcerpt} />
        <meta name="author" content={author?.name} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={postExcerpt} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.modified} />
        <meta property="article:author" content={author?.name} />
        {categories?.map(cat => (
          <meta key={cat.id} property="article:section" content={cat.name} />
        ))}
       <link rel="canonical" href={`https://team.cloudhub.cl/pages/blog/${slug}`} />

        </Head>

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article itemScope itemType="https://schema.org/BlogPosting">
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 pt-24 px-4 md:px-8">
          <motion.div 
            className="inline-flex items-center text-[#F33F31] hover:text-[#E77171] cursor-pointer mb-8 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            <span className="ml-2">Volver al Blog</span>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.h1 
              itemProp="headline"
              className="text-4xl md:text-5xl font-light tracking-wide mb-4 bg-gradient-to-r from-[#F33F31] to-[#E77171] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
              <meta itemProp="datePublished" content={post.date} />
              <meta itemProp="dateModified" content={post.modified} />
              <span className="flex items-center gap-1">
                <Calendar size={14} /> 
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              {author && (
                <span itemProp="author" itemScope itemType="https://schema.org/Person" className="flex items-center gap-1">
                  <User size={14} /> 
                  <span itemProp="name">{author.name}</span>
                </span>
              )}
              {categories && categories.length > 0 && (
                <span className="flex items-center gap-1">
                  <Tag size={14} /> 
                  {categories.map(cat => (
                    <span key={cat.id} itemProp="articleSection">{cat.name}</span>
                  )).reduce((prev, curr) => [prev, ', ', curr])}
                </span>
              )}
            </div>

            {featuredImage && (
              <motion.div 
                className="mb-8 rounded-2xl overflow-hidden relative aspect-video"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src={featuredImage}
                  alt={postTitle}
                  fill
                  className="object-cover"
                  priority
                  itemProp="image"
                />
              </motion.div>
            )}

            <motion.div 
              itemProp="articleBody"
              className="prose prose-invert prose-lg max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
              <motion.button 
                className={`flex items-center gap-2 text-gray-400 hover:text-[#F33F31] transition-colors ${
                  isLiked ? 'text-[#F33F31]' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                aria-label={isLiked ? 'Quitar me gusta' : 'Me gusta'}
              >
                <ThumbsUp size={20} />
                <span>{isLiked ? '1' : '0'}</span>
              </motion.button>

              <motion.button 
                className="flex items-center gap-2 text-gray-400 hover:text-[#F33F31] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Ver comentarios"
              >
                <MessageSquare size={20} />
                <span>{post.comment_count || 0}</span>
              </motion.button>

              <motion.button 
                className="flex items-center gap-2 text-gray-400 hover:text-[#F33F31] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Compartir artículo"
              >
                <Share2 size={20} />
                <span>Compartir</span>
              </motion.button>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}