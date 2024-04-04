"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { routes } from "@/constants/routes";
import Register from "@/components/register/Register";
import Login from "@/components/login/Login";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Tweets from "@/components/tweets/Tweets";
import useCurrentUser from "@/hooks/useCurrentUser";

function Sidebar() {
  const Router = useRouter();
  const data = useSession();
  const { data: Currentusers } = useCurrentUser();
  console.log(data.status);

  if (Currentusers?.hasNotification) {
     toast.success("You have new notification");
  }

  const FilterRoutes = routes.filter((route) => {
    if (data.status === "unauthenticated") {
      return route.routesName !== "Logout";
    } else {
      return route.routesName;
    }
  });

  const HandleDynamicRoute = async () => {
    if (data.status === "authenticated" && path == "/logout") {
      toast.error("Logout successfully");
      await signOut();
    } else if (data.status === "unauthenticated" && path == "/") {
      Router.push(path);
    } else if (data.status === "authenticated") {
      Router.push(path);
    } else {
      await signIn();
    }
  };
  // 27
  return (
    <div className="w-[18%] pl-16 ">
      <div className="w-[90px] h-[90px]">
        <Image
          src="https://i.ibb.co/xGTXX6s/logo-removebg-preview.png"
          width={90}
          height={90}
          alt="logo"
        />
      </div>
      <div>
        {FilterRoutes.map((route) => (
          <div key={route.routesName} className="flex items-center  p-3">
            {route.icons}
            <p
              onClick={() => HandleDynamicRoute(route.routesPath)}
              className="text-white cursor-pointer ml-2 mt-[3px]"
            >
              {route.routesName}
            </p>
          </div>
        ))}
      </div>
      {/* Login components */}
      {data.status === "authenticated" ? (
        <Tweets />
      ) : (
        <Login  >{"login"}</Login>
      )}
      {/* Registations components */}
      {data.status === "authenticated" ? null : <Register />}
    </div>
  );
}

export default Sidebar;
