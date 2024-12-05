import mongoose from 'mongoose';
import { connect } from '../../../../../lib/db/connect';
import { sendCommentNotification } from '../../../../../lib/services/notificationCommentService';
import Comment from '../../../../../lib/db/models/Comment';
import Ticket from '../../../../../lib/db/models/Ticket';
import User from '../../../../../lib/db/models/User';
import { getToken } from 'next-auth/jwt';
import { handleImageUpload } from '../../../../../lib/utils/imageUpload';

export async function POST(req, { params }) {
  await connect();
  const { id: ticketId } = await params;

  // Validaciones de entrada
  if (!ticketId || !mongoose.Types.ObjectId.isValid(ticketId)) {
    return new Response(
      JSON.stringify({ message: 'ID de ticket inválido o no proporcionado' }),
      { status: 400 }
    );
  }

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
    const ticket = await Ticket.findById(ticketId).populate(
      'ticket.assignedTo'
    );
    if (!ticket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    //Buscar usuario asignado antes de crear el comentario
    console.log('assignedTo del ticket:', ticket.ticket.assignedTo);
    const assignedTo = ticket.ticket.assignedTo;
    let user = null;
    if (!assignedTo) {
      console.error('El assignedTo del ticket no esta.');
      return new Response(
        JSON.stringify({ message: 'No se pudo enviar la notificación' }),
        { status: 400 }
      );
    }
    user = await User.findById(assignedTo._id);
    if (!user) {
      console.error('No se encontró el usuario asignado.');
      return new Response(
        JSON.stringify({ message: 'No se pudo encontrar al usuario asignado' }),
        { status: 404 }
      );
    }
    console.log('Enviando notificación a:', user.email);

    // Obtener el contenido del comentario
    const formData = await req.formData();
    const content = formData.get('content');
    const image = formData.get('image');

    if (!content) {
      return new Response(
        JSON.stringify({ message: 'El comentario no puede estar vacío' }),
        { status: 400 }
      );
    }

    // Si hay imagen procesarla
    let imageUrl = null;
    if (image) {
      imageUrl = await handleImageUpload(image);
      console.log('Imagen subida correctamente, URL:', imageUrl);
      if (!imageUrl) {
        return new Response(
          JSON.stringify({ message: 'Error al procesar la imagen' }),
          { status: 500 }
        );
      }
    }
    // Crear el comentario
    const comment = new Comment({
      content,
      imageUrl,
      author: new mongoose.Types.ObjectId(token.sub),
      ticket: ticketId,
    });
    await comment.save();
    console.log('Comentario guardado:', comment);

    // Agregar comentario al ticket
    ticket.comments.push(comment._id);
    await ticket.save();
    console.log('Ticket actualizado con el nuevo comentario:', ticket);

    // Enviar notificación si el ticket tiene un usuario asignado
    if (assignedTo && assignedTo.email) {
      try {
        console.log('Enviando notificación...', assignedTo.email);
        await sendCommentNotification(comment, assignedTo.email, {
          id: token.sub,
          name: token.name,
          email: token.email,
        });
      } catch (error) {
        console.error(
          'Error al enviar la notificación del comentario:',
          error.message
        );
      }
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
