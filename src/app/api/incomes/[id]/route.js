import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function GET(req) {
  
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
        { message: "Invalid ID format"},
        { status: 400}
      );
    }    

    const income = await db.daily_incomes.findUnique({
      where: {income_id: parseInt(id, 10)}
    })

    if (!income) {
      return NextResponse.json(
        { message: "Income not found"},
        { status: 404}
      )
    }

    console.log(income);

    return NextResponse.json(
        income ,
      { status: 200 }
    );


  } catch (error) {
    console.error("Error fetching income", error);
    return NextResponse.json(
      { message: error.message},
      { status: 500}
    );
  }
}

export async function PUT(req) {

  
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

    const data = await req.json();

    const existingIncome = await db.daily_incomes.findUnique({
      where: { income_id: parseInt(id, 10) },
    });

    if (!existingIncome) {
      return NextResponse.json(
        { message: "Income not found" },
        { status: 404 }
      );
    }

    const updatedIncome = await db.daily_incomes.update({
      where: { income_id: parseInt(id, 10) },
      data: {
        income_date: data.income_date ? new Date(data.income_date) : existingIncome.income_date,
        income_category: data.income_category ?? existingIncome.income_category,
        income_description: data.income_description ?? existingIncome.income_description,
        income_amount: data.income_amount ?? existingIncome.income_amount,
        income_payment_method: data.income_payment_method ?? existingIncome.income_payment_method,
        income_location: data.income_location ?? existingIncome.income_location,
        income_notes: data.income_notes ?? existingIncome.income_notes,
        updated_at: new Date(), // Set the updated_at field to the current date
      },
    });

    return NextResponse.json(updatedIncome, { status: 200 });

  } catch (error) {
    console.error("Error updating income:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
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
        { message: "Invalid ID format"},
        { status: 400}
      );
    }    

    const income = await db.daily_incomes.findUnique({
      where: {income_id: parseInt(id, 10)}
    })

    if (!income) {
      return NextResponse.json(
        { message: "Income not found"},
        { status: 404}
      )
    }

    await db.daily_incomes.delete({
      where: { income_id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Income deleted successfully" },
      { status: 200 }
    );


  } catch (error) {
    console.error("Error fetching income", error);
    return NextResponse.json(
      { message: error.message},
      { status: 500}
    );
  }
}
