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
import { useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
import { axiosClient } from "@/api/axios";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, currentToken, setCurrentUser, setLang, Lang } =
    useStateContext();
    const [searchText, setSearchText] = useState("");
  console.log(currentToken);
  const [menuClicked, setMenuClicked] = useState(false);
  const logoutHandler = () => {
    axiosClient
      .post("api/logout")
      .then((response) => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axiosClient
      .post("api/get_current_user")
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSearch = (event) => { 
    setSearchText("");
    navigate(`/book_filter?search=${searchText}`);
  }
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
                logoutHandler={logoutHandler}
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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="size-8" onClick={(e)=>handleSearch(e)}>
                <img src={searchBarIcon} alt="Search Logo" />
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className=" hidden mr-16 min-[1190px]:flex justify-center items-center">
              <LangMenu />
            </div>
            {currentToken ? (
              <div className=" hidden min-[1190px]:flex ">
                <Button
                  className={`mr-4 px-6 font-semibold flex ${
                    currentUser.is_subscribed === 0 ? "" : "hidden"
                  }`}
                  variant=""
                  asChild
                >
                  <Link to="/plans">
                    <img
                      className="size-6 mr-2 pb-[0.1rem]"
                      src={upgradeIcon}
                      alt="upgradeIcon"
                    />
                    Upgrade
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src={currentUser.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {currentUser.displayName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/*  <DropdownMenuItem>
                      <Link to="/profile">
                        <div className="flex flex-row items-center">
                          <img
                            className="size-5 mr-2"
                            src={profileIcon}
                            alt="profile"
                          />
                          Profile
                        </div>
                      </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem>
                      <Link to="/biblio">
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
                      <Link to="/settings">
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
                      <Link onClick={logoutHandler}>
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
                  <Link to="/signup">Sign up</Link>
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
