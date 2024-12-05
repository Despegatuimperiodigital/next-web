import Feedback from '../../../lib/db/models/Feedback';
import { connect } from '../../../lib/db/connect';
import { sendFeedbackNotification } from '../../../lib/services/notificationFeedbackService';
import { getToken } from 'next-auth/jwt';
import { handleImageUpload } from '../../../lib/services/imageUpload';

export async function POST(request) {
  try {
    await connect();

    const token = await getToken({ req: request });
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Usuario no autenticado' }),
        { status: 401 }
      );
    }

    const userEmail = token.email;
    console.log('Correo del usuario autenticado:', userEmail);

    //Obtener datos ddel formulario
    const formData = await request.formData();
    const nombre = formData.get('nombre');
    const descripcion = formData.get('descripcion');
    const link = formData.get('link');
    const image = formData.get('image');

    console.log('Form Data:', formData);

    if (!nombre || !descripcion) {
      return new Response('Nombre y descripción son requeridos', {
        status: 400,
      });
    }

    const imagenUrl = await handleImageUpload(image);
    const fechaDeCreacion = new Date();

    // Crear y guardar feedback
    const newFeedback = new Feedback({
      nombre,
      fechaDeCreacion,
      link,
      descripcion,
      imagen: imagenUrl,
    });

    await newFeedback.save();

    // Enviar notificación
    try {
      await sendFeedbackNotification(newFeedback, userEmail);
      console.log('Notificación enviada exitosamente.');
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }

    // Retornar el feedback creado como respuesta
    return new Response(JSON.stringify(newFeedback), { status: 201 });
  } catch (error) {
    console.error('Error en la creación de feedback:', error);
    return new Response('Error al crear feedback', { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connect();
    console.log('Conexión a la base de datos establecida correctamente');
    const { page = 1, limit = 10 } = req.nextUrl.searchParams;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const feedbacks = await Feedback.find().skip(skip).limit(parseInt(limit));
    const totalFeedbacks = await Feedback.countDocuments();

    return new Response(
      JSON.stringify({
        page: parseInt(page),
        limit: parseInt(limit),
        totalFeedbacks,
        feedbacks,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error al obtener feedbacks' }),
      { status: 500 }
    );
  }
}
