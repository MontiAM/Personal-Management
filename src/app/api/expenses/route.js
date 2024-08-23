import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("Method:", req.method);

  return NextResponse.json(
    {
      message: "Expenses",
    },
    {
      status: 200,
    }
  );
}
