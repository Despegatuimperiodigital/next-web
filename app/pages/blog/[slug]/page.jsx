'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'

const STYLES = {
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
  image: 'rounded-lg overflow-hidden relative aspect-video object-cover',
  link: 'text-primary hover:text-primary-light transition-colors',
  list: 'list-disc pl-6 mb-6 text-foreground space-y-2',
  code: 'bg-muted p-4 rounded-lg overflow-x-auto mb-6 font-mono text-sm text-muted-foreground'
}

const BackButton = ({ onClick }) => (
  <motion.div 
    className="inline-flex items-center text-primary hover:text-primary-light cursor-pointer mb-8 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <ArrowLeft size={20} />
    <span className="ml-2">Volver al Blog</span>
  </motion.div>
)

const PostHeader = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const author = post._embedded?.['author']?.[0]
  const categories = post._embedded?.['wp:term']?.[0]

  return (
    <>
      <motion.h1 
        className="text-4xl md:text-5xl font-light tracking-wide mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        {author && (
          <span className="flex items-center gap-1">
            <User size={14} />
            <span>{author.name}</span>
          </span>
        )}
        {categories && categories.length > 0 && (
          <span className="flex items-center gap-1">
            <Tag size={14} />
            {categories.map((cat, index) => (
              <span key={cat.id}>
                {cat.name}{index < categories.length - 1 ? ', ' : ''}
              </span>
            ))}
          </span>
        )}
      </div>
    </>
  )
}

const PostContent = ({ post, styles }) => {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const postTitle = post.title.rendered.replace(/<[^>]+>/g, '')

  return (
    <>
      {featuredImage && (
        <motion.div 
          className={styles.image}
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
          />
        </motion.div>
      )}

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </>
  )
}

const PostActions = ({ isLiked, onLikeToggle, commentCount, onShare }) => (
  <div className="flex justify-between mt-12 pt-8 border-t border-border">
    <motion.button 
      className={`flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ${
        isLiked ? 'text-primary' : ''
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onLikeToggle}
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
      <span>{commentCount || 0}</span>
    </motion.button>

    <motion.button 
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onShare}
      aria-label="Compartir artículo"
    >
      <Share2 size={20} />
      <span>Compartir</span>
    </motion.button>
  </div>
)

export default function BlogPostPage({ params }) {
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { slug } = params

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) throw new Error('Slug no encontrado')
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/posts?slug=${slug}&_embed=true`
        )

        if (!response.ok) throw new Error(`Error: ${response.status}`)

        const [postData] = await response.json()
        if (!postData) throw new Error('Post no encontrado')

        setPost(postData)
      } catch (error) {
        console.error('Error:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title.rendered,
        text: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
        url: window.location.href
      })
    } catch (err) {
      console.log('Error al compartir:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button 
          onClick={() => router.back()}
          className="text-primary hover:text-primary-light"
        >
          Volver al Blog
        </button>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="mb-4">Post no encontrado</p>
        <button 
          onClick={() => router.back()}
          className="text-primary hover:text-primary-light"
        >
          Volver al Blog
        </button>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-background text-foreground pt-24 px-4 md:px-8">
      <BackButton onClick={() => router.back()} />
      
      <div className="max-w-4xl mx-auto">
        <PostHeader post={post} />
        <PostContent post={post} styles={STYLES} />
        <PostActions 
          isLiked={isLiked} 
          onLikeToggle={() => setIsLiked(!isLiked)}
          commentCount={post.comment_count}
          onShare={handleShare}
        />
      </div>
    </article>
  )
}

// Archivo separado: generateMetadata.js
export async function generateMetadata({ params }) {
  const post = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/posts?slug=${params.slug}&_embed=true`
  ).then(res => res.json())?.[0]

  if (!post) return {
    title: 'Post no encontrado',
    description: 'El artículo que buscas no está disponible'
  }

  const title = post.title.rendered.replace(/<[^>]+>/g, '')
  const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '')
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const author = post._embedded?.['author']?.[0]?.name

  return {
    title,
    description: excerpt,
    authors: [{ name: author }],
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [author],
      images: [featuredImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [featuredImage],
    },
  }
}