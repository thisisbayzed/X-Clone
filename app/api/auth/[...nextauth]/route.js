import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@/db/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { authOptions} from "@/authoptions"



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
