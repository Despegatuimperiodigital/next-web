'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export const metadata = {
  title: 'Blog - CloudHub',
  description: 'Explora nuestros últimos artículos sobre tecnología, innovación y estrategias empresariales.',
  openGraph: {
    title: 'Blog - CloudHub',
    description: 'Explora nuestros últimos artículos sobre tecnología, innovación y estrategias empresariales.',
    type: 'website',
    url: 'https://cloudhub.cl/pages/blog',
  },
};


export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const handlePostClick = (slug) => {
    router.push(`pages/blog/${slug}`)
    console.log(slug)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/wp/v2/posts?_embed`);
        
        if (!response.ok) {
          throw new Error('Error al obtener los posts');
        }
        const data = await response.json();
        setBlogPosts(data);
        setLoading(false);
        console.log('Posts de WordPress:', data);
      } catch (err) {
        console.error('Error al obtener los posts:', err);
        setError('No se pudieron cargar los posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  const getImageUrl = (post) => {
    if (post._embedded && 
        post._embedded['wp:featuredmedia'] && 
        post._embedded['wp:featuredmedia'][0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return '/placeholder-image.jpg'; // Asegúrate de tener una imagen por defecto en public/
  };

  const getAuthor = (post) => {
    if (post._embedded && 
        post._embedded.author && 
        post._embedded.author[0]?.name) {
      return post._embedded.author[0].name;
    }
    return 'Autor Desconocido';
  };

  const getCategories = (post) => {
    if (post._embedded && 
        post._embedded['wp:term'] && 
        post._embedded['wp:term'][0]) {
      return post._embedded['wp:term'][0].map(cat => cat.name).join(', ');
    }
    return 'Sin categoría';
  };

  if (loading) {
    return <p className="text-center py-8 text-gray-400">Cargando posts...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-400">{error}</p>;
  }

  return (
    <section className="py-24 px-8 bg-gray-950 text-gray-200">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl text-center mb-4 font-light tracking-wide bg-gradient-to-r from-red-500 to-red-400 text-transparent bg-clip-text">
          Nuestro Blog
        </h2>
        
        <p className="text-center max-w-2xl mx-auto mb-12 text-lg text-gray-400">
          Explore nuestros últimos artículos sobre tecnología, innovación y estrategias empresariales.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              className="bg-gray-900/30 rounded-3xl overflow-hidden border border-white/10 cursor-pointer 
                        hover:bg-white/5 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handlePostClick(post.slug)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={getImageUrl(post)}
                  alt={post.title.rendered}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}>
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {getAuthor(post)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={14} />
                    {getCategories(post)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}