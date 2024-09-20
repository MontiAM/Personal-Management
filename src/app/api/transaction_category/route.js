import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function POST(request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }

  try {
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

    const exists = await db.transaction_category.findMany({
      where: {
        trans_cat_name: data.trans_cat_name.toUpperCase(),
      }
    })

    if (exists.length > 0) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 }
      );
    }

    const newTransCat = await db.transaction_category.create({
      data: {
        trans_cat_name: data.trans_cat_name.toUpperCase(),
        trans_cat_trans_type_id: parseInt(data.trans_cat_trans_type_id),
      },
      include: {
        transaction_type: true,
      },
    });

    const formaterNewTransCat = {
      trans_cat_id: newTransCat.trans_cat_id,
      trans_cat_name: newTransCat.trans_cat_name,
      trans_cat_trans_type_id: newTransCat.trans_cat_trans_type_id,
      l_trans_type_name: newTransCat.transaction_type.trans_type_name,
      // trans_cat_status: newTransCat.trans_cat_status,
      // trans_cat_description: newTransCat.trans_cat_description,
      // trans_cat_created_at: newTransCat.trans_cat_created_at
      //   .toISOString()
      //   .split("T")[0],
    };

    return NextResponse.json(
      {
        message: "Transaction category successfully created",
        data: formaterNewTransCat,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving transaction category: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

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

    const newTransCat = await db.transaction_category.findMany({
      include: {
        transaction_type: true, 
      },
    });

    const formaterNewTransCat = newTransCat.map((cat) => ({
      trans_cat_id: cat.trans_cat_id,
      trans_cat_name: cat.trans_cat_name,
      trans_cat_trans_type_id: cat.trans_cat_trans_type_id,
      l_trans_type_name: cat.transaction_type.trans_type_name, 
      // trans_cat_status: cat.trans_cat_status,
    }));

    return NextResponse.json(
      { message: "GET transaction_category response", data: formaterNewTransCat },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving transaction category: ", error.message);
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
  console.log("METHOD:", request.method);
  console.log("URL:", request.url);
  return NextResponse.json({ message: "PUT request handled" }, { status: 200 });
}

export async function DELETE(request) {
  console.log("METHOD:", request.method);
  console.log("URL:", request.url);
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request) {
  console.log("METHOD:", request.method);
  console.log("URL:", request.url);
  return NextResponse.json(
    { message: "PATCH request handled" },
    { status: 200 }
  );
}
