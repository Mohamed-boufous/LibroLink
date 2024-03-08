import React from "react";
import { Link } from "react-router-dom";
import CategorieListItem from "./CategorieListItem";
function CategoriesMenu() {
  const categories1 = [
    "Reading Experience",
    "Free To Read",
    "Subscription Required",
    "Non Fiction",
    "Art & photography",
    "Autobiography",
    "Biography",
    "Food & Drink",
    "History",
    "How-To/Guides",
    "Humanities & Social Sciences",
    "Humor",
    "Parenting",
  ];
  const categories2 = [
    "Philosophy",
    "Science & Technology",
    "Self-Help",
    "Travel",
    "True crime",
    "Fiction",
    "Action/Adventure",
    "Children's Fiction",
    "Classic",
    "Contemporary",
    "Fantasy",
    "Graphic Novel",
    "Historical Fiction",
    
  ];
  const categories3 = [
    "Horror",
    "Mystery",
    "Psychological",
    "Romance",
    "Satire",
    "Science Fiction",
    "Short Stories",
    "Thriller",
    "Women's Fiction",
    "Young Adult",
  ];

  return (
    <div className="group relative">
      <a className="hover:text-gray-600 text-xl font-medium" href="#">
        Categories
      </a>
      <div className=" absolute hidden left-0 z-10  w-[40rem] h-[32rem] divide-y divide-gray-100 rounded bg-white shadow group-hover:block">
        <div className="grid grid-cols-3">
          <ul className="py-1 text-sm text-gray-700">
            {categories1.map((category) => {
              if (
                category === "Reading Experience" ||
                category === "Non Fiction"
              ) {
                return (
                  <CategorieListItem
                    key={category}
                    text={category}
                    isBigLabel={true}
                  />
                );
              } else {
                return (
                  <CategorieListItem
                    key={category}
                    text={category}
                    isBigLabel={false}
                  />
                );
              }
            })}
          </ul>
          <ul className="py-1 text-sm text-gray-700">
            {categories2.map((category) => {
              if (category === "Fiction") {
                return (
                  <CategorieListItem
                    key={category}
                    text={category}
                    isBigLabel={true}
                  />
                );
              } else {
                return (
                  <CategorieListItem
                    key={category}
                    text={category}
                    isBigLabel={false}
                  />
                );
              }
            })}
          </ul>
          <ul className="py-1 text-sm text-gray-700">
            {categories3.map((category) => (
              <CategorieListItem
                key={category}
                text={category}
                isBigLabel={false}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CategoriesMenu;
