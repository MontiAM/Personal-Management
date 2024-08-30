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
    const user = await db.user.findUnique({
      where: { email: data.email_user },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    console.log(data);

    const newIncome = await db.daily_incomes.create({
      data: {
        income_date: new Date(data.income_date),
        income_category: data.income_category,
        income_description: data.income_description,
        income_amount: data.income_amount,
        income_source: data.income_source,
        income_location: data.income_location,
        income_notes: data.income_notes,
        user_id: user.id,
      },
    });

    return NextResponse.json(newIncome, { status: 201 });
  } catch (error) {
    console.error("Error creating income: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  // http://localhost:3000/api/incomes?fecha_desde=2024-08-01&fecha_hasta=2024-08-31

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
    let incomes;

    if (fecha_desde && fecha_hasta) {
        const startDate = new Date(fecha_desde);
        const endDate = new Date(fecha_hasta);
  
        if (isNaN(startDate) || isNaN(endDate)) {
          return NextResponse.json(
            { message: "Invalid date format. Use YYYY-MM-DD." },
            { status: 400 }
          );
        }
  
        incomes = await db.daily_incomes.findMany({
          where: {
            income_date: {
              gte: startDate, // Greater than or equal to startDate
              lte: endDate, // Less than or equal to endDate (inclusive)
            },
          },
          include: {
            user: {
              select: {
                email: true, // Select only the 'email' field
              },
            },
          },
        });
      } else {
        incomes = await db.daily_incomes.findMany({
          include: {
            user: {
              select: {
                email: true, // Select only the 'email' field
              },
            },
          },
        });
      }

    incomes = incomes.map((income) => ({
        ...income,
        // email: income.user.email, 
        income_date: income.income_date.toISOString().split('T')[0], 
      }));
  
      return NextResponse.json(incomes, { status: 200 });
  } catch (error) {
    console.error("Error fetching incoms: ", error);
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
