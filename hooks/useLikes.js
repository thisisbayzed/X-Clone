"use client";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import usePosts from "./usePosts";
import useSingalPost from "./useSingalPost";

function useLikes({ postId, UserId }) {
  const { data } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } =
    useSingalPost(postId);
  const { mutate: mutateFetchedUser } = usePosts(UserId); //when we enter the userprofie its reflect

  const isLiked = useMemo(() => {
    const list = fetchedPost?.post[0].likedIds || [];
    return list.includes(data?.id);
  }, [fetchedPost, data]);

  // console.log("data", data?.id, "fetchedPost", );
  // const test = fetchedPost?.post[0].likedIds == data?.id
  // console.log("test", test);

  // console.log(
  //   "isLiked",
  //   isLiked,
  //   "postId",
  //   postId,
  //   "UserId",
  //   UserId,
  //   "currentUser",
  //   data?.id
  // );

  const toggleLike = useCallback(async () => {
    if (!data) {
      return toast.error("Login First To Like");
    }

    try {
      let request;

      if (isLiked) {
        request = () =>
          axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/likes/unLikes`,
            {
              data: { postId },
            }
          );
        toast.success("Post Unliked");
      } else {
        request = () =>
          axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/likes/like`, {
            postId,
          });

        toast.success("Post Liked");
      }

      await request();
      mutateFetchedPost();
      mutateFetchedUser();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [data, isLiked, postId, mutateFetchedPost, mutateFetchedUser]);

  return { isLiked, toggleLike };
}

export default useLikes;
