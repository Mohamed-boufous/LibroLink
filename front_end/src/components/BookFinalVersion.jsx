import React from "react";

export default function BookFinalVersion({ book}) {
  return (
    <>
      <div
        key={book.id}
        onMouseEnter={() => setHoveredBook(book.id)}
        onMouseLeave={() => setHoveredBook(null)}
        className="relative"
      >
        <img
          src={book.image}
          alt={book.title}
          className={`border w-full ${
            hoveredBook === book.id ? "opacity-20" : ""
          }`}
        />
        {hoveredBook !== book.id && book.etat === "Free" && (
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
            <div className="flex justify-end">
              <div
                className="bg-red-600 mr-2 mt-3 rounded-lg cursor-pointer"
                onClick={() => DeleteBook(book.id)}
              >
                <img
                  src="./public/trash-solid (2).svg"
                  alt=""
                  className="p-2"
                />
              </div>
            </div>
            <div className=" mt-24">
              <div className="flex justify-center">
                <button className="font-bold text-white text-[14px] bg-custom px-[16px] py-1 rounded-[2px]">
                  <img
                    src="./public/book.svg"
                    alt=""
                    className="inline-block w-4 h-4 mr-2"
                  />
                  Read
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <button className="font-bold text-black text-[14px] bg-white px-[16px] py-1 rounded-[2px]">
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
