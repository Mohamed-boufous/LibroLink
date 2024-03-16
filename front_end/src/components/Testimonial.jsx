import React from "react";
import ProfilePic1 from "../assets/Brown and Light Brown, Circle Framed Instagram Profile Picture (1).png";
import ProfilePic2 from "../assets/Brown and Light Brown, Circle Framed Instagram Profile Picture (2).png";
import ProfilePic3 from "../assets/Brown and Light Brown, Circle Framed Instagram Profile Picture.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Client Testimonials</p>
        <h1 className="primary-heading">Client Satisfaction at Its Best.</h1>
      </div>
      <div className="testimonial-section-bottom">
        <div>
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
          <h2>hassan ait walter</h2>
        </div>
        <div>
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
          <h2>khadija walter</h2>
        </div>
        <div>
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
          <h2>kahlid pinkman</h2>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
