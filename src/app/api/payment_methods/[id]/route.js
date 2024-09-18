import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const paymentMethod = await db.payment_methods.findUnique({
        where: { pay_method_id: parseInt(id, 10) },
      });

    if (!paymentMethod) {
      return NextResponse.json(
        { message: "Payment method not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "GET payment method response", data: paymentMethod },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching payment method: ", error.message);
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
  
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();
  
      if (isNaN(parseInt(id, 10))) {
        return NextResponse.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }
      const paymentMethod = await db.payment_methods.findUnique({
        where: { pay_method_id: parseInt(id, 10) },
      });
  
      if (!paymentMethod) {
        return NextResponse.json(
          { message: "Payment method not found" },
          { status: 400 }
        );
      }
  
      const data = await request.json();
  
      if (
        typeof data.pay_method_name !== "string" ||
        data.pay_method_name.trim() === ""
      ) {
        return NextResponse.json(
          { message: "Transaction type name must be a non-empty string" },
          { status: 400 }
        );
      }
  
      const updatedPaymentMethod = await db.payment_methods.update({
        where: { pay_method_id: parseInt(id, 10) },
        data: {
            pay_method_name: data.pay_method_name.toUpperCase(),
        },
      });
  
      return NextResponse.json(
        {
          message: "Payment method succesfully updated",
          data: updatedPaymentMethod,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching transaction type: ", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  

export async function DELETE(req) {
    // const session = await getServerSession(authOptions);
  
    // if (!session) {
    //   return NextResponse.json({
    //     message: "Unauthorized"
    //   }, {
    //     status: 401
    //   })
    // }
  
    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
  
      if (isNaN(parseInt(id, 10))) {
        return NextResponse.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }
  
      const paymentMethod = await db.payment_methods.findUnique({
        where: { pay_method_id: parseInt(id, 10) },
      });
  
      if (!paymentMethod) {
        return NextResponse.json(
          { message: "Payment method not found" },
          { status: 404 }
        );
      }
  
      await db.payment_methods.delete({
        where: { pay_method_id: parseInt(id, 10) },
      });
  
      return NextResponse.json(
        {
          message: "Payment method deleted successfully",
          data: paymentMethod,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting transaction type", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  
