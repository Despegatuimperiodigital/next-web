/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuraciones experimentales
  experimental: {
    optimizeCss: true,
    turbotrace: {
      logLevel: 'error',
      logDetail: true,
    },
  },

  // Mover serverComponentsExternalPackages a la raíz
  serverExternalPackages: ['puppeteer'],

  // Configuración de Webpack
  webpack: (config, { isServer, dev }) => {
    // No incluir puppeteer en el bundle del cliente
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        puppeteer: false,
      };
    }

    // Optimizaciones adicionales para producción
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    // Ignorar APIs específicas
    config.watchOptions = {
      ignored: [
        '**/app/api/leads/**',
        '**/app/api/task/**',
        '**/app/api/notifications/**',
        '**/node_modules/**',
        '**/.next/**',
      ],
      aggregateTimeout: 300,
      poll: 1000,
    };

    return config;
  },

  // Configuración de imágenes
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
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers corregidos
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=59',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cacheo específico para imágenes (sintaxis corregida)
      {
        source: '/:path*.(jpg|jpeg|gif|png|svg|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Configuración de compresión
  compress: true,

  // Configuración de powered by
  poweredByHeader: false,

  // Configuración de análisis de bundle
  productionBrowserSourceMaps: false,
};

export default nextConfig;