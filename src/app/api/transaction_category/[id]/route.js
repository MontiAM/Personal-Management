import { NextResponse } from "next/server";
// import { authOptions  } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import db from "@/libs/db";

export async function POST(request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }
  console.log(request);
  return NextResponse.json({ message: "POST response" }, { status: 200 });
}

export async function GET(request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({
  //     message: "Unauthorized"
  //   }, {
  //     status: 401
  //   })
  // }
  console.log(request);
  return NextResponse.json({ message: "GET response" }, { status: 200 });
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
