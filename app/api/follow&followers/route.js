import { NextResponse } from "next/server";
import prisma from "@/db/prismadb";
import serverAuth from "@/lib/serverAuth";

// export async function POST(req, res) {
//   try {
//     const { currentUser } = await serverAuth(req);

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

//     // if(UserId === currentUser.id) {
//     //     return NextResponse.json({ message: "You cannot follow yourself" }, { status: 400 });
//     // }

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     let updatedFollowingIds = [...(user.followingIds || [])];
//     // this id is our users id show can we follow , more details this is our url id
//     updatedFollowingIds.push(UserId);

//     const updatedUser = await prisma.user.update({
//       where: {
//         id: currentUser.id, //you can also use currentUser.id // in my case it was userId
//       },
//       data: {
//         followingIds: updatedFollowingIds,
//       },
//     });

//     return NextResponse.json({ updatedUser }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "error", error }, { status: 500 });
//   }
// }

// chatgapt code
export async function POST(req, res) {
  try {
    const { currentUser } = await serverAuth(req);
    const { UserId } = await req.json();

    if (!UserId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const userToFollow = await prisma.user.findUnique({
      where: {
        id: UserId,
      },
    });

    if (!userToFollow) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the current user is already following the user being followed
    if (currentUser.followingIds.includes(UserId)) {
      return NextResponse.json(
        { message: "You are already following this user" },
        { status: 400 }
      );
    }

    // Add the user being followed's UserId to the current user's followingIds
    const updatedFollowingIds = [...(currentUser.followingIds || []), UserId];

    // notification code
    try {
      await prisma.notification.create({
        data: {
          body: `${currentUser.username} followed you 😉😊`,
          userId: userToFollow.id,
        },
      });

      await prisma.user.update({
        where: {
          id: userToFollow.id,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log("error", error);
    }

    // Update the current user's followingIds with the new UserId
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

// chatgpt code

export async function DELETE(req, res) {
  try {
    const { currentUser } = await serverAuth(req);
    const { UserId } = await req.json();
    if (!UserId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: UserId,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    let updatedFollowingIds = [...(currentUser.followingIds || [])];
    updatedFollowingIds = updatedFollowingIds.filter((id) => id !== UserId);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

// export async function DELETE(req, res) {
//   try {
//     const { currentUser } = await serverAuth(req);
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
//     updatedFollowingIds = updatedFollowingIds.filter((id) => id !== currentUser.id);

//     const updatedUser = await prisma.user.update({
//       where: {
//         id: UserId,
//       },
//       data: {
//         followingIds: updatedFollowingIds,
//         // Subtract 1 from followersCount when someone unfollows
//         followersCount: {
//           decrement: 1
//         }
//       },
//     });

//     // Also update currentUser's followingIds
//     const updatedCurrentUser = await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: {
//         followingIds: {
//           // Remove UserId from currentUser's followingIds
//           set: updatedFollowingIds
//         }
//       }
//     });

//     return NextResponse.json({ updatedUser, updatedCurrentUser }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "error", error }, { status: 500 });
//   }
// }
