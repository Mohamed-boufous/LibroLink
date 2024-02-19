import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosClient } from "./api/axios";
export default function Singup() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password_confirmation: "",
    displayName: "",
    date_birth: "",
  });
  /*   useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        // Fetch CSRF token from the server
        const response = await axios.get('http://localhost:8000/csrf-token-endpoint');
        const csrfToken = response.data.csrfToken;

        // Set the CSRF token in the Axios defaults
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
      } catch (error) {
        console.error('Failed to fetch CSRF token', error);
      }
    };

    fetchCSRFToken();
  }, []); */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrf = await axiosClient.get("/sanctum/csrf-cookie");
    console.log(csrf);
    try {
      console.log(formData);
      const response = await axiosClient.post("/api/register", formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form onSubmit={handleSubmit} method="post" className=" text-left w-85">
        <div className="mb-2">
          <label className="font-semibold	" htmlFor="username">
            Quelle est votre username?
          </label>
          <input
            className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
            required
            type="text"
            name="userName"
            id="userName"
            placeholder="Saisissez votre username"
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold	" htmlFor="email">
            Quelle est votre adresse email ?
          </label>
          <input
            className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
            required
            type="email"
            name="email"
            id="email"
            placeholder="Saisissez votre adresse e-mail"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold	" htmlFor="pwd">
            Créez un mot de passe
          </label>
          <input
            className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
            required
            type="password"
            name="password"
            id="pwd"
            placeholder="Saisissez votre mot de passe"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold	" htmlFor="pwdc">
            Confirmer votre mot de passe
          </label>
          <input
            className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
            required
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
            required
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
        </div>
        <div className="mb-2">
          <label className="font-semibold	" htmlFor="date">
            Quelle est votre date de naissance ?
          </label>
          <input
            className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
            required
            type="date"
            name="date_birth"
            id="date"
            onChange={(e) =>
              setFormData({ ...formData, date_birth: e.target.value })
            }
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="bg-orange-600 text-white px-20 py-2 rounded hover:bg-orange-500 "
            type="submit"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}
