import mongoose from 'mongoose';
import { connect } from '../../../../../../lib/db/connect';
import Comment from '../../../../../../lib/db/models/Comment';
import Ticket from '../../../../../../lib/db/models/Ticket';
import { getToken } from 'next-auth/jwt';

export async function PUT(req, { params }) {
  await connect();

  const { id: ticketId } = await params;

  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    console.log('id del ticket:', ticketId);
    return new Response(JSON.stringify({ message: 'ID de ticket inválido' }), {
      status: 400,
    });
  }
  const { commentId } = await params;
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

    comment.content = content;
    comment.updatedAt = Date.now();

    await comment.save();

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
  const { id: ticketId } = await params;

  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    return new Response(JSON.stringify({ message: 'ID de ticket inválido' }), {
      status: 400,
    });
  }
  const { commentId } = await params;
  console.log('Comment ID:', commentId);

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return new Response(
      JSON.stringify({ message: 'ID de comentario inválido' }),
      { status: 400 }
    );
  }

  try {
    const token = await getToken({ req });
    if (!token) {
      console.log('Token:', token);
      return new Response(JSON.stringify({ message: 'No autenticado' }), {
        status: 401,
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return new Response(
        JSON.stringify({ message: 'Comentario no encontrado' }),
        { status: 404 }
      );
    }

    await Comment.deleteOne({ _id: commentId });
    await Ticket.updateOne(
      { _id: comment.ticket },
      { $pull: { comments: comment._id } }
    );

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
