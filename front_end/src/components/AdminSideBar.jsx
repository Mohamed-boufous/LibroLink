import React from "react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStateContext } from "../context/ContextProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FlagIcon from "@mui/icons-material/Flag";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";
export default function AdminSideBar() {
  const { currentUser } = useStateContext();
  const location = useLocation();
  const [menuClicked, setMenuClicked] = useState(location.pathname.slice(7));
  return (
    <>
      <div className="flex bg-gray-50">
        <div className=" w-96 h-screen flex flex-col justify-between border-r-2 bg-white">
          <div className="flex flex-col  items-center ">
            <div className="mx-5 pt-2 mb-5 flex items-baseline space-x-2">
              <div className="text-2xl font-semibold text-orange-500">
                LibroLink
              </div>
              <div className=" text-[0.8rem] font-semibold">Admin Page</div>
            </div>
            <Avatar className="w-24 h-24 my-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className="text-md font-semibold mb-10">
              {currentUser.displayName
                ? currentUser.displayName
                : "Display Name"}
            </div>
            <div className="w-full px-5">
              <Link
                to={"/admin/Dashboard"}
                onClick={() => setMenuClicked("Dashboard")}
              >
                <div
                  className={`flex flex-row items-center
              ${
                menuClicked === "Dashboard"
                  ? "bg-gray-100 text-orange-500"
                  : "hover:bg-gray-100 hover:text-orange-500"
              }
               py-1 rounded-sm px-4`}
                >
                  <DashboardIcon fontSize="small" className="mr-1" />
                  <div className="font-semibold text-[0.9rem]">Dashboard</div>
                </div>
              </Link>
              <div className="text-[0.8rem] font-medium text-gray-500 px-2 mt-3 mb-1">
                Manage
              </div>
              <Link to={"/admin/Users"} onClick={() => setMenuClicked("Users")}>
                <div
                  className={`flex flex-row items-center 
              ${
                menuClicked === "Users"
                  ? "bg-gray-100 text-orange-500"
                  : "hover:bg-gray-100 hover:text-orange-500"
              }
              mb-4 py-1 rounded-sm px-4`}
                >
                  <PeopleAltIcon fontSize="small" className="mr-1" />
                  <div className="font-semibold text-[0.9rem]">Users</div>
                </div>
              </Link>
              <Link to={"/admin/Books"} onClick={() => setMenuClicked("Books")}>
                <div
                  className={`flex flex-row items-center
              ${
                menuClicked === "Books"
                  ? "bg-gray-100 text-orange-500"
                  : "hover:bg-gray-100 hover:text-orange-500"
              }
               mb-4 py-1 rounded-sm px-4`}
                >
                  <MenuBookIcon fontSize="small" className="mr-1" />
                  <div className="font-semibold text-[0.9rem]">Books</div>
                </div>
              </Link>
              <Link
                to={"/admin/Reports"}
                onClick={() => setMenuClicked("Reports")}
              >
                <div
                  className={`flex flex-row items-center 
              ${
                menuClicked === "Reports"
                  ? "bg-gray-100 text-orange-500"
                  : "hover:bg-gray-100 hover:text-orange-500"
              }
              mb-4 py-1 rounded-sm px-4`}
                >
                  <FlagIcon fontSize="small" className="mr-1" />
                  <div className="font-semibold text-[0.9rem]">Reports</div>
                </div>
              </Link>
              <Link
                to={"/admin/Subscriptions"}
                onClick={() => setMenuClicked("Subscriptions")}
              >
                <div
                  className={`flex flex-row items-center 
              ${
                menuClicked === "Subscriptions"
                  ? "bg-gray-100 text-orange-500"
                  : "hover:bg-gray-100 hover:text-orange-500"
              }
              mb-4 py-1 rounded-sm px-4`}
                >
                  <PaidIcon fontSize="small" className="mr-1" />
                  <div className="font-semibold text-[0.9rem]">
                    Subscriptions
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <Link>
            <div className="flex flex-row items-center hover:bg-gray-100 text-rose-500 mb-4 py-1 rounded-sm px-4">
              <LogoutIcon fontSize="small" className="mr-1" />
              <div>Logout</div>
            </div>
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
}
