import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import closeIcon from "../assets/x_icon.svg";
import phoneIcon from "../assets/phoneicon.svg";
import mailIcon from "../assets/emailIcon.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import libraryIcon from "../assets/libraryIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useStateContext } from "../context/ContextProvider";
export default function ResponsiveMenu({ menuClicked, setMenuClicked }) {
  const booklist = ["New", "Popular", "Top Rated", "Book List"];
  const categories1 = [
    "Reading Experience",
    "Free To Read",
    "Subscription Required",
    "Non Fiction",
    "Art & photography",
    "Autobiography",
    "Biography",
    "Food & Drink",
    "History",
    "How-To/Guides",
    "Humanities & Social Sciences",
    "Humor",
    "Parenting",
    "Philosophy",
    "Science & Technology",
    "Self-Help",
    "Travel",
    "True crime",
    "Fiction",
    "Action/Adventure",
    "Children's Fiction",
    "Classic",
    "Contemporary",
    "Fantasy",
    "Graphic Novel",
    "Historical Fiction",
    "Horror",
    "Mystery",
    "Psychological",
    "Romance",
    "Satire",
    "Science Fiction",
    "Short Stories",
    "Thriller",
    "Women's Fiction",
    "Young Adult",
  ];
  const { Lang, setLang, saveLangHandler } = useStateContext();

  const items = [
    {
      value: "ENG",
      label: "English",
    },
    {
      value: "FR",
      label: "French",
    },
    {
      value: "AR",
      label: "Arabic",
    },
  ];
  return (
    <div
      className={`${
        menuClicked ? " bg-opacity-50 z-10 " : "bg-opacity-0 -z-10"
      } fixed inset-0  flex h-screen w-screen transition-all items-center justify-start bg-black  `}
    >
      <div
        className={`${
          menuClicked ? "translate-x-[0rem]" : "-translate-x-full"
        } transition-all duration-200  h-full w-80 bg-white text-black`}
      >
        <div className={` flex items-center justify-between p-4`}>
          <Button variant="link" onClick={() => setMenuClicked(!menuClicked)}>
            <img className="size-full" src={closeIcon} alt="logo" />
          </Button>
          <h1 className="text-xl font-bold mr-2 text-orange-600">LibroLink</h1>
        </div>
        <ScrollArea className="h-full">
          <nav className="flex flex-col items-start ml-5 p-4 space-y-4">
            {1 ? (
              <>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold">
                      DiplayedUsername
                    </div>
                    <div className="text-sm text-gray-500"> @username </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 font-semibold text-[0.95rem]">
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link className="block text-base font-medium" to="/login">
                  Login
                </Link>
                <Link className="block text-base font-medium" to="/signup">
                  Singup
                </Link>
              </>
            )}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline w-64">
                  Books
                </AccordionTrigger>
                {booklist.map((book) => {
                  return (
                    <AccordionContent className="hover:text-orange-600">
                      <Link to="#">{book}</Link>
                    </AccordionContent>
                  );
                })}
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline">
                  Categories
                </AccordionTrigger>
                {categories1.map((category) => {
                  if (
                    category === "Reading Experience" ||
                    category === "Non Fiction" ||
                    category === "Fiction"
                  ) {
                    return (
                      <AccordionContent className="font-bold hover:cursor-default">
                        {category}
                      </AccordionContent>
                    );
                  }
                  return (
                    <AccordionContent className="hover:text-orange-600">
                      <Link to="#">{category}</Link>
                    </AccordionContent>
                  );
                })}
              </AccordionItem>
            </Accordion>
            <Select onValueChange={(value) => saveLangHandler(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    Lang === "FR"
                      ? "Français"
                      : Lang === "AR"
                      ? "Arabic"
                      : "English"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="pt-4 border-t border-gray-600">
              <p className="text-lg font-semibold text-orange-600">
                QuickLinks
              </p>
              <p>
                Welcome to our website we hope you have a wondorderful
                experience,Here is some Links you'll find useful
              </p>
              <div className="flex flex-col space-y-4 my-5 font-semibold">
                <div>
                  <Link to="#">Services</Link>
                </div>
                <div>
                  <Link to="#">Our Products</Link>
                </div>
                <div>
                  <Link to="#">About Us</Link>
                </div>
              </div>

              <p className="text-lg font-semibold text-orange-600">
                Contact Us
              </p>
              <div className="flex font-semibold items-center size-5 text-sm mb-1">
                {" "}
                <img className="mr-2" src={phoneIcon} alt="phoneicon" />{" "}
                +212611228809{" "}
              </div>
              <div className="flex font-semibold items-center size-6 text-sm">
                {" "}
                <img className="mr-2" src={mailIcon} alt="mailicon" />{" "}
                librolink@gmail.com{" "}
              </div>
            </div>
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
