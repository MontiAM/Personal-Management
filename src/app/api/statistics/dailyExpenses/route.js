import { NextResponse } from "next/server";
import db from "@/libs/db";
import getPreviousMonthRange from "@/util/getPreviousMonthRange";
import formatDate from "@/util/formatDate";

export async function GET(request) {
  // http://localhost:3000/api/statistics/dailyExpenses?fecha_desde=2024-08-01&fecha_hasta=2024-08-31

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
        by: ["expense_date"],
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
        by: ["expense_date"],
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
        expense_date: formatDate(item.expense_date),
      }));

      const transformedPreviousPeriod = totalExpensesPrevious.map((item) => ({
        expense_amount: item._sum.expense_amount,
        expense_date: formatDate(item.expense_date),
      }));      

      transformedCurrentPeriod.sort((a, b) => {
        const dateA = new Date(a.expense_date);
        const dateB = new Date(b.expense_date);
        return dateA - dateB;
      });

      transformedPreviousPeriod.sort((a, b) => {
        const dateA = new Date(a.expense_date);
        const dateB = new Date(b.expense_date);
        return dateA - dateB;
      });

      return NextResponse.json(
        {
          currentPeriod: transformedCurrentPeriod,
          previousPeriod: transformedPreviousPeriod
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching daily expenses: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
