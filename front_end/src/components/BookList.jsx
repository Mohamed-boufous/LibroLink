import React, { useState, useEffect } from "react";
import Book from "./Book";
import arrowLeftImage from "../assets/icons8-next-50.png"; // Remplacez avec le chemin de votre image pour le bouton de retour en arrière
import arrowRightImage from "../assets/icons8-next-50 copy.png"; // Remplacez avec le chemin de votre image pour le bouton suivant
import BookFinalVersion from "./BookFinalVersion";

const BookList = ({ books }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredBook, setHoveredBook] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNextBook = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const handlePrevBook = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  const renderBooks = () => {
    // Si le nombre de livres est inférieur ou égal à 7, affichez tous les livres
    if (books.length <= 7) {
      return books.map(
        (book) => (console.log(book), (<BookFinalVersion book={book} hoveredBook={hoveredBook} setHoveredBook={setHoveredBook} />))
      );
    }

    // Si le nombre de livres est supérieur à 7, appliquez la logique de découpage et d'affichage
    const endIndex = (startIndex + 7) % books.length;
    const displayedBooks =
      endIndex >= startIndex
        ? books.slice(startIndex, endIndex)
        : [...books.slice(startIndex), ...books.slice(0, endIndex)];

    return(
      <>
      <div className="flex space-x-4">
        {displayedBooks.map((book, index) => (
      <BookFinalVersion book={book}  hoveredBook={hoveredBook} setHoveredBook={setHoveredBook}/>
    ))}
      </div>
      </>
  ); 
  };

  // Ajustement pour garder l'image à côté du dernier livre selon la logique définie
  const booksContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    // Ajoutez votre logique ici pour ajuster le style basé sur `windowWidth`
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}
    >
      <div style={booksContainerStyle} className="space-x-4">
        {books.length > 7 && (
          <img
            src={arrowRightImage}
            alt="Previous Book"
            onClick={handleNextBook}
            style={{
              cursor: "pointer",
              width: "50px",
              height: "50px",
              alignSelf: "flex-start",
              marginRight: "20px",
              marginTop: "110px",
            }}
          />
        )}
        {renderBooks()}
        {books.length > 7 && (
          <img
            src={arrowLeftImage}
            alt="Next Book"
            onClick={handlePrevBook}
            style={{
              cursor: "pointer",
              width: "50px",
              height: "50px",
              alignSelf: "flex-start",
              marginLeft: "20px",
              marginTop: "110px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookList;
