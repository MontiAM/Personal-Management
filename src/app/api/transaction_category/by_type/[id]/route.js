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
    const type_id = url.pathname.split("/").pop();

    if (isNaN(parseInt(type_id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }
    const newTransCat = await db.transaction_category.findMany({
      where: { trans_cat_trans_type_id: parseInt(type_id, 10) },
      select: {
        trans_cat_id: true, 
        trans_cat_name: true, 
      },
    });

    return NextResponse.json(
      {
        message: "GET transaction_category by type response",
        data: newTransCat,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving transaction category: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
