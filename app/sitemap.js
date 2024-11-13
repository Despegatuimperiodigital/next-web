/ app/sitemap.js
import { cache } from 'react'

// Función para obtener posts con caché
const getPosts = cache(async () => {
  const posts = await fetch('https://team.cloudhub.cl/wp-json/wp/v2/posts?_fields=slug,modified', {
    next: { revalidate: 3600 } // Revalidar cada hora
  })
    .then((res) => res.json())
    .catch(() => [])
  return posts
})

// Función para obtener páginas con caché
const getPages = cache(async () => {
  const pages = await fetch('https://team.cloudhub.cl/wp-json/wp/v2/pages?_fields=slug,modified', {
    next: { revalidate: 3600 } // Revalidar cada hora
  })
    .then((res) => res.json())
    .catch(() => [])
  return pages
})

export default async function sitemap() {
  const [posts, pages] = await Promise.all([
    getPosts(),
    getPages()
  ])

  // Rutas estáticas
  const routes = ['', '/blog', '/about', '/contact'].map((route) => ({
    url: `https://cloudhub.cl${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1.0,
  }))

  // Entradas del blog
  const postEntries = posts.map((post) => ({
    url: `https://cloudhub.cl/blog/${post.slug}`,
    lastModified: post.modified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Páginas
  const pageEntries = pages.map((page) => ({
    url: `https://cloudhub.cl/${page.slug}`,
    lastModified: page.modified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...routes, ...postEntries, ...pageEntries]
}