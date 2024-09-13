import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function GET(request) {
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
    const transType = await db.transaction_type.findUnique({
      where: { trans_type_id: parseInt(id, 10) },
      select: {
        trans_type_id: true,
        trans_type_name: true,
        trans_type_created_at: true,
      },
    });

    if (!transType) {
      return NextResponse.json(
        { message: "Transaction type not found" },
        { status: 400 }
      );
    }

    const formaterTransType = {
      ...transType,
      trans_type_created_at: transType.trans_type_created_at
        .toISOString()
        .split("T")[0],
    };

    return NextResponse.json(formaterTransType, { status: 200 });
  } catch (error) {
    console.error("Error fetching transaction type: ", error.message);
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
    const transType = await db.transaction_type.findUnique({
      where: { trans_type_id: parseInt(id, 10) },
    });

    if (!transType) {
      return NextResponse.json(
        { message: "Transaction type not found" },
        { status: 400 }
      );
    }

    const data = await request.json();

    if (
      typeof data.trans_type_name !== "string" ||
      data.trans_type_name.trim() === ""
    ) {
      return NextResponse.json(
        { message: "Transaction type name must be a non-empty string" },
        { status: 400 }
      );
    }

    const updatedTransType = await db.transaction_type.update({
      where: { trans_type_id: parseInt(id, 10) },
      data: {
        trans_type_name: data.trans_type_name.toUpperCase(),
        trans_type_updated_at: new Date(),
      },
    });

    const formaterUpdatedTransType = {
      trans_type_id: updatedTransType.trans_type_id,
      trans_type_name: updatedTransType.trans_type_name,
      trans_type_updated_at: updatedTransType.trans_type_updated_at
        .toISOString()
        .split("T")[0],
    };

    return NextResponse.json(
      {
        message: "Transaction type succesfully updated",
        data: formaterUpdatedTransType,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transaction type: ", error.message);
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

    const transType = await db.transaction_type.findUnique({
      where: { trans_type_id: parseInt(id, 10) },
    });

    if (!transType) {
      return NextResponse.json(
        { message: "Transaction type not found" },
        { status: 404 }
      );
    }

    await db.transaction_type.delete({
      where: { trans_type_id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Transaction type deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction type", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
