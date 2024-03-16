import React from "react";
import AboutBackground from "../assets/about-background.png";
import AboutBackgroundImage from "../assets/LibroLink (8) (1).png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About LibroLink</p>
        <h1 className="primary-heading">
          <span style={{ color: "orange" }}>LibroLink</span>: Your guide to an{" "}
          <span style={{ color: "orange" }}>endless library</span>.
        </h1>

        <p className="primary-text">
          Discover an infinite realm of knowledge with LibroLink, where words
          become adventures. Unleash your curiosity and embark on a journey
          beyond limits. Click 'Learn More ' for a unique exploration
          into the extraordinary world of LibroLink...
        </p>

        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
