
export async function generateMetadata({ params }) {
    const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    const post = await fetch(
      `${WORDPRESS_API_URL}/wp/v2/posts?slug=${params.slug}&_embed=true`
    ).then(res => res.json())?.[0];
  
    if (!post) return {
      title: 'Post no encontrado',
      description: 'El artículo que buscas no está disponible'
    };
  
    const title = post.title.rendered.replace(/<[^>]+>/g, '');
    const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '');
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const author = post._embedded?.['author']?.[0]?.name;
  
    return {
      metadataBase: new URL('https://cloudhub.cl'),
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
      verification: {
        google: 'xTm8X8Wl0peczmk1oY0LBoMyw7eWc2Yu8C2Hwxp4Zcs',
      },
    };
  }
  
  export default function BlogPostLayout({ children }) {
    return children;
  }