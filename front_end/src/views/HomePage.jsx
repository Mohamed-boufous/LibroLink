import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";

import BookList from "../components/BookList";
import image3 from "../assets/Rectangle 5.png";
import image4 from "../assets/Rectangle6.png";
import image5 from "../assets/Rectangle5(1).png";
import image6 from "../assets/Rectangle5(4).png";
import { axiosClient } from "@/api/axios";

function App() {
  const [recentBooks, setRecentBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [mostRatedBooks, setMostRatedBooks] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`api/get_all_books?option=recent`)
      .then((response) => {
        setRecentBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosClient
      .get(`api/get_all_books?option=rating`)
      .then((response) => {
        setMostRatedBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosClient
      .get(`api/get_all_books?option=popular`)
      .then((response) => {
        setPopularBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const booksData = [
    { id: 1, title: "mohamed 1", image: image3 },

    { id: 2, title: "mohamed 2", image: image4 },
    { id: 3, title: "mohamed 3", image: image5 },

    { id: 4, title: "mohamed 4", image: image6 },
    { id: 5, title: "mohamed 5", image: image3 },

    { id: 6, title: "mohamed 6", image: image4 },
    { id: 7, title: "mohamed 7", image: image5 },

    { id: 8, title: "mohamed 8", image: image6 },
    { id: 9, title: "mohamed 9", image: image3 },

    { id: 10, title: "mohamed 10", image: image4 },
    { id: 11, title: "mohamed 11", image: image5 },
  ];

  return (
    <div className="cont-all">
      <div>
        <h1 className="text-[2.5rem] font-[530] mt-12 ml-5">New books</h1>
        <div className="h-[2px] bg-orange-600 mx-5 mb-10 "></div>
        <BookList books={recentBooks} />
      </div>
      <div>
        <h2 className="text-[2.5rem] font-[530] mt-16 ml-5">Popular Books</h2>
        <div className="h-[2px] bg-orange-600 mx-5 mb-10"></div>
        <BookList books={popularBooks} />
      </div>
      <div>
        <h2 className="text-[2.5rem] font-[530] mt-24 ml-5">
          Most Rating Books
        </h2>
        <div className="h-[2px] bg-orange-600 mx-5 mb-10"></div>
        <BookList books={mostRatedBooks} />
      </div>
    </div>
  );
}

export default App;
