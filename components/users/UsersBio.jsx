"use client";
import React, { useMemo } from "react";
import { compareAsc, format } from "date-fns";
import useSingalUsers from "@/hooks/useSingalUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession, signIn, signOut } from "next-auth/react";
import { BiCalendar } from "react-icons/bi";
import EditeProfiles from "@/components/edites/EditeProfiles";
import useFollow from "@/hooks/useFollow";

function UsersBio({ UserId }) {
  const { data } = useCurrentUser();
  console.log(data);
  const { users, error, isLoading } = useSingalUsers(UserId);
  // const { data: session, status } = useSession();
  // console.log(session);
  // console.log(data);

  // console.log("singalusers" , users.followersCount);

  // const { hasUserFollowed, toggleFollow } = useFollow(UserId);

  const { isFollowing, toggleFollow } = useFollow(UserId);

  const createdAt = useMemo(() => {
    if (users?.user?.createdAt) {
      return format(new Date(users?.user?.createdAt), "MMMM yyyy");
    }
    return null;
  }, [users?.user?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {data?.id === UserId ? (
          <EditeProfiles />
        ) : (
          <button onClick={toggleFollow} className="text-black font-bold hover:text-[#50C4ED] rounded-[28px] transition bg-white px-4 py-1">
            {/* {hasUserFollowed ? "Unfollow" : "Follow"} */} {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className="mt-4 px-6">
        <div className="flex flex-col">
          <p className="text-white font-bold text-[18px] capitalize">
            {users?.user?.username}
          </p>
          <p className="text-[#C7C8CC] text-[13px] lowercase">
            @{users?.user?.username}
          </p>
        </div>
        <div className=" flex flex-col mt-4">
          <p className="text-[#C7C8CC] text-[13px]">{users?.user?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar className="text-[#C7C8CC] text-[21px]" />
            <p className="text-[#C7C8CC] text-[13px]">Joined {createdAt}</p>
          </div>
        </div>
        <div className="mt-4 gap-6 flex flex-row items-center">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white font-bold text-[18px]">
              {users?.user?.followingIds?.length}
            </p>
            <p className="text-[#C7C8CC] text-[13px]">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white font-bold text-[18px]">
              {users?.followersCount || 0}
            </p>
            <p className="text-[#C7C8CC] text-[13px]">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersBio;
