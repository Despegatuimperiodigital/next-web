import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_HOST) {
    console.error('Faltan variables de entorno para el correo')
    return NextResponse.json({
      error: "Error de configuración del servidor"
    }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    const { nombre, email, mensaje } = await request.json()

    // Validar los datos recibidos
    if (!nombre || !email || !mensaje) {
      return NextResponse.json({
        error: "Todos los campos son requeridos"
      }, { status: 400 })
    }

    const mailOptions = {
      from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`, // Remitente verificado
      to: "soporte@team.cloudhub.cl",
      replyTo: email, // Para que las respuestas vayan al email del usuario
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Mensaje: ${mensaje}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F33F31;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${mensaje}</p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      message: "Mensaje enviado correctamente"
    }, { status: 200 })

  } catch (error) {
    console.error('Error al enviar el email:', error)
    return NextResponse.json({
      error: "Error al enviar el mensaje"
    }, { status: 500 })
  }
}