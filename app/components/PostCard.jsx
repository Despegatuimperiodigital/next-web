// components/PostCard.jsx
export function PostCard({ post }) {
    return (
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">
          {post.title.rendered}
        </h2>
        <div 
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <p className="text-sm text-gray-500 mt-2">
          Fecha: {new Date(post.date).toLocaleDateString()}
        </p>
      </div>
    );
  }