export async function sendNotification(
  ticket,
  assignedTo,
  author,
  notificationType,
  comment = null
) {
  try {
    let message;
    // Para las notificaciones de tareas (asignación, actualización, cierre)
    if (notificationType === 'creation') {
      message = {
        subject: `Nueva tarea asignada: ${ticket.title}`,
        text: `Se te ha asignado una nueva tarea:\n\nTítulo: ${
          ticket.title
        }\nDescripción: ${ticket.description}\nPrioridad: ${
          ticket.priority
        }\nAsignado por: ${author.name || 'Desconocido'}.`,
      };
    } else if (notificationType === 'update') {
      message = {
        subject: `Tarea actualizada: ${ticket.title}`,
        text: `La tarea asignada se ha actualizado:\n\nTítulo: ${
          ticket.title
        }\nDescripción: ${ticket.description}\nPrioridad: ${
          ticket.priority
        }\nActualizado por: ${author.name || 'Desconocido'}.`,
      };
    } else if (notificationType === 'closure') {
      message = {
        subject: `Tarea cerrada: ${ticket.title}`,
        text: `La tarea asignada ha sido cerrada:\n\nTítulo: ${
          ticket.title
        }\nCerrado por: ${author.name || 'Desconocido'}.`,
      };
    } else {
      console.error('Tipo de notificación no válido:', notificationType);
      return;
    }
    // Para las notificaciones de comentarios
    if (notificationType === 'comment_creation') {
      message = {
        subject: `Nuevo comentario en la tarea: ${ticket.title}`,
        text: `Se ha agregado un nuevo comentario en la tarea:\n\nTítulo: ${
          ticket.title
        }\nComentario: ${comment.text}\nComentario realizado por: ${
          author.name || 'Desconocido'
        }`,
      };
    } else if (notificationType === 'comment_update') {
      message = {
        subject: `Comentario actualizado en la tarea: ${ticket.title}`,
        text: `Se ha actualizado un comentario en la tarea:\n\nTítulo: ${
          ticket.title
        }\nComentario actualizado: ${comment.text}\nActualizado por: ${
          author.name || 'Desconocido'
        }`,
      };
    } else if (notificationType === 'comment_deletion') {
      message = {
        subject: `Comentario eliminado en la tarea: ${ticket.title}`,
        text: `Se ha eliminado un comentario en la tarea:\n\nTítulo: ${
          ticket.title
        }\nComentario eliminado por: ${author.name || 'Desconocido'}`,
      };
    }

    if (!message) {
      console.error('Tipo de notificación no válido:', notificationType);
      return;
    }
    await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'assignment',
        email: assignedTo.email,
        message,
      }),
    });
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
}
