import { axiosClient } from "@/api/axios";
import { useState } from "react";

export default function Email({ setLoad , load , setSelectedTab}) {
  const [formData, setFormData] = useState({
    email: "",
    current_password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosClient
      .post("api/update_users_email", formData)
      .then((response) => {
        console.log(response);
        setLoad(!load);
        setSelectedTab("My Profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="border-2 rounded-md shadow-sm mt-6 py-6 ps-9">
      <div className="my-4 mx-2">
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-10 justify-center items-center">
            <label
              htmlFor="email"
              className="font-bold text-[24px] col-span-2 pl-8"
            >
              New Email
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-100 py-3 col-span-8 mr-12 text-[28px] px-3 focus:outline-none"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-10 justify-center items-center mt-6">
            <label
              htmlFor="current_password"
              className="font-bold text-[24px] col-span-2 pl-8"
            >
              Password
            </label>
            <input
              type="password"
              name="current_password"
              className="bg-gray-100 py-3 col-span-8 mr-12 text-[28px] px-3 focus:outline-none"
              required
              value={formData.current_password}
              onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
            />
          </div>
          <div className="mt-10 ml-56 mb-8">
            <button className="bg-orange-500 rounded-lg text-white px-5 py-2 font-bold text-[22px] cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
