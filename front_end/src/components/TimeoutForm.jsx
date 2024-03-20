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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function TimeoutForm() {
  const [isOtherClicked, setIsOtherClicked] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" text-yellow-400 - p-1 rounded-full">
          <RemoveCircleOutlineIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Time-out a User</DialogTitle>
          <DialogDescription>
            Users who are in time-out are temporarily unable to comment.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6">
          <fieldset>
            <legend className="text-base font-medium text-gray-900">
              Reason for Timeout
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
                ></textarea>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-base font-medium text-gray-900">
              TimeOut Duration
            </legend>
            <div className="mt-4" >
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                id="delete_history"
                name="delete_history"
              >
                <option name="timeout_duration" value={"d"}>Day</option>
                <option name="timeout_duration" value={"w"}>Week</option>
                <option name="timeout_duration" value={"m"}>Month</option>
              </select>
            </div>
          </fieldset>
        </form>
        <DialogFooter>
          <Button className="bg-yellow-500" type="submit">
            TimOut
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
