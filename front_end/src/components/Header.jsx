import React from "react";
//import "../styles/App.css";
import librolinkLogo from "../assets/LibroLink (8) (1).png";
import searchBarIcon from "../assets/SearchBar.svg";
import resMenuIcon from "../assets/resMenu.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import libraryIcon from "../assets/libraryIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import upgradeIcon from "../assets/upgradeIcon.svg";
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CategoriesMenu from "./CategoriesMenu";
import BooksMenu from "./BooksMenu";
import LangMenu from "./LangMenu";

import { MenuIcon } from "lucide-react";
import ResponsiveMenu from "./ResponsiveMenu";

export default function Header() {
  const { currentUser, currentToken, setLang, Lang } = useStateContext();
  const [menuClicked, setMenuClicked] = useState(false);
  return (
    <>
      <div className="border-b  shadow-sm bg-white ">
        <div className="flex flex-row justify-between items-center mx-5 h-28">
          <div className="flex items-center justify- w-full ">
            <div className="min-[1190px]:hidden">
              <Button
                className="w-16 p-1 "
                variant="link"
                onClick={() => setMenuClicked(!menuClicked)}
              >
                <img className="size-full" src={resMenuIcon} alt="logo" />
              </Button>
              <ResponsiveMenu
                menuClicked={menuClicked}
                setMenuClicked={setMenuClicked}
              />
            </div>
            <div className="flex items-center">
              <div className="max-w-full h-auto size-32">
                <Link to="/">
                  <img className="size-full" src={librolinkLogo} alt="logo" />
                </Link>
              </div>
              <div className="hidden mr-20  min-[1190px]:flex">
                <div className="mr-24 ml-10">
                  <BooksMenu />
                </div>
                <CategoriesMenu />
              </div>
            </div>
            <div className="flex justify-between p-1 px-2 rounded-md items-center border h-fit min-w-[10rem] w-2/3 mr-36">
              <input
                className="w-full focus:outline-none  "
                type="text"
                placeholder="Search Book ..."
              />
              <div className="size-8">
                <img src={searchBarIcon} alt="Search Logo" />
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="lan hidden mr-16 min-[1190px]:flex">
              <LangMenu />
            </div>
            {currentToken ? (
              <div className=" hidden min-[1190px]:flex ">
                <Button
                  className= {`mr-4 px-6 font-semibold flex ${currentUser.etat_abonnement === "not subscribed" ? "" : "hidden"}`}
                  variant=""
                  asChild
                >
                  <Link to="#">
                    <img className="size-6 mr-2 pb-[0.1rem]" src={upgradeIcon} alt="upgradeIcon" />
                    Upgrade</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{currentUser.displayName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="#">
                        <div className="flex flex-row items-center">
                          <img
                            className="size-5 mr-2"
                            src={profileIcon}
                            alt="profile"
                          />
                          Profile
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="#">
                        <div className="flex flex-row items-center">
                          <img
                            className="size-5 mr-2"
                            src={libraryIcon}
                            alt="library"
                          />
                          Library
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="#">
                        <div className="flex flex-row items-center">
                          <img
                            className="size-5 mr-2"
                            src={settingsIcon}
                            alt="library"
                          />
                          Settings
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="#">
                        <div className="flex flex-row items-center  text-rose-500">
                          <img
                            className="size-5 mr-2"
                            src={logoutIcon}
                            alt="logout"
                          />
                          Logout
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="linksls hidden min-[1190px]:flex">
                <Button
                  className="mr-4  font-semibold "
                  variant="outline"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="font-semibold " asChild>
                  <Link to="/singup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
