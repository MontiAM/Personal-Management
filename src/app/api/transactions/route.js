import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function POST(request) {
  // Body request example
  // const example = {
  //   trans_amount: 16000,
  //   trans_payment_method_id: 1,
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
  const requiredFields = [
    "trans_amount",
    "trans_payment_method_id",
    "trans_cat_id",
    "trans_user_id",
    "trans_date",
  ];

  try {
    const data = await request.json();

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `El campo ${field} está vacío o es nulo.` },
          { status: 400 }
        );
      }
    }

    if (isNaN(data.trans_payment_method_id) || isNaN(data.trans_cat_id)) {
      return NextResponse.json(
        { message: 'trans_payment_method_id y trans_cat_id deben ser números.' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: data.trans_user_id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
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

    const paymentMethodExists = await db.payment_methods.findMany({
      where: {
        pay_method_id: data.trans_payment_method_id,
      },
    });

    if (paymentMethodExists.length === 0) {
      return NextResponse.json(
        { message: "Payment method does not exist" },
        { status: 409 }
      );
    }

    const newTransaction = await db.transactions.create({
      data: {
        trans_payment_method_id: data.trans_payment_method_id,
        trans_amount: data.trans_amount,
        trans_cat_id: data.trans_cat_id,
        trans_description: data.trans_description,
        trans_user_id: user.id,
        trans_date: new Date(data.trans_date).toISOString(),
      },
      include: {
        transaction_category: true,
        payment_methods: true,
      },
    });

    const formatedNewTransaction = {
      trans_payment_method_id: newTransaction.trans_payment_method_id,
      l_pay_method_name: newTransaction.payment_methods.pay_method_name,
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
          transaction_category: {
            include: {
              transaction_type: true,  
            },
          },
          payment_methods: true,
          user: true,
        },
      });
    } else {
      transactions = await db.transactions.findMany({
        include: {
          transaction_category: {
            include: {
              transaction_type: true,  
            },
          },
          payment_methods: true,
          user: true,
        },
      });
    }

    const formatedTransactions = transactions.map((item) => ({
      trans_id: item.trans_id,
      trans_date: item.trans_date.toISOString().split("T")[0],
      trans_amount: item.trans_amount,
      trans_description: item.trans_description,
      l_trans_type_id: item.transaction_category.transaction_type.trans_type_id,
      l_trans_type_name: item.transaction_category.transaction_type.trans_type_name,
      trans_cat_id: item.trans_cat_id,
      l_trans_cat_name: item.transaction_category.trans_cat_name,
      trans_payment_method_id: item.trans_payment_method_id,
      l_pay_method_name: item.payment_methods.pay_method_name,
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
