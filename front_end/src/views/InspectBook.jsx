import '../styles/InspectBook.css'
import SimpleDropdownExample from '../components/MyComponent'
import BookList from '../components/BookList'
import image3 from "../assets/Rectangle 5.png";
import image4 from "../assets/Rectangle6.png";
import image5 from "../assets/Rectangle5(1).png";
import image6 from "../assets/Rectangle5(4).png";
import Com from'../components/component/com'











function App() {
  const booksData = [
    { id: 1, image: image3  },

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
    <div className='cont-all'>

<SimpleDropdownExample>

</SimpleDropdownExample>
<BookList books={booksData} />

<Com>
  
</Com>


    </div>
    

  
   
  )
}

export default App
