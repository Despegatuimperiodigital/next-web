import { NextResponse } from 'next/server';
import { connect } from '@/lib/db/connect';
import Task from '@/lib/db/models/Task';
import { authorizeRequest } from '@/lib/utils/auth';
import { validateTask } from '@/lib/utils/validators';

export async function GET(request, { params }) {
  try {
    const session = await authorizeRequest(request);
    
    await connect();
    const task = await Task.findById(params.id)
      .populate('client', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name email')
      .populate('timeline.user', 'name email');
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PATCH(request, { params }) {
    try {
      const session = await authorizeRequest(request);
      const data = await request.json();
      const validatedData = validateTask(data);
      
      await connect();
      const task = await Task.findById(params.id);
      
      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }
      
      // Actualizar campos permitidos
      const allowedUpdates = ['title', 'description', 'priority', 'category', 'tags'];
      allowedUpdates.forEach(field => {
        if (field in validatedData) {
          task[field] = validatedData[field];
        }
      });
      
      task.timeline.push({
        action: 'UPDATED',
        user: session.user.id,
        details: validatedData
      });
      
      await task.save();
      return NextResponse.json(task);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  
  export async function DELETE(request, { params }) {
    try {
      const session = await authorizeRequest(request);
      
      await connect();
      const task = await Task.findById(params.id);
      
      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }
      
      // Solo supervisores pueden eliminar tareas
      if (session.user.role !== 'SUPERVISOR') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
      
      await task.deleteOne();
      return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }