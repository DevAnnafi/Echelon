import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    users: [
      { id: 1, name: "Annafi" },
      { id: 2, name: "Echelon User" },
    ],
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json(
    {
      success: true,
      user: body,
    },
    { status: 201 }
  );
}
