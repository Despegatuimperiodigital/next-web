import mongoose from 'mongoose';
import { connect } from '../../../../lib/db/connect';
import Ticket from '../../../../lib/db/models/Ticket';
import Comment from '../../../../lib/db/models/Comment';
//import { sendNotification } from '../../../utils/notifications';

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
  const { id } = await params;
  const { ticket } = await req.json();
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
    const existingTicket = await Ticket.findById(id);
    if (!existingTicket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    // Verificar estado "closed"
    if (ticket.status === 'closed' && existingTicket.status !== 'closed') {
      await existingTicket.closeTicket();
      //await sendNotification(existingTicket, existingTicket.assignedTo, req.user, 'closure');
      return new Response(
        JSON.stringify({ message: 'Ticket cerrado exitosamente' }),
        { status: 200 }
      );
    }

    // verificar si esta siendo reasigando el ticket
    const previousAssignedTo = ticket.assignedTo;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, ticket, {
      new: true,
    });

    if (!updatedTicket) {
      return new Response(JSON.stringify({ message: 'Ticket no encontrado' }), {
        status: 404,
      });
    }

    // Notificar si es que hubo reasignación de usuarios.
    if (ticket.assignedTo && ticket.assignedTo !== previousAssignedTo) {
      /*await sendNotification(
        updatedTicket,
        previousAssignedTo,
        req.user,
        'reassignment-old'
      );
      await sendNotification(
        updatedTicket,
        updatedTicket.assignedTo,
        req.user,
        'reassignment-new'
      );*/
    }

    console.log('Author object:', req.user);
    //Notificación para actualizar
    /*await sendNotification(
      updatedTicket,
      updatedTicket.assignedTo,
      req.user,
      'update'
    );*/
    return new Response(JSON.stringify(updatedTicket), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error al actualizar ticket' }),
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
