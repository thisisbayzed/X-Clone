import prisma from "@/db/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const searchParam = req.nextUrl.searchParams;
    const id = searchParam.get("id");
    console.log(id.toString());

    const post = await prisma.post.findMany({
      where: {
        id: id,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "success Indivisual post", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
