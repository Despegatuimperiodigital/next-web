import { notifyComment } from '../services/emailService';
import Ticket from '../db/models/Ticket';

export async function sendCommentNotification(comment, assignedEmail) {
  try {
    if (!comment || !assignedEmail) {
      console.error('Parámetros de notificación inválidos');
      return;
    }
    console.log('Procesando notificación de comentario...');

    // Poblar datos del autor del comentario
    const populatedComment = await comment.populate({
      path: 'author',
      select: 'name email',
    });

    const ticket = await Ticket.findById(comment.ticket);

    if (!ticket) {
      console.error('Ticket no encontrado');
      return;
    }

    // Extraer datos con valores por defecto
    const authorName =
      populatedComment.author?.name ||
      populatedComment.author?.email ||
      'Desconocido';
    const content = populatedComment.content || 'Sin contenido';
    const ticketTitle = ticket.ticket.title || 'Sin título';

    // Construir el mensaje
    const message = {
      subject: `Nuevo comentario en la tarea: ${ticketTitle}`,
      text:
        `Se ha agregado un nuevo comentario en la tarea:\n\n` +
        `Título: ${ticketTitle}\n` +
        `Comentario: ${content}\n` +
        `Comentario realizado por: ${authorName}`,
    };

    // Enviar la notificación
    await notifyComment(assignedEmail, message);
    console.log(
      'Notificación de comentario enviada exitosamente:',
      message.subject
    );
  } catch (error) {
    console.error('Error al enviar la notificación de comentario:', error);
  }
}
