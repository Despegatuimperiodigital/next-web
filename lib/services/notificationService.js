import { notifyAssignment, notifyComment } from './emailService';
import User from '../db/models/User';

export async function sendNotification(
  ticket,
  assignedEmail,
  author,
  notificationType,
  comment = null
) {
  try {
    let message;
    const ticketData = ticket.ticket || ticket;

    // Obtener nombre del autor
    const authorUser = ticket.createdBy
      ? await User.findById(ticket.createdBy)
      : null;
    const authorName = authorUser?.name || 'Desconocido';

    // Para las notificaciones de tareas (asignación, actualización, cierre)
    if (notificationType === 'creation') {
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
    } else if (notificationType === 'update') {
      message = {
        subject: `Tarea actualizada: ${ticketData.title}`,
        text: `La tarea asignada se ha actualizado:\n\nTítulo: ${ticketData.title}\nDescripción: ${ticketData.description}\nPrioridad: ${ticketData.priority}\nActualizado por: ${authorName}.`,
      };
      await notifyAssignment(assignedEmail, message);
    } else if (notificationType === 'closure') {
      message = {
        subject: `Tarea cerrada: ${ticketData.title}`,
        text: `La tarea asignada ha sido cerrada:\n\nTítulo: ${ticketData.title}\nCerrado por: ${authorName}.`,
      };
      await notifyAssignment(assignedEmail, message);
    } else {
      console.error('Tipo de notificación no válido:', notificationType);
      return;
    }

    // Para las notificaciones de comentarios
    if (notificationType === 'comment_creation') {
      message = {
        subject: `Nuevo comentario en la tarea: ${ticketData.title}`,
        text: `Se ha agregado un nuevo comentario en la tarea:\n\nTítulo: ${
          ticketData.title
        }\nComentario: ${
          comment?.text || 'Sin contenido'
        }\nComentario realizado por: ${authorUser?.name || 'Desconocido'}`,
      };
      await notifyComment(assignedEmail, message);
    } else if (notificationType === 'comment_update') {
      message = {
        subject: `Comentario actualizado en la tarea: ${ticketData.title}`,
        text: `Se ha actualizado un comentario en la tarea:\n\nTítulo: ${
          ticketData.title
        }\nComentario actualizado: ${
          comment?.text || 'Sin contenido'
        }\nActualizado por: ${authorUser?.name || 'Desconocido'}`,
      };
      await notifyComment(assignedEmail, message);
    } else if (notificationType === 'comment_deletion') {
      message = {
        subject: `Comentario eliminado en la tarea: ${ticketData.title}`,
        text: `Se ha eliminado un comentario en la tarea:\n\nTítulo: ${
          ticketData.title
        }\nComentario eliminado por: ${authorUser?.name || 'Desconocido'}`,
      };
      await notifyComment(assignedEmail, message);
    }
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
}
