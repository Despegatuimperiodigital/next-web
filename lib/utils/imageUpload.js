import fs from 'fs';
import path from 'path';

export async function handleImageUpload(image) {
  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.resolve(process.cwd(), 'public', 'uploads');

    // Crear directorio si no existe
    try {
      await fs.promises.access(uploadDir, fs.constants.F_OK);
    } catch {
      await fs.promises.mkdir(uploadDir, { recursive: true });
      console.log('Directorio de subida creado:', uploadDir);
    }

    const imagePath = path.join(uploadDir, image.name);
    await fs.promises.writeFile(imagePath, buffer);
    console.log('Imagen guardada en:', imagePath);

    return `/uploads/${image.name}`;
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    return null;
  }
}

export async function handleDataUrlUpload(dataUrl) {
  try {
    // Convertir el Data URL en un Buffer
    const base64Data = dataUrl.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');

    const uploadDir = path.resolve(process.cwd(), 'public', 'uploads');

    // Crear directorio si no existe
    try {
      await fs.promises.access(uploadDir, fs.constants.F_OK);
    } catch {
      await fs.promises.mkdir(uploadDir, { recursive: true });
      console.log('Directorio de subida creado:', uploadDir);
    }

    // Generar un nombre de archivo único
    const filename = `screenshot-${Date.now()}.png`;
    const filePath = path.join(uploadDir, filename);

    // Guardar el archivo
    await fs.promises.writeFile(filePath, buffer);
    console.log('Screenshot guardado en:', filePath);

    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error al procesar el Data URL:', error);
    return null;
  }
}
