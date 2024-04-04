"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

function OnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  console.log(online);

  useEffect(() => {
    const handleOnline = () => {
      toast.success("Connection Restored 🎉");
      setOnline(true);
    };

    const handleOffline = () => {
      toast.error("Connection Lost 😶‍🌫️");
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <div> </div>;
}

export default OnlineStatus;
