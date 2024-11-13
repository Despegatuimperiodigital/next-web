
import puppeteer from "puppeteer";
import fetch from "node-fetch";

export class ChilePerformanceAnalyzer {
  constructor() {
    this.isps = {
      VTR: { latency: 50, speed: 500 },
      Movistar: { latency: 60, speed: 450 },
      Entel: { latency: 55, speed: 480 },
      GTD: { latency: 45, speed: 520 }
    };
    
    this.browserOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    };
}
  async analyzeUrl(url) {
    console.log(`Iniciando análisis para: ${url}`);
    let browser;
    
    try {
      browser = await puppeteer.launch(this.browserOptions);
      
      const performanceMetrics = await this.getPerformanceMetrics(browser, url);
      const resourceMetrics = await this.getResourceMetrics(browser, url);
      const serverResponse = await this.checkServerResponse(url);

      return this.processResults(url, {
        performance: performanceMetrics,
        resources: resourceMetrics,
        server: serverResponse
      });
    } catch (error) {
      console.error("Error en análisis:", error);
      throw error;
    } finally {
      if (browser) {
        await browser.close().catch(console.error);
      }
    }
}
  async getPerformanceMetrics(browser, url) {
    const page = await browser.newPage();
    try {
      // Configurar CDP Session para métricas
      const client = await page.createCDPSession();
      await client.send("Performance.enable");

      // Simular conexión chilena usando CDP
      await client.send('Network.enable');
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 50, // milisegundos
        downloadThroughput: (500 * 1024 * 1024) / 8, // 500 Mbps en bytes/s
        uploadThroughput: (100 * 1024 * 1024) / 8 // 100 Mbps en bytes/s
      });

      // Recolectar métricas
      const metrics = {};
      page.on("metrics", ({ metrics: pageMetrics }) => {
        metrics.TTI = pageMetrics.TaskDuration;
        metrics.FCP = pageMetrics.FirstContentfulPaint;
        metrics.LCP = pageMetrics.LargestContentfulPaint;
      });

      const navigationStart = Date.now();
      const response = await page.goto(url, { 
        waitUntil: "networkidle0",
        timeout: 30000
      });


      metrics.loadTime = Date.now() - navigationStart;
      metrics.statusCode = response.status();

      // Core Web Vitals
      const performanceMetrics = await page.evaluate(() => {
        const navEntry = performance.getEntriesByType("navigation")[0];
        const paintEntries = performance.getEntriesByType("paint");
        const lcpEntry = performance.getEntriesByType("largest-contentful-paint")[0];
        
        return {
          TTFB: navEntry.responseStart - navEntry.requestStart,
          FCP: paintEntries.find(entry => entry.name === "first-contentful-paint")?.startTime,
          LCP: lcpEntry?.startTime,
          CLS: performance.getEntriesByType("layout-shift")
            .reduce((sum, shift) => sum + shift.value, 0),
        };
      });

      return { ...metrics, ...performanceMetrics };
    } finally {
      await page.close();
    }
  }

  async getResourceMetrics(browser, url) {
    const page = await browser.newPage();
    try {
      let resources = {
        total: { size: 0, count: 0 },
        byType: {
          document: { size: 0, count: 0 },
          stylesheet: { size: 0, count: 0 },
          image: { size: 0, count: 0 },
          script: { size: 0, count: 0 },
          font: { size: 0, count: 0 },
          other: { size: 0, count: 0 }
        }
      };

      // Interceptar requests
      await page.setRequestInterception(true);
      
      page.on("request", request => {
        resources.total.count++;
        const type = request.resourceType();
        if (resources.byType[type]) {
          resources.byType[type].count++;
        }
        request.continue();
      });

      page.on("response", async response => {
        const type = response.request().resourceType();
        const contentLength = response.headers()["content-length"];
        
        if (contentLength) {
          const size = parseInt(contentLength, 10);
          resources.total.size += size;
          if (resources.byType[type]) {
            resources.byType[type].size += size;
          }
        }
      });

      await page.goto(url, { 
        waitUntil: "networkidle0",
        timeout: 30000
      });

      return resources;
    } finally {
      await page.close();
    }
  }

  async checkServerResponse(url) {
    const results = {};
    
    for (const [isp, config] of Object.entries(this.isps)) {
      try {
        const start = Date.now();
        const response = await fetch(url, {
          headers: {
            "User-Agent": "CloudHub-Performance-Analyzer/1.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Accept-Encoding": "gzip, deflate, br",
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          },
          timeout: 10000
        });

        const ttfb = Date.now() - start;

        results[isp] = {
          status: response.status,
          ttfb,
          headers: {
            server: response.headers.get("server"),
            "content-type": response.headers.get("content-type"),
            "cache-control": response.headers.get("cache-control"),
            "content-encoding": response.headers.get("content-encoding")
          },
          simulated: {
            latency: config.latency,
            speed: config.speed
          }
        };
      } catch (error) {
        results[isp] = { 
          error: error.message,
          simulated: config
        };
      }
    }

    return results;
  }

  processResults(url, data) {
    const { performance, resources, server } = data;

    return {
      url,
      timestamp: new Date().toISOString(),
      summary: {
        performanceScore: this.calculatePerformanceScore(performance),
        loadTime: performance.loadTime,
        ttfb: performance.TTFB,
        resourceSize: this.formatBytes(resources.total.size)
      },
      metrics: {
        core: {
          fcp: performance.FCP,
          lcp: performance.LCP,
          cls: performance.CLS,
          tti: performance.TTI
        },
        resources: {
          total: resources.total,
          byType: resources.byType
        },
        server: this.processServerMetrics(server)
      },
      recommendations: this.generateRecommendations(data)
    };
  }

  calculatePerformanceScore(metrics) {
    const weights = {
      LCP: 0.25,
      FCP: 0.25,
      CLS: 0.25,
      TTI: 0.25
    };

    let score = 0;
    
    // LCP Score (ideal < 2.5s)
    score += weights.LCP * (metrics.LCP < 2500 ? 1 : metrics.LCP < 4000 ? 0.5 : 0);
    
    // FCP Score (ideal < 1.8s)
    score += weights.FCP * (metrics.FCP < 1800 ? 1 : metrics.FCP < 3000 ? 0.5 : 0);
    
    // CLS Score (ideal < 0.1)
    score += weights.CLS * (metrics.CLS < 0.1 ? 1 : metrics.CLS < 0.25 ? 0.5 : 0);
    
    // TTI Score (ideal < 3.8s)
    score += weights.TTI * (metrics.TTI < 3800 ? 1 : metrics.TTI < 7500 ? 0.5 : 0);

    return Math.round(score * 100);
  }

  processServerMetrics(serverData) {
    const processed = {};
    for (const [isp, data] of Object.entries(serverData)) {
      if (data.error) {
        processed[isp] = {
          error: data.error,
          simulated: data.simulated
        };
        continue;
      }
      
      processed[isp] = {
        responseTime: data.ttfb,
        status: data.status,
        caching: this.analyzeCaching(data.headers["cache-control"]),
        compression: this.analyzeCompression(data.headers),
        simulated: data.simulated
      };
    }
    return processed;
  }

  generateRecommendations(data) {
    const recommendations = [];
    const { performance, resources, server } = data;

    // Rendimiento
    if (performance.LCP > 2500) {
      recommendations.push({
        priority: "alta",
        category: "performance",
        issue: "Largest Contentful Paint alto",
        description: "El contenido principal tarda demasiado en cargar",
        solution: "Optimizar imágenes y recursos críticos, considerar un CDN en Chile",
        impact: "Mejora significativa en la experiencia del usuario y SEO"
      });
    }

    // Recursos
    if (resources.total.size > 3000000) {
      recommendations.push({
        priority: "media",
        category: "resources",
        issue: "Peso total de página excesivo",
        description: `La página pesa ${this.formatBytes(resources.total.size)}`,
        solution: "Comprimir recursos, optimizar imágenes y minimizar CSS/JS",
        impact: "Reducción en tiempo de carga y consumo de datos"
      });
    }

    // Imágenes
    const imageSize = resources.byType.image?.size || 0;
    if (imageSize > 1000000) {
      recommendations.push({
        priority: "media",
        category: "images",
        issue: "Imágenes pesadas",
        description: `Las imágenes pesan ${this.formatBytes(imageSize)}`,
        solution: "Optimizar imágenes, usar formatos modernos (WebP), implementar lazy loading",
        impact: "Mejor rendimiento y menor consumo de ancho de banda"
      });
    }

    // Servidor
    const avgTTFB = Object.values(server)
      .filter(s => s.ttfb)
      .reduce((sum, s) => sum + s.ttfb, 0) / 
      Object.values(server).filter(s => s.ttfb).length;

    if (avgTTFB > 200) {
      recommendations.push({
        priority: "alta",
        category: "server",
        issue: "Tiempo de respuesta del servidor alto",
        description: `TTFB promedio: ${Math.round(avgTTFB)}ms`,
        solution: "Considerar hosting en Chile o CDN local",
        impact: "Mejora en tiempo de respuesta inicial"
      });
    }

    return recommendations;
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  analyzeCaching(cacheControl) {
    if (!cacheControl) return "no-cache";
    
    if (cacheControl.includes("no-cache") || cacheControl.includes("no-store")) {
      return "no-cache";
    }
    
    const maxAge = cacheControl.match(/max-age=(\d+)/);
    if (maxAge) {
      const seconds = parseInt(maxAge[1], 10);
      return seconds < 3600 ? "short" : seconds < 86400 ? "medium" : "long";
    }
    
    return "undefined";
  }

  analyzeCompression(headers) {
    const encoding = headers["content-encoding"];
    return encoding ? encoding : "none";
  }
}

