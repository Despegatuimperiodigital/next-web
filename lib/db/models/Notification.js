import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['TASK_STATUS_UPDATE', 'TASK_ASSIGNED', 'NEW_COMMENT'],
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    taskTitle: String,
    status: String,
    commenter: String,
    comment: String
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);s