import { NextResponse } from "next/server";
import db from "../../../../libs/db";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const { email } = await req.json();  

  // Verificar si el usuario existe
  const user = await db.User.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // // Crear token de restablecimiento
  const resetToken = uuidv4();
  const resetTokenExpiry = new Date();
  resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

  // // Actualizar el usuario con el token y la expiración
  await db.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });
  
  // Enviar el correo electrónico de restablecimiento
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset_password?token=${resetToken}`;
  await transporter.sendMail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
  });

  return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
}

export function GET() {
  return NextResponse.json(
    { message: `Method GET Not Allowed` },
    { status: 405 }
  );
}
