import React from "react";
import "../styles/HomePage.css";

import BookList from "../components/BookList";
import image3 from "../assets/Rectangle 5.png";
import image4 from "../assets/Rectangle6.png";
import image5 from "../assets/Rectangle5(1).png";
import image6 from "../assets/Rectangle5(4).png";


function App() {
  const booksData = [
    { id: 1, title: "mohamed 1", image: image3  },

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
        <h2>New books</h2>
        <div className="ligne"></div>
        <BookList books={booksData} />
      </div>
      <div>
        <h2>Popular Books</h2>
        <div className="ligne"></div>
        <BookList books={booksData} />
      </div>
      <div>
        <h2>Most Rating Books</h2>
        <div className="ligne"></div>
        <BookList books={booksData} />
      </div>
    </div>
  );
}

export default App;
