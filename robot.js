export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: ['/', '/blog/'],
          disallow: ['/private/', '/admin/'],
        },
      ],
      sitemap: 'https://cloudhub.cl/sitemap.xml',
    }
  }