import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";
import React from "react";
import { useEffect, useState } from "react";
import { axiosClient } from "@/api/axios";
import { useNavigate } from "react-router-dom";

function BannedPage() {
  const { currentUser, setCurrentUser } = useStateContext();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient
      .post("api/get_current_user")
      .then((response) => {
        setCurrentUser(response.data);
        setLoaded(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const logoutHandler = () => {
    axiosClient
      .post("api/logout")
      .then((response) => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="  flex flex-col items-center justify-around   bg-white border h-96 rounded w-1/2 ">
        {loaded ? (
          <>
            <div className="flex flex-col items-center justify-center text-5xl space-x-4 space-y-4">
              <div className="flex">
                <div>@{currentUser.userName},</div>
                <div className="font-semibold text-red-500">
                  You have been banned!
                </div>
              </div>
              <div className=" flex space-x-2 text-lg pb-5 ">
                <div>Till:</div>{" "}
                <div className="font-semibold">
                  {currentUser.state.date_exp
                    ? currentUser.state.date_exp
                    : "N/A"}
                </div>
              </div>
              <div className=" flex space-x-2 text-lg w-full pl-4">
                <div className="font-semibold">Reason:</div>
                <div> {currentUser.state.reason}</div>
              </div>
            </div>
            <div className=" w-full flex justify-end pr-4">
              <Button className="w-24" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </>
        ) : (
          <div> Loading ..</div>
        )}
      </div>
    </div>
  );
}

export default BannedPage;
