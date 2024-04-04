"use client";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useSingalUsers from "./useSingalUsers";

// function useFollow(UserId) {
//   const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
//   const { mutate: mutateFetchedUser } = useSingalUsers(UserId);

//   const hasUserFollowed = useMemo(() => {
//     const list = currentUser?.followingIds || [];
//     return list.includes(UserId);
//   }, [currentUser?.followingIds, UserId]);

//   const toggleFollow = useCallback(async () => {
//     if (!currentUser) {
//       return toast.error("Unauthorized");
//     }

//     try {
//       let result;
//       if (hasUserFollowed) {
//         result = await axios.delete(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/follow&followers/unfollow`,
//           { data: { UserId } }
//         );
//       } else {
//         result = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/follow&followers/followers`,
//           { UserId }
//         );
//       }
//       await result;
//       mutateCurrentUser();
//       mutateFetchedUser();
//       toast.success("Success");
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   }, [
//     UserId,
//     hasUserFollowed,
//     currentUser,
//     mutateCurrentUser,
//     mutateFetchedUser,
//   ]);

//   return {
//     hasUserFollowed,
//     toggleFollow,
//   };
// }

// export default useFollow;

function useFollow(UserId) {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useSingalUsers(UserId);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(UserId);
  }, [currentUser?.followingIds, UserId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return toast.error("Login First To Follow");
    }

    try {
      let result;

      if (isFollowing) {
        result = () =>
          axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/follow&followers`,
            {
              data: { UserId },
            }
          );
      } else {
        result = () =>
          axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/follow&followers`,
            { UserId }
          );
      }

      await result();
      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [UserId, isFollowing, currentUser, mutateCurrentUser, mutateFetchedUser]);

  return {
    isFollowing,
    toggleFollow,
  };
}

export default useFollow;
