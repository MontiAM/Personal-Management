import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const user = await db.user.findUnique({
      where: { email: data.email_user },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    console.log(data);

    const newExpense = await db.daily_expenses.create({
      data: {
        expense_date: new Date(data.expense_date),
        expense_category: data.expense_category,
        expense_description: data.expense_description,
        expense_amount: data.expense_amount,
        expense_payment_method: data.expense_payment_method,
        expense_location: data.expense_location,
        expense_notes: data.expense_notes,
        user_id: user.id,
        // created_at: new Date(), // Current date and time
        // updated_at: new Date(), // Current date and time
      },
    });

    return NextResponse.json(newExpense, { status: 201 });

  } catch (error) {
    console.error("Error creating expense:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  return NextResponse.json({ message: "GET request handled" }, { status: 200 });
}

export async function PUT(req) {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  return NextResponse.json({ message: "PUT request handled" }, { status: 200 });
}

export async function DELETE(req) {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(req) {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  return NextResponse.json(
    { message: "PATCH request handled" },
    { status: 200 }
  );
}
