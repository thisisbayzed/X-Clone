import { NextResponse } from "next/server";
import prisma from "@/db/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function DELETE(req, res) {
  try {
    const { currentUser } = await serverAuth(req);
    const { postId } = await req.json();

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    let updatedLikesIds = [...(post.likedIds || [])];
    updatedLikesIds = updatedLikesIds.filter((id) => id !== currentUser.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikesIds,
      },
    });

    return NextResponse.json({ updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
