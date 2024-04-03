import React from "react";

const BookRemoveConfirmation = ({
  showPopUp,
  handleCloseBookPopUp,
  cancelRemoveBookFromList,
  removeBookFromList,
}) => {
  return (
    <>
      {showPopUp && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg">
            <div
              className="flex justify-end mt-[-8px] mr-[-8px] cursor-pointer"
              onClick={handleCloseBookPopUp}
            >
              <img src="./public/circle-xmark-solid (1).svg" alt="" />
            </div>
            <div className="flex justify-center items-center mt-4">
              <img src="./public/icons8-warning-50.png" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center mt-4 mx-10">
              <div className="font-bold text-[13px] text-center overflow-hidden line-clamp-2">
                Are you sure you want to remove
              </div>
              <div className="font-bold text-[13px] text-center overflow-hidden line-clamp-2">
                this book from your List?
              </div>
            </div>

            <div className="flex justify-center items-center gap-x-3 mt-5 mb-8 mx-10">
              <button
                className="bg-gray-200 px-5 py-1 text-black font-bold text-[15px] rounded-[1px] shadow-md"
                onClick={cancelRemoveBookFromList}
              >
                Cancel
              </button>
              <button
                className="bg-custom px-5 py-1 text-white font-bold text-[15px] rounded-[1px] shadow-md"
                onClick={removeBookFromList}
              >
                Validate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookRemoveConfirmation;
