import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connect } from '../../../../lib/db/connect';
import User from '../../../../lib/db/models/User';

export async function GET(req, context) {
  await connect();
  console.log('conexión a la bd');

  // accede a los parámetros desde el contexto
  const params = await context.params;
  console.log('Parámetros recibidos:', params);

  const userId = params?.id;
  console.log('User ID recibido:', userId);
  if (!userId) {
    console.log('No se recibió un ID válido');
    return new Response(
      JSON.stringify({ message: 'ID de usuario no recibido' }),
      {
        status: 400,
      }
    );
  }

  // Validar que el userId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.log('ID inválido recibido:', userId);
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
  const { id } = await params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: 'ID de usuario inválido' },
      { status: 400 }
    );
  }

  const { name, email, password } = await request.json();

  try {
    await connect();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 12);

    await user.save();

    return NextResponse.json(
      {
        message: 'Usuario actualizado exitosamente',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id: userId } = await params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { error: 'ID de usuario inválido' },
      { status: 400 }
    );
  }

  try {
    await connect();

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Usuario eliminado correctamente',
        user: {
          id: deletedUser._id.toString(),
          name: deletedUser.name,
          email: deletedUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
}
