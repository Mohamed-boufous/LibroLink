import React from "react";
import { Link } from "react-router-dom";

export default function CategorieListItem({ text, isBigLabel }) {
  if (isBigLabel) {
    return (
      <>
        <li  className={`px-4 py-2 h-[2.4rem] w-[15rem]  text-lg font-bold hover:cursor-default`}>
          {text}
        </li>
      </>
    );
  }
  return (
    <>
      <li className={`px-4 py-2 h-[2.4rem] w-[15rem]  hover:text-orange-600`}>
        <Link to="#">{text}</Link>
      </li>
    </>
  );
}
