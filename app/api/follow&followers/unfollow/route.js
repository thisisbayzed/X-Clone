// import { NextResponse } from "next/server";
// import serverAuth from "@/lib/serverAuth";
// import prisma from "@/db/prismadb";

// export async function DELETE(req, res) {
//   try {
//     const { currentUser } = await serverAuth(req, res);
//     const { UserId } = await req.json();
//     if (!UserId) {
//       return NextResponse.json(
//         { message: "userId is required" },
//         { status: 400 }
//       );
//     }
//     const user = await prisma.user.findUnique({
//       where: {
//         id: UserId,
//       },
//     });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//     let updatedFollowingIds = [...(user.followingIds || [])];
//     updatedFollowingIds = updatedFollowingIds.filter(id => id !== UserId);
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: {
//         followingIds: updatedFollowingIds,
//       },
//     });
//     return NextResponse.json(
//       { message: "success", updatedUser },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: "error", error }, { status: 500 });
//   }
// }
