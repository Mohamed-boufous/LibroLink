import React from 'react'
import BooksListItem from './BooksListItem'
export default function BooksMenu() {
    const booklist = [
        "New",
        "Popular",
        "Top Rated",
        "Book List",
    ]
  return (
    <div className="group relative">
    <a className="hover:text-gray-600 text-xl font-medium" href="#">
    Books
    </a>
    <div className=" absolute hidden left-0 z-10  w-[8rem] divide-y divide-gray-100 rounded bg-white shadow group-hover:block">
      <div className="grid grid-cols-1">
        <ul className=" text-sm text-gray-700">
         {
            booklist.map((book) => {
                return (
                    <BooksListItem key={book} text={book} />
                )
            })
         }
        </ul>
      </div>
    </div>
  </div>
  )
}
