import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  fechaDeCreacion: { type: Date, default: Date.now },
  link: {
    type: String,
    default: null,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    default: null,
  },
});

const Feedback =
  mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default Feedback;
