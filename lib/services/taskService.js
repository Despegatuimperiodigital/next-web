export const taskService = {
    async createTask(data, userId) {
      const task = new Task({
        ...data,
        client: userId,
        status: 'NEW'
      });
      
      await task.save();
      return task;
    },
    
    async updateTaskStatus(taskId, status, userId) {
      const task = await Task.findById(taskId);
      if (!task) throw new Error('Task not found');
      
      task.status = status;
      task.timeline.push({
        action: 'STATUS_CHANGE',
        user: userId,
        details: { oldStatus: task.status, newStatus: status }
      });
      
      await task.save();
      return task;
    },
    
    async assignTask(taskId, assigneeId, assignerId) {
      const task = await Task.findById(taskId);
      if (!task) throw new Error('Task not found');
      
      task.assignedTo = assigneeId;
      task.timeline.push({
        action: 'ASSIGNED',
        user: assignerId,
        details: { assignedTo: assigneeId }
      });
      
      await task.save();
      return task;
    },
    
    async addComment(taskId, userId, content) {
      const task = await Task.findById(taskId);
      if (!task) throw new Error('Task not found');
      
      const comment = {
        user: userId,
        content,
        createdAt: new Date()
      };
      
      task.comments.push(comment);
      task.timeline.push({
        action: 'COMMENT_ADDED',
        user: userId,
        details: { commentId: comment._id }
      });
      
      await task.save();
      return comment;
    },
    
    async deleteTask(taskId, userId) {
      const task = await Task.findById(taskId);
      if (!task) throw new Error('Task not found');
      
      await task.deleteOne();
      return { success: true };
    }
  };