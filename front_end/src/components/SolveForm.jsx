import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BlockIcon from "@mui/icons-material/Block";
export default function SolveForm({ params }) {
  const [isOtherClicked, setIsOtherClicked] = useState(false);
  const [penalty, setPenalty] = useState("");
  const penaltyHandler = (e) => {
    e.preventDefault();
    setPenalty(e.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Solve</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Solve The report</DialogTitle>
          <DialogDescription>
            Upon reading the report, choose the convenable penalty.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-gray-700"
            >
              Message:
            </label>
            <textarea
              className="mt-1 border rounded-sm p-2 resize-none w-full h-16 readOnly  outline-none cursor-default focus:outline-none focus:ring-0  "
              value={`${params.row.message}`}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-gray-700"
            >
              Comment:
            </label>
            <textarea
              className="mt-1 border rounded-sm p-2 resize-none w-full h-36 readOnly  outline-none cursor-default focus:outline-none focus:ring-0  "
              value={`${params.row.comment}`}
            ></textarea>
          </div>
          <legend className=" font-semibold text-gray-900">Penalty type</legend>
          <div className=" flex items-center justify-between space-x-5  ">
            <div className="flex  space-x-2">
              <Button
                value="ban"
                variant={`${penalty === "ban" ? "solid" : "outline"}`}
                className={`w-24 ${
                  penalty === "ban"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : ""
                }`}
                onClick={(e) => penaltyHandler(e)}
              >
                Ban
              </Button>
              <Button
                value="timeout"
                variant={`${penalty === "timeout" ? "solid" : "outline"}`}
                className={`w-24 ${
                  penalty === "timeout"
                    ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                    : ""
                }`}
                onClick={(e) => penaltyHandler(e)}
              >
                TimOut
              </Button>
            </div>
            <div className="flex  space-x-5 items-center w-full">
              <label
                className="block text-[0.9rem] font-semibold text-black"
                htmlFor="duration"
              >
                Duration:
              </label>
              <select
                name="duration"
                className="  w-full pl-3 pr-10 py-2 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              >
                <option name="ban_duration" value={"d"}>
                  Day
                </option>
                <option name="ban_duration" value={"w"}>
                  Week
                </option>
                <option name="ban_duration" value={"m"}>
                  Month
                </option>
                <option name="ban_duration" value="n/a">
                  Not Specified
                </option>
              </select>
            </div>
          </div>
          <fieldset>
            <legend className="text-base font-medium text-gray-900">
              Reason
            </legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  className="accent-orange-600 h-4 w-4"
                  id="suspicious_account"
                  name="ban_reason"
                  type="radio"
                  onChange={() => setIsOtherClicked(false)}
                />
                <label
                  className="ml-3 block text-sm font-medium text-gray-700"
                  htmlFor="suspicious_account"
                >
                  Spam account
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="accent-orange-600 h-4 w-4"
                  id="compromised_account"
                  name="ban_reason"
                  type="radio"
                  onChange={() => setIsOtherClicked(false)}
                />
                <label
                  className="ml-3 block text-sm font-medium text-gray-700"
                  htmlFor="compromised_account"
                >
                  Inappropriate language
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="accent-orange-600 h-4 w-4"
                  id="other"
                  name="ban_reason"
                  type="radio"
                  onChange={() => setIsOtherClicked(!isOtherClicked)}
                />
                <label
                  className="ml-3 block text-sm font-medium text-gray-700"
                  htmlFor="other"
                >
                  Other
                </label>
              </div>
              <div className={`${isOtherClicked ? "block" : "hidden"} h-24`}>
                <textarea
                  className={`w-full h-full border resize-none  
                    border-gray-300 rounded-md p-2 focus:outline-none focus:border-black" name="ban_reason" cols="30" rows="10`}
                  value={params.row.message}
                ></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset></fieldset>
        </form>
        <DialogFooter>
          <DialogClose className=" flex space-x-2">
            <Button className="bg-orange-500 hover:bg-orange-600" type="submit">
              Solve
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
