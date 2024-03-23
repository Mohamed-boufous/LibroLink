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
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/api/axios";
import { useNavigate } from "react-router-dom";
export default function EditBookFom({ params,setLoad,load }) {
  const navigate = useNavigate();
  const [bookCover, setBookCover] = useState("");
  const [bookFile, setBookFile] = useState("");
  const [displayBookCover, setDisplayBookCover] = useState(
    params.row.bookCover
  );
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    serie: "",
    genre: "",
    isFree: false,
    description: "",
    subject: "",
    date_publication: "",
    origin: "",
    lang: "",
    bookFile_path: "",
    bookCover_path: "",
  });
  const [FreeChecked, setFreeChecked] = useState(formData.isFree);
  const handleEditForm = () => {
    setFormData({
      ...formData,
      id: params.row.id,
      title: params.row.title,
      author: params.row.author,
      serie: params.row.serie,
      genre: params.row.genre,
      isFree: params.row.isFree,
      description: params.row.description,
      subject: params.row.subject,
      date_publication: params.row.date_publication,
      origin: params.row.origin,
      lang: params.row.lang,
      bookFile_path: params.row.file_path,
      bookCover_path: params.row.bookCover,
    });
  };
  const FreeSwitchHandler = (e) => {
    setFreeChecked(!FreeChecked);
    setFormData({
      ...formData,
      isFree: !FreeChecked,
    });
  };

  const ImportBookCoverHandler = (e) => {
    setBookCover(e.target.files[0]);
    setDisplayBookCover(URL.createObjectURL(e.target.files[0]));
    setFormData({
      ...formData,
      bookCover: e.target.files[0],
    });
  };
  const ImportBookFileHandler = (e) => {
    setBookFile(e.target.files[0]);
    setFormData({
      ...formData,
      bookFile: e.target.files[0],
    });
  };
  const editBookHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("serie", formData.serie);
    form.append("genre", formData.genre);
    form.append("isFree", formData.isFree ? 1 : 0);
    form.append("description", formData.description);
    form.append("subject", formData.subject);
    form.append("date_publication", formData.date_publication);
    form.append("origin", formData.origin);
    form.append("lang", formData.lang);
    if (formData.bookFile) {
      console.log("ssss");
      console.log(formData.bookFile);
      form.append("bookFile", formData.bookFile);
    }
    if (formData.bookCover) {
      form.append("bookCover", formData.bookCover);
    }
    console.log(form);
    console.log(formData.isFree);
    console.log(FreeChecked);
    axiosClient
      .post(`api/update_books/${formData.id}`, form)
      .then((response) => {
        console.log(response);
        setLoad(!load);
        //navigate("/admin/Users");
        //window.location.reload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="py-2 px-6"
          onClick={handleEditForm}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <form className="space-y-6 h-full">
          <div className="flex space-x-2 h-full">
            <div className="space-y-2 w-full">
              <div className="flex  space-x-2 ">
                <div className="w-1/2">
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
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      value={formData.title}
                    />
                  </div>
                </div>
                <div className="w-1/2">
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
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      value={formData.author}
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    value={formData.description}
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
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    value={formData.subject}
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
                    onChange={(e) =>
                      setFormData({ ...formData, genre: e.target.value })
                    }
                    value={formData.genre}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 ">
                <div className="w-full">
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
                      className="w-full h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date_publication: e.target.value,
                        })
                      }
                      value={formData.date_publication}
                    />
                  </div>
                </div>
                <div className="w-full">
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
                      onChange={(e) =>
                        setFormData({ ...formData, origin: e.target.value })
                      }
                      value={formData.origin}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="lang"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Language
                  </label>
                  <div className="mt-1">
                    <select
                      name="lang"
                      className="w-full h-8 p-2 rounded-sm border bg-white border-gray-300 focus:border-black shadow-sm focus:outline-none   sm:text-sm"
                      onChange={(e) =>
                        setFormData({ ...formData, lang: e.target.value })
                      }
                      value={
                        formData.lang === "Arabic"
                          ? "ar"
                          : formData.lang === "English"
                          ? "en"
                          : "French"
                      }
                    >
                      <option name="lang" value="ar">
                        Arabic
                      </option>
                      <option name="lang" value="en">
                        English
                      </option>
                      <option name="lang" value="fr">
                        French
                      </option>
                    </select>
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
                    className="w-full h-8 p-2 rounded-sm border border-gray-300 focus:border-black shadow-sm focus:outline-none  sm:text-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, serie: e.target.value })
                    }
                    value={formData.serie}
                  />
                </div>
                <div className="flex items-center space-x-2 h-full mt-3">
                  <Switch
                    checked={FreeChecked}
                    name="isFree"
                    onClick={(e) => FreeSwitchHandler(e)}
                  />
                  <label htmlFor="isFree" className="text-sm font-semibold">
                    Free
                  </label>
                </div>
              </div>
            </div>
            <div className="h-full border-l-2 pl-3">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 h-96 mb-4 rounded-sm">
                  <img
                    className="w-full h-full"
                    src={`${displayBookCover ? displayBookCover : ""}`}
                    alt=""
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="image"
                    className=" w-64 h-10 cursor-pointer flex justify-center items-center 
                    text-sm font-semibold text-black bg-white border hover:bg-gray-50  py-1 px-2 rounded-md  "
                  >
                    Import Book Cover
                  </label>
                  <Input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    onChange={(e) => ImportBookCoverHandler(e)}
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <label
                    htmlFor="file_path"
                    className=" w-64 h-10 cursor-pointer flex justify-center items-center 
                    text-sm font-semibold text-black bg-white border hover:bg-gray-50  py-1 px-2 rounded-md  "
                  >
                    Import File
                  </label>
                  <Input
                    accept=".pdf"
                    type="file"
                    name="file_path"
                    id="file_path"
                    className="hidden"
                    onChange={(e) => ImportBookFileHandler(e)}
                  />
                  {bookFile && (
                    <div className="text-[0.7rem] text-green-500">
                      {bookFile.name} has imported successfully
                    </div>
                  )}
                </div>
                <div className="mt-10">
                  <Button
                    className="w-64 h-10"
                    type="submit"
                    onClick={editBookHandler}
                  >
                    {" "}
                    <EditIcon /> Edit Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
