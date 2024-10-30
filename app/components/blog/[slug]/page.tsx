// app/blog/[slug]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../ui/button'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/posts?slug=${params.slug}&_embed`
        )
        if (!response.ok) throw new Error('Post no encontrado')
        const posts = await response.json()
        if (posts.length === 0) throw new Error('Post no encontrado')
        setPost(posts[0])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.back()}>Volver al Blog</Button>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.button
        className="flex items-center text-primary mb-8"
        onClick={() => router.back()}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft className="mr-2" />
        Volver al Blog
      </motion.button>

      <article className="max-w-4xl mx-auto">
        <h1 
          className="text-4xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {post._embedded?.['wp:featuredmedia']?.[0] && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  )
}