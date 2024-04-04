"use client";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function Backbuttons() {
  const Router = useRouter();

  return (
    <>
      <IoIosArrowRoundBack
        onClick={() => Router.back()}
        className="text-[28px] text-white"
      />
    </>
  );
}

export default Backbuttons;
