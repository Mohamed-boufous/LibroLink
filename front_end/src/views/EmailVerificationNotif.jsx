import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { useStateContext } from "../context/ContextProvider";

export default function EmailVerificationNotif() {
   const { currentUser, setCurrentUser, currentToken, setCurrentToken } =
    useStateContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const p_id = searchParams.get("id");
  const p_hash = searchParams.get("hash");

  useEffect(() => {
    axiosClient
    .get(`/api/email-verification?id=${p_id}&hash=${p_hash}`)
    .then((response) => {
      console.log(response);
      setCurrentToken(response.data.token);
      setCurrentUser(response.data.user);
      console.log(response.data.user);
      console.log(response.data.token);
      console.log(currentUser);
      console.log(currentToken);
      localStorage.setItem("token", response.data.token);
    })
    .catch((error) => {
      console.error(error);
    });
  },[]) 

  return (
    <>
      
        <div className="flex justify-center my-1.5 mb-6">
          <div className="font-bold">
          @{currentUser.userName}
          </div> 
        <h1>,You've been verified successfully</h1> 
        </div> 
      <Link to="/">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">Go to HomePage</button>
      </Link>
    </>
  );
}
