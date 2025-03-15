export default function robots() {
  return {
      rules: [
          {
              userAgent: '*',
              allow: '/',
              disallow: [
                  '/private/',
                  '/admin/',
                  '/*?*', // Prevent crawling of URL parameters
                  '/api/', // Protect API routes
                  '/*.json$', // Prevent crawling of JSON files
              ],
          },
      ],
      sitemap: 'https://cloudhub.cl/sitemap.xml',
      host: 'https://cloudhub.cl'
  }
}
