// app/api/leads/route.js
import { MongoClient } from 'mongodb';

// Configura la conexión a MongoDB
const mongoUrl = 'mongodb+srv://fcorreak:tdKfjB4tu7gzYpQH@searchai.prkjhxy.mongodb.net/?retryWrites=true&w=majority&appName=sear';
const mongoClient = new MongoClient(mongoUrl);

export async function POST(req) {
  try {
    const { leadData, results } = await req.json();

    // Validar datos
    const errors = validateLeadForm();
    if (Object.keys(errors).length > 0) {
      return Response.json(
        { errors },
        { status: 400 }
      );
    }

    // Conectar a MongoDB
    await mongoClient.connect();
    const db = mongoClient.db('cloudhub');
    const leadsCollection = db.collection('leads');

    // Guardar el lead y el reporte en MongoDB
    const lead = await leadsCollection.insertOne({
      ...leadData,
      results: {
        executiveSummary: leadData.executiveSummary,
        salesLosses: leadData.salesLosses,
        adWaste: leadData.adWaste,
        seoImpact: leadData.seoImpact,
        recommendedActions: leadData.recommendedActions,
        competitiveAnalysis: leadData.competitiveAnalysis,
        financialProjections: leadData.financialProjections,
        nextSteps: leadData.nextSteps,
        guaranteesAndSupport: leadData.guaranteesAndSupport,
        appendices: leadData.appendices
      },
      createdAt: new Date()
    });

    // Cerrar la conexión a MongoDB
    await mongoClient.close();

    return Response.json({
      success: true,
      message: 'Lead y reporte procesados correctamente'
    });
  } catch (error) {
    console.error('Error procesando lead:', error);
    return Response.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}

function formatMoney(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(amount);
}