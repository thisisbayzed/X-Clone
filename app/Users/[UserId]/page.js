"use client";
import React, { useEffect } from "react";
import Headers from "@/components/headers/Headers";
import useSingalUsers from "@/hooks/useSingalUsers";
import ClipLoader from "react-spinners/ClipLoader";
import UsersHero from "@/components/users/UsersHero";
import UsersBio from "@/components/users/UsersBio";
import PostFeeds from "@/components/posts/PostFeeds";
import useUserStore from "@/store/userStore";

function Users({ params }) {
  const UserId = params.UserId;
  const { users, error, isLoading } = useSingalUsers(UserId);

  const { setUserId } = useUserStore((state) => ({
    setUserId: state.setUserId,
  }));

  // useEffect(() => {
  //   setUserId(UserId);
  // } , [UserId]);

  // console.log(UserId, users?.user.id);

  if (isLoading || !users) {
    return (
      <div className="  border-l-[1px] ml-16 border-r-[1px] border-[#31363F] w-[54%]">
        <Headers>Users Profile</Headers>
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#50C4ED" size={80} />
        </div>
      </div>
    );
  }

  return (
    <div className="  border-l-[1px] ml-16 border-r-[1px] border-[#31363F] w-[54%]  overflow-y-auto scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent">
      <Headers>{users?.user.username}</Headers>
      <UsersHero UserId={users?.user.id} />
      <UsersBio UserId={users?.user.id} />
      <PostFeeds UserId={UserId} />
    </div>
  );
}

export default Users;
