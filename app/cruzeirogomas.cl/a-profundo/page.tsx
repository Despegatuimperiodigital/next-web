'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { ArrowUpRight, DollarSign, ShoppingCart, TrendingUp, Users, ArrowDown, ArrowUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { Tab, Tabs, Box, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F04132',
    },
    secondary: {
      main: '#0D2940',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
})

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const orderData = [
  { name: 'Google Orgánico', value: 1558, percentage: 13.28 },
  { name: 'Google Shopping', value: 747, percentage: 6.37 },
  { name: 'Directo', value: 9229, percentage: 78.66 },
  { name: 'Google.cl', value: 137, percentage: 1.17 },
  { name: 'Bing', value: 41, percentage: 0.35 },
  { name: 'Yahoo', value: 20, percentage: 0.17 },
]

const salesData = [
  { name: 'Google Orgánico', value: 25346814, percentage: 35.13 },
  { name: 'Google Shopping', value: 7935151, percentage: 11.00 },
  { name: 'Directo', value: 34232314, percentage: 47.45 },
  { name: 'Google.cl', value: 2394668, percentage: 3.32 },
  { name: 'Bing', value: 1737360, percentage: 2.41 },
  { name: 'Yahoo', value: 495994, percentage: 0.69 },
]

const channelAnalysis = [
  {
    name: 'Google Orgánico',
    pedidos: 1558,
    addToCart: { value: 1193, ctr: 12.58 },
    pendientes: { value: 9, tasa: 33.33 },
    abandonos: { value: 81, tasa: 2.47 },
    pagados: { value: 254, cvr: 1.57 },
    tasaConversionFinal: 17,
    aov: 99791,
  },
  {
    name: 'Google Shopping',
    pedidos: 747,
    addToCart: { value: 589, ctr: 55.69 },
    pendientes: { value: 9, tasa: 88.89 },
    abandonos: { value: 32, tasa: 56.25 },
    pagados: { value: 106, cvr: 18.87 },
    tasaConversionFinal: 15,
    aov: 74860,
  },
  {
    name: 'Directo',
    pedidos: 9229,
    addToCart: { value: 8896, ctr: 76.11 },
    pendientes: { value: 13, tasa: 61.54 },
    abandonos: { value: 61, tasa: 26.23 },
    pagados: { value: 241, cvr: 17.43 },
    tasaConversionFinal: 3,
    aov: 142043,
  },
]

const aovData = [
  { name: 'Bing', value: 157942 },
  { name: 'Directo', value: 142043 },
  { name: 'Google.cl', value: 114032 },
  { name: 'Google.com', value: 99791 },
  { name: 'Google Shopping', value: 74860 },
  { name: 'Yahoo', value: 61999 },
]

const conversionData = [
  { name: 'Yahoo', rate: 45 },
  { name: 'Bing', rate: 27 },
  { name: 'Google.com', rate: 17 },
  { name: 'Google.cl', rate: 16 },
  { name: 'Google Shopping', rate: 15 },
  { name: 'Directo', rate: 3 },
]

const abandonmentData = [
  { name: 'Yahoo', rate: 0 },
  { name: 'Google.com', rate: 2.47 },
  { name: 'Google.cl', rate: 25 },
  { name: 'Directo', rate: 26.23 },
  { name: 'Google Shopping', rate: 56.25 },
  { name: 'Bing', rate: 600 },
]

const COLORS = ['#F04132', '#0D2940', '#FC7965', '#00897b', '#43a047', '#7cb342']

const discrepancyData = [
  { name: 'Google Ads', conversions: 329.85, cost: 2800000, cpa: 8488, clicks: 28707 },
  { name: 'Analytics', conversions: 106, cost: 2800000, cpa: 26415, clicks: 28707 }
]

const funnelData = [
  { name: 'Clics → Visita', value: 28707 },
  { name: 'Visita → Cart', value: 589 },
  { name: 'Cart → Pendiente', value: 9 },
  { name: 'Pendiente → Pago', value: 106 }
]

