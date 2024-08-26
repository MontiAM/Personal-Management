import { NextResponse } from "next/server";
import { authOptions  } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
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
        user_id: user.id
      },
    });

    return NextResponse.json(newExpense, { status: 201 });

  } catch (error) {
    console.error("Error creating expense:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request) {  
  // http://localhost:3000/api/expenses?fecha_desde=2024-08-01&fecha_hasta=2024-08-31

  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }

  try {
    const { searchParams } = new URL(request.url);
    const fecha_desde = searchParams.get("fecha_desde");
    const fecha_hasta = searchParams.get("fecha_hasta");

    let expenses;

    if (fecha_desde && fecha_hasta) {
      const startDate = new Date(fecha_desde);
      const endDate = new Date(fecha_hasta);

      if (isNaN(startDate) || isNaN(endDate)) {
        return NextResponse.json(
          { message: "Invalid date format. Use YYYY-MM-DD." },
          { status: 400 }
        );
      }

      expenses = await db.daily_expenses.findMany({
        where: {
          expense_date: {
            gte: startDate, // Greater than or equal to startDate
            lte: endDate, // Less than or equal to endDate (inclusive)
          },
        },
        include: {
          user: true,
        },
      });
    } else {
      expenses = await db.daily_expenses.findMany({
        include: {
          user: true,
        },
      });
    }

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
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
