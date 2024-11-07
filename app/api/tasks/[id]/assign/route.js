import { NextResponse } from 'next/server';
import { connect } from '@/lib/db/connect';
import Task from '@/lib/db/models/Task';
import { authorizeRequest } from '@/lib/utils/auth';
import { notificationService } from '@/lib/services/notificationService';

export async function PATCH(request, { params }) {
  try {
    const session = await authorizeRequest(request);
    const { userId } = await request.json();
    
    await connect();
    const task = await Task.findById(params.id);
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    task.assignedTo = userId;
    task.timeline.push({
      action: 'ASSIGNED',
      user: session.user.id,
      details: { assignedTo: userId }
    });
    
    await task.save();
    
    // Notificar al nuevo agente asignado
    await notificationService.createNotification(
      'TASK_ASSIGNED',
      userId,
      {
        taskTitle: task.title
      },
      task._id
    );
    
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
