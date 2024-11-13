import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Task from '../../../lib/db/models/Task';
import Ticket from '../../../lib/db/models/Ticket';
import User from '../../../lib/db/models/User';
import {} from '../../../lib/services/notificationService';
import { connect } from '../../../lib/db/connect';

console.log('Ruta /api/task cargada correctamente');

export async function GET(request) {
  try {
    await connect();
    console.log('Conexión a la base de datos establecida correctamente');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find().skip(skip).limit(limit); // Obtener los tickets con paginación
    const totalTickets = await Ticket.countDocuments(); // Obtener el total de tickets en la base de datos

    return new Response(
      JSON.stringify({
        totalTickets,
        totalPages: Math.ceil(totalTickets / limit),
        currentPage: page,
        tickets,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response('Error al obtener tickets', { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connect();
    console.log('Conexión a la base de datos establecida correctamente');

    /*Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'No autorizado' },
        { status: 401 }
      );
    }

    // Verificar rol de admin
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Solo los administradores pueden crear tickets' },
        { status: 403 }
      );
    } */

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

    // Verificar usuario asignado
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return NextResponse.json(
          { message: 'Usuario no encontrado' },
          { status: 404 }
        );
      }
    }

    // Crear nuevo ticket
    const newTicket = new Ticket({
      ticket: {
        name,
        title,
        description,
        priority,
        assignedTo: assignedTo || null,
        dueDate,
        link,
        image_url,
      },
    });

    const savedTicket = await newTicket.save();

    // Enviar notificación si hay usuario asignado
    if (assignedTo) {
      await sendNotification(savedTicket, assignedTo, session.user, 'creation');
    }

    console.log('Ticket creado:', savedTicket);

    return NextResponse.json(savedTicket, { status: 201 });
  } catch (error) {
    console.error('Error al crear ticket:', error);
    console.error('Detalles del error:', error);
    return NextResponse.json(
      { message: 'Error al crear el ticket' },
      { status: 500 }
    );
  }
}
