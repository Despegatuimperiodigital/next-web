import { NextResponse } from 'next/server';
import { connect } from '@/lib/db/connect';
import Task from '@/lib/db/models/Task';
import { authorizeRequest } from '@/lib/utils/auth';
import { notificationService } from '@/lib/services/notificationService';

export async function POST(request, { params }) {
  try {
    const session = await authorizeRequest(request);
    const { content } = await request.json();
    
    await connect();
    const task = await Task.findById(params.id)
      .populate('assignedTo', 'name email')
      .populate('client', 'name email');
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    const comment = {
      user: session.user.id,
      content,
      createdAt: new Date()
    };
    
    task.comments.push(comment);
    task.timeline.push({
      action: 'COMMENT_ADDED',
      user: session.user.id,
      details: { commentId: comment._id }
    });
    
    await task.save();
    
    // Notificar a los involucrados
    const notifyUsers = new Set([
      task.client._id.toString(),
      task.assignedTo?._id.toString()
    ]);
    
    // Excluir al autor del comentario
    notifyUsers.delete(session.user.id);
    
    for (const userId of notifyUsers) {
      if (userId) {
        await notificationService.createNotification(
          'NEW_COMMENT',
          userId,
          {
            taskTitle: task.title,
            commenter: session.user.name,
            comment: content
          },
          task._id
        );
      }
    }
    
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
