import mongoose from 'mongoose';
import User from './User';
import Ticket from './Ticket';

// Definir el esquema para el modelo de comentarios
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, // comment is required
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
  },
  { timestamps: true }
);

// Exportar el modelo de comentario
export default mongoose.models.Comment ||
  mongoose.model('Comment', commentSchema);
