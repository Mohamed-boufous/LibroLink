import React from "react";
import { Link } from "react-router-dom";

export default function CategorieListItem({ text, isBigLabel }) {
  return (
    <>
      <li
        className={`px-4 py-2 h-[2.4rem] w-[15rem] ${
          isBigLabel ? "text-lg font-bold" : "hover:text-orange-600"
        } `}
      >
        <Link to="#">{text}</Link>
      </li>
    </>
  );
}
