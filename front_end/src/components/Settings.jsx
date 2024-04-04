import { useState, useEffect } from "react";
import MyProfile from "./MyProfile";
import PersonalInformation from "./PersonalInformation";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";
import Email from "./Email";
import { useStateContext } from "@/context/ContextProvider";
import { axiosClient } from "@/api/axios";

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState("My Profile");
  const { currentUser, setCurrentUser } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const myProfileHandler = () => {
    setSelectedTab("My Profile");
  };
  const passwordHandler = () => {
    setSelectedTab("Password");
  };

  const deleteAccountHandler = () => {
    setSelectedTab("Delete Account");
  };

  const emaildHandler = () => {
    setSelectedTab("Email");
  };
  useEffect(() => {
    axiosClient
      .post("api/get_current_user")
      .then((response) => {
        setCurrentUser(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [load]);

  return (
    <div className="bg-gray-80 mx-52 mt-12 rounded-md overflow-hidden shadow-sm mb-24">
      <div className="font-bold ps-16 pt-6 pb-3 font-roboto text-[30px]">
        Account Settings
      </div>
      <div className="grid grid-cols-10 px-4 py-3">
        <div className="col-span-2 bg-white rounded-md">
          <div className="my-9 text-[18px] font-roboto text-gray-600 font-medium flex flex-col justify-center items-center mr-5">
            <div className="mb-5 ps-2">
              <button
                className={`cursor-pointer 
                ${
                  selectedTab === "My Profile"
                    ? "bg-gray-100 px-8 py-3 rounded-full text-orange-600"
                    : "hover:opacity-60 mt-3"
                }
              `}
                onClick={myProfileHandler}
              >
                My Profile
              </button>
            </div>
            <div className="mb-6 ps-2">
              <button
                className={` cursor-pointer
                ${
                  selectedTab === "Email"
                    ? "bg-gray-100 px-8 py-3 rounded-full text-orange-600"
                    : "hover:opacity-60 mt-3"
                }
              `}
                onClick={emaildHandler}
              >
                Email
              </button>
            </div>
            <div className="mb-6 ps-2">
              <button
                className={` cursor-pointer
                ${
                  selectedTab === "Password"
                    ? "bg-gray-100 px-8 py-3 rounded-full text-orange-600"
                    : "hover:opacity-60 mt-3"
                }
              `}
                onClick={passwordHandler}
              >
                Password
              </button>
            </div>
            <div className="mb-6 ps-2 text-red-600">
              <button
                className={` cursor-pointer
                ${
                  selectedTab === "Delete Account"
                    ? "bg-red-100 px-8 py-3 rounded-full"
                    : "hover:opacity-60 mt-3"
                }
              `}
                onClick={deleteAccountHandler}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-8 bg-white border-l border-solid border-gray-300 mt-4 mb-24">
          <div className="mx-8 mb-6">
            {selectedTab === "My Profile" && (
              <div>
                <div className="font-bold text-[25px] font-roboto mb-3">
                  My Profile
                </div>
                {!isLoading ? (
                  <>
                    {" "}
                    <MyProfile  currentUser={currentUser}></MyProfile>{" "}
                    <PersonalInformation 
                      currentUser={currentUser}
                    ></PersonalInformation>
                  </>
                ) : (
                  <>
                    <div>Loading...</div>
                  </>
                )}
              </div>
            )}
            {selectedTab === "Email" && (
              <div>
                <div className="font-bold text-[26px] font-roboto mb-3">
                  Change Email
                </div>
                <Email setSelectedTab={setSelectedTab}  load={load} setLoad={setLoad} ></Email>
              </div>
            )}
            {selectedTab === "Password" && (
              <div>
                <div className="font-bold text-[26px] font-roboto mb-3">
                  Change Password
                </div>
                <Password setSelectedTab={setSelectedTab}></Password>
              </div>
            )}
            {selectedTab === "Delete Account" && (
              <div>
                <div className="font-bold text-[26px] text-red-500 font-roboto mb-3">
                  Delete Account
                </div>
                <DeleteAccount></DeleteAccount>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
