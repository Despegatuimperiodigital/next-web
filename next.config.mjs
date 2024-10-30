/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    domains: ['team.cloudhub.cl'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'team.cloudhub.cl',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'team.cloudhub.cl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
};

export default nextConfig;