import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // o tu servidor SMTP
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // configura estas variables en .env
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request) {
  try {
    const { nombre, email, mensaje } = await request.json()

    const mailOptions = {
      from: email,
      to: "soporte@team.cloudhub.cl",
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      text: mensaje,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
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