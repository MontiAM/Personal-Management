import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";
import getPreviousMonthRange from "@/helpers/getPreviousMonthRange";

export async function GET(request) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }

  // http://localhost:3000/api/statistics/totalExpenses?fecha_desde=2024-08-01&fecha_hasta=2024-08-31

  try {
    const { searchParams } = new URL(request.url);
    const fecha_desde = searchParams.get("fecha_desde");
    const fecha_hasta = searchParams.get("fecha_hasta");

    if (fecha_desde && fecha_hasta) {
      const startDate = new Date(fecha_desde);
      const endDate = new Date(fecha_hasta);

      if (isNaN(startDate) || isNaN(endDate)) {
        return NextResponse.json(
          { message: "Invalid date format. Use YYYY-MM-DD." },
          { status: 400 }
        );
      }

      const previousMonthRange = getPreviousMonthRange(startDate);

      const totalExpensesCurrent = await db.daily_expenses.groupBy({
        by: ["expense_category"],
        where: {
          expense_date: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: {
          expense_amount: true,
        },
      });

      const totalExpensesPrevious = await db.daily_expenses.groupBy({
        by: ["expense_category"],
        where: {
          expense_date: {
            gte: previousMonthRange.startDate,
            lte: previousMonthRange.endDate,
          },
        },
        _sum: {
          expense_amount: true,
        },
      });

      const transformedCurrentPeriod = totalExpensesCurrent.map((item) => ({
        expense_amount: item._sum.expense_amount,
        expense_category: item.expense_category,
      }));

      const transformedPreviousPeriod = totalExpensesPrevious.map((item) => ({
        expense_amount: item._sum.expense_amount,
        expense_category: item.expense_category,
      }));

      return NextResponse.json(
        {
          currentPeriod: transformedCurrentPeriod,
          previousPeriod: transformedPreviousPeriod,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching total expenses: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "GET response" }, { status: 200 });
}
