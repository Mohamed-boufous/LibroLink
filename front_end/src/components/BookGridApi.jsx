import React, { useState, useEffect } from "react";
import BookRemoveConfirmation from "./BookRemoveConfirmation";
import Pagination from "./Pagination";

const BookGridApi = ({
  books,
  hoveredBook,
  setHoveredBook,
  isLoading,
  BookPopUp,
  handleCloseBookPopUp,
  cancelRemoveBookFromList,
  DeleteBook,
  removeBookFromList,
  currentPage,
  handleLeftButtonClick,
  handleRightButtonClick,
  lastPage,
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  const handleImagesLoaded = () => {
    setImagesLoaded(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setDeviceHeight(window.innerHeight);
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-24">
          <img
            src="./public/spinner-solid (1).svg"
            alt=""
            style={{ height: "40px" }}
          />
        </div>
      ) : (
        <div className={`${lastPage === 1 ? "mt-16" : ""}`}>
          <Pagination
            currentPage={currentPage}
            handleLeftButtonClick={handleLeftButtonClick}
            handleRightButtonClick={handleRightButtonClick}
            lastPage={lastPage}
            height={deviceHeight}
          />
          <div
            className={`mt-12 ${
              deviceHeight >= 800 && deviceWidth >= 1700 ? "mt-32" : "mb-12"
            }`}
          >
            {books && books.length > 0 ? (
              <div>
                <div className="mx-10 sm:mx-12 md:mx-12 lg:mx-16 xl:mx-16 xxl:mx-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mdxl:grid-cols-7 xxl:grid-cols-8 gap-y-5 gap-x-4">
                    {books.map((book) => (
                      <div
                        key={book.id}
                        onMouseEnter={() => setHoveredBook(book.id)}
                        onMouseLeave={() => setHoveredBook(null)}
                        className="relative"
                      >
                        <img
                          src={"http://localhost:8000/" + book.bookCover}
                          alt={book.title}
                          className={`w-full ${
                            hoveredBook === book.id ? "opacity-20" : ""
                          }`}
                          onLoad={handleImagesLoaded}
                        />
                        {imagesLoaded &&
                          hoveredBook !== book.id &&
                          book.isFree && (
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
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mt-20 flex justify-center">
                  <div className="font-bold text-lg">No Books Available</div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="font-medium text-[14px]">
                    There are currently no books available in this library.
                  </div>
                </div>
              </div>
            )}
          </div>
          <BookRemoveConfirmation
            showPopUp={BookPopUp}
            handleCloseBookPopUp={handleCloseBookPopUp}
            cancelRemoveBookFromList={cancelRemoveBookFromList}
            removeBookFromList={removeBookFromList}
          />
        </div>
      )}
    </div>
  );
};

export default BookGridApi;
