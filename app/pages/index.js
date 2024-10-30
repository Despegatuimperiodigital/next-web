// pages/index.js
import { useEffect } from 'react';

export default function Home({ posts }) {
  useEffect(() => {
    console.log('Posts cargados:', posts); // Para debugging
  }, [posts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Posts</h1>
      
      {/* Mensaje de debugging */}
      <div className="bg-gray-100 p-4 mb-4 rounded">
        <p>Número de posts cargados: {posts?.length || 0}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts?.map(post => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              {post.title.rendered}
            </h2>
            <div 
              className="mt-2"
              dangerouslySetInnerHTML={{ 
                __html: post.excerpt.rendered 
              }}
            />
            <p className="text-sm text-gray-500 mt-2">
              Fecha: {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    // Log para debugging
    console.log('Fetching from:', process.env.WORDPRESS_API_URL);

    const res = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp/v2/posts`
    );
    const posts = await res.json();

    // Más logs para debugging
    console.log('Posts fetched successfully:', posts.length);

    return {
      props: {
        posts,
      },
      revalidate: 10, // Revalidar cada 10 segundos en desarrollo
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}