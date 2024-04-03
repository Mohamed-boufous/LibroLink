import React from "react";

const ReadingBooks = ({
  books,
  isLoading,
  rightReadingHistoryHandler,
  leftReadingHistoryHandler,
  currentPageReadingHistory,
  lastPageReadingHistory,
  firstTimeIntoRH,
  totalBooksReadingHistory,
}) => {
  // Fonction pour afficher la durée écoulée depuis la date de création
  const formatCreationDate = (dateString) => {
    const creationDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - creationDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      if (hoursDifference === 1) {
        return "Il y a 1 heure";
      } else {
        return `Il y a ${hoursDifference} heures`;
      }
    } else if (daysDifference === 1) {
      return "Il y a 1 jour";
    } else if (daysDifference < 7) {
      return `Il y a ${daysDifference} jours`;
    } else if (daysDifference < 14) {
      return "Il y a 1 semaine";
    } else if (daysDifference < 21) {
      return "Il y a 2 semaines";
    } else if (daysDifference < 30) {
      return "Il y a 3 semaines";
    } else if (daysDifference < 60) {
      return "Il y a 1 mois";
    } else if (daysDifference < 365) {
      const monthsDifference = Math.floor(daysDifference / 30);
      return `Il y a ${monthsDifference} mois`;
    } else {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `Il y a ${yearsDifference} ans`;
    }
  };

  return (
    <div className="mb-20 mt-12">
      {isLoading && firstTimeIntoRH ? (
        <div className="flex justify-center mt-24">
          <img
            src="./public/spinner-solid (1).svg"
            alt=""
            style={{ height: "40px" }}
          />
        </div>
      ) : books && books.length ? (
        <div className="mx-4 lg-mx-12 xl:mx-16 mdxl:mx-20 xxl:mx-28">
          <div className="flex justify-start mt-10 ml-6 md:ml-0">
            <div className="hidden md:block ml-10 xl:ml-16 mdxl:ml-20 xxl:ml-24 relative">
              <img
                src="./public/night sky.jpg"
                alt=""
                className="h-40 w-[350px] xl:w-62 xxl:h-52 xxl:w-66 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white font-bold md:text-[18px] lg:text-[22px] xl:text-[22px] mdxl:text-[24px] xxl:text-[30px]">
                <span>Reading</span>
                <span className="mt-[-8px]">History</span>
              </div>
            </div>
            <div className="md:ml-5 lg:ml-10 xxl:ml-16 ">
              <div className="font-bold text-[28px] sm:text-[38px] md:text-[46px] xl:text-[50px] xxl:text-[65px]">
                Reading History
              </div>
              <div className="mt-1 xxl:mt-0 font-roboto text-gray-600  text-[12px] md:text-[10px] lg:text-[12px] xl:text-[14px] xl:mr-24 mdxl:mr-28 xxl:mr-32">
                Here is your reading history on the book website, which logs the
                books you've clicked on or read. It serves as a record of your
                past interactions with the site's content, enabling you to
                revisit previous selections and monitor your reading habits over
                time.
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-gray-300 mt-10 ml-3"></div>
          <div className={`col-span-12 flex justify-end ml-8 mt-12  }`}>
            <ul className="pagination flex gap-3">
              {currentPageReadingHistory !== 1 && (
                <li>
                  <button onClick={() => leftReadingHistoryHandler()}>
                    <img
                      src="./public/circle-chevron-left-solid (3).svg"
                      alt="Left Arrow"
                      style={{ height: "40px" }}
                    />
                  </button>
                </li>
              )}
              {lastPageReadingHistory > 1 &&
                currentPageReadingHistory < lastPageReadingHistory && (
                  <li>
                    <button onClick={() => rightReadingHistoryHandler()}>
                      <img
                        src="./public/circle-chevron-right-solid (3).svg"
                        alt="Right Arrow"
                        style={{ height: "40px" }}
                      />
                    </button>
                  </li>
                )}
            </ul>
          </div>
          <div className="mt-16 overflow-x-auto ml-3">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-30">
                <tr>
                  <th className="px-6 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="mr-2 text-[15px]">#</span>
                    <span>Title</span>
                  </th>
                  <th className="px-6 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <img src="./public/calendar-regular (1).svg" alt="" />
                  </th>
                  <th className="px-6 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <img src="./public/file-regular (1).svg" alt="" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    className="border-b border-gray-300 cursor-pointer hover:opacity-80"
                    key={book.id}
                  >
                    <td className="px-6 py-2 whitespace-nowrap text-start truncate">
                      <div className="flex items-center">
                        <span
                          className={`text-[15px] text-gray-800 ${
                            index < 9 ? "mr-7" : "mr-5"
                          } ${index > 99 ? "mr-4" : ""}  `}
                        >
                           {((currentPageReadingHistory - 1) * (totalBooksReadingHistory - books.length)) + index + 1}
                        </span>
                        <img
                          src={"http://localhost:8000/" + book.bookCover}
                          alt=""
                          width="32px"
                          height="32px"
                          className="mr-8 object-cover"
                        />
                        <span className="text-[15px] text-gray-800 whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {book.title}
                        </span>
                      </div>
                    </td>
                    <td className="text-[15px] text-gray-800 px-6 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {book.author}
                    </td>
                    <td className="text-[15px] text-gray-800 px-6 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {formatCreationDate(book.pivot.date_creation_book)}
                    </td>
                    <td className="text-[15px] text-gray-800 px-6 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      <span className={`mr-1`}>{book.pages}</span>
                      <span>pages</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-20 flex justify-center">
            <div className="font-bold text-lg">No Books Available</div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="font-medium text-[14px]">
              There are currently no books available in Reading History.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingBooks;
