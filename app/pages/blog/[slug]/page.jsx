'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Script from 'next/script'


// Estilos personalizados para el contenido de WordPress
const wordPressStyles = {
    content: `
      prose prose-invert prose-lg max-w-none
      [&>h1]:text-4xl [&>h1]:font-light [&>h1]:mb-6 [&>h1]:text-primary
      [&>h2]:text-3xl [&>h2]:font-light [&>h2]:mb-4 [&>h2]:text-foreground
      [&>h3]:text-2xl [&>h3]:font-light [&>h3]:mb-3 [&>h3]:text-foreground
      [&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:text-muted-foreground
      [&>p]:text-foreground [&>p]:mb-6 [&>p]:leading-relaxed
      [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-foreground
      [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-foreground
      [&>li]:mb-2
      [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:mb-6
      [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-6
      [&>code]:bg-muted [&>code]:px-2 [&>code]:py-1 [&>code]:rounded
      [&>img]:rounded-lg [&>img]:mb-6 [&>img]:max-w-full [&>img]:h-auto
      [&>figure]:mb-6 [&>figure>img]:rounded-lg [&>figure>figcaption]:text-muted-foreground [&>figure>figcaption]:text-sm [&>figure>figcaption]:mt-2
      [&>a]:text-primary [&>a]:underline [&>a:hover]:text-primary-light
      [&>table]:w-full [&>table]:mb-6 [&>table]:border-collapse [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-border [&>table>thead>tr>th]:p-2 [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-border [&>table>tbody>tr>td]:p-2
      [&>hr]:my-8 [&>hr]:border-border
      [&>.wp-block-image]:mb-6 [&>.wp-block-image>img]:rounded-lg [&>.wp-block-image>figcaption]:text-muted-foreground [&>.wp-block-image>figcaption]:text-sm [&>.wp-block-image>figcaption]:mt-2
      [&>.wp-block-quote]:border-l-4 [&>.wp-block-quote]:border-primary [&>.wp-block-quote]:pl-4 [&>.wp-block-quote]:italic [&>.wp-block-quote]:text-muted-foreground [&>.wp-block-quote]:mb-6
      [&>.wp-block-code]:bg-muted [&>.wp-block-code]:p-4 [&>.wp-block-code]:rounded-lg [&>.wp-block-code]:overflow-x-auto [&>.wp-block-code]:mb-6
      [&>.wp-block-table]:w-full [&>.wp-block-table]:mb-6 [&>.wp-block-table]:border-collapse
    `,
    image: `
      rounded-lg overflow-hidden relative aspect-video object-cover
    `,
    link: `
      text-primary hover:text-primary-light transition-colors
    `,
    list: `
      list-disc pl-6 mb-6 text-foreground space-y-2
    `,
    code: `
      bg-muted p-4 rounded-lg overflow-x-auto mb-6 font-mono text-sm text-muted-foreground
    `
  }
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
        setIsLoading(true)
        setError(null)
        
        if (!slug) {
          throw new Error('Slug no encontrado')
        }

        // Modificada la URL para buscar por slug
        const response = await fetch(
          `${WORDPRESS_API_URL}/wp/v2/posts?slug=${slug}&_embed=true`
        )

        if (!response.ok) {
          throw new Error(`Error al obtener el post: ${response.status}`)
        }

        const data = await response.json()

        if (data && data.length > 0) {
          // Preservamos toda la estructura del post incluyendo metadatos SEO
          const postData = data[0]
          
          // Si WordPress tiene campos ACF personalizados para SEO
          const seoData = postData.yoast_head_json || postData.acf?.seo || {}
          
          setPost({
            ...postData,
            seo: seoData
          })
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

  // Extraer metadatos SEO mejorados
  const featuredImage = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const author = post?._embedded?.['author']?.[0]
  const categories = post?._embedded?.['wp:term']?.[0]
  const postExcerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, '') || ''
  const postTitle = post?.title?.rendered?.replace(/<[^>]+>/g, '') || ''
  const seoTitle = post?.seo?.title || postTitle
  const seoDescription = post?.seo?.description || postExcerpt
  const seoKeywords = post?.seo?.keywords || categories?.map(cat => cat.name).join(', ')

  // Estados de carga y error permanecen iguales
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

  // Datos estructurados mejorados para SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitle,
    image: featuredImage,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Person',
      name: author?.name,
      url: author?.link || undefined
    },
    publisher: {
      '@type': 'Organization',
      name: 'CloudHub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://team.cloudhub.cl/logo.png'
      }
    },
    description: seoDescription,
    articleBody: post.content.rendered.replace(/<[^>]+>/g, ''),
    keywords: seoKeywords,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://team.cloudhub.cl/pages/blog/${slug}`
    }
  }

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content={author?.name} />
        
        {/* Open Graph mejorado */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://team.cloudhub.cl/pages/blog/${slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.modified} />
        <meta property="article:author" content={author?.link || author?.name} />
        {categories?.map(cat => (
          <meta key={cat.id} property="article:section" content={cat.name} />
        ))}
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={featuredImage} />
        
        <link rel="canonical" href={`https://team.cloudhub.cl/pages/blog/${slug}`} />
      </Head>

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

<article itemScope itemType="https://schema.org/BlogPosting">
        <div className="min-h-screen bg-background text-foreground pt-24 px-4 md:px-8">
          <motion.div 
            className="inline-flex items-center text-primary hover:text-primary-light cursor-pointer mb-8 transition-colors"
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
              className="text-4xl md:text-5xl font-light tracking-wide mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
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
                className={`mb-8 ${wordPressStyles.image}`}
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
              className={wordPressStyles.content}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <motion.button 
                className={`flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ${
                  isLiked ? 'text-primary' : ''
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
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Ver comentarios"
              >
                <MessageSquare size={20} />
                <span>{post.comment_count || 0}</span>
              </motion.button>

              <motion.button 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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