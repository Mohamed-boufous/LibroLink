import React from "react";

const Pagination = ({
  currentPage,
  handleLeftButtonClick,
  handleRightButtonClick,
  lastPage,
  height
}) => {


  return (
    <div className={`col-span-12 flex justify-start ml-8 mt-4 ${height >=850 ? "mt-12" : ""}`}>
      <ul className="pagination flex gap-2">
        {currentPage !== 1 && (
          <li>
            <button
              onClick={() => {
                handleLeftButtonClick();
              }}
            >
              <img
                src="./public/circle-chevron-left-solid (1).svg"
                alt="Left Arrow"
                style={{height : "40px"}}
              />
            </button>
          </li>
        )}
        {lastPage > 1 && currentPage < lastPage && (
          <li>
            <button
              onClick={() => {
                handleRightButtonClick();
              }}
            >
              <img
                src="./public/circle-chevron-right-solid (2).svg"
                alt="Right Arrow"
                style={{height : "40px"}}
              />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
