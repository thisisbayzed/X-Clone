import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions} from "@/authoptions"
// import serverAuth from "@/lib/serverAuth";
import prisma from "@/db/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function PUT(req, res) {
  try {
    const { currentUser } = await serverAuth(req, res);
    const { name, username, bio, profileImage, image } = await req.json();
    if (!name || !username) {
      return NextResponse.json(
        { message: "Name and username are required" },
        { status: 400 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        image,
      },
    });
    return NextResponse.json(
      { message: "success", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
