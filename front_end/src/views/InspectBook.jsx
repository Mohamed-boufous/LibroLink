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
import { useParams } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  const  [load, setLoad] = useState(false);

  useEffect(() => {
    axiosClient.get("api/get_all_books").then((response) => {
      setBooks(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
  },[])

  useEffect(() => {
    axiosClient
      .get(`api/get_book/${bookId}`)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId,load]);
  return (
    <div className="cont-all">
      <SimpleDropdownExample books={books} book={book}  load={load} setLoad={setLoad}></SimpleDropdownExample>
      <div>
        <h1 className="text-[2.5rem] font-[530] mt-12 ml-5">You May Also Like</h1>
        <div className="h-[2px] bg-orange-600 mx-5 mb-10 "></div>
        <BookList books={books} />
      </div>
      <Com bookId = {bookId}/>
    </div>
  );
}

export default App;
