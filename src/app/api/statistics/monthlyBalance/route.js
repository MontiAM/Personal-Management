import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
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

      const balance = await db.$queryRaw`
        SELECT 
          COALESCE(i.year, e.year) as year,
          COALESCE(i.month, e.month) as month,
          COALESCE(i.total_income, 0.0) as total_income,
          COALESCE(e.total_expense, 0.0) as total_expense,
          COALESCE(i.total_income, 0.0) - COALESCE(e.total_expense, 0.0) as balance
        FROM
          (SELECT 
            EXTRACT(MONTH FROM "income_date") as month, 
            EXTRACT(YEAR FROM "income_date") as year, 
            SUM("income_amount") as total_income
          FROM "daily_incomes"
          WHERE "income_date" BETWEEN ${startDate} AND ${endDate}
          GROUP BY year, month
          ) i
        FULL OUTER JOIN
          (SELECT 
            EXTRACT(MONTH FROM "expense_date") as month, 
            EXTRACT(YEAR FROM "expense_date") as year, 
            SUM("expense_amount") as total_expense
          FROM "daily_expenses"
          WHERE "expense_date" BETWEEN ${startDate} AND ${endDate}
          GROUP BY year, month
          ) e
        ON i.year = e.year AND i.month = e.month
        ORDER BY year ASC, month ASC;
      `;

      const formattedBalance = balance.map((item) => ({
        year: Number(item.year),
        month: Number(item.month),
        total_income: Number(item.total_income),
        total_expense: Number(item.total_expense),
        balance: Number(item.balance),
      }));

      return NextResponse.json(formattedBalance, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching monthly balance: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
