import React from "react";
import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/Picsart_24-03-01_20-26-12-507.png";
import Navbar from "./Navbar";
import Header from "./Header";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      

      <div className="home-banner-container mt-16">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className=" text-5xl font-semibold">
            <span>LibroLink</span>: Where Your Machine Becomes Your Book.{" "}
            <span className="text-orange-500">Make</span> Your <span className="text-orange-500">Mark</span>.
          </h1>

          <p className="primary-text">
            " Where masterful curators do all the groundwork, like
            sourcing, summarizing, and annotating, so you can dive into a world
            of knowledge—not just consuming, but truly savoring, the essence of
            books "
          </p>
          <Link to={"/"}>
          <button className="secondary-button">
            Book now <FiArrowRight />{" "}
          </button>
          </Link>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} className="size-[48rem]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
