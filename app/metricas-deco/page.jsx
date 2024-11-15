'use client'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CalendarIcon, ChevronDownIcon, Calendar, Clock, Target, Palette, AlertTriangle, Zap } from 'lucide-react';
import Image from 'next/image';

// Custom components
const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, child => {
        if (child.type === TabsList || child.type === TabsContent) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ className, children, activeTab, setActiveTab }) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {React.Children.map(children, child => {
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, { 
            active: activeTab === child.props.value,
            onClick: () => setActiveTab(child.props.value)
          });
        }
        return child;
      })}
    </div>
  );
};

const TabsTrigger = ({ value, active, onClick, children }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white
        ${active 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted hover:bg-muted/80 '
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, activeTab, children }) => {
  if (value !== activeTab) return null;
  return <div>{children}</div>;
};

const Card = ({ className, children }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export default function BlackFridayDashboard() {
  const data = {
    "black_friday_2024": {
      "contexto_mercado": {
        "ecommerce_chile": {
          "penetracion": 0.15,
          "crecimiento_anual": 0.132,
          "peak_black_friday": 0.61,
          "mobile_share": 0.75
        }
      },
      "competencia": {
        "grandes_retailers": {
          "falabella": {
            "market_share": 0.25,
            "metricas": { "ctr": 0.021, "cpc": 280, "engagement": 0.032, "conv_rate": 0.028 }
          },
          "sodimac": {
            "market_share": 0.22,
            "metricas": { "ctr": 0.019, "cpc": 260, "engagement": 0.028, "conv_rate": 0.025 }
          },
          "easy": {
            "market_share": 0.18,
            "metricas": { "ctr": 0.017, "cpc": 240, "engagement": 0.025, "conv_rate": 0.022 }
          }
        },
        "pure_players": {
          "mobilehut": {
            "market_share": 0.05,
            "metricas": { "ctr": 0.023, "cpc": 320, "engagement": 0.041, "conv_rate": 0.031 }
          },
          "casa_ideal": {
            "market_share": 0.04,
            "metricas": { "ctr": 0.022, "cpc": 300, "engagement": 0.038, "conv_rate": 0.029 }
          }
        }
      },
      "presupuesto_detallado": {
        "total": 5000000,
        "fases": {
          "awareness": { "monto": 1750000 },
          "consideracion": { "monto": 2000000 },
          "conversion": { "monto": 1250000 }
        }
      },
      "benchmark_industria": {
        "roas_por_categoria": {
          "premium": { "mercado": 3.2, "campana": 4.5 },
          "media": { "mercado": 2.8, "campana": 3.8 },
          "basica": { "mercado": 2.5, "campana": 3.2 }
        },
        "cpm": {
          "mercado": { "promedio": 3750 },
          "campana": { "promedio": 3000 }
        },
        "cpc": {
          "mercado": { "promedio": 350 },
          "campana": { "promedio": 250 }
        },
        "ctr": {
          "mercado": 0.018,
          "campana": 0.024
        }
      },
      "proyeccion_horaria": {
        "metricas_por_hora": {
          "19-23": {
            "ventas": 0.45,
            "cpm": 3200,
            "cvr": 0.035
          }
        }
      }
    }
  };

  const { black_friday_2024: bf } = data;
  
  const competitorData = [
    ...Object.entries(bf.competencia.grandes_retailers).map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      marketShare: data.market_share * 100,
      ctr: data.metricas.ctr * 100,
      cpc: data.metricas.cpc,
      engagement: data.metricas.engagement * 100,
      convRate: data.metricas.conv_rate * 100
    })),
    ...Object.entries(bf.competencia.pure_players).map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      marketShare: data.market_share * 100,
      ctr: data.metricas.ctr * 100,
      cpc: data.metricas.cpc,
      engagement: data.metricas.engagement * 100,
      convRate: data.metricas.conv_rate * 100
    }))
  ];

  const budgetData = [
    { name: 'Awareness', value: bf.presupuesto_detallado.fases.awareness.monto },
    { name: 'Consideración', value: bf.presupuesto_detallado.fases.consideracion.monto },
    { name: 'Conversión', value: bf.presupuesto_detallado.fases.conversion.monto }
  ];

  const COLORS = ['#F04132', '#0D2940', '#FF9D76', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-background py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-background shadow-lg sm:rounded-3xl sm:p-20">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Black Friday 2024</h1>
              <div className="flex items-center ">
                <CalendarIcon className="mr-2" />
                <span>Noviembre 24-27, 2024</span>
                <ChevronDownIcon className="ml-2" />
              </div>
            </div>
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20simple%201-TYs9KHCsk5IX62o8pZCEAMpt8rguHH.png" alt="CloudHub Logo" width={150} height={50} />
          </header>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="plan">Plan de Implementación</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-card-foreground">eCommerce en Chile</h2>
                  <div className="space-y-2 text-card-foreground">
                    <p><span className="font-medium">Penetración:</span> {(bf.contexto_mercado.ecommerce_chile.penetracion * 100).toFixed(0)}%</p>
                    <p><span className="font-medium">Crecimiento anual:</span> {(bf.contexto_mercado.ecommerce_chile.crecimiento_anual * 100).toFixed(1)}%</p>
                    <p><span className="font-medium">Peak Black Friday:</span> {(bf.contexto_mercado.ecommerce_chile.peak_black_friday * 100).toFixed(0)}%</p>
                    <p><span className="font-medium">Mobile share:</span> {(bf.contexto_mercado.ecommerce_chile.mobile_share * 100).toFixed(0)}%</p>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-card-foreground">Presupuesto Total</h2>
                  <p className="text-3xl font-bold text-primary">${bf.presupuesto_detallado.total.toLocaleString()}</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={budgetData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {budgetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-card-foreground">Métricas Clave</h2>
                  <div className="space-y-2 text-card-foreground">
                    <p><span className="font-medium">CPM promedio:</span> ${bf.benchmark_industria.cpm.campana.promedio.toLocaleString()}</p>
                    <p><span className="font-medium">CPC promedio:</span> ${bf.benchmark_industria.cpc.campana.promedio}</p>
                    <p><span className="font-medium">CTR campaña:</span> {(bf.benchmark_industria.ctr.campana * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 bg-card p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Comparación de Competidores</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#F04132" />
                    <YAxis yAxisId="right" orientation="right" stroke="#0D2940" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="marketShare" fill="#F04132" name="Cuota de mercado (%)" />
                    <Bar yAxisId="right" dataKey="ctr" fill="#0D2940" name="CTR (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-card-foreground">Benchmark de la Industria</h2>
                  <div className="space-y-2 text-card-foreground">
                    <p><span className="font-medium">CPM Mercado:</span> ${bf.benchmark_industria.cpm.mercado.promedio} vs <span className="text-primary">${bf.benchmark_industria.cpm.campana.promedio} (campaña)</span></p>
                    <p><span className="font-medium">CPC Mercado:</span> ${bf.benchmark_industria.cpc.mercado.promedio} vs <span className="text-primary">${bf.benchmark_industria.cpc.campana.promedio} (campaña)</span></p>
                    <p><span className="font-medium">CTR Mercado:</span> {(bf.benchmark_industria.ctr.mercado * 100).toFixed(1)}% vs <span className="text-primary">{(bf.benchmark_industria.ctr.campana * 100).toFixed(1)}% (campaña)</span></p>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-card-foreground">Proyección Horaria</h2>
                  <div className="space-y-2 text-card-foreground">
                    <p><span className="font-medium">Peak de ventas:</span> 19:00 - 23:00 ({(bf.proyeccion_horaria.metricas_por_hora['19-23'].ventas * 100).toFixed(0)}% de ventas)</p>
                    
                    {/* Continuación desde el último div */}
                    <p><span className="font-medium">Mejor CVR:</span> {(bf.proyeccion_horaria.metricas_por_hora['19-23'].cvr * 100).toFixed(1)}% (19:00 - 23:00)</p>
                    <p><span className="font-medium">CPM más alto:</span> ${bf.proyeccion_horaria.metricas_por_hora['19-23'].cpm} (19:00 - 23:00)</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">ROAS por Categoría</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h3 className="font-medium text-card-foreground">Premium</h3>
                    <p className="text-2xl font-bold text-primary">{bf.benchmark_industria.roas_por_categoria.premium.campana}</p>
                    <p className="text-sm ">vs {bf.benchmark_industria.roas_por_categoria.premium.mercado} mercado</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-card-foreground">Media</h3>
                    <p className="text-2xl font-bold text-primary">{bf.benchmark_industria.roas_por_categoria.media.campana}</p>
                    <p className="text-sm ">vs {bf.benchmark_industria.roas_por_categoria.media.mercado} mercado</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-card-foreground">Básica</h3>
                    <p className="text-2xl font-bold text-primary">{bf.benchmark_industria.roas_por_categoria.basica.campana}</p>
                    <p className="text-sm ">vs {bf.benchmark_industria.roas_por_categoria.basica.mercado} mercado</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="plan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary"/>
                      <CardTitle>Timeline Crítico</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4">
                        <p className="font-semibold">1-7 Nov: Setup Técnico</p>
                        <p className="text-sm ">Implementación pixel, eventos, test conversiones</p>
                      </div>
                      <div className="border-l-2 border-primary pl-4">
                        <p className="font-semibold">8-14 Nov: Creatividades</p>
                        <p className="text-sm ">Producción assets, copy testing, landing pages</p>
                      </div>
                      <div className="border-l-2 border-primary pl-4">
                        <p className="font-semibold">15-21 Nov: Campañas</p>
                        <p className="text-sm ">Prospección, remarketing, automatizaciones</p>
                      </div>
                      <div className="border-l-2 border-primary pl-4">
                        <p className="font-semibold">22-28 Nov: Pre-Black</p>
                        <p className="text-sm ">Escalado gradual, A/B testing, ajuste pujas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary"/>
                      <CardTitle>Objetivos por Fase</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-primary">Awareness</p>
                        <p className="text-sm">Alcance: 250,000 | CTR: 2.2% | CPM: $2,800</p>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">Consideración</p>
                        <p className="text-sm">Clicks: 9,090 | CPC: $220 | Páginas/sesión: 2.5</p>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">Conversión</p>
                        <p className="text-sm">CAC: $15,000 | Conversiones: 83 | ROAS: 4.2x</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Palette className="h-5 w-5 text-primary"/>
                      <CardTitle>Creatividades Requeridas</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-3 rounded-lg shadow-md">
                        <p className="font-medium text-primary ">Estáticos</p>
                        <ul className="text-sm space-y-1 mt-2 text-white  ">
                          <li>• Feed 1:1</li>
                          <li>• Stories 9:16</li>
                          <li>• In-feed 4:5</li>
                          <li>• Landscape 1.91:1</li>
                        </ul>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="font-medium text-primary">Dinámicos</p>
                        <ul className="text-sm space-y-1 mt-2 text-white">
                          <li>• Carrusel productos</li>
                          <li>• Collection ads</li>
                          <li>• Dynamic ads</li>
                          <li>• Stories ads</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-primary"/>
                      <CardTitle>Plan de Contingencia</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-red-500">Bajo Rendimiento</p>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>• Activar ofertas flash</li>
                          <li>• Rotar creatividades</li>
                          <li>• Ampliar audiences</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-green-500">Alto Rendimiento</p>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>• Escalar budgets</li>
                          <li>• Expandir lookalikes</li>
                          <li>• Cross-selling bundles</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-primary"/>
                      <CardTitle>Quick Wins</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-white">
                      {['Dynamic catalogs', 'Social proof badges', 'UGC integration', 'Mobile optimization', 'Loading speed < 2s'].map((win, index) => (
                        <div key={index} className="bg-muted p-3 rounded-lg text-center">
                          <p className="text-sm font-medium">{win}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}