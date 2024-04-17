import { useState, useEffect } from "react";
import "../styles/Filter.css";
import { axiosClient } from "@/api/axios";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const Options = [
    "Most Viewed",
    "Recently Added",
    "Name A-Z",
    "Rating",
    "Released Date",
  ];
  const Languages = ["Arabic", "English", "French"];
  const ReadingExperiences = ["All", "Free", "Premium"];
  const NonFinction = [
    "Art & photography",
    "Autobiography",
    "Biography",
    "Food & drink",
    "History",
    "How-To/Guides",
    "Humanities & social sciences",
    "Humor",
    "Parenting",
    "Philosophy",
    "Scince & technology",
    "Self-help",
    "Travel",
    "True crime",
  ];
  const Fiction = [
    "Action/Adventure",
    "children's fiction",
    "Classic",
    "Contemporary",
    "Fantasy",
    "Graphic novel",
    "Historical",
    "Horror",
    "Literary",
    "Mystery",
    "Romance",
    "Satire",
    "Scince fiction",
    "Short story",
    "Thriller",
    "Women's fiction",
    "Young adult",
  ];

  const searchMethod = ["All", "Title", "Author", "Origin", "Subject"];
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState([]);

  const [livres, setLivres] = useState([]);

  const [booksSelected, setBooksSelected] = useState(livres);
  const [selectedOption, setSelectedOption] = useState(
    searchParams.get("bookSort") || Options[1]
  );
  const [selectedLanguages, setSelectedLanguage] = useState([]);
  const [selectedReadingExperiences, setSelectedReadingExperiences] =
    useState(null);
  const [selectedGenres, setSelectedGenres] = useState([
    searchParams.get("category"),
  ]);
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [selectedSearchMethod, setSelectedSearchMethod] = useState(
    searchMethod[0]
  );
  const [selectedOrder, setSelectedOrder] = useState(
    searchParams.get("bookSort") ? "desc" : "asc"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 18; // Nbr des livres par page

  // hnaya kanhssbo firstIndex w lastIndex
  const [indexOfLastBook, setIndexOfLastBook] = useState(
    currentPage * booksPerPage
  );
  const [indexOfFirstBook, setIndexOfFirstBook] = useState(
    indexOfLastBook - booksPerPage
  );
  const [currentBooks, setCurrentBooks] = useState(
    booksSelected.slice(indexOfFirstBook, indexOfLastBook)
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [textSearch, setTextSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  useEffect(() => {
    if (searchParams.get("category")&& ReadingExperiences.length === 0) {
      filterHandler();
    } else if (searchParams.get("search")) {
      setSelectedSearchMethod("Title");
      axiosClient
        .get(`api/get_books_by_title?title=${searchParams.get("search")}`)
        .then((response) => {
          setBooks(response.data);
          const initialStateWithOpacityHovered = response.data.map((book) => ({
            ...book,
            opacity: 1,
            hovered: false,
          }));
          setLivres(initialStateWithOpacityHovered);
          setBooksSelected(initialStateWithOpacityHovered);
          setCurrentBooks(
            initialStateWithOpacityHovered.slice(
              indexOfFirstBook,
              indexOfLastBook
            )
          );
          console.log(response.data);
        });
    } else {
      axiosClient
        .get(
          `api/get_all_books${
            searchParams.get("bookSort")
              ? `?option=${searchParams.get("bookSort")}&limit=20`
              : ""
          }`
        )
        .then((response) => {
          setBooks(response.data);
          const initialStateWithOpacityHovered = response.data.map((book) => ({
            ...book,
            opacity: 1,
            hovered: false,
          }));
          setLivres(initialStateWithOpacityHovered);
          setBooksSelected(initialStateWithOpacityHovered);
          setCurrentBooks(
            initialStateWithOpacityHovered.slice(
              indexOfFirstBook,
              indexOfLastBook
            )
          );
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (searchParams.get("bookSort")) {
      setSelectedOption(searchParams.get("bookSort"));
      console.log(searchParams.get("bookSort"));
    }
  }, []);
  const handleOrder = () => {
    if (selectedOrder === "asc") {
      setSelectedOrder("desc");
    } else if (selectedOrder === "desc") {
      setSelectedOrder("asc");
    }
  };
  const filterHandler = (event) => {
    if (
      (selectedGenres.length === 0 ||
        (selectedGenres[0] === null && selectedLanguages.length === 1)) &&
      selectedLanguages.length === 0 &&
      selectedReadingExperiences === null
    ) {
      axiosClient
        .get(`api/get_all_books`)
        .then((response) => {
          setBooks(response.data);
          const initialStateWithOpacityHovered = response.data.map((book) => ({
            ...book,
            opacity: 1,
            hovered: false,
          }));
          setLivres(initialStateWithOpacityHovered);
          setBooksSelected(initialStateWithOpacityHovered);
          setCurrentBooks(
            initialStateWithOpacityHovered.slice(
              indexOfFirstBook,
              indexOfLastBook
            )
          );
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      selectedGenres.length !== 0 ||
      selectedLanguages.length !== 0 ||
      selectedReadingExperiences !== null
    ) {
      axiosClient
        .get(`api/filter_booksBygenre?genres=${selectedGenres}`)
        .then((response) => {
          var initialStateWithOpacityHovered = response.data.map((book) => ({
            ...book,
            opacity: 1,
            hovered: false,
          }));
          if (selectedReadingExperiences === "Free") {
            initialStateWithOpacityHovered =
              initialStateWithOpacityHovered.filter(
                (book) => book.isFree === 1
              );
          } else if (selectedReadingExperiences === "Premium") {
            initialStateWithOpacityHovered =
              initialStateWithOpacityHovered.filter(
                (book) => book.isFree === 0
              );
          }
          if (selectedLanguages.length !== 0) {
            initialStateWithOpacityHovered =
              initialStateWithOpacityHovered.filter((book) =>
                selectedLanguages.includes(book.lang)
              );
          }
          if (selectedOption === "Name A-Z") {
            initialStateWithOpacityHovered.sort((a, b) => {
              if (selectedOrder === "asc") {
                return a.title.localeCompare(b.title);
              } else {
                return b.title.localeCompare(a.title);
              }
            });
          } else if (selectedOption === "Recently Added") {
            initialStateWithOpacityHovered.sort((a, b) => {
              if (selectedOrder === "asc") {
                return a.created_at - b.created_at;
              } else {
                return b.created_at - a.created_at;
              }
            });
          } else if (selectedOption === "Most Viewed") {
            initialStateWithOpacityHovered.sort((a, b) => {
              if (selectedOrder === "asc") {
                return a.views - b.views;
              } else {
                return b.views - a.views;
              }
            });
          } else if (selectedOption === "Rating") {
            initialStateWithOpacityHovered.sort((a, b) => {
              if (selectedOrder === "asc") {
                return a.sum_rating - b.sum_rating;
              } else {
                return b.sum_rating - a.sum_rating;
              }
            });
          } else if (selectedOption === "Released Date") {
            initialStateWithOpacityHovered.sort((a, b) => {
              if (selectedOrder === "asc") {
                return a.date_publication - b.date_publication;
              } else {
                return b.date_publication - a.date_publication;
              }
            });
          }

          console.log(initialStateWithOpacityHovered);
          setLivres(initialStateWithOpacityHovered);
          setBooksSelected(initialStateWithOpacityHovered);
          setCurrentBooks(
            initialStateWithOpacityHovered.slice(
              indexOfFirstBook,
              indexOfLastBook
            )
          );
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentBooks(
      booksSelected.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
      )
    );
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Reset hover state and opacity for all books
    setBooksSelected((prevBooks) => {
      return prevBooks.map((book) => ({
        ...book,
        opacity: 1,
        hovered: false,
      }));
    });
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(booksSelected.length / booksPerPage);
    const visiblePages = 3; // Nombre de boutons de page visibles à la fois

    let startPage;
    let endPage;

    if (totalPages <= visiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= visiblePages - 1) {
      startPage = 1;
      endPage = visiblePages;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - visiblePages + 1;
      endPage = totalPages;
      // Si on est dans les dernières pages, on ajuste le début de la plage
      if (startPage <= 0) {
        startPage = 1;
      }
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const HandleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const generateAlphabet = () => {
    const alphabet = [];
    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
  };

  const handleImageMouseEnter = (index) => {
    setBooksSelected((prevBooks) => {
      const updatedBooks = [...prevBooks];
      updatedBooks[(currentPage - 1) * booksPerPage + index].opacity = 0.2;
      updatedBooks[(currentPage - 1) * booksPerPage + index].hovered = true;
      return updatedBooks;
    });
  };

  const handleImageMouseLeave = (index) => {
    setBooksSelected((prevBooks) => {
      const updatedBooks = [...prevBooks];
      updatedBooks[(currentPage - 1) * booksPerPage + index].opacity = 1;
      updatedBooks[(currentPage - 1) * booksPerPage + index].hovered = false;
      return updatedBooks;
    });
  };

  const handleTitleMouseEnter = (index) => {
    handleImageMouseEnter(index);
  };

  const handleTitleMouseLeave = (index) => {
    handleImageMouseLeave(index);
  };

  const searchMethodHandler = (e) => {
    setSelectedSearchMethod(e.target.value);
    setCurrentPage(1);
    setSelectedAlphabet(null);
    setBooksSelected(livres);
  };

  const alphabetArray = generateAlphabet();

  const searchByAlphabets = (alphabet) => {
    setSelectedAlphabet(alphabet);
    console.log(alphabet);
    setCurrentPage(1);
    const lowerCaseAlphabet = alphabet.toLowerCase();

    const filtredByTitle = livres.filter((book) =>
      book.title.toLowerCase().startsWith(lowerCaseAlphabet)
    );
    console.log("aaa" + filtredByTitle);
    setBooksSelected(filtredByTitle);
    setCurrentBooks(filtredByTitle.slice(indexOfFirstBook, indexOfLastBook));
  };

  const searchBook = (e) => {
    setTextSearch(e.target.value);
    setSelectedAlphabet(null);
    setCurrentPage(1);
    const value = e.target.value;
    switch (selectedSearchMethod) {
      case "Title":
        const filtredByTitle = livres.filter((book) =>
          book.title.toLowerCase().includes(value.toLowerCase())
        );
        setBooksSelected(filtredByTitle);
        setCurrentBooks(
          filtredByTitle.slice(indexOfFirstBook, indexOfLastBook)
        );
        break;
      case "Author":
        const filteredByAuthor = livres.filter((book) =>
          book.author.toLowerCase().includes(value.toLowerCase())
        );
        setBooksSelected(filteredByAuthor);
        setCurrentBooks(
          filtredByTitle.slice(indexOfFirstBook, indexOfLastBook)
        );
        break;
      case "Origin":
        const filteredByOrigin = livres.filter((book) =>
          book.origin.toLowerCase().startsWith(value.toLowerCase())
        );
        setBooksSelected(filteredByOrigin);
        setCurrentBooks(
          filtredByTitle.slice(indexOfFirstBook, indexOfLastBook)
        );
        break;
      case "Subject":
        const filteredBySubject = livres.filter((book) =>
          book.subject.toLowerCase().includes(value.toLowerCase())
        );
        setBooksSelected(filteredBySubject);
        setCurrentBooks(
          filtredByTitle.slice(indexOfFirstBook, indexOfLastBook)
        );
        break;
      case "All":
        const filtredByAll = livres.filter((book) => {
          return (
            book.author.toLowerCase().includes(value.toLowerCase()) ||
            book.origin.toLowerCase().startsWith(value.toLowerCase()) ||
            book.subject.toLowerCase().includes(value.toLowerCase()) ||
            book.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        setBooksSelected(filtredByAll);
        setCurrentBooks(
          filtredByTitle.slice(indexOfFirstBook, indexOfLastBook)
        );
        break;
    }
  };
  return (
    <div className="mt-5 px-0">
      <div className="flex flex-row">
        <div className="w-1/5  min-[100px]:hidden sm:hidden md:block">
          <div className="catalogue-conatiner">
            <div>
              <div>
                <h3 className=" text-xl font-semibold">Filters</h3>
                <div className="Line"></div>
              </div>
              <div className="flex flex-wrap items-center   g-0 lg:mx-2 mx-xxl-3">
                <div
                  onClick={handleOrder}
                  className="w-1/12 2xl:me-2 2xl:ms-2 cursor-pointer"
                  style={{ marginTop: "12px" }}
                >
                  <img
                    src={`${
                      selectedOrder === "asc"
                        ? "./public/Frame (3).png"
                        : "./public/FrameUpsideDown.png"
                    }`}
                    alt=""
                    className={`${
                      windowWidth >= 992 && windowWidth <= 1194 ? "ms-3" : ""
                    } ${
                      windowWidth >= 768 && windowWidth <= 991 ? "ms-1" : ""
                    }`}
                  />
                </div>
                <div className="" style={{ marginTop: "12px" }}>
                  {" "}
                  {/* // .... */}
                  <select
                    name="Sorted-By"
                    onChange={HandleSelectOption}
                    value={selectedOption}
                    className={`custom-select ${
                      windowWidth >= 992 && windowWidth <= 1194
                        ? "select-catalogue-additional-class"
                        : ""
                    }
                    ${
                      windowWidth >= 768 && windowWidth <= 991
                        ? "select-catalogue2-additional-class"
                        : ""
                    }${
                      windowWidth >= 1600 && windowWidth <= 1920
                        ? "select-catalogue3-additional-class"
                        : ""
                    }
                    `}
                  >
                    {Options.map((option) => (
                      <option key={option} value={option}>
                        {selectedOption === option
                          ? `Sort : ${option}`
                          : option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-grow max-w-full flex-1 px-4 ms-3 lg:mt-2">
                  <button
                    onClick={filterHandler}
                    className={` flex text-md   justify-center font-medium rounded-md text-white filter-button ${
                      windowWidth >= 1400 && windowWidth <= 1424
                        ? "additional-class"
                        : ""
                    } ${
                      windowWidth >= 1195 && windowWidth <= 1290
                        ? "additional-class"
                        : ""
                    } ${
                      windowWidth >= 992 && windowWidth <= 1194
                        ? "filter2-additional-class"
                        : ""
                    } ${
                      windowWidth >= 768 && windowWidth <= 991
                        ? "filter3-additional-class"
                        : ""
                    }
                    `}
                  >
                    <img
                      src="./public/Vector (2).png"
                      alt=""
                      className={`button-image ${
                        windowWidth >= 1195 && windowWidth <= 1221
                          ? "imgae-additional-class"
                          : ""
                      }`}
                    />
                    <span
                      className={`ps-1 text-lg  ${
                        windowWidth >= 1195 && windowWidth <= 1221
                          ? "filter-additional-class"
                          : ""
                      }`}
                    >
                      Filter
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-r">
            <div className="flex flex-row gap-0 mt-4 ml-lg-4">
              <div className="w-7/12">
                <div className="mt-4 ml-sm-2 md:ml-3 lg:ml-1 xl:ml-3">
                  <label
                    className={`font-bold mb-1 reading-label
                    ${
                      windowWidth >= 1400 && windowWidth <= 1920
                        ? "label-additional-class"
                        : ""
                    }
                    `}
                    htmlFor="Reading Experience"
                  >
                    Reading Experience
                  </label>
                  {ReadingExperiences.map((element) => (
                    <div>
                      <input
                        type="radio"
                        name="Reading Experience"
                        className=" ms-1"
                        value={element}
                        onChange={(e) =>
                          setSelectedReadingExperiences(e.target.value)
                        }
                      />{" "}
                      <label
                        className={`font-semibold ps-1 ${
                          windowWidth >= 1700 && windowWidth <= 1920
                            ? "small-label-additional-class"
                            : ""
                        }`}
                      >
                        {element}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-5/12">
                <div className="mt-4 ml-sm-2 md:ml-3">
                  <label
                    className={`font-bold mb-1 reading-label
                     ${
                       windowWidth >= 1400 && windowWidth <= 1920
                         ? "label-additional-class"
                         : ""
                     }
                     `}
                    htmlFor="Languages"
                  >
                    Languages
                  </label>
                  {Languages.map((language) => (
                    <div key={language}>
                      {" "}
                      {/* Add a unique key for better performance */}
                      <input
                        type="checkbox"
                        name="Languages"
                        className="ms-1"
                        value={language}
                        checked={selectedLanguages.includes(language)}
                        onChange={(e) => {
                          const updatedLanguages = e.target.checked
                            ? [...selectedLanguages, e.target.value] // Add language if checked
                            : selectedLanguages.filter(
                                (lang) => lang !== e.target.value
                              ); // Remove language if unchecked
                          setSelectedLanguage(updatedLanguages);
                        }}
                      />
                      <label
                        className={`font-semibold ps-1 ${
                          windowWidth >= 1700 && windowWidth <= 1920
                            ? "small-label-additional-class"
                            : ""
                        }`}
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden lg:block mt-4 ml-lg-4 xl:ml-4">
              <label
                htmlFor="Non Fiction"
                className={`font-bold mb-1 reading-label
                ${
                  windowWidth >= 1400 && windowWidth <= 1920
                    ? "label-additional-class"
                    : ""
                }
                `}
              >
                Non Fiction
              </label>
              {NonFinction.map((element) => (
                <div key={element}>
                  {" "}
                  {/* Add a unique key for better performance */}
                  <input
                    type="checkbox"
                    name="Fiction"
                    className="ms-1"
                    value={element}
                    // Add a state variable to track selected non-fiction elements (replace 'selectedNonFiction' with your actual state name)
                    checked={selectedGenres.includes(element)}
                    onChange={(e) => {
                      const updatedFiction = e.target.checked
                        ? [...selectedGenres, e.target.value] // Add element if checked
                        : selectedGenres.filter(
                            (item) => item !== e.target.value
                          ); // Remove element if unchecked
                      setSelectedGenres(updatedFiction); // Update state with the modified array
                    }}
                  />
                  <label
                    className={`font-semibold ps-1 ${
                      windowWidth >= 1700 && windowWidth <= 1920
                        ? "small-label-additional-class"
                        : ""
                    }`}
                  >
                    {element}
                  </label>
                </div>
              ))}
            </div>
            <div className="hidden lg:block mt-4 ml-lg-4 xl:ml-4">
              <label
                htmlFor="Fiction"
                className={`font-bold mb-1 reading-label
                    ${
                      windowWidth >= 1400 && windowWidth <= 1920
                        ? "label-additional-class"
                        : ""
                    }
                    `}
              >
                Fiction
              </label>
              {Fiction.map((element) => (
                <div key={element}>
                  {" "}
                  {/* Add a unique key for better performance */}
                  <input
                    type="checkbox"
                    name="NonFiction"
                    className="ms-1"
                    value={element}
                    // Add a state variable to track selected non-fiction elements (replace 'selectedNonFiction' with your actual state name)
                    checked={selectedGenres.includes(element)}
                    onChange={(e) => {
                      const updatedNonFiction = e.target.checked
                        ? [...selectedGenres, e.target.value] // Add element if checked
                        : selectedGenres.filter(
                            (item) => item !== e.target.value
                          ); // Remove element if unchecked
                      setSelectedGenres(updatedNonFiction); // Update state with the modified array
                    }}
                  />
                  <label
                    className={`font-semibold ps-1 ${
                      windowWidth >= 1700 && windowWidth <= 1920
                        ? "small-label-additional-class"
                        : ""
                    }`}
                  >
                    {element}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 flex flex-col items-center">
          <div className="text-center mt-5">
            <select
              name="search-method"
              className="mb-4 md:mb-0 px-1 py-2 rounded-md bg-gray-100"
              value={selectedSearchMethod}
              onChange={searchMethodHandler}
            >
              {searchMethod.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search Book, Author, and more..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              className="ml-2 px-2 py-2 rounded-md border border-gray-300"
              style={{ width: "300px", fontSize: "14px" }}
              onChange={(e) => searchBook(e)}
              value={textSearch}
            />
          </div>
          <div className="text-center mt-4 mb-4 mx-4 ">
            <span className="mx-3">#</span>
            {alphabetArray.map((alphabet) => (
              <span
                key={alphabet}
                className="px-1 text-lg cursor-pointer opacity-100 hover:opacity-30"
                style={{
                  fontSize: "15px",
                  opacity: selectedAlphabet === alphabet ? 0.3 : 1,
                }}
                onClick={() => searchByAlphabets(alphabet)}
              >
                {alphabet}
              </span>
            ))}
          </div>
          <div className="container mt-5">
            {booksSelected.length === 0 ? (
              <div className="text-center">No books found!</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mdxl:grid-cols-5 xxl:grid-cols-6 gap-3 mx-2 lg:mx-3 xxl:mx-16">
                {currentBooks.map((book, index) => (
                  <div key={index} className="relative">
                    <img
                      src={book.ImageURL}
                      alt={book.title}
                      className="border w-full h-full"
                      style={{ opacity: book.opacity }}
                      onMouseEnter={() => handleImageMouseEnter(index)}
                      onMouseLeave={() => handleImageMouseLeave(index)}
                    />
                    {!book.hovered && book.isFree === 1 && (
                      <div className="absolute top-0 start-0 w-full">
                        <div className="mt-1 ml-1 w-1/4 text-center font-bold rounded etat-label">
                          {"Free"}
                        </div>
                      </div>
                    )}
                    <div
                      className="absolute top-0 start-0 w-full"
                      style={{
                        visibility: book.hovered ? "visible" : "hidden",
                      }}
                      onMouseEnter={() => handleTitleMouseEnter(index)}
                      onMouseLeave={() => handleTitleMouseLeave(index)}
                    >
                      <div className={`mt-3 ml-5 mr-5`}>
                        <span
                          className={`font-bold block ${
                            book.title.length > 10
                              ? "title-long"
                              : "title-small"
                          }`}
                        >
                          {book.title}
                        </span>
                        <div className="flex  h-10 gap-2 flex-shrink-3">
                          {book.genres.map((genre) => (
                            <button
                              className={`text-start  font-medium text-sm block mt-2 bg-gray-200 px-2 py-1 rounded-md`}
                            >
                              {genre.genreName}
                            </button>
                          ))}
                        </div>

                        <div
                          className={`mt-2 ${
                            window.innerWidth >= 992 &&
                            window.innerWidth <= 1170
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
                            <span className="font-bold">EN</span>
                          </span>
                          <span className="block">
                            <img
                              src="./page.svg"
                              alt=""
                              className="inline-block w-4 h-4 mr-2"
                            />
                            <span className="font-bold">
                              {book.pages + " Pages"}
                            </span>
                          </span>
                          <span className="block">
                            <img
                              src="./oeil.svg"
                              alt=""
                              className="inline-block w-4 h-4 mr-2"
                            />
                            <span className="font-bold">
                              {book.views} views
                            </span>
                          </span>
                        </div>
                        <div className="text-center">
                          <Link to={`/reading`}>
                            <button className="font-medium py-[2px] px-[20px] bg-orange-600 rounded-sm">
                              <img
                                src="./public/book.svg"
                                alt=""
                                className="inline-block w-4 h-4 mr-2"
                              />
                              Read
                            </button>
                          </Link>
                        </div>
                        <div
                          className={`text-center ${
                            window.innerWidth >= 768 &&
                            window.innerWidth <= 1236
                              ? "mt-1"
                              : "mt-2"
                          }`}
                        >
                          <Link to={`/book/${book.id}`}>
                            <button className="font-medium py-[2px] px-[25px] bg-white rounded-sm">
                              <img
                                src="./public/info.svg"
                                alt=""
                                className="inline-block w-4 h-4 mr-2"
                              />
                              Info
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center items-center mt-5 mb-5">
              <ul className="flex">
                {getPageNumbers().map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      onClick={() => paginate(pageNumber)}
                      className={`px-4 py-2 rounded-md ${
                        pageNumber === currentPage
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
