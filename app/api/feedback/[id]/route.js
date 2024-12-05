import mongoose from 'mongoose';
import Feedback from '../../../../lib/db/models/Feedback';
import { connect } from '../../../../lib/db/connect';
import { getToken } from 'next-auth/jwt';

// Obtener feedback por ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connect();
    console.log('conexión a la bd');

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return new Response(JSON.stringify({ error: 'Feedback no encontrado' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(feedback), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error al obtener feedback' }),
      { status: 500 }
    );
  }
}

// Actualizar feedback
export async function PUT(request, { params }) {
  try {
    await connect();

    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json(
        { message: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    console.log('ID de ticket:', id);

    const data = await request.json();
    const { nombre, descripcion, link, imagen } = data;

    // Buscarlo
    const existingFeedback = await Feedback.findById(id);
    if (!existingFeedback) {
      return new Response(
        JSON.stringify({ message: 'Feedback no encontrado' }),
        { status: 404 }
      );
    }

    // objeto de actualización
    const updates = {};
    if (nombre) updates.nombre = nombre;
    if (descripcion) updates.descripcion = descripcion;
    if (link) updates.link = link;
    if (imagen) updates.imagen = imagen;

    // Actualizar en la bd
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedFeedback) {
      return new Response(
        JSON.stringify({ message: 'No se pudo actualizar el feedback' }),
        { status: 500 }
      );
    }

    // Devolver el feedback actualizado
    return new Response(JSON.stringify(updatedFeedback), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error al actualizar feedback' }),
      { status: 500 }
    );
  }
}

// Eliminar feedback
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await connect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: 'ID de ticket inválido' }),
        {
          status: 400,
        }
      );
    }

    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return new Response(JSON.stringify({ error: 'Feedback no encontrado' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: 'Feedback eliminado con éxito' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error al eliminar feedback' }),
      { status: 500 }
    );
  }
}
