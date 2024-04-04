"use client";
import Headers from "@/components/headers/Headers";
import React, { useMemo } from "react";
import useNotifications from "@/hooks/useNotifications";
import Avaters from "@/components/avaters/Avaters";
import { formatDistanceToNowStrict } from "date-fns";

function Notifications() {
  const { data: notifications = [] } = useNotifications();

  console.log(notifications);

  if (notifications.notifications?.length === 0) {
    return (
      <div className="  border-l-[1px] border-r-[1px] ml-16 border-[#31363F] w-[54%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent">
        <Headers>Notifications</Headers>
        <div className="flex justify-center items-center h-screen">
          {/* <ClipLoader color="#50C4ED" size={80} /> */}
          <p className="text-white">No notifications yet</p>
        </div>
      </div>
    );
  }

  // const CreatedAt = useMemo(() => {
  //   if (notifications?.notifications?.createdAt) {
  //     return formatDistanceToNowStrict(new Date(notifications?.notification?.createdAt));
  //   }
  //   return null;
  // }, [notifications?.notification?.createdAt]);

  return (
    <div className="  border-l-[1px] border-r-[1px] ml-16 border-[#31363F] w-[54%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent">
      <Headers>Notifications</Headers>
      <div className="flex flex-col">
        {notifications?.notifications?.map((notification) => (
          <div
            key={notification.id}
            className="border-b-[1px] border-neutral-800 p-5 hover:bg-[#191919] transition"
          >
            <div className="flex flex-row gap-3 items-start">
            <p className=" text-white capitalize">💥{notification.body}</p>
            <p className="text-neutral-500 text-[13px] capitalize">{formatDistanceToNowStrict(new Date(notification.createdAt))} ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
