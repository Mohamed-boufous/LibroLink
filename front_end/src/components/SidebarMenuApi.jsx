import React from "react";
import { useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SidebarMenuApi = ({
  luHovered,
  aLireHovered,
  lectureEnCoursHovered,
  readingHistoryHandler,
  readingHistoryHovered,
  likedBooksHovered,
  handleHomeLeave,
  homeHovered,
  handleHomeEnter,
  handleCreateLibraryClick,
  library,
  LibraryHandler,
  DeleteLibrary,
  librarySelected,
}) => {
  const libraryListRef = useRef(null);

  useEffect(() => {
    if (libraryListRef.current) {
      const availableHeight =
        window.innerHeight - libraryListRef.current.offsetTop - 85;
      libraryListRef.current.style.maxHeight = `${availableHeight}px`;
    }
  }, []);

  return (
    <>
      <div className="mt-4 mx-2 col-span-5 sm:col-span-4 md:col-span-3 xl:col-span-2">
        <div className="flex bg-orange-500 py-2 pl-4 rounded-[4px] cursor-pointer ">
          <img
            src="./public/house-solid.svg "
            alt="sss"
            onMouseEnter={handleHomeEnter}
            onMouseLeave={handleHomeLeave}
            style={homeHovered ? { opacity: 0.8 } : {}}
          />
          <span
            className="font-bold font-sans text-[15px] text-white ml-3 mt-[2px]"
            onMouseEnter={handleHomeEnter}
            onMouseLeave={handleHomeLeave}
            style={homeHovered ? { opacity: 0.8 } : {}}
          >
            Home
          </span>
        </div>
        <div>
          <div
            className="flex  mt-3 py-2 pl-[18px] cursor-pointer hover:opacity-70"
            onClick={() => librarySelected("likedBooks")}
          >
            <img
              src="./public/heart-regular (3).svg"
              alt=""
              style={likedBooksHovered ? { opacity: 0.5 } : {}}
            />
            <span
              className="font-bold font-sans text-[12px] text-black ml-3"
              style={likedBooksHovered ? { opacity: 0.5 } : {}}
            >
              Liked Books
            </span>
          </div>
          <div
            className="flex  mt-[4px] py-2 pl-[18px] cursor-pointer hover:opacity-70"
            onClick={readingHistoryHandler}
          >
            <img
              src="./public/clock-rotate-left-solid (2).svg"
              alt=""
              style={readingHistoryHovered ? { opacity: 0.5 } : {}}
            />
            <span
              className="font-bold font-sans text-[12px] text-black ml-3"
              style={readingHistoryHovered ? { opacity: 0.5 } : {}}
            >
              Reading History
            </span>
          </div>
          <div className="flex mt-3 py-2 pl-4 cursor-pointer">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="Svg-sc-ytk21e-0 bneLcE w-6 h-6"
            >
              <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
            </svg>

            <span className="font-bold font-sans text-[12px] text-black ml-3 mt-[2px]">
              Your Library
            </span>
          </div>
          <div
            className="flex bg-gray-200 rounded-sm mt-9 py-2 pl-[18px] cursor-pointer hover:opacity-70"
            onClick={() => librarySelected("lecture en cours")}
          >
            <img
              src="./public/eye-regular (1).svg"
              alt=""
              style={lectureEnCoursHovered ? { opacity: 0.5 } : {}}
            />
            <span
              className="font-bold font-sans text-[12px] text-black ml-3"
              style={lectureEnCoursHovered ? { opacity: 0.5 } : {}}
            >
              Reading
            </span>
          </div>
          <div
            className="flex  bg-gray-200 rounded-sm mt-[4px] py-2 pl-[18px] cursor-pointer hover:opacity-70"
            onClick={() => librarySelected("lu")}
          >
            <img
              src="./public/circle-check-regular.svg"
              alt=""
              style={luHovered ? { opacity: 0.5 } : {}}
            />
            <span
              className="font-bold font-sans text-[12px] text-black ml-3"
              style={luHovered ? { opacity: 0.5 } : {}}
            >
              Read
            </span>
          </div>
          <div
            className="flex  bg-gray-200 rounded-sm mt-[4px] py-2 pl-[18px] cursor-pointer hover:opacity-70"
            onClick={() => librarySelected("a lire")}
          >
            <img
              src="./public/calendar-days-solid.svg"
              alt=""
              style={aLireHovered ? { opacity: 0.5 } : {}}
            />
            <span
              className="font-bold font-sans text-[12px] text-black ml-3"
              style={aLireHovered ? { opacity: 0.5 } : {}}
            >
              To read
            </span>
          </div>
          <div
            className="flex mt-12 py-2 pl-5 cursor-pointer hover:opacity-70"
            onClick={handleCreateLibraryClick}
          >
            <img src="./public/plus-solid.svg" alt="" />
            <span className="font-bold font-sans text-[13px] text-menu ml-3">
              Create Library
            </span>
          </div>
          <div className=" h-[1px] mt-2 mx-2 bg-black"></div>
          <div className="py-2 pl-4 mt-2">
            <div
              ref={libraryListRef}
              className="overflow-y-scroll"
              style={{ scrollbarWidth: "thin" }}
            >
              {library.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-center text-menu font-medium text-[11px] cursor-pointer mr-4 ${
                    index !== 0 && "mt-3"
                  }`}
                >
                  <div
                    className="flex-shrink-0 max-w-[80%] truncate hover:opacity-70"
                    onClick={(e) => LibraryHandler(e,item.biblioName)}
                  >
                    {item.biblioName}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <img
                        src="./public/ellipsis-vertical-solid.svg"
                        alt=""
                        className="ml-auto hover:opacity-70"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => DeleteLibrary(item.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenuApi;

