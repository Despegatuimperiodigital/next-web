import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { connect } from '../../../lib/db/connect';
import User from '../../../lib/db/models/User';

export async function POST(request) {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { name, email, password } = await request.json();

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Conectar a la base de datos
    await connect();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Encriptar la contraseña
    const hashedPassword = await hash(password, 12);

    // Crear un nuevo usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Preparar la respuesta (sin incluir la contraseña)
    const responseUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    };

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', user: responseUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: 'Error al crear el usuario' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();

    // Obtener todos los usuarios
    const usuarios = await User.find();

    return NextResponse.json({ usuarios }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener los usuarios' },
      { status: 500 }
    );
  }
}
