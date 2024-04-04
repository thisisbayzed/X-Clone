"use client";
import React from "react";
import useSingalUsers from "@/hooks/useSingalUsers";
import Image from "next/image";
import Avaters from "../avaters/Avaters";
import BigAvaters from "../avaters/BigAvaters";

function UsersHero({ UserId }) {
  const { users, error, isLoading } = useSingalUsers(UserId);
//   console.log(UserId, users?.user.id);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {users?.user?.image && (
          <Image
            src={users.user.image}
            fill
            alt="cover-image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-10 left-5">
         
          <BigAvaters UserId={users?.user?.id} />
          {/* <Avaters UserId={users.user.id}  /> */}
        </div>
      </div>
    </div>
  );
}

export default UsersHero;
