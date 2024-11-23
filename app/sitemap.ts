export default async function sitemap() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  // Fetch posts from WordPress
  const posts = await fetch(`${apiUrl}/wp/v2/posts?_embed&per_page=100`, {
      next: { revalidate: 3600 } // Revalidate every hour
  }).then(res => res.json());
  
  // Generate blog post URLs
  const blogPosts = posts.map(post => ({
      url: `https://cloudhub.cl/blog/${post.slug}`,
      lastModified: new Date(post.modified).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7
  }));

  // Static routes with priorities
  const routes = [
      {
          url: 'https://cloudhub.cl',
          lastModified: new Date().toISOString(),
          changeFrequency: 'daily',
          priority: 1.0
      },
      {
          url: 'https://cloudhub.cl/blog',
          lastModified: new Date().toISOString(),
          changeFrequency: 'daily',
          priority: 0.8
      }
  ];

  return [...routes, ...blogPosts];
}
