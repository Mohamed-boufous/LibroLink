import React, { useState } from "react";
import StarRating from "./StarRating";
import image2 from "../assets/heart-svgrepo-com.svg";
import image3 from "../assets/plus-large-svgrepo-com.svg";
import image5 from "../assets/heart-svgrepo-com copy.svg";
import image6 from "../assets/checked-tick-svgrepo-com.svg";
import { Button } from "./ui/button";
import Book from "./Book1";
import Drop from "../components/component/drop";
import BookFinalVersion from "./BookFinalVersion";

const MyComponent = ({ books }) => {
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
              <img
                src={imagePath}
                alt="Description de l'image"
                className="img1  h-[40rem] "
                style={{ width: "24rem", margin: "0rem", marginTop: "1rem" }}
              />

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
                    4.5
                  </div>
                  <StarRating onRatingChange={handleRatingChange} />
                </div>
                <div className="text-white text-[1rem] ">105 Rates</div>
              </div>
            </div>
          </div>
          <div className="cont2 rounded-e-md">
            <h2>{title}</h2>
            <p>
              <span>Author</span>: {author}
            </p>
            <p>
              <span>Series: </span>Sherlock Holmes
            </p>
            <p className="subject">
              <span>Subject:</span>
              Detective and mystery stories, Detective and mystery stories,
              English, Holmes, Sherlock (Fictitious character) -- Fiction,
              Private investigators -- Fiction -- England
            </p>
            <p>
              <span>Publication date:</span> February 1890
            </p>
            <p>
              <span>Origin:</span>United Kingdom
            </p>
            <p>
              <span>Reading Experience:</span>Free
            </p>
            <p>
              <span>Languages:</span>English
            </p>
            <p>
              <span>Views:</span>1,852
            </p>
            <p>
              <span>Pages:</span>248
            </p>
            <div className="my-2">
              <Button
                variant="outline"
                className=" bg-[#00000016] font-semibold"
              >
                Genre 1
              </Button>
              <Button
                variant="outline"
                className=" bg-[#00000016] font-semibold"
              >
                Genre 2
              </Button>{" "}
              <Button
                variant="outline"
                className=" bg-[#00000016] font-semibold"
              >
                Genre 3
              </Button>{" "}
              <Button
                variant="outline"
                className=" bg-[#00000016] font-semibold"
              >
                Genre 4
              </Button>{" "}
              <Button
                variant="outline"
                className=" bg-[#00000016] font-semibold"
              >
                Genre 5
              </Button>{" "}
              <Button
                variant="outline"
                className=" bg-[#00000016] font-semibold"
              >
                Genre 6
              </Button>
            </div>
            <p className=" overflow-y-auto flex flex-wrap  ">
              <span>Description:</span>Miss Mary Marstan receives through the
              post once a year a large pearl without any clue as to the sender.
              When her mysterious correspondent requests a meeting, Holmes and
              Watson start out on a case. A terrible death and vanishing
              treasure lead to an epic pursuit through the dawn streets and
              later along the River Thames. The cast of characters include the
              unfortunate Sholto twins, the mongrel Toby, and the wooden-legged
              man, as the fire and blood of Mutiny-torn India throw gigantic,
              distorted silhouettes across late
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
