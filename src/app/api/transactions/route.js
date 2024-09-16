import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function POST(request) {
  // Body request example
  // const example = {
  //   trans_amount: 16000,
  //   trans_payment_method: "TRANSFERENCIA",
  //   trans_cat_id: 2,
  //   trans_description: "Municipalidad, Aguas Cordobesas",
  //   trans_user_id: "montivero.marcio@gmail.com",
  //   trans_date: "2024-09-16",
  // };

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
      where: { email: data.trans_user_id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if (
      typeof data.trans_payment_method !== "string" ||
      data.trans_payment_method.trim() === ""
    ) {
      return NextResponse.json(
        {
          message: "Transaction payment method name must be a non-empty string",
        },
        { status: 400 }
      );
    }

    if (typeof data.trans_amount !== "number" || data.trans_amount <= 0) {
      return NextResponse.json(
        { message: "Transaction amount must by distinc of cero" },
        { status: 400 }
      );
    }

    const categoryExists = await db.transaction_category.findMany({
      where: {
        trans_cat_id: data.trans_cat_id,
      },
    });

    if (categoryExists.length === 0) {
      return NextResponse.json(
        { message: "Category does not exist" },
        { status: 409 }
      );
    }

    const newTransaction = await db.transactions.create({
      data: {
        trans_payment_method: data.trans_payment_method.toUpperCase(),
        trans_amount: data.trans_amount,
        trans_cat_id: data.trans_cat_id,
        trans_description: data.trans_description,
        trans_user_id: user.id,
        trans_date: new Date(data.trans_date).toISOString(),
      },
      include: {
        transaction_category: true,
      },
    });

    const formatedNewTransaction = {
      trans_payment_method: newTransaction.trans_payment_method,
      trans_amount: newTransaction.trans_amount,
      trans_cat_id: newTransaction.trans_cat_id,
      l_trans_cat_name: newTransaction.transaction_category.trans_cat_name,
      trans_description: newTransaction.trans_description,
      trans_user_id: user.email,
      trans_date: new Date(newTransaction.trans_date)
        .toISOString()
        .split("T")[0],
    };

    return NextResponse.json(
      {
        message: "Transaction category successfully created",
        data: formatedNewTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving transaction category: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  // URL params Example
  // http://localhost:3000/api/transactions?fecha_desde=2024-09-01&fecha_hasta=2024-09-30

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
    let transactions;

    if (fecha_desde && fecha_hasta) {
      let startDate = new Date(fecha_desde);
      let endDate = new Date(fecha_hasta);

      if (isNaN(startDate) || isNaN(endDate)) {
        return NextResponse.json(
          { message: "Invalid date format. Use YYYY-MM-DD." },
          { status: 400 }
        );
      }

      if (startDate > endDate) {
        [startDate, endDate] = [endDate, startDate];
      }

      transactions = await db.transactions.findMany({
        where: {
          trans_date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          transaction_category: true,
          user: true,
        },
      });
    } else {
      transactions = await db.transactions.findMany({
        include: {
          transaction_category: true,
          user: true,
        },
      });
    }

    const formatedTransactions = transactions.map((item) => ({
      trans_id: item.trans_id,
      trans_date: item.trans_date.toISOString().split("T")[0],
      trans_amount: item.trans_amount,
      trans_payment_method: item.trans_payment_method,
      trans_description: item.trans_description,
      trans_cat_id: item.trans_cat_id,
      l_trans_type_name: item.transaction_category.trans_cat_name,
      l_user_email: item.user.email,
    }));

    return NextResponse.json(
      { message: "GET transaction response", data: formatedTransactions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting transaction", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }
  console.log("METHOD:", request.method);
  console.log("URL:", request.url);
  return NextResponse.json({ message: "PUT request handled" }, { status: 200 });
}

export async function DELETE(request) {
  console.log("METHOD:", request.method);
  console.log("URL:", request.url);
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request) {
  console.log("METHOD:", request.method);
  console.log("URL:", request.url);
  return NextResponse.json(
    { message: "PATCH request handled" },
    { status: 200 }
  );
}