const costAnalysisData = [
  { name: 'CPC', value: 97.5 },
  { name: 'CPL', value: 4753 },
  { name: 'CPA', value: 26415 }
]


export default function Component() {
  const [activeTab, setActiveTab] = useState('volume')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)
  }

  const renderKPI = (title: string, value: string, change: number) => (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold mb-2">{value}</p>
      <div className={`flex items-center ${change >= 0 ? 'text-green-500' : 'text-destructive'}`}>
        {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className="text-sm font-medium ml-1">{Math.abs(change)}%</span>
      </div>
    </div>
  )

  const renderChannelCard = (channel) => (
    <div key={channel.name} className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-semibold text-primary">{channel.name}</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">Pedidos</p>
            <p className="text-2xl font-bold">{channel.pedidos.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Add to Cart</p>
            <p className="text-lg font-semibold">{channel.addToCart.value.toLocaleString()}</p>
            <p className="text-sm text-accent">({channel.addToCart.ctr}% CTR)</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pagados</p>
            <p className="text-lg font-semibold">{channel.pagados.value}</p>
            <p className="text-sm text-accent">({channel.pagados.cvr}% CVR)</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tasa Conversión Final</p>
            <p className="text-lg font-semibold">{channel.tasaConversionFinal}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">AOV</p>
            <p className="text-lg font-semibold">{formatCurrency(channel.aov)}</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Tasa de Abandono</h4>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2"
              style={{ width: `${channel.abandonos.tasa}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{channel.abandonos.tasa}%</p>
        </div>
      </div>
    </div>
  )

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="p-6 bg-background min-h-screen"
      >
        <motion.h1 variants={fadeInUp} className="text-4xl font-bold mb-8 text-primary">
          Reporte de Ventas - Cruzeiro Gomas
        </motion.h1>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {renderKPI("Total Pedidos", "11,732", 5.2)}
          {renderKPI("Total Ventas", formatCurrency(72142301), 3.8)}
          {renderKPI("AOV", formatCurrency(6149), -1.5)}
          {renderKPI("Tasa de Conversión", "4.2%", 0.7)}
        </motion.div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} aria-label="sales report tabs">
            <Tab label="Volumen Total" value="volume" />
            <Tab label="Análisis por Canal" value="channel" />
            <Tab label="Análisis de Eficiencia" value="efficiency" />
            <Tab label="Oportunidades" value="opportunities" />
            <Tab label="Plan de Optimización" value="optimization" />
            <Tab label="Discrepancias" value="discrepancies" />
          </Tabs>
        </Box>

        {activeTab === 'volume' && (
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Total Pedidos</h3>
                <p className="text-sm text-muted-foreground">Distribución por canal</p>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    >
                      {orderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toLocaleString()} pedidos`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Total Ventas</h3>
                <p className="text-sm text-muted-foreground">Distribución por canal (CLP)</p>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    >
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'channel' && (
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {channelAnalysis.map(renderChannelCard)}
            </div>
            <div className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-semibold text-primary">Comparativa de Canales</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={channelAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="pedidos" name="Pedidos" fill="#F04132" />
                    <Bar yAxisId="right" dataKey="aov" name="AOV" fill="#0D2940" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'efficiency' && (
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden col-span-2">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Comparación de Métricas por Canal</h3>
              </div>
              <div className="p-4 h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...aovData, ...conversionData, ...abandonmentData]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#F04132" />
                    <YAxis yAxisId="right" orientation="right" stroke="#0D2940" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="value" name="AOV" fill="#F04132" />
                    <Bar yAxisId="right" dataKey="rate" name="Tasa de Conversión" fill="#0D2940" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Tasa de Abandono</h3>
              </div>
              <div className="p-4 h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={abandonmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#F04132" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'opportunities' && (
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Google Shopping</h3>
                <p className="text-sm text-muted-foreground">Oportunidad de mejora</p>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Tasa de abandono</span>
                    <span className="font-semibold text-destructive">56.25%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>AOV</span>
                    <span className="font-semibold text-accent">{formatCurrency(74860)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>CTR inicial</span>
                    <span className="font-semibold text-accent">55.69%</span>
                  </li>
                </ul>
                <p className="mt-4 font-semibold text-primary">Acción: Focus en reducción de abandono</p>
              </div>
            </div>
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Google Orgánico</h3>
                <p className="text-sm text-muted-foreground">Potencial de crecimiento</p>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Balance de métricas</span>
                    <span className="font-semibold text-green-500">Óptimo</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>AOV</span>
                    <span className="font-semibold text-green-500">{formatCurrency(99791)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Tasa de abandono</span>
                    <span className="font-semibold text-green-500">2.47%</span>
                  </li>
                </ul>
                <p className="mt-4 font-semibold text-primary">Acción: Escalar volumen</p>
              </div>
            </div>
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Tráfico Directo</h3>
                <p className="text-sm text-muted-foreground">Área de enfoque</p>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>AOV</span>
                    <span className="font-semibold text-green-500">{formatCurrency(142043)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Volumen de tráfico</span>
                    <span className="font-semibold text-green-500">78.66%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Tasa de conversión</span>
                    <span className="font-semibold text-destructive">3%</span>
                  </li>
                </ul>
                <p className="mt-4 font-semibold text-primary">Acción: Mejorar conversión</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'optimization' && (
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Prioridad Alta: Google Shopping</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowUpRight className="text-green-500 mr-2" />
                    <span>Reducir abandono 56.25% → 30%</span>
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="text-green-500 mr-2" />
                    <span>Aumentar AOV {formatCurrency(74860)} → {formatCurrency(90000)}</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="text-accent mr-2" />
                    <span>Mantener CTR &gt; 50%</span>
                  </li>
                </ul>
                <h4 className="font-semibold mt-4 mb-2">Tácticas:</h4>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>Remarketing abandonos</li>
                  <li>Precio mínimo productos</li>
                  <li>Optimización feed</li>
                </ul>
              </div>
            </div>
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Prioridad Media</h3>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">1. SEO (Google Orgánico):</h4>
                <ul className="space-y-2 pl-4 list-disc mb-4">
                  <li>Escalar tráfico +30%</li>
                  <li>Mantener CVR &gt; 15%</li>
                  <li>Mantener AOV &gt; {formatCurrency(95000)}</li>
                </ul>
                <h4 className="font-semibold mb-2">2. Directo:</h4>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>Mejorar CVR 3% → 5%</li>
                  <li>Mantener AOV &gt; {formatCurrency(140000)}</li>
                  <li>Reducir abandonos 26% → 15%</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'discrepancies' && (
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Discrepancias en Tracking</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {renderKPI("Diferencia en Conversiones", "-223.85", -211)}
                  {renderKPI("CPA Real vs Reportado", formatCurrency(26415), 211)}
                  {renderKPI("ROAS Real", "2.83x", 183)}
                  {renderKPI("Pedidos Reales", "106", -68)}
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Comparativa Google Ads vs Analytics</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={discrepancyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#F04132" />
                      <YAxis yAxisId="right" orientation="right" stroke="#0D2940" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="conversions" name="Conversiones" fill="#F04132" />
                      <Bar yAxisId="right" dataKey="cpa" name="CPA" fill="#0D2940" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Se detectó una discrepancia significativa en el tracking. Google Ads está sobre-reportando conversiones en un 211%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Análisis del Funnel</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={funnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#F04132" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-700">Visita → Cart</p>
                    <p className="text-2xl font-bold text-blue-900">2.05%</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-700">Cart → Pendiente</p>
                    <p className="text-2xl font-bold text-green-900">1.53%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-purple-700">Pendiente → Pago</p>
                    <p className="text-2xl font-bold text-purple-900">1,177%</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-red-700">CVR Final</p>
                    <p className="text-2xl font-bold text-red-900">0.37%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </ThemeProvider>
  )
}