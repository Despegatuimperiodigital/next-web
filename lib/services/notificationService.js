import {
  notifyAssignment,
  notifyComment,
  notifyFeedback,
} from './emailService';
import User from '../db/models/User';
import Comment from '../db/models/Comment';
import Ticket from '../db/models/Ticket';

export async function sendNotification(
  ticket,
  assignedEmail,
  author,
  notificationType,
  comment,
  feedbackData
) {
  try {
    console.log('Tipo de notificación recibido:', notificationType);
    let message;
    const ticketData = ticket.ticket || ticket;

    // Obtener nombre del autor
    const authorUser = ticket.createdBy
      ? await User.findById(ticket.createdBy)
      : null;
    const authorName = authorUser?.name || 'Desconocido';

    switch (notificationType) {
      case 'creation':
        message = {
          subject: `Nueva tarea asignada: ${ticketData.title || 'Sin título'}`,
          text: `Se te ha asignado una nueva tarea:\n\nTítulo: ${
            ticketData.title || 'No especificado'
          }\nDescripción: ${
            ticketData.description || 'Sin descripción'
          }\nPrioridad: ${
            ticketData.priority || 'No definida'
          }\nAsignado por: ${authorName}.`,
        };
        await notifyAssignment(assignedEmail, message);
        break;

      case 'update':
        message = {
          subject: `Tarea actualizada: ${ticketData.title}`,
          text: `La tarea asignada se ha actualizado:\n\nTítulo: ${ticketData.title}\nDescripción: ${ticketData.description}\nPrioridad: ${ticketData.priority}\nActualizado por: ${authorName}.`,
        };
        await notifyAssignment(assignedEmail, message);
        break;

      case 'closure':
        message = {
          subject: `Tarea cerrada: ${ticketData.title}`,
          text: `La tarea asignada ha sido cerrada:\n\nTítulo: ${ticketData.title}\nCerrado por: ${authorName}.`,
        };
        await notifyAssignment(assignedEmail, message);
        break;

      case 'reassignment':
        message = {
          subject: `Tarea reasignada: ${ticketData.title}`,
          text: `La tarea ha sido reasignada:\n\nTítulo: ${ticketData.title}\nDescripción: ${ticketData.description}\nPrioridad: ${ticketData.priority}\nReasignada por: ${authorName}.`,
        };
        await notifyAssignment(assignedEmail, message);
        break;

      case 'comment_creation':
        console.log('Tipo de notificación recibido: comment_creation');
        console.log('Comentario recibido:', comment);

        if (!comment || !comment._id || !comment.ticket) {
          console.error('Comentario no válido:', comment);
          return;
        }

        // Obtener los datos del comentario
        const commentContent = comment.content || 'Sin contenido';
        const commentAuthorName =
          comment.author?.name || comment.author?.email || 'Desconocido';
        const ticketId = comment.ticket;

        console.log('ID del ticket:', ticketId);
        console.log('Contenido del comentario:', commentContent);
        console.log('Autor del comentario:', commentAuthorName);

        message = {
          subject: `Nuevo comentario en la tarea: ${ticketData.title}`,
          text: `Se ha agregado un nuevo comentario en la tarea:\n\nTítulo: ${ticketData.title}\nComentario: ${commentContent}\nComentario realizado por: ${commentAuthorName}`,
        };

        await notifyComment(assignedEmail, message);

        console.log('Notificación enviada exitosamente:', message.subject);
        break;

      case 'feedback_creation':
        console.log('Tipo de notificación recibido: feedback_creation');
        console.log('Datos del feedback recibido:', feedbackData);

        if (!feedbackData) {
          console.error('Datos de feedback no válidos:', feedbackData);
          return;
        }

        const { nombre, descripcion, link, imagen, fechaDeCreacion } =
          feedbackData;

        const fechaFormateada = new Date(fechaDeCreacion).toLocaleString(
          'es-CL',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        );

        message = {
          subject: 'Nuevo Feedback Recibido',
          text: `¡Nuevo feedback recibido!\n\nNombre: ${nombre}\nDescripción: "${descripcion}"\nLink: ${
            link || 'Sin link'
          }\nFecha de creación: ${fechaFormateada}\nImagen: ${
            imagen || 'Sin imagen'
          }\n\nEste feedback fue generado desde la Tasketera.`,
        };

        await notifyFeedback(assignedEmail, message);

        console.log(
          'Notificación de feedback enviada exitosamente:',
          message.subject
        );
        break;

      default:
        console.error('Tipo de notificación no válido:', notificationType);
        return;
    }
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
}
