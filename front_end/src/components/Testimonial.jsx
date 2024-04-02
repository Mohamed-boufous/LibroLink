import React from "react";
import ProfilePic1 from "../assets/Brown and Light Brown, Circle Framed Instagram Profile Picture (1).png";
import ProfilePic2 from "../assets/Brown and Light Brown, Circle Framed Instagram Profile Picture (2).png";
import ProfilePic3 from "../assets/Brown and Light Brown, Circle Framed Instagram Profile Picture.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper mt-20">
      <div className="work-section-top flex flex-col items-center">
        <p className=" font-semibold text-4xl mb-8">Client Testimonials</p>
        <h1 className=" text-gray-800 text-8xl">Client Satisfaction at Its Best.</h1>
      </div>
      <div className="testimonial-section-bottom">
        <div className="flex flex-col">
          <img src={ProfilePic1} alt="" />
          <p>
            LibroLink revolutionized my reading with its vast collection and
            user-friendly interface. It's my go-to platform for literature.
          </p>

          <div className="testimonials-stars-container">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2>Hassan Boufous</h2>
        </div>
        <div className="flex flex-col">
          <img src={ProfilePic2} alt="" />
          <p>
            LibroLink is a treasure for manga enthusiasts. The image quality,
            speed, and diverse collection make it a must-visit for manga lovers.
          </p>

          <div className="testimonials-stars-container">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2>Khadija Kaouri</h2>
        </div>
        <div className="flex flex-col">
          <img src={ProfilePic3} alt="" />
          <p>
            LibroLink is more than casual reading; it caters to academics with a
            robust collection and efficient search functionality. 
           
          </p>

          <div className="testimonials-stars-container">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2>Khalid Falag</h2>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
