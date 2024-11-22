import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { connect } from '../../../../lib/db/connect';
import User from '../../../../lib/db/models/User';

export async function GET(req, { params }) {
  const { userId } = params;
  console.log('User ID recibido:', userId);

  await connect();
  console.log('conexión a la bd');

  // Validar que el userId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return new Response(JSON.stringify({ message: 'ID de usuario inválido' }), {
      status: 400,
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Usuario no encontrado' }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error al obtener el usuario' }),
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { userId } = params;
  const { name, email, password } = await request.json();

  try {
    // Conectar a la base de datos
    await connect();

    // Validar que el ID de usuario es válido
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }

    // Buscar al usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar los campos del usuario
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      // Si se proporciona una nueva contraseña, se debe encriptar
      user.password = await hash(password, 12);
    }

    // Guardar los cambios
    await user.save();

    // Preparar la respuesta (sin incluir la contraseña)
    const updatedUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    return NextResponse.json(
      { message: 'Usuario actualizado exitosamente', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el usuario' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { userId } = params;

  try {
    // Conectar a la base de datos
    await connect();

    // Validar que el ID de usuario es válido
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }

    // Eliminar el usuario por su ID
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Usuario eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el usuario' },
      { status: 500 }
    );
  }
}
