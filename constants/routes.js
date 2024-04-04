import { LuHome } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";

export const routes = [
  {
    icons: <LuHome className="text-[28px] text-white" />,
    routesName: "Home",
    routesPath: "/",
  },
  {
    icons: <IoNotificationsOutline className="text-[28px] text-white" />,
    routesName: "Notifications",
    routesPath: "/notifications",
  },
  {
    icons: <VscAccount className="text-[28px] text-white" />,
    routesName: "Profile",
    routesPath: "/profile",
  },
  {
    icons: <CiLogout className="text-[28px] text-white" />,
    routesName: "Logout",
    routesPath: "/logout",
  },
];
