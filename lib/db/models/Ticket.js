import { Schema, models, model } from 'mongoose';

// Definición del subschema para el ticket
const ticketDetailsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
  },
  status: {
    type: String,
    enum: {
      values: ['open', 'in-progress', 'closed'],
      message: '{VALUE} no es un estado válido',
    },
    default: 'open',
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: '{VALUE} no es una prioridad válida',
    },
    default: 'medium',
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    default: null,
    validate: {
      validator: function (v) {
        if (!v) return true; // Permite valores null
        // Validación básica de URL
        try {
          new URL(v);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: 'URL inválida',
    },
  },
  image_url: {
    type: String,
    default: null,
    validate: {
      validator: function (v) {
        if (!v) return true; // Permite valores null
        // Validación básica de URL de imagen
        try {
          new URL(v);
          return /\.(jpg|jpeg|png|gif|webp)$/i.test(v);
        } catch (err) {
          return false;
        }
      },
      message: 'URL de imagen inválida',
    },
  },
});

const ticketSchema = new Schema(
  {
    ticket: ticketDetailsSchema,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Esto añade automáticamente createdAt y updatedAt
    toJSON: { virtuals: true }, // Habilita virtuals cuando se convierte a JSON
    toObject: { virtuals: true },
  }
);

// Método para cerrar el ticket
ticketSchema.methods.closeTicket = async function () {
  this.ticket.status = 'closed';
  this.ticket.endDate = new Date();
  return await this.save();
};

// Virtual para calcular la duración del ticket
ticketSchema.virtual('duration').get(function () {
  if (!this.ticket.endDate) return null;
  return this.ticket.endDate - this.ticket.startDate;
});

// Middleware pre-save para actualizar updatedAt
ticketSchema.pre('save', function (next) {
  this.ticket.updatedAt = new Date();
  next();
});

// Índices para mejorar el rendimiento de las consultas
ticketSchema.index({ 'ticket.status': 1 });
ticketSchema.index({ 'ticket.priority': 1 });
ticketSchema.index({ 'ticket.assignedTo': 1 });
ticketSchema.index({ 'ticket.dueDate': 1 });

// Evitar registrar el modelo múltiples veces durante el desarrollo
const Ticket = models.Ticket || model('Ticket', ticketSchema);

export default Ticket;
