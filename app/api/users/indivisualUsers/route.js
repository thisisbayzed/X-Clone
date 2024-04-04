import prisma from "@/db/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const searchParam = req.nextUrl.searchParams;
  const id = searchParam.get("id");

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: id,
        },
      },
    });

    if (user === null) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "success", user, followersCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
