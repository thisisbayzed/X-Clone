import prisma from "@/db/prismadb";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    const post = await prisma.Post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ message: "Get all users success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
