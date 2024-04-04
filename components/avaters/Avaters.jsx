"use client";
import React from "react";
import useSingalUsers from "@/hooks/useSingalUsers";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Avaters({ UserId , isLarge, hasBorder , feed }) {
  const Router = useRouter();
  const { users, isLoading, isError } = useSingalUsers(UserId);
  // console.log(users);

  const HandleProfile = (event) => {
    event.stopPropagation();
    const url = `/Users/${UserId}`;
    Router.push(url);
  };

  return (
    <div   className={`
    ${hasBorder ? 'border-4 border-black' : ''}
    ${isLarge ? 'h-32' : 'h-12'}
    ${isLarge ? 'w-32' : 'w-12'}
    ${feed ? 'h-10' : 'h-12'}
    ${feed ? 'w-10' : 'w-12'}
    rounded-full 
    hover:opacity-90 
    transition 
    cursor-pointer
    relative
  `} >
      <Image   style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }} fill src={users?.user?.profileImage || "/images/placeholder.png"} alt="Avatar" onClick={HandleProfile}/>
    </div>
  );
}

export default Avaters;
