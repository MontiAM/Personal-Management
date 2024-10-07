import { NextResponse } from "next/server";
import db from "@/libs/db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"; // Asegúrate de instalar bcrypt

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Verificar que el token y la nueva contraseña estén presentes
    if (!data.token || !data.password) {
      return NextResponse.json(
        { valid: false, message: "Token and password are required" },
        { status: 400 }
      );
    }

    // Encuentra al usuario por el token de restablecimiento
    const user = await db.User.findMany({
      where: {
        resetToken: data.token,
      },
    });

    if (!user[0]) {
      return NextResponse.json(
        { valid: false, message: "Invalid token" },
        { status: 404 }
      );
    }

    // Asegúrate de que el token no haya expirado (asumiendo que ya tienes la fecha de expiración)
    if (!user[0].resetTokenExpiry || user[0].resetTokenExpiry < new Date()) {
      return NextResponse.json(
        { valid: false, message: "Token has expired" },
        { status: 400 }
      );
    }

    const id = user[0].id;
    const newPassword = data.password;

    // Hashear la nueva contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newResetToken = uuidv4();

    await db.User.update({
      where: { id },
      data: {
        password: hashedPassword, // Guardar la contraseña hasheada
        resetToken: newResetToken, // Limpiar el token de restablecimiento
        resetTokenExpiry: null, // Limpiar la fecha de expiración
      },
    });

    return NextResponse.json(
      { message: "New password successfully reset", valid: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error posting new password: ", error.message);
    return NextResponse.json(
      { valid: false, message: "Error POSTING new password" },
      { status: 500 }
    );
  }
}
