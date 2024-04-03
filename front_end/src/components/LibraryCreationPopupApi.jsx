import React from "react";

const LibraryCreationPopupApi = ({
  showInput,
  handleCloseButton,
  inputValue,
  handleInputChange,
  handleInputKeyPress,
  messageError,
  addToLibrary,
}) => {
  return (
    <>
      {showInput && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg">
            <div
              className="flex justify-end mt-[-8px] mr-[-8px] cursor-pointer"
              onClick={handleCloseButton}
            >
              <img src="./public/circle-xmark-solid (1).svg" alt="" />
            </div>
            <div className="flex justify-center items-center mt-4 mx-10">
              <div className="font-bold text-[20px]">Create Library</div>
            </div>
            <div className="flex justify-center items-center mt-5 mx-10">
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleInputKeyPress}
                  placeholder="Library name"
                  className="text-black font-bolder px-4 py-2 bg-gray-100 text-[13px] border-none focus:border-transparent focus:outline-none"
                />
                {messageError !== "" && (
                  <div className="mt-1 ml-[4px]">
                    <div className="text-[12px] text-red-500">
                      {messageError}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 mb-8 mx-10">
              <button
                className="bg-custom px-5 py-1 text-white font-bold text-[16px] rounded-[5px]"
                onClick={addToLibrary}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LibraryCreationPopupApi;
