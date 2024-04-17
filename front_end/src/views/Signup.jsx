import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosClient } from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/Singup.css";
import { useNavigate } from "react-router-dom";
import librolinkLogo from "../assets/LibroLink (8) (1).png";
import { useStateContext } from "../context/ContextProvider";
export default function Singup() {
  const navigate = useNavigate();
  const { setCurrentUser, setCurrentToken } = useStateContext();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password_confirmation: "",
    displayName: "",
    date_birth: "",
  });
  const [errors, setErrors] = useState({
    userName: [""],
    email: [""],
    password: [""],
    password_confirmation: [""],
    displayName: [""],
    date_birth: [""],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrf = await axiosClient.get("/sanctum/csrf-cookie");
    //console.log(csrf);
    try {
      console.log(formData);
      const response = await axiosClient.post("/api/register", formData);
      
      navigate("/email-sent");
      console.log(response);
    } catch (error) {
      console.error(error);
      console.error(error.response.data.error);
      setErrors({ ...errors, ...error.response.data.error });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen   bg-gray-100 ">
      <div className="bg-white p-10 pt-0 rounded border-2 flex flex-col items-center  min-w-96 w-2/5 max-w-lg min-h-fit">
        <div className="size-40">
          <img src={librolinkLogo} alt="librolinkLogo" />
        </div>
        <form onSubmit={handleSubmit} method="post" className="text-left w-85 ">
          <h2 className="text-3xl font-bold mb-8">
          Sign up for free to start reading.
          </h2>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="username">
              What is your user name?
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="text"
              name="userName"
              id="userName"
              placeholder=" Enter your user name"
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
            {errors.userName.map((error) => (
              <p className="text-red-500 pl-1">{error}</p>
            ))}
          </div>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="email">
              What is your e-mail address?
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your e-mail address"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email.map((error) => (
              <p className="text-red-500 pl-1">{error}</p>
            ))}
          </div>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="pwd">
              Create your password
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="password"
              name="password"
              id="pwd"
              placeholder="Enter your password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password.map((error) => (
              <p className="text-red-500 pl-1">{error}</p>
            ))}
          </div>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="pwdc">
              Confirm your password
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="password"
              name="password_confirmation"
              id="pwdc"
              placeholder="Enter your password again"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="display_name">
              What should we call you?
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="text"
              name="displayName"
              id="display_name"
              placeholder="Enter your display name"
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
            />
            <h6 className="font-light text-sm">
              This name will be displayed on your profile.
            </h6>
            {errors.displayName.map((error) => (
              <p className="text-red-500 pl-1">{error}</p>
            ))}
          </div>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="gender">
              What is your gender?
            </label>
            <select
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black bg-white"
              name="gender"
              id="gender"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="Homme">Male</option>
              <option value="Femme">Female</option>
            </select>
            {/* {errors.gender.map((error) => (
              <p className="text-red-500 pl-1">{error}</p>
            ))} */}
          </div>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="date">
              What is your date of birth?
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="date"
              name="date_birth"
              id="date"
              onChange={(e) =>
                setFormData({ ...formData, date_birth: e.target.value })
              }
            />
            {errors.date_birth.map((error) => (
              <p className="text-red-500 pl-1">{error}</p>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="bg-orange-500 text-white px-20 py-2 rounded hover:bg-orange-600 "
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="border border-gray-200 w-full mt-8"></div>
          <div className="mt-4 font-light flex justify-center ">
            Already have an account?
            <Link
              className="text-orange-600 font-bold mx-9 underline"
              to="/login"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
