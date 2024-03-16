import React from "react";
import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/Picsart_24-03-01_20-26-12-507.png";
import Navbar from "./Navbar";
import Header from "./Header";

import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            <span>LibroLink</span>: Where Your Machine Becomes Your Book.{" "}
            <span>Make</span> Your <span>Mark</span>.
          </h1>

          <p className="primary-text">
            " Where masterful curators do all the groundwork, like
            sourcing, summarizing, and annotating, so you can dive into a world
            of knowledge—not just consuming, but truly savoring, the essence of
            books "
          </p>
          <button className="secondary-button">
            Book now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
