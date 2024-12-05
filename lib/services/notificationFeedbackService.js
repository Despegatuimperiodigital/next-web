import { notifyFeedback } from '../services/emailService';

export async function sendFeedbackNotification(feedback, userEmail) {
  console.log('Datos del feedback recibido para notificación:', feedback);

  const { nombre, descripcion, link, imagen, fechaDeCreacion } = feedback;

  const fechaFormateada = new Date(fechaDeCreacion).toLocaleString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const message = {
    subject: 'Nuevo Feedback Recibido',
    text: `¡Nuevo feedback recibido!\n\nNombre: ${nombre}\nDescripción: "${descripcion}"\nLink: ${
      link || 'Sin link'
    }\nFecha de creación: ${fechaFormateada}\nImagen: ${
      imagen || 'Sin imagen'
    }`,
  };

  console.log('Enviando notificación de feedback...');
  await notifyFeedback(userEmail, message);
  console.log(
    'Notificación de feedback enviada exitosamente:',
    message.subject
  );
}
