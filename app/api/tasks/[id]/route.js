import mongoose from 'mongoose';
import { connect } from '../../../../lib/db/connect';
import { getToken } from 'next-auth/jwt';
import Ticket from '../../../../lib/db/models/Ticket';
import Comment from '../../../../lib/db/models/Comment';
import { sendNotification } from '../../../../lib/services/notificationService';

export async function GET(req, { params }) {
  const { id } = await params;

  await connect();
  console.log('conexión a la bd');

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: 'ID de ticket inválido' }), {
      status: 400,
    });
  }
  try {
    console.log('Buscando ticket con ID:', id);
    const ticket = await Ticket.findById(id).populate('comments');
    console.log('Ticket encontrado:', ticket);
    if (!ticket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(ticket), { status: 200 });
  } catch (error) {
    console.error('Error al obtener ticket por id:', error);
    return new Response(
      JSON.stringify({ message: 'Error al obtener ticket' }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connect();
  const { id } = await params;
  console.log('ID de ticket:', id);

  const { ticket } = await req.json();
  console.log('Ticket recibido:', ticket);
  if (!ticket) {
    return new Response(JSON.stringify({ message: 'Ticket es requerido' }), {
      status: 400,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: 'ID de ticket inválido' }), {
      status: 400,
    });
  }

  try {
    const token = await getToken({ req });
    console.log('Token:', token);
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'No autorizado, token no encontrado' }),
        { status: 401 }
      );
    }

    const userEmail = token.email;
    console.log('Conectando a la base de datos...');
    console.log('Buscando ticket con ID:', id);
    const existingTicket = await Ticket.findById(id);
    if (!existingTicket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }
    console.log('Ticket encontrado:', existingTicket);
    // Verificar estado "closed"
    if (ticket.status === 'closed' && existingTicket.status !== 'closed') {
      await existingTicket.closeTicket();
      await sendNotification(
        existingTicket,
        existingTicket.assignedTo,
        userEmail,
        'closure'
      );
      return new Response(
        JSON.stringify({ message: 'Ticket cerrado exitosamente' }),
        { status: 200 }
      );
    }

    // verificar si esta siendo reasigando el ticket
    console.log('Actualizando ticket...');
    const previousAssignedTo = ticket.assignedTo;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, ticket, {
      new: true,
    });
    console.log('Actualizando ticket...');
    if (!updatedTicket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    // Notificar si es que hubo reasignación de usuarios.
    if (ticket.assignedTo && ticket.assignedTo !== previousAssignedTo) {
      console.log('Reasignando ticket...');

      // Buscar al nuevo asignado
      let newUser = null;
      if (ticket.assignedTo) {
        newUser = await User.findById(ticket.assignedTo);
        if (!newUser) {
          return new Response(
            JSON.stringify({ message: 'Usuario asignado no encontrado' }),
            {
              status: 404,
            }
          );
        }
      }
      await sendNotification(
        updatedTicket,
        previousAssignedTo,
        userEmail,
        'reassignment-old'
      );
      await sendNotification(
        updatedTicket,
        updatedTicket.assignedTo,
        userEmail,
        'reassignment-new'
      );
    }

    console.log('Enviando notificación de actualización...');
    //Notificación para actualizar
    await sendNotification(
      updatedTicket,
      updatedTicket.assignedTo,
      userEmail,
      'update'
    );
    return new Response(JSON.stringify(updatedTicket), { status: 200 });
  } catch (error) {
    console.error('Error detallado al actualizar ticket:', error);
    return new Response(
      JSON.stringify({
        message: 'Error al actualizar ticket',
        errorDetails: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  await connect();
  console.log('conexión a la bd');

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: 'ID de ticket inválido' }), {
      status: 400,
    });
  }

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    // Notificar que el ticket ha sido eliminado
    if (deletedTicket.assignedTo) {
      await sendNotification(
        deletedTicket,
        deletedTicket.assignedTo,
        req.user,
        'deletion'
      );
    }

    // El ticket fue eliminado exitosamente
    return new Response(JSON.stringify({ message: 'Ticket eliminado' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error al eliminar ticket', error);
    return new Response(
      JSON.stringify({ message: 'Error al eliminar ticket' }),
      { status: 500 }
    );
  }
}
