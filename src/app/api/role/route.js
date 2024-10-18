import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
  try {
    const rolesList = await db.role.findMany();
    return NextResponse.json(
      { message: "GET Role response.", data: rolesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching GET Role: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();    

    if (typeof data.rol_name !== "string" || data.rol_name.trim() === "") {
      return NextResponse.json(
        { message: "Role name must by a non-empty string" },
        { status: 400 }
      );
    }

    const exists = await db.role.findMany({
      where: {
        rol_name: data.rol_name.toUpperCase(),
      },
    });

    if (exists.length > 0) {
      return NextResponse.json(
        { message: "Role already exists" },
        { status: 409 }
      );
    }

    const newRole = await db.role.create({
      data: {
        rol_name: data.rol_name.toUpperCase(),
      }
    })

    return NextResponse.json(
      { message: "POST role response.", data: newRole },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error POST Role: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
