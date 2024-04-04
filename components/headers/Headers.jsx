"use client";
import React from "react";
import Backbuttons from "@/components/backbuttons/Backbuttons";
import { usePathname } from "next/navigation";


function Headers({ children }) {
  const pathname = usePathname();
  return (
    <div className="  border-b-[1px] border-[#31363F] p-3 flex items-center">
      {pathname !== "/" && <Backbuttons />}
      <h1 className="text-[15px] font-extrabold text-white capitalize">{children}</h1>
    </div>
  );
}

export default Headers;
