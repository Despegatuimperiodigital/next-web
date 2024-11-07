export function validateTask(data) {
    const errors = {};
    
    if (!data.title?.trim()) {
      errors.title = 'Title is required';
    }
    
    if (data.priority && !['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(data.priority)) {
      errors.priority = 'Invalid priority value';
    }
    
    if (data.status && !['NEW', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(data.status)) {
      errors.status = 'Invalid status value';
    }
    
    if (Object.keys(errors).length > 0) {
      throw new Error(JSON.stringify(errors));
    }
    
    return data;
  }
  