"use client";
import Image from "next/image";
import React from 'react';
import useSingalUsers from "../../hooks/useSingalUsers";

function BigAvaters({UserId}) {
    const { users, isLoading, isError } = useSingalUsers(UserId);
    console.log("why not woking" , users);
    return (
        <div className="w-24 h-24 inset-2  rounded-full outline-dashed outline-2 outline-offset-2 outline-[#40A2E3]">
          <Image style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}  fill src={users?.user?.profileImage || "/images/placeholder.png"} alt="Avatarss"/>  
        </div>
    );
}

export default BigAvaters;