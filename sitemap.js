export default async function sitemap() {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    
    // Obtener posts de WordPress
    const posts = await fetch(`${apiUrl}/wp/v2/posts?_embed`).then(res => res.json());
    
    const blogPosts = posts.map(post => ({
      url: `https://clouhub.cl/pages/blog/${post.slug}`,
      lastModified: new Date(post.modified).toISOString(),
    }));
  
    const routes = ['', '/blog'].map(route => ({
      url: `https://cloudhub.cl${route}`,
      lastModified: new Date().toISOString(),
    }));
  
    return [...routes, ...blogPosts];
  }