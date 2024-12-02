import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { connect } from '../../../../lib/db/connect';
import { getToken } from 'next-auth/jwt';
import Ticket from '../../../../lib/db/models/Ticket';
import User from '../../../../lib/db/models/User';
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

export async function PUT(request, { params }) {
  try {
    await connect();
    console.log('Conexión a la base de datos establecida correctamente');

    // Obtener el token del request
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json(
        { message: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    const { id } = await params; // iD del ticket que se va a actualizar
    console.log('ID de ticket:', id);

    // Verificar si el ID de ticket es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID de ticket inválido' },
        { status: 400 }
      );
    }

    // Obtener datos del ticket
    const data = await request.json();
    const { ticket } = data;

    if (!ticket) {
      return NextResponse.json(
        { message: 'Ticket es requerido' },
        { status: 400 }
      );
    }

    const {
      name,
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      link,
      image_url,
    } = ticket;

    // Buscar ticket existente
    const existingTicket = await Ticket.findById(id);
    if (!existingTicket) {
      return NextResponse.json(
        { message: 'Ticket no encontrado' },
        { status: 404 }
      );
    }
    console.log('Ticket encontrado:', existingTicket);

    console.log('Valor de assignedTo:', assignedTo);
    console.log(
      'Valor actual de assignedTo en el ticket:',
      existingTicket.ticket.assignedTo
    );
    // Verificar si se está reasignando el ticket
    let user = null;
    if (assignedTo) {
      console.log('Usuario asignado encontrado:', assignedTo);
      user = await User.findById(assignedTo);
      if (!user) {
        return NextResponse.json(
          { message: 'Usuario asignado no existe' },
          { status: 404 }
        );
      }
    }

    // Actualizar el ticket
    existingTicket.ticket.name = name || existingTicket.ticket.name;
    existingTicket.ticket.title = title || existingTicket.ticket.title;
    existingTicket.ticket.description =
      description || existingTicket.ticket.description;
    existingTicket.ticket.priority = priority || existingTicket.ticket.priority;
    existingTicket.ticket.assignedTo =
      assignedTo || existingTicket.ticket.assignedTo;
    existingTicket.ticket.dueDate = dueDate || existingTicket.ticket.dueDate;
    existingTicket.ticket.link = link || existingTicket.ticket.link;
    existingTicket.ticket.image_url =
      image_url || existingTicket.ticket.image_url;

    if (ticket.status) {
      if (!['open', 'in-progress', 'closed'].includes(ticket.status)) {
        return NextResponse.json(
          { message: `${ticket.status} no es un estado válido` },
          { status: 400 }
        );
      }
      existingTicket.ticket.status = ticket.status;
    }

    const updatedTicket = await existingTicket.save();
    console.log('Ticket actualizado:', updatedTicket);

    // Enviar notificación si hay reasignación
    if (
      assignedTo &&
      assignedTo !== existingTicket.ticket.assignedTo.toString()
    ) {
      console.log(
        'Enviando notificación al nuevo usuario asignado:',
        user.email
      );
      await sendNotification(
        updatedTicket,
        user.email,
        {
          id: token.sub,
          name: token.name,
          email: token.email,
        },
        'reassignment'
      );
    } else if (
      !assignedTo ||
      assignedTo === existingTicket.ticket.assignedTo.toString()
    ) {
      // Enviar notificación de actualización si no hubo reasignación
      const assignedUser = await User.findById(
        existingTicket.ticket.assignedTo
      );
      if (!assignedUser) {
        return NextResponse.json(
          { message: 'Usuario asignado no encontrado' },
          { status: 404 }
        );
      }

      console.log(
        'Enviando notificación de actualización al usuario asignado:',
        assignedUser.email
      );
      await sendNotification(
        updatedTicket,
        assignedUser.email,
        {
          id: token.sub,
          name: token.name,
          email: token.email,
        },
        'update'
      );
    }
    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar ticket:', error);
    return NextResponse.json(
      { message: 'Error al actualizar el ticket' },
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
