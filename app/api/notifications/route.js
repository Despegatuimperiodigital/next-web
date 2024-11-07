import { NextResponse } from 'next/server';
import { connect } from '@/lib/db/connect';
import Notification from '@/lib/db/models/Notification';
import { authorizeRequest } from '@/lib/utils/auth';

export async function GET(request) {
  try {
    const session = await authorizeRequest(request);
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    
    await connect();
    const query = { recipient: session.user.id };
    if (read !== null) query.read = read === 'true';
    
    const notifications = await Notification.find(query)
      .populate('taskId', 'title')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
