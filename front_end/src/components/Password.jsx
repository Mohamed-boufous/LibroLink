import { axiosClient } from "@/api/axios";
import { useState } from "react";


export default function Password({setSelectedTab}) {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
   const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosClient
      .post("api/update_users_password", formData)
      .then((response) => {
        console.log(response);
        setSelectedTab("My Profile");
      })
      .catch((error) => {
        console.error(error);
      });
   }
  return (
    <div className="border-2 rounded-md shadow-sm mt-6 py-6 ps-9 mb-20">
      <div className="my-4 mx-2">
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-10 justify-center items-center">
            <label
              htmlFor="Old password"
              className="font-bold text-[22px] col-span-2"
            >
              Old password
            </label>
            <input
              type="password"
              name="Old password"
              className="bg-gray-100 py-3 col-span-8 mr-12 text-[28px] px-3 focus:outline-none"
              required
              value={formData.current_password}
              onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-10 justify-center items-center mt-5">
            <label
              htmlFor="New password"
              className="font-bold text-[22px] col-span-2"
            >
              New password
            </label>
            <input
              type="password"
              name="New password"
              className="bg-gray-100 py-3 col-span-8 mr-12 text-[28px] px-3 focus:outline-none"
              required
              value={formData.new_password}
              onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-10 justify-center items-center mt-5">
            <label
              htmlFor="Confirm password"
              className="font-bold text-[22px] col-span-2"
            >
              Confirm new password
            </label>
            <input
              type="password"
              name="Confirm password"
              className="bg-gray-100 py-3 col-span-8 mr-12 text-[28px] px-3 focus:outline-none"
              required
              value={formData.confirm_password}
              onChange={(e) => setFormData({ ...formData, new_password_confirmation: e.target.value })}
            />
          </div>
          <div className="mt-12 ml-56 mb-8">
            <button className="bg-orange-500 rounded-sm text-white px-5 py-2 font-bold text-[22px] cursor-pointer" >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
