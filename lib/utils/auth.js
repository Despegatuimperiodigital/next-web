import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function authorizeRequest(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

export function checkPermissions(user, action, resource) {
  const rolePermissions = {
    CLIENT: ['VIEW_OWN_TASKS', 'CREATE_TASK', 'COMMENT'],
    AGENT: ['VIEW_ASSIGNED_TASKS', 'UPDATE_TASK', 'COMMENT'],
    SUPERVISOR: ['VIEW_ALL_TASKS', 'ASSIGN_TASK', 'UPDATE_TASK', 'COMMENT']
  };
  
  const userPermissions = rolePermissions[user.role] || [];
  return userPermissions.includes(action);
}