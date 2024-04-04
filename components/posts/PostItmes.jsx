"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Avaters from "../avaters/Avaters";
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useLikes from "@/hooks/useLikes";
import { toast } from "react-hot-toast";

function PostItmes({ UserId, data }) {
  const Router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isLiked, toggleLike } = useLikes({
    postId: data?.id,
    UserId: UserId,
  });

  const HandleProfileGo = useCallback(
    (event) => {
      event.stopPropagation();
      const url = `/Users/${data?.user?.id}`;
      Router.push(url);
    },
    [Router, data?.user?.id]
  );

  const HandlePostGo = useCallback(
    (event) => {
      const url = `/post/${data?.id}`;
      Router.push(url);
    },
    [Router, data?.id]
  );

  const CreatedAt = useMemo(() => {
    if (data?.createdAt) {
      return formatDistanceToNowStrict(new Date(data?.createdAt));
    }
    return null;
  }, [data?.createdAt]);

  const Handlelikes = useCallback(
    (event) => {
      event.stopPropagation();

      if (!currentUser) {
        return toast.error("You must be logged in to like a post");
      }

      toggleLike();
    },
    [currentUser, toggleLike]
  );

  const Likeicons = isLiked ? AiFillHeart : AiOutlineHeart;

  console.log(isLiked);

  return (
    <div
      onClick={HandlePostGo}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-[#191919] transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avaters UserId={data?.user?.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={HandleProfileGo}
              className="text-white text-[15px] font-semibold cursor-pointer hover:underline"
            >
              {data?.user?.username}
            </p>
            <span
              onClick={HandleProfileGo}
              className="text-neutral-500 cursor-pointer hover:underline text-[13px] hidden md:block"
            >
              @{data?.user?.username}
            </span>
            <span className="text-neutral-500 text-[13px]">{CreatedAt}</span>
          </div>
          <div className="text-white w-[410px] text-[14px]">{data?.body}</div>
          <div className="flex flex-row items-center mt-4 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-[#50C4ED]">
              <AiOutlineMessage size={20} />
              <p>{data?.comments?.length || 0}</p>
            </div>
            <div
              onClick={Handlelikes}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-[#ff6572]"
            >
              <Likeicons size={20} color={isLiked ? "red" : ""} />
              <p>{data?.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItmes;
