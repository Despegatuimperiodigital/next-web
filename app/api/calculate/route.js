// app/api/calculate/route.js
export async function POST(req) {
    try {
      const data = await req.json()
      const { monthlyRevenue, loadTime, adSpend } = data
  
      // Validaciones básicas
      if (!monthlyRevenue || !loadTime) {
        return Response.json(
          { error: 'Faltan datos requeridos' },
          { status: 400 }
        )
      }
  
      // Cálculos
      const calculations = {
        revenueLoss: calculateRevenueLoss(monthlyRevenue, loadTime),
        adWaste: calculateAdWaste(adSpend, loadTime),
        monthlyTotal: 0,
        yearlyTotal: 0,
        potentialGain: 0
      }
  
      calculations.monthlyTotal = calculations.revenueLoss + calculations.adWaste
      calculations.yearlyTotal = calculations.monthlyTotal * 12
      calculations.potentialGain = calculations.monthlyTotal * 0.8 * 12
  
      return Response.json(calculations)
    } catch (error) {
      console.error('Error en cálculo:', error)
      return Response.json(
        { error: 'Error en el cálculo' },
        { status: 500 }
      )
    }
  }
  
  // Funciones auxiliares
  function calculateRevenueLoss(revenue, loadTime) {
    const baselineTime = 2
    const lossPerSecond = 0.07
    
    if (loadTime <= baselineTime) return 0
    
    const excessSeconds = loadTime - baselineTime
    const totalLossPercentage = excessSeconds * lossPerSecond
    return Number(revenue) * totalLossPercentage
  }
  
  function calculateAdWaste(adSpend, loadTime) {
    const wastePercentage = Math.min(0.9, (loadTime / 10))
    return Number(adSpend) * wastePercentage
  }