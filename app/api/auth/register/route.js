import prisma from "@/db/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request, response) {
  try {
    const { email, username, hashedPassword } = await request.json();

    const ExiestingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (ExiestingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    } else {
      const Password = await bcrypt.hash(hashedPassword, 12);
      const user = await prisma.user.create({
        data: {
          email,
          username,
          hashedPassword: Password,
        },
      });
      return NextResponse.json(
        { message: "User created successfully", user },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
