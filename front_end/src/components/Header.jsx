import React from "react";
//import "../styles/App.css";
import librolinkLogo from "../assets/LibroLink.png";
import searchBarIcon from "../assets/SearchBar.svg";

import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
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

export default function Header() {
  const { currentUser, currentToken, setLang, Lang } = useStateContext();

  return (
    <>
      <div className="flex flex-row justify-between items-center mx-5 h-28">
        <div className="flex items-center justify- w-full ">
          <div className="flex items-center">
            <div className="max-w-full h-auto size-32">
              <Link to="/">
                <img className="size-full" src={librolinkLogo} alt="logo" />
              </Link>
            </div>
            <div className="flex mr-20 min-[320px]:max-lg:hidden">
              <div className="mr-24 ml-10">
                <BooksMenu />
              </div>
              <CategoriesMenu />
            </div>
          </div>
          <div className="flex justify-between p-1 rounded-2xl items-center border h-fit min-w-[10rem] w-2/3 mr-36">
            <input
              className="w-full focus:outline-none "
              type="text"
              placeholder="Search Book ..."
            />
            <div className="size-8">
              <img src={searchBarIcon} alt="Search Logo" />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="lan mr-16">
            <LangMenu />
          </div>
          {0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="linksls flex">
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
    </>
  );
}
