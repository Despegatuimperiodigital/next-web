import mongoose from 'mongoose';
import { connect } from '../../../../../lib/db/connect';
import { sendNotification } from '../../../../../lib/services/notificationService';
import { notifyComment } from '../../../../../lib/services/emailService';
import Comment from '../../../../../lib/db/models/Comment';
import Ticket from '../../../../../lib/db/models/Ticket';

export async function POST(req, { params }) {
  await connect();

  const { id: ticketId } = await params;
  console.log('Ticket ID recibido:', ticketId);
  // Validar el ID
  if (!ticketId) {
    return new Response(
      JSON.stringify({ message: 'ID de ticket no proporcionado' }),
      { status: 400 }
    );
  }

  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    return new Response(JSON.stringify({ message: 'ID de ticket inválido' }), {
      status: 400,
    });
  }
  console.log('ticketId es válido:', mongoose.Types.ObjectId.isValid(ticketId));

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      console.log('Ticket no encontrado:', ticketId);
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    const { content } = await req.json();
    if (!content) {
      return new Response(
        JSON.stringify({ message: 'El comentario no puede estar vacío' }),
        { status: 400 }
      );
    }

    /*const user = req.user; 
      if (!user) {
        return new Response(JSON.stringify({ message: 'Usuario no autenticado' }), { status: 401 });
      }*/
    console.log('Cuerpo de la solicitud:', { content });
    const comment = new Comment({
      content,
      // author: user.uid,
      ticket: ticketId,
    });

    await comment.save();

    ticket.comments.push(comment._id);
    await ticket.save();

    // Enviar notificación si el ticket tiene un usuario asignado
    if (ticket.assignedTo) {
      try {
        await sendNotification(
          ticket,
          ticket.assignedTo,
          comment.author,
          'comment_creation',
          content
        );
      } catch (error) {
        console.error('Error al enviar notificación');
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

export async function PUT(req, { params }) {
  await connect();

  const { commentId } = params;
  const { content } = await req.json();

  if (!content) {
    return new Response(
      JSON.stringify({
        message: 'El contenido del comentario no puede estar vacío',
      }),
      { status: 400 }
    );
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return new Response(
      JSON.stringify({ message: 'ID de comentario inválido' }),
      { status: 400 }
    );
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return new Response(
        JSON.stringify({ message: 'Comentario no encontrado' }),
        { status: 404 }
      );
    }

    // Verificación de permisos para actualizar el comentario
    /*const user = req.user;
      if (user.id !== comment.author.toString() && user.role !== 'admin') {
        return new Response(JSON.stringify({ message: 'No tienes permiso para actualizar este comentario' }), { status: 403 });
      }*/

    comment.content = content;
    comment.updatedAt = Date.now();

    await comment.save();

    // Enviar notificación de actualización de comentario
    const ticket = await Ticket.findById(comment.ticket);
    if (ticket.assignedTo) {
      try {
        await sendNotification(
          ticket,
          ticket.assignedTo,
          comment.author,
          'comment_update',
          content
        );
      } catch (error) {
        console.error(
          'Error al enviar notificación de actualización de comentario',
          error
        );
      }
    }

    return new Response(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    return new Response(
      JSON.stringify({ message: 'Error al actualizar comentario' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connect();

  const { commentId } = params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return new Response(
      JSON.stringify({ message: 'ID de comentario inválido' }),
      { status: 400 }
    );
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return new Response(
        JSON.stringify({ message: 'Comentario no encontrado' }),
        { status: 404 }
      );
    }

    /*const user = req.user;
      if (user.id !== comment.author.toString() && user.role !== 'admin') {
        return new Response(JSON.stringify({ message: 'No tienes permiso para eliminar este comentario' }), { status: 403 });
      }*/

    await Comment.deleteOne({ _id: commentId });
    await Ticket.updateOne(
      { _id: comment.ticket },
      { $pull: { comments: comment._id } }
    );

    // Enviar notificación de eliminación de comentario
    const ticket = await Ticket.findById(comment.ticket);
    if (ticket.assignedTo) {
      try {
        await sendNotification(
          ticket,
          ticket.assignedTo,
          comment.author,
          'comment_deletion',
          comment.content
        );
      } catch (error) {
        console.error(
          'Error al enviar notificación de eliminación de comentario',
          error
        );
      }
    }

    return new Response(JSON.stringify({ message: 'Comentario eliminado' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    return new Response(
      JSON.stringify({ message: 'Error al eliminar comentario' }),
      { status: 500 }
    );
  }
}
