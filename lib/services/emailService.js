import transporter from '../transporter';

export const notifyAssignment = async (email, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: message.subject,
    text: message.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notificación de asignación enviada');
  } catch (error) {
    console.error('Error al enviar notificación de asignación:', error);
  }
};

export const notifyComment = async (email, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: message.subject,
    text: message.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notificación de comentario enviada');
  } catch (error) {
    console.error('Error al enviar notificación de comentario:', error);
  }
};

export const notifyFeedback = async (userEmail, feedbackMessage) => {
  const mailOptions = {
    from: userEmail,
    to: process.env.EMAIL_USER,
    subject: feedbackMessage.subject,
    text: feedbackMessage.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notificación de feedback enviada');
  } catch (error) {
    console.error('Error al enviar notificación de feedback:', error);
  }
};
