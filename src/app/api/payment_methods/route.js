import { NextResponse } from "next/server";
import db from "@/libs/db";


export async function POST(request) {
  try {
    const data = await request.json();

    if (
      typeof data.pay_method_name !== "string" ||
      data.pay_method_name.trim() === ""
    ) {
      return NextResponse.json(
        { message: "Payment method must by a non-empty string" },
        { status: 400 }
      );
    }

    const exists = await db.payment_methods.findMany({
      where: {
        pay_method_name: data.pay_method_name.toUpperCase(),
      },
    });

    if (exists.length > 0) {
      return NextResponse.json(
        { message: "Payment method already exists" },
        { status: 409 }
      );
    }

    const newPaymentMethod = await db.payment_methods.create({
      data: {
        pay_method_name: data.pay_method_name.toUpperCase(),
      },
    });

    return NextResponse.json(
      { message: "POST payment_method response.", data: newPaymentMethod },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching payment method: ", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request) {

    try {
      const listPaymentMethod = await db.payment_methods.findMany();
  
      return NextResponse.json(
        { message: "GET transaction_type response", data: listPaymentMethod },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error getting transactions type", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  
