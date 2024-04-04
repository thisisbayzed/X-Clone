// import { NextResponse } from "next/server";
// import serverAuth from "@/lib/serverAuth";
// import prisma from "@/db/prismadb";

// export async function POST(req, res) {
//   try {
//     const { currentUser } = await serverAuth(req, res);
//     // const { userId } = req.body;
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

//     if(UserId === currentUser.id) {
//       return NextResponse.json({ message: "You cannot follow yourself" }, { status: 400 });
//     }

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // let updatedFollowingIds = [(user.followingIds || [])];
//     let updatedFollowingIds = [...(user.followingIds || [])];

//     updatedFollowingIds.push(UserId); //use body id / or use current user id

//     // if (updatedFollowingIds.includes(currentUser.id)) {
//     //     updatedFollowingIds = updatedFollowingIds.filter((id) => id !== currentUser.id);
//     // } else {
//     //     updatedFollowingIds.push(currentUser.id);
//     // }

//     const updatedUser = await prisma.user.update({
//       where: {
//         id: currentUser.id, //you can also use currentUser.id // in my case it was userId
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
