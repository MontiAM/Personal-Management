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

    const role = await db.role.findUnique({
        where: { rol_id: parseInt(id, 10) },
      });

    if (!role) {
      return NextResponse.json(
        { message: "Role not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "GET Role response", data: role },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching role: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({
    //     message: "Unauthorized"
    //   }, {
    //     status: 401
    //   })
    // }
  
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();
  
      if (isNaN(parseInt(id, 10))) {
        return NextResponse.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }
      const role = await db.role.findUnique({
        where: { rol_id: parseInt(id, 10) },
      });
  
      if (!role) {
        return NextResponse.json(
          { message: "Role not found" },
          { status: 400 }
        );
      }
  
      const data = await request.json();
  
      if (
        typeof data.rol_name !== "string" ||
        data.rol_name.trim() === ""
      ) {
        return NextResponse.json(
          { message: "Role name must be a non-empty string" },
          { status: 400 }
        );
      }
  
      const updatedRole = await db.role.update({
        where: { rol_id: parseInt(id, 10) },
        data: {
            rol_name: data.rol_name.toUpperCase(),
        },
      });
  
      return NextResponse.json(
        {
          message: "Role succesfully updated",
          data: updatedRole,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching role: ", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  

export async function DELETE(req) {
    // const session = await getServerSession(authOptions);
  
    // if (!session) {
    //   return NextResponse.json({
    //     message: "Unauthorized"
    //   }, {
    //     status: 401
    //   })
    // }
  
    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
  
      if (isNaN(parseInt(id, 10))) {
        return NextResponse.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }
  
      const role = await db.role.findUnique({
        where: { rol_id: parseInt(id, 10) },
      });
  
      if (!role) {
        return NextResponse.json(
          { message: "Role not found" },
          { status: 404 }
        );
      }
  
      await db.role.delete({
        where: { rol_id: parseInt(id, 10) },
      });
  
      return NextResponse.json(
        {
          message: "Role deleted successfully",
          data: role,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting role", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  
