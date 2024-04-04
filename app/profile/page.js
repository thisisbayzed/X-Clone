"use client";
import Headers from "@/components/headers/Headers";
import UsersHero from "@/components/users/UsersHero";
import useCurrentUser from "@/hooks/useCurrentUser";
import UsersBio from "@/components/users/UsersBio";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PostFeeds from "@/components/posts/PostFeeds";

function Profile() {
  const { data, error, isLoading } = useCurrentUser();
  console.log(data);

  if (isLoading || !data) {
    return (
      <div className=" ml-16  border-l-[1px] border-r-[1px] border-[#31363F] w-[54%]">
        <Headers>Users Profile</Headers>
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#50C4ED" size={80} />
        </div>
      </div>
    );
  }

  return (
    <div className="ml-16  border-l-[1px] border-r-[1px] border-[#31363F] w-[54%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent">
      <Headers>{data?.username}</Headers>
      <UsersHero UserId={data?.id} />
      <UsersBio UserId={data?.id} />
      <PostFeeds UserId={data?.id} />
    </div>
  );
}

export default Profile;
