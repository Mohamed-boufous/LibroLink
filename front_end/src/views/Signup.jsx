import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosClient } from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/Singup.css";
import { useNavigate } from "react-router-dom";
export default function Singup() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  },[]);
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
      console.log(response);
    } catch (error) {
      console.error(error);
      console.error(error.response.data.error);
      setErrors({ ...errors, ...error.response.data.error });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen   bg-gray-100 ">
      <div className="bg-white p-10 rounded border-2 min-w-96 w-2/5 max-w-lg min-h-fit">
        <form onSubmit={handleSubmit} method="post" className="text-left w-85 ">
          <h2 className="text-3xl font-bold mb-8">
            Inscrivez-vous gratuitement pour commencer la lecture.
          </h2>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="username">
              Quelle est votre username?
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="text"
              name="userName"
              id="userName"
              placeholder="Saisissez votre username"
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
              Quelle est votre adresse email ?
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="text"
              name="email"
              id="email"
              placeholder="Saisissez votre adresse e-mail"
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
              Créez un mot de passe
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="password"
              name="password"
              id="pwd"
              placeholder="Saisissez votre mot de passe"
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
              Confirmer votre mot de passe
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="password"
              name="password_confirmation"
              id="pwdc"
              placeholder="Saisissez de nouveau votre mot de passe"
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
              Comment doit-on vous appeler ?
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="text"
              name="displayName"
              id="display_name"
              placeholder="Saisissez un nom de profil"
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
            />
            <h6 className="font-light text-sm">
              Celui-ci va apparaitre sur votre profil.
            </h6>
            {errors.displayName.map((error) => (
              <p className="text-red-500 pl-1">{error}</p>
            ))}
          </div>
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="date">
              Quelle est votre date de naissance ?
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
              className="bg-orange-600 text-white px-20 py-2 rounded hover:bg-orange-500 "
              type="submit"
            >
              S'inscrire
            </button>
          </div>
          <div className="border border-gray-200 w-full mt-8"></div>
          <div className="mt-4 font-light flex justify-center ">
            Vous avez déja un compte ?
            <Link className="text-orange-600 font-bold mx-9" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
