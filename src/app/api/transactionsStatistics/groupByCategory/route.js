import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function GET(request) {
  // http://localhost:3000/api/transactionsStatistics/groupByCategory?fecha_desde=2024-09-01&fecha_hasta=2024-09-30
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
    const catId = searchParams.get("id");

    if (fecha_desde && fecha_hasta) {
      const startDate = new Date(fecha_desde);
      const endDate = new Date(fecha_hasta);

      if (isNaN(startDate) || isNaN(endDate)) {
        return NextResponse.json(
          { message: "Invalid date format. Use YYYY-MM-DD" },
          { status: 400 }
        );
      }

      if (catId && isNaN(parseInt(catId, 10))) {
        return NextResponse.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }

      const totalGroupByCategory = await db.transactions.groupBy({
        by: ["trans_cat_id"],
        where: {
          trans_date: {
            gte: startDate,
            lte: endDate,
          },
          ...(catId && { trans_cat_id: parseInt(catId) }), // Filtra solo si catId está presente
        },
        _sum: {
          trans_amount: true,
        },
      });

      const categoryIds = totalGroupByCategory.map((item) => item.trans_cat_id);
      const categories = await db.transaction_category.findMany({
        where: {
          trans_cat_id: {
            in: categoryIds,
          },
        },
        select: {
          trans_cat_id: true,
          trans_cat_name: true,
          trans_cat_trans_type_id: true,
          transaction_type: {
            select: {
              trans_type_name: true,
            },
          },
        },
      });

      const result = totalGroupByCategory.map((item) => {
        const category = categories.find(
          (cat) => cat.trans_cat_id === item.trans_cat_id
        );
        return {
          trans_cat_id: item.trans_cat_id,
          trans_cat_name: category ? category.trans_cat_name : "Unknown",
          trans_cat_trans_type_id: category
            ? category.trans_cat_trans_type_id
            : null,
          l_trans_type_name: category
            ? category.transaction_type.trans_type_name
            : "Unknown",
          total_amount: item._sum.trans_amount,
        };
      });

      return NextResponse.json(
        { message: "GET groupByCategory response", data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Missing fecha_desde or fecha_hasta query parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching groupByCategory: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
