import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const userNameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (userNameFound) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);

  } catch (error) {
    
    return NextResponse({
        message: error.message
    }, {
        status: 500
    })
  }
}
