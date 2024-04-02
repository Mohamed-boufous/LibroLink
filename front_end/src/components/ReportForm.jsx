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
import { axiosClient } from "@/api/axios";
function ReportForm({ comment, reporter, reported }) {
  const [isOtherClicked, setIsOtherClicked] = useState(false);
  const [report, setReport] = useState({
    message: "",
    comment_id: comment,
    reporter_id: reporter,
    reported_id: reported,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("api/make_report", report)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <li className="p-2 cursor-pointer">Report</li>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Report Form</DialogTitle>
            <DialogDescription>
              Report the user to be penalized by the admin.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-6 flex flex-col items-end" onSubmit={handleSubmit}>
            <fieldset className="w-full">
              <legend className="text-base font-medium text-gray-900">
                Reasons
              </legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    className="accent-orange-600 h-4 w-4"
                    id="suspicious_account"
                    name="ban_reason"
                    type="radio"
                    value={"Spam account"}
                    checked={"Spam account" === report.message}
                    onChange={(e) => {
                      setReport({ ...report, message: e.target.value });
                      setIsOtherClicked(false);
                    }}
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
                    value={"Inappropriate language"}
                    checked={"Inappropriate language" === report.message}
                    onChange={(e) => {
                      setReport({ ...report, message: e.target.value });
                      setIsOtherClicked(false);
                    }}
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
                    onChange={() => {
                      setIsOtherClicked(!isOtherClicked);
                      setReport({ ...report, message: "" });
                    }}
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
                    placeholder="Write your resone here..."
                    value={report.message}
                    onChange={(e) =>
                      setReport({ ...report, message: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
            </fieldset>
            <Button className="bg-red-500 hover:bg-red-600" type="submit">
              Report
            </Button>
          </form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReportForm;
