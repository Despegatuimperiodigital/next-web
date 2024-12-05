import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Ticket from '../../../lib/db/models/Ticket';
import User from '../../../lib/db/models/User';
import { sendNotification } from '../../../lib/services/notificationService';
import { connect } from '../../../lib/db/connect';
import { getToken } from 'next-auth/jwt';
import { handleImageUpload } from '../../../lib/utils/imageUpload';

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

    // Obtener el token del request
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { message: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    // Obtener datos del ticket
    const formData = await request.formData();
    const rawTicket = formData.get('ticket') || '{}';
    let ticket;
    try {
      ticket = JSON.parse(rawTicket);
    } catch (error) {
      console.error('Error al parsear el ticket:', error);
      return NextResponse.json(
        { message: "El campo 'ticket' debe ser un JSON válido" },
        { status: 400 }
      );
    }

    const image = formData.get('image');
    console.log('Ticket Data (raw):', ticket);
    console.log('Image File:', image);
    if (!ticket) {
      return NextResponse.json(
        { message: 'Ticket es requerido' },
        { status: 400 }
      );
    }

    const { name, title, description, priority, assignedTo, dueDate, link } =
      ticket;

    // Verificar usuario asignado
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

    // Si se recibe image procesarla
    let image_url = null;
    if (image) {
      image_url = await handleImageUpload(image);
      if (!image_url) {
        return NextResponse.json(
          { message: 'Error al cargar la imagen' },
          { status: 500 }
        );
      }
    }

    // Crear y guardar ticket
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
      createdBy: token.sub,
    });

    const savedTicket = await newTicket.save();
    console.log('Nuevo ticket creado:', savedTicket);

    // Enviar notificación
    try {
      await sendNotification(
        savedTicket,
        user.email,
        {
          id: token.sub,
          name: token.name,
          email: token.email,
        },
        'creation'
      );
      console.log('Notificación enviada exitosamente.');
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }

    console.log('Ticket creado por usuario:', token.sub);
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
