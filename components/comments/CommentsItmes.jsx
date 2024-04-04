"use client";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avaters from "../avaters/Avaters";
import useCurrentUser from "@/hooks/useCurrentUser";

function CommentsItmes({ data }) {
  const router = useRouter();

  // const Gotousers = useCallback((event) => {
  //     event.stopPropagation();
  //     router.push(`/Users/${comment?.user?.id}`);
  // } , [router, comment?.user?.id])

  // const CreateAt = useMemo(() => {
  //     if (comment?.createdAt) {
  //         return formatDistanceToNowStrict(new Date(comment?.comment?.createdAt));
  //     }
  //     return null;
  // } , [comment?.comment?.createdAt])

  const CommentsAccess = data?.comments?.map((comment) => (
    <Avaters key={comment?.id} UserId={comment?.userId} />
  ));

  return (
    <>
      {data?.comments?.map((comment) => (
        <div
          key={comment?.id}
          className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-[#191919] transition"
        >
          <div className="flex flex-row gap-3 items-start">
            <Avaters key={comment?.id} UserId={comment?.userId} />
            <div>
              <div className="flex flex-row items-center gap-2">
                <p className="text-white font-semibold hover:underline text-[13px] cursor-pointer">
                  {comment?.username}
                </p>
                <span className="text-neutral-500 text-sm">
                  {comment?.createdAt
                    ? formatDistanceToNowStrict(new Date(comment?.createdAt))
                    : null}
                </span>
              </div>
              <div className="text-white mt-1">{comment?.body}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CommentsItmes;
