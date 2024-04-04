import { NextResponse } from "next/server";
import prisma from "@/db/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req, res) {
  try {
    const { currentUser } = await serverAuth(req);

    if (!currentUser) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
