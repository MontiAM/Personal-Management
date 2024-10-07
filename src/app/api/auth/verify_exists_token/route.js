import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const user = await db.User.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { valid: false, message: "User do not exists" },
        { status: 404 }
      );
    }

    if (user.resetTokenExpiry) {
      const today = new Date();
      const tokenExpiryDate = new Date(user.resetTokenExpiry);
      if (tokenExpiryDate.getTime() > today.getTime()) {
        return NextResponse.json(
          { valid: true, message: "Exists token" },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { valid: false, message: "No exists token" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching verify_exists_token: ", error.message);
    return NextResponse.json(
      { valid: false, message: "Error verifying exists token" },
      { status: 500 }
    );
  }
}
