import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import image2 from "../assets/heart-svgrepo-com.svg";
import image3 from "../assets/plus-large-svgrepo-com.svg";
import image5 from "../assets/heart-svgrepo-com copy.svg";
import image6 from "../assets/checked-tick-svgrepo-com.svg";
import { Button } from "./ui/button";
import Book from "./Book1";
import Drop from "../components/component/drop";
import BookFinalVersion from "./BookFinalVersion";
import { axiosClient } from "@/api/axios";
import { useParams } from "react-router-dom";

const MyComponent = ({ books, book }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [currentImage, setCurrentImage] = useState(image2);
  const [currentImage1, setCurrentImage1] = useState(image3);
  const [selectedRating, setSelectedRating] = useState(0);
  const [title, setTitle] = useState("Sample Title");
  const [author, setAuthor] = useState("John Doe");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === image2 ? image5 : image2));
  };

  const toggleImage1 = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setCurrentImage1((prevImage) => (prevImage === image3 ? image6 : image3));
  };

  const imagePath = "src/Assets/image6.png";

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  

  return (
    <div className="great">
      <div className="container-all h-[51rem] flex justify-between mb-20">
        <div className="flex w-[80%]">
          <div className>
            <div
              className=" flex flex-col items-center bg-orange-400 rounded-s-md h-full "
              style={{ width: "33rem" }}
            >
              {book ? (
                <img
                  src={book.ImageURL}
                  alt="Description de l'image"
                  className="img1  h-[40rem] "
                  style={{ width: "24rem", margin: "0rem", marginTop: "1rem" }}
                />
              ) : (
                <p>Loading...</p>
              )}

              <div className="adding-cont flex space-x-10 mt-4">
                <button
                  className="py-2 px-16 text-[1rem] mr-10 bg-white rounded font-[580]
            hover:bg-orange-600 hover:text-white
            "
                >
                  Read Now
                </button>
                <div className="border border-white flex p-1 rounded-md hover:cursor-pointer">
                  <img
                    src={currentImage}
                    alt=""
                    onClick={toggleImage}
                    className="img1"
                    style={{ margin: "0rem" }}
                  />
                </div>
                <div
                  className="dropcont border rounded-md  text-white"
                  style={{ margin: "0rem", marginLeft: "0.5rem" }}
                >
                  <Drop className="droplist"></Drop>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex space-x-4">
                  <div className="text-white text-[1.5rem] font-semibold mt-2">
                    {book ? book.sum_rating : "Loading..."}
                  </div>
                  <StarRating onRatingChange={handleRatingChange} />
                </div>
                <div className="text-white text-[1rem] ">105 Rates</div>
              </div>
            </div>
          </div>
          <div className="cont2 rounded-e-md">
            <h2>{book ? book.title : "Loading..."}</h2>
            <p>
              <span>Author</span>: {book ? book.author : "Loading..."}
            </p>
            <p>
              {book ? (
                book.serie !== "null" ? (
                  <span className="serie">Serie: {book.serie}</span>
                ) : (
                  ""
                )
              ) : (
                "Loading..."
              )}
            </p>
            <p className="subject">
              <span>Subject:</span>
              {book ? book.subject : "Loading..."}
            </p>
            <p>
              <span>Publication date:</span>{" "}
              {book ? book.date_publication : "Loading..."}
            </p>
            <p>
              <span>Origin:</span> {book ? book.origin : "Loading..."}
            </p>
            <p>
              <span>Reading Experience:</span>{" "}
              {book ? (book.isFree ? "Free" : "Paid") : "Loading..."}
            </p>
            <p>
              <span>Languages:</span> {book ? book.lang : "Loading..."}
            </p>
            <p>
              <span>Views:</span> {book ? book.views : "Loading..."}
            </p>
            <p>
              <span>Pages:</span> {book ? book.pages : "Loading..."}
            </p>
            {book ? (
              <div className="my-2">
                {book.genres.map((genre) => (
                  <Button
                    variant="outline"
                    className=" bg-[#00000016] font-semibold"
                  >
                    {genre.genreName}
                  </Button>
                ))}
              </div>
            ) : (
              "Loading..."
            )}
            <p className=" overflow-y-auto flex flex-wrap  ">
              <span>Description:</span> {book ? book.description : "Loading..."}
            </p>
          </div>
        </div>
        <div className="h-full overflow-y-hidden">
          <h2 className="titre-outher text-[1.5rem]">Athor’s Other Wokrs:</h2>
          <div className={`Author-Other-Works h-[90%]`}>
            {books.map((book) => (
              <BookFinalVersion
                book={book}
                hoveredBook={hoveredBook}
                setHoveredBook={setHoveredBook}
              />
            ))}
            {books.map((book) => (
              <BookFinalVersion
                book={book}
                hoveredBook={hoveredBook}
                setHoveredBook={setHoveredBook}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
