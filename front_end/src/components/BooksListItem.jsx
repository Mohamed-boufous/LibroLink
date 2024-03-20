import React from "react";
import { Link } from "react-router-dom";
export default function BooksListItem({ text }) {
  return (
    <li
      className={`px-4 py-2 h-8 w-32 rounded  hover:text-white hover:bg-orange-600`}
    >
      <Link to="/book_filter">{text}</Link>
    </li>
  );
}
