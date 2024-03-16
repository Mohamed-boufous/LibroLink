import React, { useState } from "react";
import StarRating from "./StarRating";
import image2 from "../assets/heart-svgrepo-com.svg";
import image3 from "../assets/plus-large-svgrepo-com.svg";
import image5 from "../assets/heart-svgrepo-com copy.svg";
import image6 from "../assets/checked-tick-svgrepo-com.svg";
import Button from "./buton";
import Book from "./Book1";
import Drop from'../components/component/drop'


const MyComponent = () => {
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
      <div className="container-all">
        <div className="cont1">
          <img src={imagePath} alt="Description de l'image" className="img1" />

          <div className="adding-cont">
            <button className="bookbut">book now</button>
            <img src={currentImage} alt="" onClick={toggleImage} className="img1" />
            <div className="dropcont">
             
                <Drop className ="droplist" >

                </Drop> 
              
            </div>

          </div>
          <StarRating onRatingChange={handleRatingChange} />
        </div>
      <div className="cont2">
        <h2>{title}</h2>
        <p>
          <span>Author</span>: {author}
        </p>
        <p>
          <span>Series: </span>Sherlock Holmes
        </p>
        <p className="subject">
          <span>Subject:</span>
          Detective and mystery stories, Detective and mystery stories, English,
          Holmes, Sherlock (Fictitious character) -- Fiction, Private
          investigators -- Fiction -- England
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
        <div className="genres">
          <Button text="genre 1" />
          <Button text="genre 2" />
          <Button text="genre 3" />
          <Button text="genre 4" />
          <Button text="genre 5" />
          <Button text="genre 6 " />
        </div>
        <p>
          <span>Description:</span>Description: Miss Mary Marstan receives
          through the post once a year a large pearl without any clue as to the
          sender. When her mysterious correspondent requests a meeting, Holmes
          and Watson start out on a case. A terrible death and vanishing
          treasure lead to an epic pursuit through the dawn streets and later
          along the River Thames. The cast of characters include the unfortunate
          Sholto twins, the mongrel Toby, and the wooden-legged man, as the fire
          and blood of Mutiny-torn India throw gigantic, distorted silhouettes
          across late
        </p>
      </div>
      <div>
  <h2 className="titre-outher">Athor’s Other Wokrs:</h2>
  <div className="Author-Other-Works">
    <div className="book">
      <Book image="../src/Assets/Rectangle6.png" visitCount={80} />
    </div>
    <div className="book">
      <Book image="../src/Assets/Rectangle5(1).png" visitCount={80} />
    </div>
    <div className="book">
      <Book image="../src/Assets/Rectangle5(4).png" visitCount={80} />
    </div>
    <div className="book">
      <Book image="../src/Assets/Rectangle6.png" visitCount={80} />
    </div>
    <div className="book">
      <Book image="../src/Assets/Rectangle5(1).png" visitCount={80} />
    </div>
    <div className="book">
      <Book image="../src/Assets/Rectangle5(4).png" visitCount={80} />
    </div>
    <div className="book">
      <Book image="../src/Assets/Rectangle6.png" visitCount={80} />
    </div>
    <div className="book">
      <Book image="../src/Assets/Rectangle5(4).png" visitCount={80} />
    </div>
  </div>
</div>

    </div>
</div>
  );
};

export default MyComponent;
