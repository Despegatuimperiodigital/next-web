import { NextResponse } from 'next/server';
import { connect } from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { authorizeRequest } from '@/lib/utils/auth';

export async function GET(request, { params }) {
  try {
    const session = await authorizeRequest(request);
    
    await connect();
    const user = await User.findById(params.id).select('-preferences');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Usuarios solo pueden ver su propia información a menos que sean supervisores
    if (session.user.id !== params.id && session.user.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await authorizeRequest(request);
    const data = await request.json();
    
    await connect();
    const user = await User.findById(params.id);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Usuarios solo pueden actualizar su propia información
    if (session.user.id !== params.id && session.user.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Actualizar campos permitidos
    const allowedUpdates = ['name', 'preferences'];
    // Solo supervisores pueden actualizar el rol
    if (session.user.role === 'SUPERVISOR') {
      allowedUpdates.push('role');
    }
    
    allowedUpdates.forEach(field => {
      if (field in data) {
        user[field] = data[field];
      }
    });
    
    await user.save();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await authorizeRequest(request);
    
    // Solo supervisores pueden eliminar usuarios
    if (session.user.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    await connect();
    const user = await User.findById(params.id);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    await user.deleteOne();
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
