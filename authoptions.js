import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@/db/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const authOptions = {
  // adapter: PrismaAdapter(prisma), //if we use social login , then its usefull
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }

        if (!user || !user.hashedPassword) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isPasswordCorrect) {
          return null;
        }

        const completeUserObject = {
          name: user.username,
          email: user.email,
        };
        return completeUserObject;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

