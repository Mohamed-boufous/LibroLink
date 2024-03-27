import "../styles/InspectBook.css";
import SimpleDropdownExample from "../components/MyComponent";
import BookList from "../components/BookList";
import image3 from "../assets/Rectangle 5.png";
import image4 from "../assets/Rectangle6.png";
import image5 from "../assets/Rectangle5(1).png";
import image6 from "../assets/Rectangle5(4).png";
import Com from "../components/component/com";
import { useEffect, useState } from "react";
import { axiosClient } from "@/api/axios";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axiosClient.get("api/get_all_books").then((response) => {
      setBooks(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
  },[])
  const booksData = [
    { id: 1, image: image3 },

    { id: 2, image: image4 },
    { id: 3, image: image5 },

    { id: 4, image: image6 },
    { id: 5, image: image3 },

    { id: 6, image: image4 },
    { id: 7, image: image5 },

    { id: 8, image: image6 },
    { id: 9, image: image3 },

    { id: 10, image: image4 },
    { id: 11, image: image5 },
  ];
  return (
    <div className="cont-all">
      <SimpleDropdownExample books={books}></SimpleDropdownExample>
      <div>
        <h1 className="text-[2.5rem] font-[530] mt-12 ml-5">You May Also Like</h1>
        <div className="h-[2px] bg-orange-600 mx-5 mb-10 "></div>
        <BookList books={books} />
      </div>

      <Com></Com>
    </div>
  );
}

export default App;
