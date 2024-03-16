import { useState, useEffect } from "react";
import "../styles/Filter.css";

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
    "Sekf-help",
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

  const books = [
    {
      image: "book Preview.png",
      title: "The history of lord rings",
      authorName: "A",
      description: "",
      subject: "Horror",
      origin: "England",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (2).png",
      title: "Book 2",
      authorName: "A",
      description: "",
      subject: "Education",
      origin: "USA",
      pages: 112,
      rating: 6.5,
      etat: "premium",
    },
    {
      image: "book Preview (3).png",
      title: "Book 3",
      authorName: "B",
      description: "",
      subject: "Sport",
      origin: "UK",
      pages: 80,
      rating: 3,
      etat: "Free",
    },
    {
      image: "book Preview (4).png",
      title: "Book 4",
      authorName: "B",
      description: "",
      subject: "Science",
      origin: "Australie",
      pages: 300,
      rating: 10,
      etat: "Free",
    },
    {
      image: "book Preview (5).png",
      title: "Book 5",
      authorName: "C",
      description: "",
      subject: "Sex",
      origin: "Korea",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
    {
      image: "book Preview (6).png",
      title: "Book 6",
      authorName: "C",
      description: "",
      subject: "IT",
      origin: "Morocoo",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
    {
      image: "book Preview (7).png",
      title: "Book 7",
      authorName: "D",
      description: "",
      subject: "AI",
      origin: "Britain",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
    {
      image: "book Preview (8).png",
      title: "Book 8",
      authorName: "D",
      description: "",
      subject: "Anime",
      origin: "Portugaise",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (9).png",
      title: "Book 9",
      authorName: "S",
      description: "",
      subject: "Box",
      origin: "Spain",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (9).png",
      title: "Book 10",
      authorName: "s",
      description: "",
      subject: "Box",
      origin: "spain",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview.png",
      title: "Book 11",
      authorName: "A",
      description: "",
      subject: "Horror",
      origin: "England",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
    {
      image: "book Preview (2).png",
      title: "Book 12",
      authorName: "A",
      description: "",
      subject: "Education",
      origin: "USA",
      pages: 112,
      rating: 6.5,
      etat: "premium",
    },
    {
      image: "book Preview (3).png",
      title: "Book 13",
      authorName: "B",
      description: "",
      subject: "Sport",
      origin: "UK",
      pages: 80,
      rating: 3,
      etat: "premium",
    },
    {
      image: "book Preview (4).png",
      title: "Book 14",
      authorName: "B",
      description: "",
      subject: "Science",
      origin: "Australie",
      pages: 300,
      rating: 10,
      etat: "premium",
    },
    {
      image: "book Preview (5).png",
      title: "Book 15",
      authorName: "C",
      description: "",
      subject: "Sex",
      origin: "Korea",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (6).png",
      title: "Book 16",
      authorName: "C",
      description: "",
      subject: "IT",
      origin: "Morocoo",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (7).png",
      title: "Book 17",
      authorName: "D",
      description: "",
      subject: "AI",
      origin: "Britain",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (8).png",
      title: "Book 18",
      authorName: "D",
      description: "",
      subject: "Anime",
      origin: "Portugaise",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (9).png",
      title: "Book 19",
      authorName: "S",
      description: "",
      subject: "Box",
      origin: "Spain",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
    {
      image: "book Preview (9).png",
      title: "Book 20",
      authorName: "s",
      description: "",
      subject: "Box",
      origin: "spain",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
    {
      image: "book Preview.png",
      title: "Book 21",
      authorName: "A",
      description: "",
      subject: "Horror",
      origin: "England",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
    {
      image: "book Preview (2).png",
      title: "Book 22",
      authorName: "A",
      description: "",
      subject: "Education",
      origin: "USA",
      pages: 112,
      rating: 6.5,
      etat: "premium",
    },
    {
      image: "book Preview (3).png",
      title: "Book 23",
      authorName: "B",
      description: "",
      subject: "Sport",
      origin: "UK",
      pages: 80,
      rating: 3,
      etat: "Free",
    },
    {
      image: "book Preview (4).png",
      title: "Book 24",
      authorName: "B",
      description: "",
      subject: "Science",
      origin: "Australie",
      pages: 300,
      rating: 10,
      etat: "Free",
    },
    {
      image: "book Preview (5).png",
      title: "Book 25",
      authorName: "C",
      description: "",
      subject: "Sex",
      origin: "Korea",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (6).png",
      title: "Book 26",
      authorName: "C",
      description: "",
      subject: "IT",
      origin: "Morocoo",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (7).png",
      title: "Book 27",
      authorName: "D",
      description: "",
      subject: "AI",
      origin: "Britain",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (8).png",
      title: "Book 28",
      authorName: "D",
      description: "",
      subject: "Anime",
      origin: "Portugaise",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (9).png",
      title: "Book 29",
      authorName: "S",
      description: "",
      subject: "Box",
      origin: "Spain",
      pages: 155,
      rating: 8.5,
      etat: "Free",
    },
    {
      image: "book Preview (9).png",
      title: "Book 30",
      authorName: "s",
      description: "",
      subject: "Box",
      origin: "spain",
      pages: 155,
      rating: 8.5,
      etat: "premium",
    },
  ];

  const initialStateWithOpacityHovered = books.map((book) => ({
    ...book,
    opacity: 1,
    hovered: false,
  }));
  const [livres, setLivres] = useState(initialStateWithOpacityHovered);

  const [booksSelected, setBooksSelected] = useState(livres);
  const [selectedOption, setSelectedOption] = useState(Options[1]);
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [selectedSearchMethod, setSelectedSearchMethod] = useState(
    searchMethod[0]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 18; // Nbr des livres par page

  // hnaya kanhssbo firstIndex w lastIndex
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksSelected.slice(indexOfFirstBook, indexOfLastBook);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    setCurrentPage(1);
    const lowerCaseAlphabet = alphabet.toLowerCase();

    switch (selectedSearchMethod) {
      case "Title":
        const filtredByTitle = livres.filter((book) =>
          book.title.toLowerCase().startsWith(lowerCaseAlphabet)
        );
        setBooksSelected(filtredByTitle);
        break;
      case "Author":
        const filtredByAuthor = livres.filter((book) =>
          book.authorName.toLowerCase().startsWith(lowerCaseAlphabet)
        );
        setBooksSelected(filtredByAuthor);
        break;
      case "Origin":
        const filtredByOrigin = livres.filter((book) =>
          book.origin.toLowerCase().startsWith(lowerCaseAlphabet)
        );
        setBooksSelected(filtredByOrigin);
        break;
      case "Subject":
        const filtredBySubject = livres.filter((book) =>
          book.subject.toLowerCase().startsWith(lowerCaseAlphabet)
        );
        setBooksSelected(filtredBySubject);
        break;
      case "All":
        const filtredByAll = livres.filter((book) => {
          return (
            book.authorName.toLowerCase().startsWith(lowerCaseAlphabet) ||
            book.origin.toLowerCase().startsWith(lowerCaseAlphabet) ||
            book.subject.toLowerCase().startsWith(lowerCaseAlphabet)
          );
        });
        setBooksSelected(filtredByAll);
        break;
    }
  };

  const searchBook = (e) => {
    setSelectedAlphabet(null);
    setCurrentPage(1);
    const value = e.target.value;
    switch (selectedSearchMethod) {
      case "Title":
        const filtredByTitle = livres.filter((book) =>
          book.title.toLowerCase().includes(value.toLowerCase())
        );
        setBooksSelected(filtredByTitle);
        break;
      case "Author":
        const filteredByAuthor = livres.filter((book) =>
          book.authorName.toLowerCase().includes(value.toLowerCase())
        );
        setBooksSelected(filteredByAuthor);
        break;
      case "Origin":
        const filteredByOrigin = livres.filter((book) =>
          book.origin.toLowerCase().startsWith(value.toLowerCase())
        );
        setBooksSelected(filteredByOrigin);
        break;
      case "Subject":
        const filteredBySubject = livres.filter((book) =>
          book.subject.toLowerCase().includes(value.toLowerCase())
        );
        setBooksSelected(filteredBySubject);
        break;
      case "All":
        const filtredByAll = livres.filter((book) => {
          return (
            book.authorName.toLowerCase().includes(value.toLowerCase()) ||
            book.origin.toLowerCase().startsWith(value.toLowerCase()) ||
            book.subject.toLowerCase().includes(value.toLowerCase()) ||
            book.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        setBooksSelected(filtredByAll);
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
                  className="w-1/12 2xl:me-2 2xl:ms-2 "
                  style={{ marginTop: "12px" }}
                >
                  <img
                    src="./public/Frame (3).png"
                    alt=""
                    className={`${
                      windowWidth >= 992 && windowWidth <= 1194 ? "ms-3" : ""
                    } ${
                      windowWidth >= 768 && windowWidth <= 991 ? "ms-1" : ""
                    }`}
                  />
                </div>
                <div className="" style={{ marginTop: "12px" }}> {/* // .... */}
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
                    className={` flex text-md  justify-center font-medium rounded-md text-gray-300 filter-button ${
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
                      className={`ps-1 ${
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
                    <div>
                      <input
                        type="checkbox"
                        name="Languages"
                        className="ms-1"
                      />{" "}
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
                <div>
                  <input type="checkbox" name="Non Ficiton" className="ms-1" />{" "}
                  <label
                    className={` font-semibold ps-1 ${
                      windowWidth >= 1700 && windowWidth <= 1920
                        ? "small-label-additional-class"
                        : ""
                    }`}
                  >
                    {" "}
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
                <div>
                  <input type="checkbox" name="Ficiton" className="ms-1" />{" "}
                  <label
                    className={` font-semibold ps-1 ${
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
                      src={book.image}
                      alt={book.title}
                      className="border w-full"
                      style={{ opacity: book.opacity }}
                      onMouseEnter={() => handleImageMouseEnter(index)}
                      onMouseLeave={() => handleImageMouseLeave(index)}
                    />
                    {!book.hovered &&
                      book.etat.toLocaleLowerCase() === "free" && (
                        <div className="absolute top-0 start-0 w-full">
                          <div className="mt-1 ml-1 w-1/4 text-center font-bold rounded etat-label">
                            {book.etat}
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
                        <button
                          className={`text-start font-medium text-sm block mt-2 bg-gray-200 px-2 py-1 rounded-md`}
                        >
                          Genre
                        </button>
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
                            <span className="font-bold">{book.rating}</span>
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
                            <span className="font-bold">1.5K views</span>
                          </span>
                        </div>
                        <div className="text-center">
                          <button className="font-medium py-[2px] px-[20px] bg-orange-600 rounded-sm">
                            <img
                              src="./public/book.svg"
                              alt=""
                              className="inline-block w-4 h-4 mr-2"
                            />
                            Read
                          </button>
                        </div>
                        <div
                          className={`text-center ${
                            window.innerWidth >= 768 &&
                            window.innerWidth <= 1236
                              ? "mt-1"
                              : "mt-2"
                          }`}
                        >
                          <button className="font-medium py-[2px] px-[25px] bg-white rounded-sm">
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
                          ? "bg-blue-500 text-white"
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