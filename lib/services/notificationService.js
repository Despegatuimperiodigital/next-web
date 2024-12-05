import { notifyAssignment } from '../services/emailService';

export async function sendNotification(
  ticket,
  assignedEmail,
  author,
  notificationType
) {
  try {
    console.log('Tipo de notificación recibido:', notificationType);
    let message;
    const ticketData = ticket.ticket || ticket;

    // Obtener nombre del autor
    const authorName = author?.name || author?.email || 'Desconocido';

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

      default:
        console.error('Tipo de notificación no válido:', notificationType);
        return;
    }
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
}
