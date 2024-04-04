import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import prisma from "@/db/prismadb";
export async function POST(req, res) {
  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = await req.json();

    const post = await prisma.Post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(
      { message: "post created", post },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
