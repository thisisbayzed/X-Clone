// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import prisma from "@/db/prismadb";
// import { NextResponse } from "next/server";

// const serverAuth = async (req, res) => {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session?.user?.email) {
//     // throw new Error("Not signed in");
//     return NextResponse.json({ message: "Not signed in" }, { status: 401 });
//   }

//   const currentUser = await prisma.user.findUnique({
//     where: {
//       email: session?.user?.email,
//     },
//   });

//   if (!currentUser) {
//     // throw new Error("Not signed in");
//     return NextResponse.json({ message: "Not signed in" }, { status: 401 });
//   }

//   return NextResponse.json({ currentUser }, { status: 200 });
// };

// export default serverAuth;

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions} from "@/authoptions"


const serverAuth = async (req, res) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    return { currentUser };
  } catch (error) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }
};

export default serverAuth;