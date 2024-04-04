import prisma from "@/db/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ message: "success", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
