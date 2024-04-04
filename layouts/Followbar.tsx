"use client";
import React from "react";
import useUsers from "@/hooks/useUsers";
import Avaters from "@/components/avaters/Avaters";
import useSingalUsers from "@/hooks/useSingalUsers";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import useFollow from "@/hooks/useFollow";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";

function Followbar() {
  const { userId } = useUserStore((state) => ({ userId: state.userId }));
  const { data: users = [], isLoading, isError } = useUsers();
  // const { users, error, isLoading } = useSingalUsers(UserId);
  const { data } = useCurrentUser();

  const { isFollowing, toggleFollow } = useFollow(userId);

  // console.log(users);

  if (!users) {
    return null;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  // current users profile don't show in the users list to follow
  const filteredUsers = users.users.filter(
    (usersss) => usersss.id !== data?.id
  );

  return (
    <div className="bg-[#16181c] p-5 ml-8 mt-8 w-[30%] rounded-lg mr-12 h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink scrollbar-track-transparent">
      <h1 className="text-[24px] font-extrabold text-white">Who to follow </h1>
      <div className="flex flex-col gap-4 mt-4">
        {filteredUsers.map((user: Record<string, any>) => (
          <div key={user.id} className="flex flex-row gap-4 mb-3 cursor-pointer">
            <Avaters UserId={user.id} />
            <div className="flex flex-col">
              <p className="text-white capitalize text-[14px]">{user.username}</p>
              <p className="text-[#C7C8CC] text-[11.8px]">@{user.username}</p>
            </div>
            <Button
              variant="ghost"
              className="ml-auto bg-accent hover:text-accent-foreground"
            >
              <Link href={`/Users/${user.id}`}>Profile</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Followbar;
