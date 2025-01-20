import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function GET(request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const transactionData = await db.transactions.findUnique({
      where: { trans_id: parseInt(id, 10) },
      include: {
        transaction_category: true,
        payment_methods: true,
        user: true,
      },
    });

    if (!transactionData) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 400 }
      );
    }

    const formatedTransactionData = {
      trans_id: transactionData.trans_id,
      trans_date: transactionData.trans_date.toISOString().split("T")[0],
      trans_amount: transactionData.trans_amount,
      trans_payment_method: transactionData.trans_payment_method,
      trans_description: transactionData.trans_description,
      trans_cat_id: transactionData.trans_cat_id,
      l_trans_type_name: transactionData.transaction_category.trans_cat_name,
      trans_payment_method_id: transactionData.trans_payment_method_id,
      l_pay_method_name: transactionData.payment_methods.pay_method_name,
      l_user_email: transactionData.user.email,
    };

    console.log(formatedTransactionData);

    return NextResponse.json(
      {
        message: "GET transaction_type id response",
        data: formatedTransactionData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transaction type: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  // Example body put request
  // const example = {
  //   trans_amount: 11000,
  //   trans_payment_method: "TRANSFERENCIAA",
  //   trans_cat_id: 2,
  //   trans_description: "Epec",
  //   trans_user_id: "montivero.marcio@gmail.com",
  //   trans_date: "2024-09-10",
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
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const transactionData = await db.transactions.findUnique({
      where: { trans_id: parseInt(id, 10) },
      include: {
        transaction_category: true,
        user: true,
      },
    });

    if (!transactionData) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const user = await db.user.findUnique({
      where: { email: data.trans_user_id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if (data.trans_amount == 0) {
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
        pay_method_id: data.trans_payment_method_id
      }
    })

    if (paymentMethodExists.length === 0) {
      return NextResponse.json(
        { message: "PAyment method does not exist" },
        { status: 409 }
      );
    }

    const updatedTransaction = await db.transactions.update({
      where: { trans_id: parseInt(id, 10) },
      data: {
        trans_date: new Date (data.trans_date),
        trans_amount: parseFloat(data.trans_amount),
        trans_payment_method_id: data.trans_payment_method_id,
        trans_description: data.trans_description,
        trans_cat_id: data.trans_cat_id,
        trans_updated_at: new Date()
      },
      include: {
        transaction_category: true,
        payment_methods: true
      },
    });

    const formatedUpdatedTransaction = {
      trans_id: updatedTransaction.trans_id,
      trans_amount: parseFloat(updatedTransaction.trans_amount),
      trans_payment_method_id: updatedTransaction.trans_payment_method_id,
      l_pay_method_name: updatedTransaction.payment_methods.pay_method_name,
      trans_cat_id: updatedTransaction.trans_cat_id,
      l_trans_cat_name: updatedTransaction.transaction_category.trans_cat_name,
      trans_description: updatedTransaction.trans_description,
      trans_user_id: user.email,
      trans_date: new Date(updatedTransaction.trans_date)
        .toISOString()
        .split("T")[0],
    };

    return NextResponse.json(
      {
        message: "Transaction  succesfully updated",
        data: formatedUpdatedTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transaction: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const transactionData = await db.transactions.findUnique({
      where: { trans_id: parseInt(id, 10) },
      include: {
        transaction_category: true,
        payment_methods: true,
        user: true,
      },
    });

    if (!transactionData) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 400 }
      );
    }

    await db.transactions.delete({
      where: { trans_id: parseInt(id, 10) },
    });

    const formatedTransactionData = {
      trans_id: transactionData.trans_id,
      trans_date: transactionData.trans_date.toISOString().split("T")[0],
      trans_amount: transactionData.trans_amount,
      trans_payment_method_id: transactionData.trans_payment_method_id,
      l_pay_method_name: transactionData.payment_methods.pay_method_name,
      trans_description: transactionData.trans_description,
      trans_cat_id: transactionData.trans_cat_id,
      l_trans_type_name: transactionData.transaction_category.trans_cat_name,
      l_user_email: transactionData.user.email,
    };

    return NextResponse.json(
      {
        message: "Transaction successfully deleted",
        data: formatedTransactionData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleted transaction: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
