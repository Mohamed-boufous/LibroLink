import { useState, useEffect } from "react";
import SidebarMenuApi from "./SidebarMenuApi";
import BookGridApi from "./BookGridApi";
import ReadingBooks from "./ReadingBooks";
import LibraryCreationPopupApi from "./LibraryCreationPopupApi";

export default function BiblioContainer() {
  const [library, setLibrary] = useState([]);
  const [libraryFetched, setLibraryFetched] = useState(false);
  const userId = 33; // Replace 1 with the actual user ID
  const [currentPage, setCurrentPage] = useState(1);
  const [lastRowIDLibrary, setLastRowIdLibrary] = useState();
  const [libraryUsed, setLibraryUsed] = useState("likedBooks");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageReadingHistory, setCurrentPageReadingHistory] = useState(1);
  const [lastPageReadingHistory, setLastPageReadingHistory] = useState();
  const [readingHistoryIsLoading, setReadingHistoryIsLoading] = useState(true);
  const [firstTimeIntoRH, setFirstTimeIntoRH] = useState(true);
  const [totalBooksReadingHistory,setTotalBooksReadingHistory] = useState();

  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/user/${userId}/biblioName`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const biblioArray = Object.entries(data.biblioNames).map(
          ([id, biblioName]) => ({
            id: parseInt(id),
            biblioName,
          })
        );
        setLastRowIdLibrary(data.lastRowId);
        setLibrary(biblioArray);
        setLibraryFetched(true);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };

    fetchLibraryData();
  }, []);

  useEffect(() => {
    if (readingHistoryHovered) fetchedReadingBooks();
  }, [currentPageReadingHistory]);

  useEffect(() => {
    if (libraryUsed === "reading history") return;
    fetchLikedBooks(); // Call fetchLikedBooks with the updated value of nbrBookPerPage
  }, [currentPage, libraryUsed]); // Include fetchLikedBooks, currentPage, and nbrBookPerPage in the dependency array

  const [showInput, setShowInput] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleCloseButton = () => {
    setShowInput(false);
    setMessageError("");
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      addToLibrary();
    }
  };

  const addToLibrary = () => {
    const libraryName = inputValue.trim();

    if (libraryName === "") {
      setMessageError("TextField is empty!!!!!!!");
    } else if (
      ![
        "a lire",
        "lu",
        "lecture en cours",
        "lecture en cour",
        "liked books",
        "likedbooks",
        "liked book",
        "likedbook",
      ].includes(libraryName.toLocaleLowerCase()) &&
      !library.some((item) => item.biblioName === libraryName)
    ) {
      // Trouver l'ID le plus élevé dans le tableau actuel

      const newId = lastRowIDLibrary + 1;
      console.log(newId);

      const newLibrary = [...library, { id: newId, biblioName: libraryName }];

      setLibrary(newLibrary);
      setInputValue("");
      setShowInput(false);
      addLibraryToDB(libraryName);
    } else {
      setMessageError("This Library already exists !!!!!!!");
    }
  };

  const addLibraryToDB = async (value) => {
    try {
      const response = await fetch("http://localhost:8000/api/createBiblio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          biblio_name: value,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create biblio");
      }
      console.log("LibraryName added to Library !!!! ");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateLibraryClick = () => {
    setShowInput(true);
  };

  const handleHomeEnter = () => setHomeHovered(true);
  const handleHomeLeave = () => setHomeHovered(false);
  const [homeHovered, setHomeHovered] = useState(false);

  const [likedBooksHovered, setLikedBooksHovered] = useState(true);
  const [readingHistoryHovered, setReadingHistoryHovered] = useState(false);
  const [lectureEnCoursHovered, setLectureEnCoursHovered] = useState(false);
  const [luHovered, setLuHovered] = useState(false);
  const [aLireHovered, setALireHovered] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState("");

  const readingHistoryHandler = () => {
    if (selectedLibrary !== "") selectedLibrary.target.style.opacity = 1;
    setReadingHistoryIsLoading(true);
    setFirstTimeIntoRH(true);
    setCurrentPageReadingHistory(1);
    setReadingHistoryHovered(true);
    setLikedBooksHovered(false);
    setLectureEnCoursHovered(false);
    setLuHovered(false);
    setALireHovered(false);
    setLibraryUsed("reading history");
    fetchedReadingBooks();
  };

  const LibraryHandler = (e, str) => {
    if (selectedLibrary !== "") {
      selectedLibrary.target.style.opacity = 1;
    }
    setIsLoading(true);
    setSelectedLibrary(e);
    e.target.style.opacity = 0.5;
    setALireHovered(false);
    setLuHovered(false);
    setLectureEnCoursHovered(false);
    setReadingHistoryHovered(false);
    setLikedBooksHovered(false);
    setLibraryUsed(str);
    setCurrentPage(1);
  };

  const DeleteLibraryFromDb = async (id_user, id_book) => {
    try {
      await fetch(
        `http://localhost:8000/api/deleteBiblioForUser/${id_user}/${id_book}`,
        {
          method: "DELETE",
        }
      );
      console.log("Biblio has deleted successufuly!!!!!!");
    } catch (error) {
      console.error("Error deleting biblio:", error);
    }
  };

  const DeleteLibrary = (id) => {
    const NewLibrary = library.filter((item) => item.id !== id);
    setLibrary(NewLibrary);
    librarySelected("likedBooks");
    DeleteLibraryFromDb(userId, id);
  };

  const [books, setBooks] = useState([]);
  const [hoveredBook, setHoveredBook] = useState(null);
  //const [isLoading, setIsLoading] = useState(true);
  const [BookPopUp, setBookPopUp] = useState(false);
  const [nbrPage, setNbrPage] = useState();

  const fetchLikedBooks = async () => {
    try {
      let result = await fetch(
        `http://localhost:8000/api/book/${libraryUsed}/${userId}/${currentPage}`
      );
      result = await result.json();
      console.log(libraryUsed);
      setBooks(result.books); // Set the books data
      setNbrPage(result.nbrPage);
      console.log(result.books);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleLeftButtonClick = () => {
    setIsLoading(true);
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleRightButtonClick = () => {
    setIsLoading(true);
    setCurrentPage(currentPage + 1);
  };

  const leftReadingHistoryHandler = () => {
    setReadingHistoryIsLoading(true);
    setCurrentPageReadingHistory(
      currentPageReadingHistory > 1 ? currentPageReadingHistory - 1 : 1
    );
    setFirstTimeIntoRH(false);
  };
  const rightReadingHistoryHandler = () => {
    setReadingHistoryIsLoading(true);
    setCurrentPageReadingHistory(currentPageReadingHistory + 1);
    setFirstTimeIntoRH(false);
  };
  const fetchedReadingBooks = async () => {
    try {
      let result = await fetch(
        `http://localhost:8000/api/users/${userId}/${currentPageReadingHistory}/reading-history`
      );
      result = await result.json();
      setBooks(result.books.data); // Set the books data
      setLastPageReadingHistory(result.pagination.last_page);
      setReadingHistoryIsLoading(false);
      setTotalBooksReadingHistory(result.pagination.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      setReadingHistoryIsLoading(false);
    }
  };

  const handleCloseBookPopUp = () => {
    setBookPopUp(false);
    setBookClickedForRemoved("");
  };

  const cancelRemoveBookFromList = () => {
    handleCloseBookPopUp();
  };

  const librarySelected = (str) => {
    setReadingHistoryHovered(false);
    console.log(str);
    if (selectedLibrary !== "") {
      selectedLibrary.target.style.opacity = 1;
    }
    if (str !== libraryUsed) setIsLoading(true);
    setALireHovered(false);
    setLuHovered(false);
    setLectureEnCoursHovered(false);
    setLikedBooksHovered(false);
    if (str === "likedBooks") setLikedBooksHovered(true);
    if (str === "lecture en cours") setLectureEnCoursHovered(true);
    if (str === "lu") setLuHovered(true);
    if (str === "a lire") setALireHovered(true);
    console.log("here");
    setLibraryUsed(str);
    setCurrentPage(1);
  };

  const [bookClikedForRemoved, setBookClickedForRemoved] = useState("");

  const DeleteBook = (id) => {
    setBookPopUp(true);
    setBookClickedForRemoved(id);
  };
  const deleteBookInDB = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/deleteBookFromBiblio/${libraryUsed}/${userId}/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete book from database");
      }
      // Si vous avez besoin de traiter la réponse de l'API, vous pouvez le faire ici
    } catch (error) {
      console.error("Error deleting book:", error);
      // Gérer l'erreur de suppression du livre de la base de données
    }
  };
  const removeBookFromList = async () => {
    try {
      handleCloseBookPopUp();
      setIsLoading(true);
      await deleteBookInDB(bookClikedForRemoved);
      fetchLikedBooks();
    } catch (error) {
      console.error("Error removing book from list:", error);
    }
  };
  return (
    <div className="grid grid-cols-12 relative">
      {libraryFetched && (
        <SidebarMenuApi
          // LuHandler={LuHandler}
          luHovered={luHovered}
          //ALireHandler={ALireHandler}
          aLireHovered={aLireHovered}
          //LectureEnCoursHandler={LectureEnCoursHandler}
          lectureEnCoursHovered={lectureEnCoursHovered}
          readingHistoryHandler={readingHistoryHandler}
          readingHistoryHovered={readingHistoryHovered}
          //LikedBooksHandler={LikedBooksHandler}
          likedBooksHovered={likedBooksHovered}
          handleHomeLeave={handleHomeLeave}
          homeHovered={homeHovered}
          handleHomeEnter={handleHomeEnter}
          handleCreateLibraryClick={handleCreateLibraryClick}
          library={library}
          LibraryHandler={LibraryHandler}
          DeleteLibrary={DeleteLibrary}
          librarySelected={librarySelected}
        />
      )}

      {libraryFetched && (
        <div
          className={`col-span-7 sm:col-span-8 md:col-span-9 xl:col-span-10 ${
            readingHistoryHovered !== true ? "p-4" : ""
          }`}
        >
          {!readingHistoryHovered ? (
            <BookGridApi
              books={books}
              hoveredBook={hoveredBook}
              setHoveredBook={setHoveredBook}
              isLoading={isLoading}
              BookPopUp={BookPopUp}
              handleCloseBookPopUp={handleCloseBookPopUp}
              cancelRemoveBookFromList={cancelRemoveBookFromList}
              DeleteBook={DeleteBook}
              removeBookFromList={removeBookFromList}
              currentPage={currentPage}
              handleLeftButtonClick={handleLeftButtonClick}
              handleRightButtonClick={handleRightButtonClick}
              lastPage={nbrPage}
            />
          ) : (
            <ReadingBooks
              books={books}
              isLoading={readingHistoryIsLoading}
              rightReadingHistoryHandler={rightReadingHistoryHandler}
              leftReadingHistoryHandler={leftReadingHistoryHandler}
              currentPageReadingHistory={currentPageReadingHistory}
              lastPageReadingHistory={lastPageReadingHistory}
              firstTimeIntoRH={firstTimeIntoRH}
              totalBooksReadingHistory = {totalBooksReadingHistory}
            />
          )}
        </div>
      )}

      <LibraryCreationPopupApi
        showInput={showInput}
        handleCloseButton={handleCloseButton}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleInputKeyPress={handleInputKeyPress}
        messageError={messageError}
        addToLibrary={addToLibrary}
      />
    </div>
  );
}
