import { axiosClient } from "@/api/axios";
import React, { useState } from "react";

export default function PersonalInformation({ currentUser }) {
  const [isEditing, setIsEditing] = useState(false);

  const [userName, setUserName] = useState(currentUser.userName);
  const [displayedUserName, setDisplayedUserName] = useState(
    "@" + currentUser.userName
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Logic to save changes (if needed)
    axiosClient
      .post("api/update_users_info", {
        userName: userName,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset display name and bio to their initial values
    setUserName(initialDisplayName);
    setBio(initialBio);
  };

  const handleDisplayNameChange = (e) => {
    setUserName(e.target.value);
    setDisplayedUserName("@" + e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  return (
    <div className="border-2 rounded-md shadow-sm mt-4 py-6 ps-9">
      <div className="mb-6">
        <div className="grid grid-cols-12">
          <div
            className={`font-bold text-[24px] font-roboto ${
              isEditing ? "col-span-7" : "col-span-9"
            }`}
          >
            Personal information
          </div>
          <div
            className={`font-bold text-[24px] font-roboto pl-3 ${
              isEditing ? "col-span-5" : "col-span-3"
            }`}
          >
            {isEditing ? (
              <div className="flex gap-4 pl-16">
                <button
                  onClick={handleCancelClick}
                  className="flex justify-center items-center border-2 rounded-[20px] px-5 py-2 cursor-pointer"
                >
                  <span className="font-medium text-gray-700 text-[20px] pr-4">
                    Annuler
                  </span>
                  <img src="./public/xmark-solid.svg" alt="" />
                </button>
                <button
                  onClick={handleSaveClick}
                  className="flex justify-center items-center border-2 rounded-[20px] px-5 py-2 cursor-pointer mr-2"
                >
                  <span className="font-medium text-gray-700 text-[20px] pr-4">
                    Enregistrer
                  </span>
                  <img src="./public/check-solid.svg" alt="" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="flex justify-center items-center border-2 rounded-[20px] px-5 py-2 cursor-pointer"
              >
                <span className="font-medium text-gray-700 text-[20px] pr-4">
                  Modifier
                </span>
                <img src="./public/pen-solid.svg" alt="" />
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 pt-5">
          <div className="col-span-4">
            <div>
              <div className="font-medium text-[20px] text-gray-500">
                UserName
              </div>
              {isEditing ? (
                <input
                  type="text"
                  className="font-bold text-[20px] mt-1"
                  value={userName}
                  onChange={handleDisplayNameChange}
                />
              ) : (
                <div className="font-bold text-[20px] mt-1 truncate">
                  {displayedUserName}
                </div>
              )}
            </div>
            <div
              className={`mt-6 ${
                isEditing && " opacity-30 cursor-not-allowed "
              }`}
            >
              <div className="font-medium text-[20px] text-gray-500">
                Email address
              </div>
              <div className={`font-bold text-[20px] mt-1 truncate `}>
                {currentUser.email}
              </div>
            </div>
            {/* <div className="mt-6">
              <div className="font-medium text-[20px] text-gray-500">Bio</div>
              {isEditing ? (
                <textarea
                  className="font-bold text-[20px] mt-1"
                  value={bio}
                  onChange={handleBioChange}
                />
              ) : (
                <div className="font-bold text-[20px] mt-1 truncate">{bio}</div>
              )}
            </div> */}
          </div>
          <div
            className={`col-span-3 flex justify-center items-center ${
              isEditing && " opacity-30 cursor-not-allowed "
            }`}
          >
            <div>
              <div>
                <div className={`font-medium text-[20px] text-gray-500 `}>
                  Gender
                </div>
                <div className="font-bold text-[20px] mt-1 truncate">
                  {currentUser.gender === "M" ? "Male" : "Female"}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-medium text-[20px] text-gray-500">
                  Birthday
                </div>
                <div className="font-bold text-[20px] mt-1 truncate">
                  {currentUser.date_birth}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
