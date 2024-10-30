/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    },
    reactStrictMode: true,
    images: {
      domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com']
    }
  };
  
  export default nextConfig;