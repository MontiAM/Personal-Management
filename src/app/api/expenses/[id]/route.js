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

    const expense = await db.daily_expenses.findUnique({
      where: {expense_id: parseInt(id, 10)}
    })

    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found"},
        { status: 404}
      )
    }

    console.log(expense);

    return NextResponse.json(
      expense ,
      { status: 200 }
    );


  } catch (error) {
    console.error("Error fetching expense", error);
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

    const existingExpense = await db.daily_expenses.findUnique({
      where: { expense_id: parseInt(id, 10) },
    });

    if (!existingExpense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 404 }
      );
    }

    const updatedExpense = await db.daily_expenses.update({
      where: { expense_id: parseInt(id, 10) },
      data: {
        expense_date: data.expense_date ? new Date(data.expense_date) : existingExpense.expense_date,
        expense_category: data.expense_category ?? existingExpense.expense_category,
        expense_description: data.expense_description ?? existingExpense.expense_description,
        expense_amount: data.expense_amount ?? existingExpense.expense_amount,
        expense_payment_method: data.expense_payment_method ?? existingExpense.expense_payment_method,
        expense_location: data.expense_location ?? existingExpense.expense_location,
        expense_notes: data.expense_notes ?? existingExpense.expense_notes,
        updated_at: new Date(), // Set the updated_at field to the current date
      },
    });

    return NextResponse.json(updatedExpense, { status: 200 });

  } catch (error) {
    console.error("Error updating expense:", error);
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

    const expense = await db.daily_expenses.findUnique({
      where: {expense_id: parseInt(id, 10)}
    })

    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found"},
        { status: 404}
      )
    }

    await db.daily_expenses.delete({
      where: { expense_id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Expense deleted successfully" },
      { status: 200 }
    );


  } catch (error) {
    console.error("Error fetching expense", error);
    return NextResponse.json(
      { message: error.message},
      { status: 500}
    );
  }
}
