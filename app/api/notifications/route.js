import {
  notifyAssignment,
  notifyComment,
  notifyFeedback,
} from '../../../lib/services/emailService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, email, message, userEmail } = req.body;

    try {
      // Lógica para asignación de tareas
      if (type === 'assignment') {
        await notifyAssignment(email, message);
      }
      // Lógica para comentarios (se agregan los tipos 'comment_creation', 'comment_update', 'comment_deletion')
      else if (type === 'comment_creation') {
        await sendNotification(
          ticket,
          assignedTo,
          author,
          'comment_creation',
          comment
        );
      } else if (type === 'comment_update') {
        await sendNotification(
          ticket,
          assignedTo,
          author,
          'comment_update',
          comment
        );
      } else if (type === 'comment_deletion') {
        await sendNotification(
          ticket,
          assignedTo,
          author,
          'comment_deletion',
          comment
        );
      }
      // Lógica para feedback
      else if (type === 'feedback') {
        await notifyFeedback(userEmail, message);
      } else {
        return res
          .status(400)
          .json({ error: 'Tipo de notificación no válido' });
      }

      return res
        .status(200)
        .json({ success: 'Notificación enviada exitosamente' });
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      return res.status(500).json({ error: 'Error al enviar notificación' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
