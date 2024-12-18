'use server'

import nodemailer from 'nodemailer'
import fs from 'fs/promises'
import path from 'path'

export async function sendMenuEmail(recipientEmail: string) {
  // Create a test account using Ethereal
  const testAccount = await nodemailer.createTestAccount()

  // Create a transporter using the test account
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  // Read the image file
  const imagePath = path.join(process.cwd(), 'public', 'menu-example.pdf')
  const imageContent = await fs.readFile(imagePath)

  // Create the email options
  const mailOptions = {
    from: '"Apacha" <noreply@apacha.com>',
    to: recipientEmail,
    subject: "Descubri nuestro menu semanal y tentate!",
    html: `
      <h1>¡Nuestro Menú Semanal!</h1>
      <p>Hola,</p>
      <p>Aquí tienes nuestro delicioso menú para esta semana. ¡Esperamos que te tiente!</p>
      <img src="cid:weeklyMenu" alt="Menu Semanal" style="max-width: 100%;">
      <p>¡Buen provecho!</p>
      <p>El equipo de Apacha</p>
    `,
    attachments: [{
      filename: 'menu-image.jpg',
      content: imageContent,
      cid: 'weeklyMenu'
    }]
  }

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully")
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}