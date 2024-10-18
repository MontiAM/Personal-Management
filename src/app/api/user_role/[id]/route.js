import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const userRole = await db.user_role.findUnique({
      where: {
        uro_id: parseInt(id, 10),
      },
      include: {
        user: true,
        role: true,
      },
    });

    if (!userRole) {
      return NextResponse.json(
        { message: "User role not found" },
        { status: 400 }
      );
    }

    const formaterUserRole = {
      uro_id: userRole.uro_id,
      uro_user_id: userRole.uro_user_id,
      l_email: userRole.user.email,
      uro_rol_id: userRole.uro_rol_id,
      l_rol_name: userRole.role.rol_name,
    };

    return NextResponse.json(
      { message: "GET User Role response", data: formaterUserRole },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user_role ID: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const userRole = await db.user_role.findUnique({
      where: { uro_id: parseInt(id, 10) },
    });

    if (!userRole) {
      return NextResponse.json(
        { message: "User role not found" },
        { status: 400 }
      );
    }

    const res = await request.json();

    if (!res.uro_user_id || !res.uro_rol_id) {
      return NextResponse.json({ message: "Role and user must exist" });
    }

    const data = {
      uro_user_id: Number(res.uro_user_id),
      uro_rol_id: Number(res.uro_rol_id),
    };

    if (isNaN(data.uro_user_id) || isNaN(data.uro_rol_id)) {
      return NextResponse.json({
        message: "User ID and Role ID must be valid numbers",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: data.uro_user_id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User does not exist" });
    }

    const role = await db.role.findUnique({
      where: {
        rol_id: data.uro_rol_id,
      },
    });

    if (!role) {
      return NextResponse.json({ message: "Role does not exist" });
    }

    const updatedUserRole = await db.user_role.update({
      where: {
        uro_id: parseInt(id, 10),
      },
      data: {
        uro_user_id: data.uro_user_id,
        uro_rol_id: data.uro_rol_id,
      },
      include: {
        user: true,
        role: true,
      },
    });

    const formaterUpdatedUserRole = {
      uro_id: updatedUserRole.uro_id,
      uro_user_id: updatedUserRole.uro_user_id,
      l_email: updatedUserRole.user.email,
      uro_rol_id: updatedUserRole.uro_rol_id,
      l_rol_name: updatedUserRole.role.rol_name,
    };

    return NextResponse.json(
      {
        message: "user_role succsessfully updated",
        data: formaterUpdatedUserRole,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error PUT user_role id: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const deletedUserRole = await db.user_role.findUnique({
      where: { uro_id: parseInt(id, 10) },
      include: {
        user: true,
        role: true,
      },
    });

    if (!deletedUserRole) {
      return NextResponse.json(
        { message: "User role not found" },
        { status: 404 }
      );
    }

    await db.user_role.delete({
      where: { uro_id: parseInt(id, 10) },
    });

    const formaterDeletedUserRole = {
      uro_id: deletedUserRole.uro_id,
      uro_user_id: deletedUserRole.uro_user_id,
      l_email: deletedUserRole.user.email,
      uro_rol_id: deletedUserRole.uro_rol_id,
      l_rol_name: deletedUserRole.role.rol_name,
    };

    return NextResponse.json(
      { message: "User role successfully deleted", data: formaterDeletedUserRole },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error DELETE user_role id: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
