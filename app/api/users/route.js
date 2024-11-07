import { NextResponse } from 'next/server';
import { connect } from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { authorizeRequest } from '@/lib/utils/auth';
import { validateUser } from '@/lib/utils/validators';

export async function GET(request) {
  try {
    const session = await authorizeRequest(request);
    
    // Solo supervisores pueden ver todos los usuarios
    if (session.user.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    await connect();
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    
    const query = role ? { role } : {};
    const users = await User.find(query).select('-preferences');
    
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await authorizeRequest(request);
    
    // Solo supervisores pueden crear usuarios
    if (session.user.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const data = await request.json();
    const validatedData = validateUser(data);
    
    await connect();
    const user = new User(validatedData);
    await user.save();
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}