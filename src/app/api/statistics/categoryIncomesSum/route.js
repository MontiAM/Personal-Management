import { NextResponse } from "next/server";
// import { authOptions } from "../auth/[...nextauth]/route";
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

  // http://localhost:3000/api/statistics/totalIncomes?fecha_desde=2024-08-01&fecha_hasta=2024-08-31
//   http://localhost:3000/api/statistics/totalIncomes?fecha_desde=2024-08-01&fecha_hasta=2024-08-31&income_category=Work

  try {
    const { searchParams } = new URL(request.url);
    const fecha_desde = searchParams.get("fecha_desde");
    const fecha_hasta = searchParams.get("fecha_hasta");
    const category = searchParams.get("income_category");

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

      const queryOptions = {
        by: ["income_category"],
        where: {
          income_date: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: {
          income_amount: true,
        },
      };
      const queryPreviousOptions = {
        by: ["income_category"],
        where: {
          income_date: {
            gte: previousMonthRange.startDate,
            lte: previousMonthRange.endDate,
          },
        },
        _sum: {
          income_amount: true,
        },
      };


      if (category) {
        queryOptions.where.income_category = category;
        queryPreviousOptions.where.income_category = category;
      }

      const totalIncomesCurrent = await db.daily_incomes.groupBy(queryOptions);
      const totalIncomesPrevious = await db.daily_incomes.groupBy(queryPreviousOptions);

      const transformedCurrentPeriod = totalIncomesCurrent.map((item) => ({
        income_amount: item._sum.income_amount,
        income_category: item.income_category,
      }));

      const transformedPreviousPeriod = totalIncomesPrevious.map((item) => ({
        income_amount: item._sum.income_amount,
        income_category: item.income_category,
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
    console.error("Error fetching total incomes: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "GET response" }, { status: 200 });
}
