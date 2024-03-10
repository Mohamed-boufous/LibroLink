import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { axiosClient } from "../api/axios";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  },[]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: [""],
    password: [""],
  });
  const { setCurrentUser,  setCurrentToken } =
    useStateContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrf = await axiosClient.get("/sanctum/csrf-cookie");
    //console.log(csrf);
    axiosClient
      .post("/api/login", formData)
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data.user);
        setCurrentToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response.data.errors);
        setErrors({ ...errors, ...error.response.data.errors });
      });
  };
  return (

    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="bg-white p-10 rounded border-2 min-w-96 max-w-lg">
        <h1 className="text-3xl font-bold mb-8 ">Login to LibroLink</h1>
        <form onSubmit={handleSubmit} method="post" className=" text-left w-85">
          <div className="mb-2">
            <label className="font-semibold	" htmlFor="email">
              Email
            </label>
            <input
              className="border-gray-300 border-solid border-2 rounded w-full h-10 p-2
            outline-none focus:border-black"
              type="email"
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
              Mot de passe
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
          <div className="flex justify-center mt-8">
            <button
              className="bg-orange-600 text-white px-20 py-2 rounded hover:bg-orange-500 "
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="border border-gray-200 w-full mt-8"></div>
          <div className=" mt-4 font-light flex justify-center ">
            New To LibroLink?
            <Link className="text-orange-600 font-bold mx-9" to="/signup">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
