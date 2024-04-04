import { axiosClient } from "@/api/axios";
import { useStateContext } from "@/context/ContextProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const { currentUser } = useStateContext();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(password);
    axiosClient
      .post("api/delete_user", { password, id: currentUser.id })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border-2 rounded-md shadow-sm mt-6 py-6 ps-9">
      <div className="my-4 mx-2">
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-10 justify-center items-center">
            <label
              htmlFor="Old password"
              className="font-bold text-[24px] col-span-1"
            >
              Password
            </label>
            <input
              type="password"
              name="Old password"
              className="bg-gray-100 py-3 col-span-8 ml-12 mr-12 text-[28px] px-3 focus:outline-none"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-10 justify-center items-center">
            <div className="col-span-1"></div>
            <div className="col-span-8 mt-6 ml-12">
              <input
                type="checkbox"
                className="ml-2 mr-3 h-4 w-4"
                onChange={(e) => setCheckbox(e.target.checked)}
                value={checkbox}
              />
              <span className="font-bold text-[20px] text-gray-600">
                By checking this box, I confirm that I want to permanently
                delete my account
              </span>
            </div>
          </div>
          <div className="mt-8 ml-44 mb-8">
            <button
              disabled={!checkbox}
              type="submit"
              className="bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-white px-5 py-2 font-bold text-[22px] cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
