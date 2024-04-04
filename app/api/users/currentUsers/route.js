// import { NextResponse } from "next/server";
// import serverAuth from "../../../../lib/serverAuth";

// export async function GET(req, res) {
//   try {
//     const { currentUser } = await serverAuth(req, res);
//     console.log(currentUser);
//     return NextResponse.json(currentUser);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Not authorized" }, { status: 401 });
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions} from "@/authoptions"
import serverAuth from "@/lib/serverAuth";

export async function GET(req, res) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session)
    //   return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    // const currentUser = await prisma.user.findUnique({
    //   where: {
    //     email: session.user.email,
    //   },
    // });
    // if (!currentUser)
    //   return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    // return NextResponse.json(currentUser, { status: 200 });
    const { currentUser } = await serverAuth(req, res);
    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }
}
