import React from "react";
//import "../styles/App.css";
import librolinkLogo from "../assets/LibroLink.png";
import searchBarIcon from "../assets/SearchBar.svg";
import UKicon from "../assets/ukicon.png";
import FRicon from "../assets/fr.svg";
import MRicon from "../assets/maroc.png"
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

export default function Header() {
  const { currentUser, currentToken } = useStateContext();
  return (
    <>
      <div className="flex flex-row justify-between items-center mx-5 h-28">
        <div className="flex items-center justify- w-full">
          <div className="flex items-center">
            <div className="max-w-full h-auto">
              <Link to="/">
                <img className="size-36" src={librolinkLogo} alt="logo" />
              </Link>
            </div>
            <div className="flex mr-20">
              <div className="mr-24 ml-10 text-xl font-medium">
                <Link to="#">Books</Link>
              </div>
              <CategoriesMenu  />
              {/* <div className="text-xl font-s">
                <Link to="#">Categories</Link>
              </div> */}
            </div>
          </div>
          <div className="flex justify-between p-1 rounded-2xl items-center border h-fit w-1/3 mr-36">
            <input
              className="w-full focus:outline-none"
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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex">
                  <img className="mr-2" src={UKicon} alt="eng" />
                  ENG
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem >
                  <RadioGroup  defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label className="flex items-center" htmlFor="option-one">
                      <img className="mr-2 size-8" src={FRicon} alt="eng" />
                        FR
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label className="flex items-center" htmlFor="option-one">
                      <img className="mr-2 size-8" src={MRicon} alt="eng" />
                        AR
                      </Label>
                    </div>
                  </RadioGroup>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Button className="mr-4  font-semibold" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="font-semibold" asChild>
                <Link to="/singup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
