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
    const transCategory = await db.transaction_category.findFirst({
      where: { trans_cat_id: parseInt(id, 10) },
      include: {
        transaction_type: true,
      },
    });

    if (!transCategory) {
      return NextResponse.json(
        { message: "Transaction category not found" },
        { status: 400 }
      );
    }

    const formatertransCategory = {
      trans_cat_id: transCategory.trans_cat_id,
      trans_cat_name: transCategory.trans_cat_name,
      trans_cat_trans_type_id: transCategory.trans_cat_trans_type_id,
      l_trans_type_name: transCategory.transaction_type.trans_type_name,
      trans_cat_status: transCategory.trans_cat_status,
    };

    return NextResponse.json(
      {
        message: "GET transaction_category id response",
        data: formatertransCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transaction category: ", error.message);
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
    const transCategory = await db.transaction_category.findUnique({
      where: { trans_cat_id: parseInt(id, 10) },
    });

    if (!transCategory) {
      return NextResponse.json(
        { message: "Transaction category not found" },
        { status: 400 }
      );
    }

    const data = await request.json();

    if (
      typeof data.trans_cat_name !== "string" ||
      data.trans_cat_name.trim() === ""
    ) {
      return NextResponse.json(
        { message: "Transaction category name must be a non-empty string" },
        { status: 400 }
      );
    }

    const existsType = await db.transaction_type.findUnique({
      where: {trans_type_id: data.trans_cat_trans_type_id}
    })

    if (!existsType) {
      return NextResponse.json(
        { message: "Transaction type not found" },
        { status: 400 }
      );
    }
    

    const updatedTransCategory = await db.transaction_category.update({
      where: { trans_cat_id: parseInt(id, 10) },
      data: {
        trans_cat_name: data.trans_cat_name.toUpperCase(),
        trans_cat_trans_type_id: data.trans_cat_trans_type_id,
        trans_cat_updated_at: new Date(),
      },
      include: {
        transaction_type: true,
      },
    });

    const formattedTransCategory = {
      trans_cat_id: updatedTransCategory.trans_cat_id,
      trans_cat_name: updatedTransCategory.trans_cat_name,
      trans_cat_trans_type_id: updatedTransCategory.trans_cat_trans_type_id,
      l_trans_type_name: updatedTransCategory.transaction_type.trans_type_name, // Now this should work
      trans_cat_status: updatedTransCategory.trans_cat_status,
    };


    return NextResponse.json(
      {
        message: "Transaction category succesfully updated",
        data: formattedTransCategory,
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

    const transCategory = await db.transaction_category.findUnique({
      where: { trans_cat_id: parseInt(id, 10) },
      include: {
        transaction_type: true,
      },
    });

    if (!transCategory) {
      return NextResponse.json(
        { message: "Transaction category not found" },
        { status: 404 }
      );
    }

    await db.transaction_category.delete({
      where: { trans_cat_id: parseInt(id, 10) },
    });

    const formatertransCategory = {
      trans_cat_id: transCategory.trans_cat_id,
      trans_cat_name: transCategory.trans_cat_name,
      trans_cat_trans_type_id: transCategory.trans_cat_trans_type_id,
      l_trans_type_name: transCategory.transaction_type.trans_type_name,
      trans_cat_status: transCategory.trans_cat_status,
    };

    return NextResponse.json(
      { message: "Transaction category successfully deleted", data: formatertransCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction type", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
