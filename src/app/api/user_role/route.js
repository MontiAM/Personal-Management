import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
  try {

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const roleId = searchParams.get("rol_id");

    let userRoleList;

    if (userId) {
      userRoleList = await db.user_role.findMany({
        where: {
          uro_user_id: Number(userId),
        },
        include: {
          user: true,
          role: true,
        },
      });
    } else if (roleId) {
      userRoleList = await db.user_role.findMany({
        where: {
          uro_rol_id: Number(roleId),
        },
        include: {
          user: true,
          role: true,
        },
      });
    } else {
      userRoleList = await db.user_role.findMany({
        include: {
          user: true,
          role: true,
        },
      });
    }

    const formaterUserRoleList = userRoleList.map((item) => ({
      uro_id: item.uro_id,
      uro_user_id: item.uro_user_id,
      l_email: item.user.email,
      uro_rol_id: item.uro_rol_id,
      l_rol_name: item.role.rol_name,
    }));

    return NextResponse.json(
      { message: "GET Role response.", data: formaterUserRoleList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error GET user_role: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
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

    const userRole = await db.user_role.findFirst({
      where: {
        uro_user_id: data.uro_user_id,
        uro_rol_id: data.uro_rol_id,
      },
    });

    if (userRole) {
      return NextResponse.json({ message: "User already have the role" });
    }

    const newUserRole = await db.user_role.create({
      data: {
        uro_user_id: data.uro_user_id,
        uro_rol_id: data.uro_rol_id,
      },
      include: {
        user: true,
        role: true
      },
    });

    const formaterNewUserRole = {
      uro_id: newUserRole.uro_id,
      uro_user_id: newUserRole.uro_user_id,
      l_email: newUserRole.user.email,
      uro_rol_id: newUserRole.uro_rol_id,
      l_rol_name: newUserRole.role.rol_name
    };

    return NextResponse.json(
      { message: "user_role succsessfully crated", data: formaterNewUserRole },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error POST user_role: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
