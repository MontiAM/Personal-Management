import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fecha_desde = searchParams.get("fecha_desde");
    const fecha_hasta = searchParams.get("fecha_hasta");
    const typeId = searchParams.get("id");

    if (fecha_desde && fecha_hasta) {
      const startDate = new Date(fecha_desde);
      const endDate = new Date(fecha_hasta);

      if (isNaN(startDate) || isNaN(endDate)) {
        return NextResponse.json(
          { message: "Invalid date format. Use YYYY-MM-DD" },
          { status: 400 }
        );
      }

      if (typeId && isNaN(parseInt(typeId, 10))) {
        return NextResponse.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }

      const groupedTransactions = await db.$queryRaw`
      SELECT 
      CASE 
        WHEN tt.trans_type_classification = 'A' THEN 'AHORRO'
        WHEN tt.trans_type_classification = 'G' THEN 'GASTO'
        WHEN tt.trans_type_classification = 'I' THEN 'INGRESO'
        ELSE 'OTRO'  -- Optional: Handle any unexpected values
        END AS trans_type_classif,        SUM(t.trans_amount) AS total_amount
      FROM 
        transactions t
      JOIN 
        transaction_category tc ON t.trans_cat_id = tc.trans_cat_id
      JOIN 
        transaction_type tt ON tc.trans_cat_trans_type_id = tt.trans_type_id
      WHERE 
        t.trans_date >= ${startDate} AND t.trans_date <= ${endDate}
      GROUP BY 
        tt.trans_type_classification
    `;

      return NextResponse.json(
        {
          message: "GET groupByTypeClasif response",
          data: groupedTransactions,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Missing fecha_desde or fecha_hasta query parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching groupByTypeClasif: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
