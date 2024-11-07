// app/api/analyze/route.js
import { NextResponse } from 'next/server';
import { ChilePerformanceAnalyzer } from '../../../lib/ChilePerformanceAnalyzer';



export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL es requerida' },
        { status: 400 }
      );
    }

    const analyzer = new ChilePerformanceAnalyzer();
    const results = await analyzer.analyzeUrl(url);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error en análisis:', error);
    return NextResponse.json(
      { 
        error: 'Error en el análisis',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}