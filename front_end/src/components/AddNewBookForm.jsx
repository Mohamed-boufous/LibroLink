import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddIcon from "@mui/icons-material/Add";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
export default function AddNewBookForm() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <AddIcon />
            Add New Book
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Form</DialogTitle>
          </DialogHeader>
          <form className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center space-x-2 ">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="w-full h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="authorName"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Author's Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="authorName"
                      id="authorName"
                      className="w-full h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Desciprtion{" "}
                </label>
                <div className="mt-1">
                  <textarea
                    name="description"
                    cols="35"
                    rows="10"
                    className="w-full h-32 p-2 resize-none rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none  sm:text-sm"
                  ></textarea>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold" htmlFor="subject">
                  Subject
                </label>
                <div className="mt-1">
                  <textarea
                    name="subject"
                    cols="35"
                    rows="10"
                    className="w-full h-20 p-2 resize-none rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none  sm:text-sm"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <label className="text-sm font-semibold" htmlFor="genre">
                    Genre
                  </label>
                  <p className="italic text-sm">(separete with ",")</p>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    name="genre"
                    placeholder="Genre1,Genre2,Genre3..."
                    className="w-full h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center space-x-2 ">
                <div>
                  <label
                    htmlFor="date_publication"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Publication Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="date_publication"
                      id="title"
                      className="w-40 h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="origine"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Origine
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="origine"
                      id="origine"
                      className="w-full h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <label className="text-sm font-semibold" htmlFor="serie">
                    Serie's Name
                  </label>
                  <p className="italic text-sm">(optional)</p>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    name="serie"
                    className="w-full h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Book Cover
                </label>
                <Input type="file" name="image" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch name="isFree" />
                <label htmlFor="isFree" className="text-sm font-semibold">
                  Free
                </label>
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button className="bg-red-600" type="submit">
              Ban
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
