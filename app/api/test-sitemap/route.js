// app/api/test-sitemap/route.js
import { NextResponse } from 'next/server'
import { sitemap } from '../../sitemap'

export async function GET() {
  try {
    const sitemapData = await sitemap()
    return NextResponse.json({
      status: 'success',
      urls: sitemapData.length,
      data: sitemapData
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 })
  }
}