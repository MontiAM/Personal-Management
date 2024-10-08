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
      typeof data.trans_type_name !== "string" ||
      data.trans_type_name.trim() === ""
    ) {
      return NextResponse.json(
        { message: "Transaction type name must be a non-empty string" },
        { status: 400 }
      );
    }

    const exists = await db.transaction_type.findMany({
      where: {
        trans_type_name: data.trans_type_name.toUpperCase(),
      }
    })
    
    if (exists.length > 0) {
      return NextResponse.json(
        { message: "Transaction type already exists" },
        { status: 409 }
      );
    }


    const newTransaction = await db.transaction_type.create({
      data: {
        trans_type_name: data.trans_type_name.toUpperCase(),
      },
    });
    return NextResponse.json({message: "POST transaction_type response", data: newTransaction}, { status: 200 });
  } catch (error) {
    console.error("Error fetching transaction type: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 

export async function GET(request) {

  try {
    const listTransType = await db.transaction_type.findMany({
      select: {
        trans_type_id: true,
        trans_type_name: true,
        trans_type_created_at: true,
      },
    });

    const formattedListTransType = listTransType.map((transType) => ({
      trans_type_id: transType.trans_type_id,
      trans_type_name: transType.trans_type_name,
      // trans_type_created_at: transType.trans_type_created_at
      //   .toISOString()
      //   .split("T")[0], 
    }));

    return NextResponse.json(
      { message: "GET transaction_type response", data: formattedListTransType },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting transactions type", error);
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
