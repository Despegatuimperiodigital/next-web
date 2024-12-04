import Feedback from '../../../lib/db/models/Feedback';
import User from '../../../lib/db/models/User';
import { connect } from '../../../lib/db/connect';
import { sendNotification } from '../../../lib/services/notificationService';
import { getToken } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    await connect();
    console.log('Conexión a la base de datos establecida correctamente');
    const token = await getToken({ req: request });

    // Verificar si el token está presente, lo que indica que el usuario está autenticado
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Usuario no autenticado' }),
        { status: 401 }
      );
    }
    const formData = await request.formData();
    const nombre = formData.get('nombre');
    const descripcion = formData.get('descripcion');
    const link = formData.get('link');
    console.log('Form Data:', formData);
    // Validar los campos requeridos
    if (!nombre || !descripcion) {
      return new Response('Nombre y descripción son requeridos', {
        status: 400,
      });
    }

    let user = null;
    user = await User.findById(token.sub);

    const fechaDeCreacion = new Date();

    // Verificar si se ha recibido una imagen
    let imagenUrl = null;
    const image = formData.get('image');
    console.log('Image File:', image);

    if (image) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Usar una ruta absoluta más robusta
        const uploadDir = path.resolve(process.cwd(), 'public', 'uploads');

        // Verificar si el directorio existe antes de crearlo
        try {
          await fs.promises.access(uploadDir, fs.constants.F_OK); // Verifica si existe
        } catch (error) {
          // Si no existe, crearlo
          await fs.promises.mkdir(uploadDir, { recursive: true });
          console.log('Directorio de subida creado:', uploadDir);
        }

        const imagePath = path.join(uploadDir, image.name);

        // Escribir el archivo
        await fs.promises.writeFile(imagePath, buffer);
        console.log('Imagen guardada en:', imagePath);

        // Crear la URL de la imagen
        imagenUrl = `/uploads/${image.name}`;
      } catch (error) {
        console.error('Error al procesar la imagen:', error);
        // Manejar el error según sea necesario
      }
    }

    // Crear el nuevo feedback con la imagen si está presente
    const newFeedback = new Feedback({
      nombre,
      fechaDeCreacion,
      link,
      descripcion,
      imagen: imagenUrl,
    });

    await newFeedback.save();

    // Enviar notificación
    await sendNotification(newFeedback, user.email, 'feedback_creation');

    // Retornar el feedback creado como respuesta
    return new Response(JSON.stringify(newFeedback), { status: 201 });
  } catch (error) {
    console.error('Error en la creación de feedback:', error);
    return new Response('Error al crear feedback', { status: 500 });
  }
}
