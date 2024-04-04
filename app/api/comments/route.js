import { NextResponse } from "next/server";
import prisma from "@/db/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(req, res) {
  try {
    const { currentUser } = await serverAuth(req);
    const { body } = await req.json();
    const searchParam = req.nextUrl.searchParams;
    const postid = searchParam.get("id");

    if (!postid) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const comments = await prisma.Comment.create({
      data: {
        body,
        userId: currentUser.id,
        username: currentUser.username,
        postId: postid,
      },
    });

    // notifications for user
    try {
      const postnotifications = await prisma.post.findUnique({
        where: {
          id: postid,
        },
      });

      if (postnotifications?.userId) {
        await prisma.notification.create({
          data: {
            body: `${currentUser.username} commented on your tweets 💤💭`,
            userId: postnotifications.userId,
          },
        });
      }

      await prisma.user.update({
        where: {
          id: postnotifications?.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log(error);
    }

    // notifications end

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
