import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'Blog CloudHub';
export const size = {
  width: 1200,
  height: 630,
};
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #F33F31, #E77171)',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          CloudHub Blog
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#666',
          }}
        >
          Tecnología, Innovación y Estrategias Empresariales
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap')
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
        },
      ],
    }
  );
}