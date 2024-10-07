import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { valid: false, message: "Token not provided" },
      { status: 404 }
    );
  }

  try {
    const user = await db.User.findMany({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        { valid: false, message: "Invalid token" },
        { status: 404 }
      );
    }

    const tokenExpiryDate = new Date(user[0].resetTokenExpiry);

    if (tokenExpiryDate.getTime() < Date.now()) {
      return NextResponse.json(
        { valid: false, message: "Token has expired" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Error fetching token: ", error.message);
    return NextResponse.json(
      { valid: false, message: "Error verifying token" },
      { status: 500 }
    );
  }
}
