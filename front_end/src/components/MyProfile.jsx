import { axiosClient } from "@/api/axios";
import React, { useState, useRef } from "react";

export default function MyProfile({ currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [bio, setBio] = useState(
    currentUser.bio ? currentUser.bio : "Add your bio"
  );
  const [image, setImage] = useState(currentUser.image);
  const [displayedImage, setDisplayedImage] = useState(currentUser.image);
  const inputFileRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const form = new FormData();
    form.append("displayName", displayName);
    form.append("bio", bio);
    form.append("image", image);
    axiosClient
      .post("api/update_users_info", form)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    if (isEditing) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setDisplayedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    if (isEditing) {
      inputFileRef.current.click();
    }
  };

  const handleImageMouseEnter = () => {
    if (isEditing) {
      document.getElementById("profileImage").style.opacity = "0.8";
    }
  };

  const handleImageMouseLeave = () => {
    if (isEditing) {
      document.getElementById("profileImage").style.opacity = "1";
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    //setImage(""); hnaya a dir dik tswira lighadi i9ra mn api
    setDisplayName(currentUser.displayName);
    setBio(currentUser.bio ? currentUser.bio : "Add your bio");
  };

  return (
    <div className="border-2 rounded-md shadow-sm mt-4 py-6 ps-9">
      <div className="grid grid-cols-10 justify-center items-center">
        <div className={`flex flex-col justify-center items-center col-span-2`}>
          <div className="text-center">
            <label
              htmlFor="imageInput"
              onClick={handleImageClick}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
            >
              <img
                id="profileImage"
                src={
                  displayedImage || "https://placehold.co/600x400/orange/white"
                }
                alt=""
                className="rounded-full object-cover cursor-pointer"
                style={{ width: "100px", height: "100px" }}
              />
            </label>
            <input
              type="file"
              id="imageInput"
              ref={inputFileRef}
              className="hidden"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div
          className={`pl-3 mr-16 ${isEditing ? "col-span-4" : "col-span-5"}`}
        >
          {isEditing ? (
            <div>
              <div>
                <input
                  type="text"
                  className="font-bold text-[18px] mb-1 w-80"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className={`font-medium text-[16px] mb-1 w-80`}
                  value={bio === "Add your bio" ? "" : bio}
                  placeholder="Add your bio"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              {/*  <div>
                <input
                  type="text"
                  className="w-80"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div> */}
            </div>
          ) : (
            <div>
              <div className="font-bold text-[18px] mb-1 truncate">
                {displayName}
              </div>
              <div
                className={`font-medium text-[16px] mb-1 truncate ${
                  bio === "Add your bio" ? "text-gray-500" : ""
                }`}
              >
                {bio}
              </div>
              {/* <div className="truncate">{location}</div> */}
            </div>
          )}
        </div>
        <div
          className={`my-2 ${isEditing ? "col-span-4" : "col-span-3 pl-16"}`}
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
              className="flex justify-center items-center border-2 rounded-[20px] px-5 py-2"
            >
              <span className="font-medium text-gray-700 text-[20px] pr-4 ">
                Modifier
              </span>
              <img src="./public/pen-solid.svg" alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
