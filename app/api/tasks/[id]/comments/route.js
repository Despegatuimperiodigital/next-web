import mongoose from 'mongoose';
import { connect } from '../../../../../lib/db/connect';
import { sendNotification } from '../../../../../lib/services/notificationService';
import Comment from '../../../../../lib/db/models/Comment';
import Ticket from '../../../../../lib/db/models/Ticket';
import User from '../../../../../lib/db/models/User';
import { getToken } from 'next-auth/jwt';

export async function POST(req, { params }) {
  await connect();

  const { id: ticketId } = await params;
  console.log('Ticket ID recibido:', ticketId);
  // Validaciones de entrada
  if (!ticketId || !mongoose.Types.ObjectId.isValid(ticketId)) {
    return new Response(
      JSON.stringify({ message: 'ID de ticket inválido o no proporcionado' }),
      { status: 400 }
    );
  }
  console.log('ticketId es válido:', mongoose.Types.ObjectId.isValid(ticketId));

  try {
    // Verificar autenticación
    const token = await getToken({ req });
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Usuario no autenticado' }),
        { status: 401 }
      );
    }

    // Buscar ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      console.log('Ticket no encontrado:', ticketId);
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    // Buscar usuario asignado antes de crear el comentario
    let user = null;
    if (ticket.assignedTo) {
      console.log('Buscando usuario asignado:', ticket.assignedTo);
      user = await User.findById(ticket.assignedTo);
      if (!user) {
        console.log('El usuario asignado no existe.');
        return new Response(
          JSON.stringify({ message: 'Usuario asignado no existe' }),
          { status: 404 }
        );
      }
      console.log('Usuario asignado encontrado:', user._id);
    }

    // Obtener contenido del comentario
    const { content } = await req.json();
    if (!content) {
      return new Response(
        JSON.stringify({ message: 'El comentario no puede estar vacío' }),
        { status: 400 }
      );
    }

    // Crear el comentario
    const comment = new Comment({
      content,
      author: token.sub,
      ticket: ticketId,
    });
    await comment.save();

    // Agregar comentario al ticket
    ticket.comments.push(comment._id);
    await ticket.save();
    console.log('Comentarios actuales del ticket:', ticket.comments);

    // Enviar notificación si el ticket tiene un usuario asignado
    if (user) {
      console.log('Enviando notificación...');
      try {
        await sendNotification(
          ticket,
          ticket.assignedTo,
          { id: token.sub, name: token.name, email: token.email },
          comment.author,
          'comment_creation',
          content
        );
        console.log('Notificación enviada exitosamente');
      } catch (notificationError) {
        console.error('Error al enviar la notificación:', notificationError);
      }
    } else {
      console.log(
        'El ticket no tiene un usuario asignado, omitiendo notificación.'
      );
    }

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    return new Response(
      JSON.stringify({ message: 'Error al agregar comentario' }),
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  await connect();

  const { id: ticketId } = await params;

  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    return new Response(JSON.stringify({ message: 'ID de ticket inválido' }), {
      status: 400,
    });
  }

  try {
    const ticket = await Ticket.findById(ticketId)
      .populate({
        path: 'comments',
        select: 'content author createdAt ticket',
        populate: [
          { path: 'author', select: 'name email' },
          { path: 'ticket', select: 'title' },
        ],
      })
      .lean();

    if (!ticket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(ticket.comments), { status: 200 });
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    return new Response(
      JSON.stringify({ message: 'Error al obtener comentarios' }),
      { status: 500 }
    );
  }
}
