import React from "react";
import { useState } from "react";

export default function BookFinalVersion({
  book,
  hoveredBook,
  setHoveredBook,
}) {
  return (
    <>
      <div
        key={book.id}
        onMouseEnter={() => setHoveredBook(book.id)}
        onMouseLeave={() => setHoveredBook(null)}
        className="relative"
      >
        <img
          src={book.ImageURL}
          alt={book.title}
          className={`border w-full h-72 ${
            hoveredBook === book.id ? "opacity-20" : ""
          }`}
        />
        {hoveredBook !== book.id && book.isFree === 1 && (
          <div className="absolute top-0 start-0 w-full">
            <div
              className="mt-1 ml-1 w-1/4 text-[13px] text-center font-bold rounded"
              style={{ backgroundColor: "#9BFA00" }}
            >
              {"Free"}
            </div>
          </div>
        )}
        {hoveredBook === book.id && (
          <div className="absolute top-0 start-0 w-full">
            <div className=" mt-3 ml-5 mr-5">
              <span
                className={`font-bold block ${
                  book.title.length > 10 ? "title-long" : "title-small"
                }`}
              >
                {book.title}
              </span>
              {book.genres.map((genre) => (
                <button
                  className={`text-start font-medium text-sm block mt-2 bg-gray-200 px-2 py-1 rounded-md`}
                >
                  {genre.genreName}
                </button>
              ))}
              <div
                className={`mt-2 ${
                  window.innerWidth >= 992 && window.innerWidth <= 1170
                    ? "mb-2"
                    : "mt-4 mb-5"
                }`}
              >
                <span className="block">
                  <img
                    src="./etoile.svg"
                    alt=""
                    className="inline-block w-4 h-4 mr-2"
                  />
                  <span className="font-bold">{book.sum_rating}</span>
                </span>
                <span className="block">
                  <img
                    src="./world.svg"
                    alt=""
                    className="inline-block w-4 h-4 mr-2"
                  />
                  <span className="font-bold">{book.lang}</span>
                </span>
                <span className="block">
                  <img
                    src="./page.svg"
                    alt=""
                    className="inline-block w-4 h-4 mr-2"
                  />
                  <span className="font-bold">{book.pages + " Pages"}</span>
                </span>
                <span className="block">
                  <img
                    src="./oeil.svg"
                    alt=""
                    className="inline-block w-4 h-4 mr-2"
                  />
                  <span className="font-bold"> {book.views} views</span>
                </span>
              </div>
              <div className="flex justify-center">
                <button className="font-bold text-white bg-orange-600 text-[14px] w-24  px-[16px] py-1 rounded-[2px]">
                  <img
                    src="./public/book.svg"
                    alt=""
                    className="inline-block w-4 h-4 mr-2"
                  />
                  Read
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <button className="font-bold text-black text-[14px] w-24 bg-white px-[16px] py-1 rounded-[2px]">
                  <img
                    src="./public/info.svg"
                    alt=""
                    className="inline-block w-4 h-4 mr-2"
                  />
                  Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
